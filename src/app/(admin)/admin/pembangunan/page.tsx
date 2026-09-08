import React from 'react';
import Link from 'next/link';
import { getProjectList } from '@/server/admin-actions';
import { AdminTable, EditButton, StatusBadge } from '@/components/admin/AdminTable';
import { DeleteProjectButton } from './DeleteProjectButton';

export default async function AdminPembangunanPage() {
  let projects: Awaited<ReturnType<typeof getProjectList>> = [];
  let dbError = false;
  try { projects = await getProjectList(); } catch { dbError = true; }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Proyek Pembangunan</h1>
          <p className="text-sm text-text-muted mt-1">Kelola proyek pembangunan fisik dan infrastruktur desa.</p>
        </div>
        <Link href="/admin/pembangunan/tambah" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#0f6bb0] transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Proyek
        </Link>
      </div>

      {dbError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>
      ) : (
        <AdminTable
          columns={[
            { key: 'title', label: 'Nama Proyek', render: (item) => (
              <div>
                <span className="font-semibold text-text-strong block">{item.title}</span>
                <span className="text-xs text-text-muted">{item.code} • {item.locationLabel}</span>
              </div>
            )},
            { key: 'physicalProgress', label: 'Progres', render: (item) => (
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-blue-700 rounded-full" style={{ width: `${item.physicalProgress}%` }} />
                </div>
                <span className="text-xs font-medium">{item.physicalProgress}%</span>
              </div>
            )},
            { key: 'status', label: 'Status', render: (item) => <StatusBadge status={item.status} /> },
            { key: 'publishStatus', label: 'Publikasi', render: (item) => <StatusBadge status={item.publishStatus} /> },
          ]}
          data={projects}
          keyField="id"
          emptyMessage="Belum ada proyek pembangunan."
          actions={(item) => (
            <>
              <EditButton href={`/admin/pembangunan/${item.id}/edit`} />
              <DeleteProjectButton id={item.id} title={item.title} />
            </>
          )}
        />
      )}
    </div>
  );
}
