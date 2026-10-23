import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));

export function loadEnv() {
  // loadEnvFile preserves variables already supplied by the hosting runtime.
  for (const file of ['.env.local', '.env']) {
    const path = resolve(root, file);
    if (existsSync(path)) process.loadEnvFile(path);
  }
}
