import React from 'react';
import { getServiceById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { EditServiceForm } from './EditServiceForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditLayananPage({ params }: Props) {
  const { id } = await params;
  let service;

  try {
    service = await getServiceById(id);
  } catch {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
        <strong>Database belum terhubung.</strong>
      </div>
    );
  }

  if (!service) notFound();

  return <EditServiceForm service={service} />;
}
