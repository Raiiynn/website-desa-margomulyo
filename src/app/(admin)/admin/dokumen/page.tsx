import React from 'react';
import Link from 'next/link';
import { getDocumentList } from '@/server/admin-actions';
import { AdminTable, EditButton, StatusBadge } from '@/components/admin/AdminTable';
import { DeleteDocumentButton } from './DeleteDocumentButton';

export default async function AdminDokumenPage() {
  let documents: Awaited<ReturnType<typeof getDocumentList>> = [];
  let dbError = false;
  try { documents = await getDocumentList(); } catch { dbError = true; }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Dokumen Resmi</h1>
          <p className="text-sm text-text-muted mt-1">Kelola dokumen regulasi, laporan, dan peraturan kalurahan.</p>
        </div>
        <Link href="/admin/dokumen/tambah" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#0f6bb0] transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Dokumen
        </Link>
      </div>

      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>
      ) : (
        <AdminTable
          columns={[
            { key: 'title', label: 'Judul Dokumen', render: (item) => (
              <div>
                <span className="font-semibold text-text-strong block">{item.title}</span>
                <span className="text-xs text-text-muted">{item.category}</span>
              </div>
            )},
            { key: 'year', label: 'Tahun', render: (item) => <span className="text-xs">{item.year ?? '—'}</span> },
            { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
          ]}
          data={documents}
          keyField="id"
          emptyMessage="Belum ada dokumen."
          actions={(item) => (
            <>
              <EditButton href={`/admin/dokumen/${item.id}/edit`} />
              <DeleteDocumentButton id={item.id} title={item.title} />
            </>
          )}
        />
      )}
    </div>
  );
}
