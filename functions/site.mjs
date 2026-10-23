import { createHmac, timingSafeEqual } from 'node:crypto';
import pg from 'pg';
import { attachDatabasePool } from '@neon/functions';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BodyError, readJson, waitlistSchema, contactSchema, requestIdSchema } from './validation.mjs';

const secret = process.env.MAVI_ORIGIN_SECRET;
if (!secret) throw new Error('MAVI_ORIGIN_SECRET is required');
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5, connectionTimeoutMillis: 10000 });
attachDatabasePool(pool);
const s3 = new S3Client({ forcePathStyle: true });
const expected = Buffer.from(secret);

function authorized(request) {
  const provided = Buffer.from(request.headers.get('x-secret') || '');
  return provided.byteLength === expected.byteLength && timingSafeEqual(provided, expected);
}

async function quota(client, kind, email) {
  // Store a keyed digest, not a raw email or untrusted client IP, in quota records.
  const key = createHmac('sha256', secret).update(`${kind}:${email}`).digest('hex');
  const { rows } = await client.query(`
    INSERT INTO mavi_web.submission_quotas AS q (key, window_start, count)
    VALUES ($1, now(), 1)
    ON CONFLICT (key) DO UPDATE SET
      window_start = CASE WHEN q.window_start <= now() - interval '1 hour' THEN now() ELSE q.window_start END,
      count = CASE WHEN q.window_start <= now() - interval '1 hour' THEN 1 ELSE q.count + 1 END
    RETURNING count, greatest(1, ceil(extract(epoch FROM window_start + interval '1 hour' - now())))::int AS retry_after
  `, [key]);
  return rows[0].count > (kind === 'contact' ? 5 : 20) ? rows[0].retry_after : null;
}

async function saveWaitlist(data) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const retryAfter = await quota(client, 'waitlist', data.email);
    if (retryAfter) {
      await client.query('COMMIT');
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
    }
    const { rows: [subscriber] } = await client.query(`
      INSERT INTO mavi_web.waitlist_subscribers (email) VALUES ($1)
      ON CONFLICT (email) DO UPDATE SET updated_at = now() RETURNING id
    `, [data.email]);
    await client.query(`INSERT INTO mavi_web.waitlist_interests (subscriber_id, product_id)
      SELECT $1::uuid, unnest($2::text[]) ON CONFLICT DO NOTHING`, [subscriber.id, data.interests]);
    await client.query('COMMIT');
    return Response.json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally { client.release(); }
}

async function saveContact(data, requestId) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // Serializes concurrent retries for one request ID, including archive writes.
    await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [requestId]);
    let { rows: [row] } = await client.query('SELECT * FROM mavi_web.contact_submissions WHERE id = $1 FOR UPDATE', [requestId]);
    if (row && ['name', 'email', 'subject', 'message'].some((key) => row[key] !== data[key])) {
      await client.query('ROLLBACK');
      return Response.json({ error: 'Request ID already used for a different message' }, { status: 409 });
    }
    if (!row) {
      const retryAfter = await quota(client, 'contact', data.email);
      if (retryAfter) {
        await client.query('COMMIT');
        return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } });
      }
      const key = `contact/${requestId}.json`;
      ({ rows: [row] } = await client.query(`INSERT INTO mavi_web.contact_submissions
        (id, name, email, subject, message, archive_key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [requestId, data.name, data.email, data.subject, data.message, key]));
    }
    // Commit the message before storage I/O, so an archive outage cannot lose it.
    await client.query('COMMIT');
    let notify = false;
    if (row.archive_status !== 'stored') {
      await s3.send(new PutObjectCommand({
        Bucket: 'assets', Key: row.archive_key,
        Body: JSON.stringify({ id: row.id, ...data, createdAt: new Date(row.created_at).toISOString() }),
        ContentType: 'application/json', CacheControl: 'private, no-store',
      }));
      const updated = await client.query("UPDATE mavi_web.contact_submissions SET archive_status = 'stored' WHERE id = $1 AND archive_status = 'pending'", [requestId]);
      notify = updated.rowCount === 1;
    }
    return Response.json({ success: true, id: row.id, notify });
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    throw error;
  } finally { client.release(); }
}

export default {
  async fetch(request) {
    if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const path = new URL(request.url).pathname.replace(/\/$/, '');
    if (request.method !== 'POST' || !['/waitlist', '/contact'].includes(path)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    try {
      const schema = path === '/waitlist' ? waitlistSchema : contactSchema;
      const parsed = schema.safeParse(await readJson(request));
      if (!parsed.success) return Response.json({ error: 'Invalid form data' }, { status: 400 });
      if (path === '/waitlist') return await saveWaitlist(parsed.data);
      const id = requestIdSchema.safeParse(request.headers.get('idempotency-key'));
      if (!id.success) return Response.json({ error: 'Valid request ID required' }, { status: 400 });
      return await saveContact(parsed.data, id.data);
    } catch (error) {
      if (error instanceof BodyError) return Response.json({ error: error.message }, { status: error.status });
      console.error('Website submission failed', { code: error.code || error.name });
      return Response.json({ error: 'Unable to save submission. Please try again.' }, { status: 503 });
    }
  },
};
