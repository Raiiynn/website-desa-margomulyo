import React from 'react';
import type { Metadata } from 'next';
import {
  listPublishedServices,
  listServiceCategories,
  listServiceProcedureSteps,
} from '@/server/queries/content';
import { getPublicSettings } from '@/server/queries/profile';
import { LayananView } from './LayananView';

/**
 * Server shell for the public-service directory.
 *
 * Settings are passed as a plain record rather than a reader function:
 * functions do not cross the server/client boundary, and the reader itself is
 * a pure lookup that the view reconstructs with the same helper.
 */

export const metadata: Metadata = {
  title: 'Layanan Publik',
};

export const revalidate = 300;

export default async function LayananPage() {
  const [services, categories, steps, settings] = await Promise.all([
    listPublishedServices(),
    listServiceCategories(),
    listServiceProcedureSteps(),
    getPublicSettings(),
  ]);

  const flattened = services.map((service) => ({
    slug: service.slug,
    code: service.code,
    badge: service.badge,
    name: service.name,
    description: service.description,
    requirements: service.requirements,
    duration: service.duration,
    output: service.output,
    method: service.method,
    categorySlug: service.category.slug,
  }));

  return (
    <LayananView
      SERVICES={flattened}
      SERVICE_CATEGORIES={categories}
      SERVICE_PROCEDURE_STEPS={steps}
      settings={settings}
    />
  );
}
