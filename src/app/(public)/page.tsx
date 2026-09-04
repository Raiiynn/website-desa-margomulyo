import { PRIMARY_NAV, SITE_SUBTITLE, SITE_TITLE } from '@/lib/site';

/**
 * Scaffold placeholder for the homepage.
 *
 * This is NOT the Beranda described in docs/DESIGN_REFERENCE.md §3 — that
 * is built in Phase 5. It exists so the route tree resolves and the
 * production build passes at the end of Phase 1.
 *
 * It deliberately presents no government content: no statistics, no
 * officials, no budget figures, no services. Under docs/SOURCE_DATA.md §6
 * such values may only come from verified records, which do not exist
 * until Phase 2.
 */
export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-xs font-medium uppercase tracking-widest text-blue-700">
        {SITE_SUBTITLE}
      </p>
      <h1 className="mt-3 font-serif text-4xl text-navy-900">{SITE_TITLE}</h1>
      <p className="mt-4 text-text-body">
        Fondasi aplikasi telah disiapkan. Halaman publik dibangun pada tahap
        berikutnya sesuai <code>FULL_BUILD.md</code>.
      </p>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-text-strong">
        Rute publik terencana
      </h2>
      <ul className="mt-3 space-y-1 text-sm text-text-muted">
        {PRIMARY_NAV.map((item) => (
          <li key={item.href}>
            <span className="text-text-strong">{item.label}</span>{' '}
            <code className="text-text-muted">{item.href}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
