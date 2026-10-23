import { readdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import pg from 'pg';
import { root, loadEnv } from './env.mjs';

loadEnv();
const connectionString = process.env.MIGRATION_DATABASE_URL || process.env.DATABASE_URL_UNPOOLED;
if (!connectionString) throw new Error('DATABASE_URL_UNPOOLED is required for migrations');
if (new URL(connectionString).hostname.includes('-pooler')) throw new Error('Migrations require a direct connection');
const client = new pg.Client({ connectionString, connectionTimeoutMillis: 15000 });
try {
  await client.connect();
  await client.query('BEGIN');
  await client.query("SELECT pg_advisory_xact_lock(hashtext('mavi-website-migrations'))");
  await client.query(`CREATE TABLE IF NOT EXISTS public.mavi_website_migrations (
    name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
  )`);
  const directory = resolve(root, 'db/migrations');
  for (const name of (await readdir(directory)).filter((f) => f.endsWith('.sql')).sort()) {
    const sql = await readFile(resolve(directory, name), 'utf8');
    const checksum = createHash('sha256').update(sql).digest('hex');
    const { rows } = await client.query('SELECT checksum FROM public.mavi_website_migrations WHERE name = $1', [name]);
    if (rows.length) {
      if (rows[0].checksum !== checksum) throw new Error(`Applied migration changed: ${name}`);
      console.log(`Already applied: ${name}`);
      continue;
    }
    await client.query(sql);
    await client.query('INSERT INTO public.mavi_website_migrations (name, checksum) VALUES ($1, $2)', [name, checksum]);
    console.log(`Applied: ${name}`);
  }
  await client.query('COMMIT');
  console.log('Website database migrations complete.');
} catch (error) {
  await client.query('ROLLBACK').catch(() => {});
  // Driver errors can contain connection details; print the SQL error, never the URL.
  console.error('Migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
