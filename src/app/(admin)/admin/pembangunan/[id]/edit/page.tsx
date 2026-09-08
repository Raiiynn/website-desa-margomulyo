import React from 'react';
import { getProjectById } from '@/server/admin-actions';
import { notFound } from 'next/navigation';
import { EditProjectForm } from './EditProjectForm';

interface Props { params: Promise<{ id: string }> }

export default async function EditPembangunanPage({ params }: Props) {
  const { id } = await params;
  let project;
  try { project = await getProjectById(id); } catch {
    return <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800"><strong>Database belum terhubung.</strong></div>;
  }
  if (!project) notFound();
  return <EditProjectForm project={project} />;
}
