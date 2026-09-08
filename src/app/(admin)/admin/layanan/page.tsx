import React from 'react';
import Link from 'next/link';
import { getServiceList } from '@/server/admin-actions';
import { AdminTable, EditButton, StatusBadge } from '@/components/admin/AdminTable';
import { DeleteServiceButton } from './DeleteServiceButton';

export default async function AdminLayananPage() {
  let services: Awaited<ReturnType<typeof getServiceList>> = [];
  let dbError = false;

  try {
    services = await getServiceList();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Layanan Publik</h1>
          <p className="text-sm text-text-muted mt-1">Kelola layanan administrasi kependudukan dan surat menyurat.</p>
        </div>
        <Link
          href="/admin/layanan/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#0f6bb0] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Layanan
        </Link>
      </div>

      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          <strong>Database belum terhubung.</strong> Pastikan <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> sudah diisi.
        </div>
      ) : (
        <AdminTable
          columns={[
            {
              key: 'name',
              label: 'Nama Layanan',
              render: (item) => (
                <div>
                  <span className="font-semibold text-text-strong block">{item.name}</span>
                  <span className="text-xs text-text-muted">{item.code ?? '—'}</span>
                </div>
              ),
            },
            {
              key: 'duration',
              label: 'Waktu Proses',
              render: (item) => <span className="text-xs">{item.duration}</span>,
            },
            {
              key: 'method',
              label: 'Metode',
              render: (item) => <span className="text-xs">{item.method}</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (item) => <StatusBadge status={item.status} />,
            },
          ]}
          data={services}
          keyField="id"
          emptyMessage="Belum ada layanan. Klik 'Tambah Layanan' untuk membuat yang pertama."
          actions={(item) => (
            <>
              <EditButton href={`/admin/layanan/${item.id}/edit`} />
              <DeleteServiceButton id={item.id} name={item.name} />
            </>
          )}
        />
      )}
    </div>
  );
}
