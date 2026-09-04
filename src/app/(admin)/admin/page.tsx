/**
 * Scaffold placeholder for the administrative dashboard.
 *
 * The real back-office is Phase 9. This route exists so the (admin) group
 * resolves and so Phase 3 has a concrete target to protect.
 *
 * It renders no data and performs no queries.
 */
export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl text-navy-900">Dasbor Admin</h1>
      <p className="mt-4 text-text-body">
        Fondasi rute administratif telah disiapkan. Autentikasi dan otorisasi
        dipasang pada Fase 3; modul dasbor dibangun pada Fase 9.
      </p>
      <p className="mt-4 text-sm text-text-muted">
        Rute ini belum terlindungi dan belum memuat data apa pun.
      </p>
    </div>
  );
}
