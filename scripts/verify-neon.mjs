import assert from 'node:assert/strict';
import { randomUUID, createHmac } from 'node:crypto';
import pg from 'pg';
import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { loadEnv } from './env.mjs';

loadEnv();
// This script writes synthetic records and removes only its own records in finally.
// Email sending must be disabled for smoke tests to avoid notifying real recipients.
if (process.env.RESEND_API_KEY) throw new Error('Run verification against an app started without RESEND_API_KEY');
const base = process.env.VERIFY_BASE_URL || 'http://localhost:3010';
const functionUrl = process.env.NEON_FUNCTION_WEBSITE_BASE_URL;
const secret = process.env.MAVI_ORIGIN_SECRET;
assert.ok(functionUrl && secret && process.env.DATABASE_URL, 'Neon environment is required');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 2, connectionTimeoutMillis: 15000 });
const s3 = new S3Client({ forcePathStyle: true });
const run = randomUUID();
const email = `neon-smoke-${run}@example.invalid`;
const contactEmail = `neon-contact-${run}@example.invalid`;
const ids = Array.from({ length: 6 }, () => randomUUID());
const keys = ids.map((id) => `contact/${id}.json`);
const quotaKey = (kind, address) => createHmac('sha256', secret).update(`${kind}:${address}`).digest('hex');

async function post(path, data, id) {
  return fetch(new URL(path, base), {
    method: 'POST', headers: { 'content-type': 'application/json', ...(id ? { 'idempotency-key': id } : {}) },
    body: JSON.stringify(data), signal: AbortSignal.timeout(35000),
  });
}
async function expectStatus(response, status) {
  assert.equal(response.status, status, `Expected ${status}, got ${response.status}: ${await response.clone().text()}`);
  return response;
}

try {
  for (const path of ['/', '/waitlist', '/contact']) await expectStatus(await fetch(new URL(path, base)), 200);
  const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
  assert.ok(sitemap.includes('https://mavifinans.eu/'));
  assert.equal(sitemap.includes('mavifinans.sh'), false);
  console.log('PASS app: homepage, waitlist, contact and mavifinans.eu sitemap');

  await expectStatus(await fetch(new URL('contact', functionUrl), { method: 'POST', body: '{}' }), 401);
  console.log('PASS function: direct unauthenticated request rejected (401)');

  await expectStatus(await post('/api/waitlist', { email: 'invalid' }), 400);
  await expectStatus(await post('/api/waitlist', { email, interests: ['unknown'] }), 400);
  await expectStatus(await fetch(new URL('/api/contact', base), { method: 'POST', body: '{' }), 400);
  await expectStatus(await post('/api/contact', { message: 'x'.repeat(32769) }), 413);
  console.log('PASS validation: invalid email/interests/JSON rejected (400), oversized body rejected (413)');

  await expectStatus(await post('/api/waitlist', { email, interests: ['wallet'] }), 200);
  await expectStatus(await post('/api/waitlist', { email: email.toUpperCase(), interests: ['finans', 'pay', 'pay'] }), 200);
  const subscribers = await pool.query('SELECT id, email FROM mavi_web.waitlist_subscribers WHERE email = $1', [email]);
  assert.equal(subscribers.rowCount, 1);
  assert.equal(subscribers.rows[0].email, email);
  const interests = await pool.query('SELECT product_id FROM mavi_web.waitlist_interests WHERE subscriber_id = $1 ORDER BY product_id', [subscribers.rows[0].id]);
  assert.deepEqual(interests.rows.map((r) => r.product_id), ['banking', 'pay', 'wallet']);
  console.log('PASS postgres: one normalized signup; repeated submission merges banking/pay/wallet interests');

  const data = { name: 'Neon website smoke test', email: contactEmail, subject: `Verification ${run}`, message: 'Synthetic end-to-end website verification. Safe to remove.' };
  const first = await expectStatus(await post('/api/contact', data, ids[0]), 200);
  assert.equal((await first.json()).id, ids[0]);
  await expectStatus(await post('/api/contact', data, ids[0]), 200);
  await expectStatus(await post('/api/contact', { ...data, subject: 'Changed payload' }, ids[0]), 409);
  const messages = await pool.query('SELECT * FROM mavi_web.contact_submissions WHERE id = $1', [ids[0]]);
  assert.equal(messages.rowCount, 1);
  const row = messages.rows[0];
  for (const key of ['name', 'email', 'subject', 'message']) assert.equal(row[key], data[key]);
  assert.equal(row.archive_status, 'stored');
  const archive = await s3.send(new GetObjectCommand({ Bucket: 'assets', Key: row.archive_key }));
  const json = JSON.parse(await archive.Body.transformToString());
  assert.equal(json.id, ids[0]);
  for (const key of ['name', 'email', 'subject', 'message']) assert.equal(json[key], data[key]);
  const anonymous = await fetch(`${process.env.AWS_ENDPOINT_URL_S3.replace(/\/$/, '')}/assets/${row.archive_key}`);
  assert.ok([401, 403].includes(anonymous.status), `Private archive returned ${anonymous.status}`);
  console.log('PASS contact: Next.js -> authenticated Function -> Postgres -> private S3 JSON; exact contents verified');
  console.log('PASS retries: same ID creates one message; changed payload rejected (409); anonymous archive read denied');

  for (let i = 1; i < 5; i++) await expectStatus(await post('/api/contact', data, ids[i]), 200);
  const limited = await expectStatus(await post('/api/contact', data, ids[5]), 429);
  assert.ok(Number(limited.headers.get('retry-after')) > 0);
  assert.equal((await pool.query('SELECT count(*)::int AS count FROM mavi_web.contact_submissions WHERE email = $1', [contactEmail])).rows[0].count, 5);
  await pool.query('UPDATE mavi_web.submission_quotas SET count = 20 WHERE key = $1', [quotaKey('waitlist', email)]);
  await expectStatus(await post('/api/waitlist', { email }), 429);
  await pool.query("UPDATE mavi_web.submission_quotas SET window_start = now() - interval '2 hours' WHERE key = $1", [quotaKey('waitlist', email)]);
  await expectStatus(await post('/api/waitlist', { email }), 200);
  console.log('PASS durable quotas: sixth contact and exhausted signup rejected (429); expired quota resets');
  console.log('ALL NEON WEBSITE END-TO-END CHECKS PASSED');
} finally {
  const cleanup = await Promise.allSettled(keys.map((Key) => s3.send(new DeleteObjectCommand({ Bucket: 'assets', Key }))));
  await pool.query('DELETE FROM mavi_web.contact_submissions WHERE id = ANY($1::uuid[]) AND email = $2', [ids, contactEmail]);
  await pool.query('DELETE FROM mavi_web.waitlist_subscribers WHERE email = $1', [email]);
  await pool.query('DELETE FROM mavi_web.submission_quotas WHERE key = ANY($1::text[])', [[quotaKey('contact', contactEmail), quotaKey('waitlist', email)]]);
  await pool.end();
  assert.equal(cleanup.filter((r) => r.status === 'rejected').length, 0, 'Synthetic object cleanup failed');
  console.log('Cleanup complete: only this run\'s synthetic rows and objects removed.');
}
