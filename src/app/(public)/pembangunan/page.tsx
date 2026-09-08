import React from 'react';
import type { Metadata } from 'next';
import { listPublishedProjects } from '@/server/queries/transparency';
import { PembangunanView } from './PembangunanView';

/**
 * Server shell for the development-project list.
 *
 * listPublishedProjects filters on publishStatus, so unpublished projects
 * never reach the client bundle — the status filter in the view is a
 * lifecycle filter (PLANNED / IN_PROGRESS / COMPLETED), not a publication one.
 */

export const metadata: Metadata = {
  title: 'Pembangunan Desa',
};

export const revalidate = 300;

export default async function PembangunanPage() {
  const projects = await listPublishedProjects();
  return <PembangunanView DEVELOPMENT_PROJECTS={projects} />;
}
