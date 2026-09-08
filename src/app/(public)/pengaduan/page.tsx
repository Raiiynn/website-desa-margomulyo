import React from 'react';
import type { Metadata } from 'next';
import { listPadukuhan } from '@/server/queries/padukuhan';
import { getPublicSettings } from '@/server/queries/profile';
import { PengaduanView } from './PengaduanView';

/**
 * Server shell for the complaint page.
 *
 * This milestone supplies the padukuhan options and contact settings from the
 * database. The form itself remains a non-functional shell: submission,
 * persistence and tracking are the Phase 8 complaint workflow, not this one.
 */

export const metadata: Metadata = {
  title: 'Pengaduan & Aspirasi',
};

export const revalidate = 300;

export default async function PengaduanPage() {
  const [padukuhan, settings] = await Promise.all([
    listPadukuhan(),
    getPublicSettings(),
  ]);

  return <PengaduanView PADUKUHAN={padukuhan} settings={settings} />;
}
