import React from 'react';
import Link from 'next/link';
import { getComplaintList } from '@/server/admin-actions';
import { AdminTable, StatusBadge } from '@/components/admin/AdminTable';

export default async function AdminPengaduanPage() {
  let complaints: Awaited<ReturnType<typeof getComplaintList>> = [];
  let dbError = false;
  try { complaints = await getComplaintList(); } catch { dbError = true; }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-navy-900">Pengaduan Warga</h1>
        <p className="text-sm text-text-muted mt-1">Kelola dan tindak lanjuti aduan serta aspirasi masyarakat.</p>
      </div>

      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>
      ) : (
        <AdminTable
          columns={[
            { key: 'reference', label: 'No. Referensi', render: (item) => (
              <span className="font-mono text-xs font-semibold text-navy-900">{item.reference}</span>
            )},
            { key: 'reporterName', label: 'Pelapor', render: (item) => (
              <div>
                <span className="text-sm font-medium text-text-strong block">{item.reporterName}</span>
                <span className="text-xs text-text-muted">{item.kind === 'PENGADUAN' ? 'Pengaduan' : 'Aspirasi'}</span>
              </div>
            )},
            { key: 'message', label: 'Pesan', render: (item) => (
              <span className="text-xs text-text-body line-clamp-2 max-w-xs block">{item.message}</span>
            )},
            { key: 'padukuhan', label: 'Padukuhan', render: (item) => (
              <span className="text-xs">{item.padukuhan?.name ?? '—'}</span>
            )},
            { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
            { key: 'createdAt', label: 'Tanggal', render: (item) => (
              <span className="text-xs text-text-muted">
                {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )},
          ]}
          data={complaints}
          keyField="id"
          emptyMessage="Belum ada pengaduan masuk."
          actions={(item) => (
            <Link
              href={`/admin/pengaduan/${item.id}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-700/10 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              Detail
            </Link>
          )}
        />
      )}
    </div>
  );
}
