import { NextResponse } from 'next/server';

/**
 * Liveness probe.
 *
 * Establishes the `api` segment and gives deployment a check that does not
 * depend on any page rendering. Reports only that the process is up — it
 * deliberately exposes no version, environment, dependency or database
 * state, per MASTER_PROMPT.md §28 (never leak internals to callers).
 *
 * A readiness probe that checks the database arrives with the data layer
 * in Phase 2.
 */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    { status: 'ok' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
