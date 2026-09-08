import React from 'react';
import Link from 'next/link';
import { getNewsList } from '@/server/admin-actions';
import { AdminTable, EditButton, StatusBadge } from '@/components/admin/AdminTable';
import { DeleteNewsButton } from './DeleteNewsButton';

export default async function AdminBeritaPage() {
  let news: Awaited<ReturnType<typeof getNewsList>> = [];
  let dbError = false;

  try {
    news = await getNewsList();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Kabar Kalurahan</h1>
          <p className="text-sm text-text-muted mt-1">Kelola berita, pengumuman, dan warta resmi desa.</p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#0f6bb0] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Berita
        </Link>
      </div>

      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
          <strong>Database belum terhubung.</strong> Pastikan <code className="bg-amber-100 px-1 rounded">DATABASE_URL</code> di <code className="bg-amber-100 px-1 rounded">.env.local</code> sudah diisi dan migration sudah dijalankan.
        </div>
      ) : (
        <AdminTable
          columns={[
            {
              key: 'title',
              label: 'Judul',
              render: (item) => (
                <div>
                  <span className="font-semibold text-text-strong block">{item.title}</span>
                  <span className="text-xs text-text-muted">{item.slug}</span>
                </div>
              ),
            },
            {
              key: 'category',
              label: 'Kategori',
              render: (item) => (
                <span className="text-xs font-medium text-blue-700">{item.category.name}</span>
              ),
            },
            {
              key: 'status',
              label: 'Status',
              render: (item) => <StatusBadge status={item.status} />,
            },
            {
              key: 'createdAt',
              label: 'Dibuat',
              render: (item) => (
                <span className="text-xs text-text-muted">
                  {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              ),
            },
          ]}
          data={news}
          keyField="id"
          emptyMessage="Belum ada berita. Klik 'Tambah Berita' untuk membuat yang pertama."
          actions={(item) => (
            <>
              <EditButton href={`/admin/berita/${item.id}/edit`} />
              <DeleteNewsButton id={item.id} title={item.title} />
            </>
          )}
        />
      )}
    </div>
  );
}
