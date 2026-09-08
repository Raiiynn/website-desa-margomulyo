import React from 'react';
import { getAgendaById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { EditAgendaForm } from './EditAgendaForm';

interface Props { params: Promise<{ id: string }> }

export default async function EditAgendaPage({ params }: Props) {
  const { id } = await params;
  let agenda;
  try { agenda = await getAgendaById(id); } catch {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>;
  }
  if (!agenda) notFound();
  return <EditAgendaForm agenda={agenda} />;
}
