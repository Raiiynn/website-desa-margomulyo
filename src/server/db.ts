import 'server-only';

import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 *
 * `import 'server-only'` is the enforcement mechanism, not a comment: if any
 * client component ever pulls this module into its graph — directly or through
 * a re-export — the build fails rather than shipping database credentials and
 * query capability to the browser. That is the Phase 2 requirement that
 * "server-only data access cannot accidentally become client code", enforced
 * by the compiler instead of by review.
 *
 * Next.js hot-reloads modules in development, which would otherwise open a new
 * connection pool on every edit and exhaust Supabase's limit. Caching on
 * globalThis keeps one pool per process.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Queries are noisy and can contain citizen data; log only real problems.
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
