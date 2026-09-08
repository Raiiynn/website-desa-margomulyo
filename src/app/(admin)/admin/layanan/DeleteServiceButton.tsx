'use client';

import { DeleteConfirmDialog } from '@/components/admin/DeleteConfirmDialog';
import { deleteService } from '@/server/admin-actions';
import { useRouter } from 'next/navigation';

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();

  return (
    <DeleteConfirmDialog
      itemLabel={name}
      onConfirm={async () => {
        await deleteService(id);
        router.refresh();
      }}
    >
      <button className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        Hapus
      </button>
    </DeleteConfirmDialog>
  );
}
