import 'server-only';

import type { Prisma } from '@prisma/client';

/**
 * Boundary helpers between Prisma rows and the plain objects the UI receives.
 *
 * Two database types do not survive the server/client boundary intact:
 *
 *   * `Decimal` (Prisma's decimal.js instance) is not serialisable by React's
 *     server-component payload, and converting it to a JS number would lose
 *     precision on rupiah figures — Rp 3.910.850.000 is fine, but rounding
 *     anywhere in a budget is unacceptable in a transparency portal.
 *     It is converted to a STRING, preserving the exact value.
 *
 *   * `Date` is serialisable but ambiguous across timezones. Dates that
 *     represent a calendar day are converted to `YYYY-MM-DD`.
 *
 * Formatting for display (thousands separators, "Rp", Indonesian month names)
 * is a presentation concern and belongs in the UI, not here.
 */

/** Exact decimal string, e.g. "3910850000.00". Never a float. */
export function decimalToString(value: Prisma.Decimal): string {
  return value.toFixed(2);
}

export function optionalDecimalToString(
  value: Prisma.Decimal | null,
): string | null {
  return value === null ? null : decimalToString(value);
}

/** Calendar day as YYYY-MM-DD, timezone-independent. */
export function dateToIsoDay(value: Date): string {
  return value.toISOString().slice(0, 10);
}

export function optionalDateToIsoDay(value: Date | null): string | null {
  return value === null ? null : dateToIsoDay(value);
}

/** Full instant as an ISO-8601 string. */
export function dateToIso(value: Date): string {
  return value.toISOString();
}

export function optionalDateToIso(value: Date | null): string | null {
  return value === null ? null : dateToIso(value);
}
