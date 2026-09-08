/**
 * Indonesian presentation formatters.
 *
 * These are static configuration, not content: they carry no Margomulyo fact
 * and are governed by no source document. They live outside `src/data` and
 * outside `src/server` because both server components and client components
 * need them, and neither the seed data nor the database should be a dependency
 * of a number formatter.
 *
 * Money arrives here as an exact decimal STRING from `src/server/serialize.ts`.
 * It is parsed only at the moment of display and never earlier: a transparency
 * portal that rounds a budget figure in transit is worse than one that shows
 * nothing.
 */

/** Full rupiah, no decimals: "Rp 3.842.150.000". */
export function formatRupiah(amountString: string | null): string {
  if (!amountString) return 'Rp 0';
  const num = Number.parseFloat(amountString);
  if (Number.isNaN(num)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/** Abbreviated rupiah for headline figures: "Rp 3,84 Miliar". */
export function formatCompactRupiah(amountString: string | null): string {
  if (!amountString) return 'Rp 0';
  const num = Number.parseFloat(amountString);
  if (Number.isNaN(num)) return 'Rp 0';
  if (num >= 1_000_000_000) {
    return `Rp ${(num / 1_000_000_000).toLocaleString('id-ID', { maximumFractionDigits: 2 })} Miliar`;
  }
  if (num >= 1_000_000) {
    return `Rp ${(num / 1_000_000).toLocaleString('id-ID', { maximumFractionDigits: 0 })} Juta`;
  }
  return formatRupiah(amountString);
}

/** Thousands separators: 14384 -> "14.384". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

/**
 * "1 September 2026" from an ISO string.
 *
 * Returns the input unchanged when it is not a parseable date, so a bad value
 * is visible rather than silently rendered as "Invalid Date".
 */
export function formatDateIndonesian(dateString: string): string {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}
