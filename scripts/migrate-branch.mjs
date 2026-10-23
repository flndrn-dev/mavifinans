import { execFileSync } from 'node:child_process';

const branch = process.argv[2];
if (!branch || branch === 'production') throw new Error('Supply a temporary branch name');
// Capture the credential directly into process memory; never print it.
const url = execFileSync('neon', ['connection-string', branch, '--project-id', 'dry-cherry-00355609'],
  { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
if (!url.startsWith('postgres')) throw new Error('No Postgres connection string returned');
process.env.MIGRATION_DATABASE_URL = url;
console.log(`Testing migration on isolated branch: ${branch}`);
await import('./migrate.mjs');
