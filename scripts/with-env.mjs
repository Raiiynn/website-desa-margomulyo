#!/usr/bin/env node
/**
 * Run a command with the project's local environment loaded.
 *
 * Next.js reads `.env.local`; the Prisma CLI reads only `.env`. After the
 * environment file was renamed to `.env.local`, every Prisma command failed
 * with `P1012: Environment variable not found: DIRECT_URL`.
 *
 * This wrapper loads whichever file exists — `.env.local` first, then `.env`
 * — and execs the command with that environment. It keeps a single source of
 * truth for secrets instead of duplicating them into a second file, and adds
 * no dependency: `process.loadEnvFile` is built into Node 20.12+.
 *
 * Usage:  node scripts/with-env.mjs prisma migrate deploy
 */

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, join } from 'node:path';

const candidates = ['.env.local', '.env'];
const loaded = [];

for (const file of candidates) {
  if (existsSync(file)) {
    process.loadEnvFile(file);
    loaded.push(file);
  }
}

if (loaded.length === 0) {
  console.error(
    'No environment file found. Expected .env.local or .env in the project root.\n' +
      'Copy .env.example and fill in the values — it is gitignored.',
  );
  process.exit(1);
}

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error('Usage: node scripts/with-env.mjs <command> [args...]');
  process.exit(1);
}

// Make locally installed binaries (prisma, tsx) resolvable without npx.
const binDir = join(process.cwd(), 'node_modules', '.bin');
const env = { ...process.env, PATH: `${binDir}${delimiter}${process.env.PATH ?? ''}` };

const child = spawn(command, args, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env,
});
child.on('exit', (code, signal) => {
  process.exit(signal ? 1 : (code ?? 0));
});
