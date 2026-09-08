/**
 * Reader for the public site-settings record.
 *
 * Deliberately NOT server-only: it is a pure lookup over a plain object
 * with no database dependency. Client views that receive the settings
 * record as a prop use the same reader, so `getSetting('contact.phone')`
 * reads identically on both sides of the boundary.
 *
 * Pages fetch settings once with `getPublicSettings()` and wrap the result in
 * this reader, which keeps call sites reading as `getSetting('village.name')`
 * rather than threading a record through every component.
 *
 * The fallback is a rendering safeguard, not a content source: it keeps a page
 * from collapsing if a key is absent. It is deliberately NOT a place to put
 * Margomulyo facts — every value the pages request is seeded from
 * docs/SOURCE_DATA.md, and `tests/settings-contract.test.ts` fails if a key a
 * page asks for is missing from the seed. Divergence therefore breaks CI
 * instead of silently rendering a hardcoded string in production.
 */
export function settingReader(
  settings: Record<string, string>,
): (key: string, fallback?: string) => string {
  return (key, fallback = '') => settings[key] ?? fallback;
}
