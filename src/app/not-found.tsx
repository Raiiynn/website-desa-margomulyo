import Link from 'next/link';

/**
 * Global 404.
 *
 * FULL_BUILD.md §25 requires every important surface to handle its states
 * in clear Indonesian without exposing internals. This is the minimum
 * viable version; it is restyled with the design system in Phase 4.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-blue-700">
        Kesalahan 404
      </p>
      <h1 className="mt-3 font-serif text-3xl text-navy-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 text-text-body">
        Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-blue-700 underline underline-offset-4"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
