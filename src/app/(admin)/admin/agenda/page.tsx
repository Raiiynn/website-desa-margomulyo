import React from 'react';
import Link from 'next/link';
import { getAgendaList } from '@/server/admin-actions';
import { AdminTable, EditButton, StatusBadge } from '@/components/admin/AdminTable';
import { DeleteAgendaButton } from './DeleteAgendaButton';

export default async function AdminAgendaPage() {
  let agenda: Awaited<ReturnType<typeof getAgendaList>> = [];
  let dbError = false;

  try {
    agenda = await getAgendaList();
  } catch {
    dbError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-navy-900">Agenda Kegiatan</h1>
          <p className="text-sm text-text-muted mt-1">Kelola jadwal kegiatan dan acara kalurahan.</p>
        </div>
        <Link
          href="/admin/agenda/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#0f6bb0] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Tambah Agenda
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
              key: 'title',
              label: 'Kegiatan',
              render: (item) => (
                <div>
                  <span className="font-semibold text-text-strong block">{item.title}</span>
                  {item.label && <span className="text-xs text-blue-700 font-medium">{item.label}</span>}
                </div>
              ),
            },
            {
              key: 'startsAt',
              label: 'Tanggal',
              render: (item) => (
                <span className="text-xs text-text-muted">
                  {new Date(item.startsAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              ),
            },
            {
              key: 'location',
              label: 'Lokasi',
              render: (item) => <span className="text-xs">{item.location ?? '—'}</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (item) => <StatusBadge status={item.status} />,
            },
          ]}
          data={agenda}
          keyField="id"
          emptyMessage="Belum ada agenda. Klik 'Tambah Agenda' untuk membuat yang pertama."
          actions={(item) => (
            <>
              <EditButton href={`/admin/agenda/${item.id}/edit`} />
              <DeleteAgendaButton id={item.id} title={item.title} />
            </>
          )}
        />
      )}
    </div>
  );
}
