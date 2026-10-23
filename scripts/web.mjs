import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { cp } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { root, loadEnv } from './env.mjs';

loadEnv();
const require = createRequire(resolve(root, 'apps/web-main/package.json'));
const mode = process.argv[2];
if (!['dev', 'build', 'start'].includes(mode)) throw new Error('Unknown web command');
const appRoot = resolve(root, 'apps/web-main');
const standalone = resolve(appRoot, '.next/standalone/apps/web-main');
let args;
const env = { ...process.env };
if (mode === 'start') {
  const { values } = parseArgs({ args: process.argv.slice(3), options: {
    port: { type: 'string', short: 'p', default: process.env.PORT || '3000' },
    hostname: { type: 'string', short: 'H', default: '127.0.0.1' },
  } });
  env.PORT = values.port;
  env.HOSTNAME = values.hostname;
  args = [resolve(standalone, 'server.js')];
} else {
  args = [require.resolve('next/dist/bin/next'), mode, ...process.argv.slice(3)];
}
const child = spawn(process.execPath, args, {
  cwd: appRoot,
  env,
  stdio: 'inherit',
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', async (code) => {
  if (mode === 'build' && code === 0) {
    try {
      await cp(resolve(appRoot, '.next/static'), resolve(standalone, '.next/static'), { recursive: true });
      await cp(resolve(appRoot, 'public'), resolve(standalone, 'public'), { recursive: true });
      console.log('Standalone website assets ready.');
    } catch (error) {
      console.error('Unable to prepare standalone assets:', error.message);
      process.exit(1);
    }
  }
  process.exit(code ?? 1);
});
