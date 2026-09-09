'use server';

import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import type { ContentStatus, ComplaintStatus, ProjectStatus, DocumentCategory } from '@prisma/client';

// ============================================================================
// BERITA (News)
// ============================================================================

export async function getNewsList() {
  return db.news.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });
}

export async function getNewsById(id: string) {
  return db.news.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getNewsCategories() {
  return db.newsCategory.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function createNews(formData: FormData) {
  const slug = String(formData.get('slug'));
  const title = String(formData.get('title'));
  const excerpt = String(formData.get('excerpt'));
  const body = String(formData.get('body'));
  const categoryId = String(formData.get('categoryId'));
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';
  const bylineLabel = formData.get('bylineLabel') as string | null;

  await db.news.create({
    data: {
      slug,
      title,
      excerpt,
      body,
      categoryId,
      status,
      bylineLabel: bylineLabel || null,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  });

  revalidatePath('/admin/berita');
  revalidatePath('/berita');
}

export async function updateNews(id: string, formData: FormData) {
  const title = String(formData.get('title'));
  const excerpt = String(formData.get('excerpt'));
  const body = String(formData.get('body'));
  const categoryId = String(formData.get('categoryId'));
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';
  const bylineLabel = formData.get('bylineLabel') as string | null;

  const existing = await db.news.findUnique({ where: { id } });

  await db.news.update({
    where: { id },
    data: {
      title,
      excerpt,
      body,
      categoryId,
      status,
      bylineLabel: bylineLabel || null,
      // Omit the key entirely (rather than set it to `undefined`) when the
      // article isn't newly publishing, so Prisma leaves the existing
      // publishedAt untouched instead of the update carrying an
      // unassignable `undefined` under exactOptionalPropertyTypes.
      ...(status === 'PUBLISHED' && existing?.publishedAt === null
        ? { publishedAt: new Date() }
        : {}),
    },
  });

  revalidatePath('/admin/berita');
  revalidatePath('/berita');
}

export async function deleteNews(id: string) {
  await db.news.delete({ where: { id } });
  revalidatePath('/admin/berita');
  revalidatePath('/berita');
}

// ============================================================================
// LAYANAN (Services)
// ============================================================================

export async function getServiceList() {
  return db.service.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { category: true },
  });
}

export async function getServiceById(id: string) {
  return db.service.findUnique({
    where: { id },
    include: { category: true },
  });
}

export async function getServiceCategories() {
  return db.serviceCategory.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function createService(formData: FormData) {
  const slug = String(formData.get('slug'));
  const name = String(formData.get('name'));
  const description = String(formData.get('description'));
  const requirements = String(formData.get('requirements'));
  const duration = String(formData.get('duration'));
  const output = String(formData.get('output'));
  const method = String(formData.get('method'));
  const categoryId = String(formData.get('categoryId'));
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';
  const code = formData.get('code') as string | null;
  const badge = formData.get('badge') as string | null;

  const maxSort = await db.service.aggregate({ _max: { sortOrder: true } });

  await db.service.create({
    data: {
      slug,
      name,
      description,
      requirements,
      duration,
      output,
      method,
      categoryId,
      status,
      code: code || null,
      badge: badge || null,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
  });

  revalidatePath('/admin/layanan');
  revalidatePath('/layanan');
}

export async function updateService(id: string, formData: FormData) {
  const name = String(formData.get('name'));
  const description = String(formData.get('description'));
  const requirements = String(formData.get('requirements'));
  const duration = String(formData.get('duration'));
  const output = String(formData.get('output'));
  const method = String(formData.get('method'));
  const categoryId = String(formData.get('categoryId'));
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';
  const code = formData.get('code') as string | null;
  const badge = formData.get('badge') as string | null;

  await db.service.update({
    where: { id },
    data: {
      name,
      description,
      requirements,
      duration,
      output,
      method,
      categoryId,
      status,
      code: code || null,
      badge: badge || null,
    },
  });

  revalidatePath('/admin/layanan');
  revalidatePath('/layanan');
}

export async function deleteService(id: string) {
  await db.service.delete({ where: { id } });
  revalidatePath('/admin/layanan');
  revalidatePath('/layanan');
}

// ============================================================================
// AGENDA
// ============================================================================

export async function getAgendaList() {
  return db.agenda.findMany({
    orderBy: { startsAt: 'desc' },
  });
}

export async function getAgendaById(id: string) {
  return db.agenda.findUnique({ where: { id } });
}

export async function createAgenda(formData: FormData) {
  const slug = String(formData.get('slug'));
  const title = String(formData.get('title'));
  const description = formData.get('description') as string | null;
  const label = formData.get('label') as string | null;
  const startsAt = new Date(String(formData.get('startsAt')));
  const endsAtRaw = formData.get('endsAt') as string | null;
  const location = formData.get('location') as string | null;
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';

  await db.agenda.create({
    data: {
      slug,
      title,
      description: description || null,
      label: label || null,
      startsAt,
      endsAt: endsAtRaw ? new Date(endsAtRaw) : null,
      location: location || null,
      status,
    },
  });

  revalidatePath('/admin/agenda');
  revalidatePath('/agenda');
}

export async function updateAgenda(id: string, formData: FormData) {
  const title = String(formData.get('title'));
  const description = formData.get('description') as string | null;
  const label = formData.get('label') as string | null;
  const startsAt = new Date(String(formData.get('startsAt')));
  const endsAtRaw = formData.get('endsAt') as string | null;
  const location = formData.get('location') as string | null;
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';

  await db.agenda.update({
    where: { id },
    data: {
      title,
      description: description || null,
      label: label || null,
      startsAt,
      endsAt: endsAtRaw ? new Date(endsAtRaw) : null,
      location: location || null,
      status,
    },
  });

  revalidatePath('/admin/agenda');
  revalidatePath('/agenda');
}

export async function deleteAgenda(id: string) {
  await db.agenda.delete({ where: { id } });
  revalidatePath('/admin/agenda');
  revalidatePath('/agenda');
}

// ============================================================================
// DOKUMEN (Documents)
// ============================================================================

export async function getDocumentList() {
  return db.document.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getDocumentById(id: string) {
  return db.document.findUnique({ where: { id } });
}

export async function createDocument(formData: FormData) {
  const slug = String(formData.get('slug'));
  const title = String(formData.get('title'));
  const category = formData.get('category') as DocumentCategory;
  const categoryLabel = formData.get('categoryLabel') as string | null;
  const yearRaw = formData.get('year') as string | null;
  const description = formData.get('description') as string | null;
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';

  await db.document.create({
    data: {
      slug,
      title,
      category,
      categoryLabel: categoryLabel || null,
      year: yearRaw ? parseInt(yearRaw, 10) : null,
      description: description || null,
      status,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  });

  revalidatePath('/admin/dokumen');
  revalidatePath('/dokumen');
}

export async function updateDocument(id: string, formData: FormData) {
  const title = String(formData.get('title'));
  const category = formData.get('category') as DocumentCategory;
  const categoryLabel = formData.get('categoryLabel') as string | null;
  const yearRaw = formData.get('year') as string | null;
  const description = formData.get('description') as string | null;
  const status = (formData.get('status') as ContentStatus) || 'DRAFT';

  await db.document.update({
    where: { id },
    data: {
      title,
      category,
      categoryLabel: categoryLabel || null,
      year: yearRaw ? parseInt(yearRaw, 10) : null,
      description: description || null,
      status,
    },
  });

  revalidatePath('/admin/dokumen');
  revalidatePath('/dokumen');
}

export async function deleteDocument(id: string) {
  await db.document.delete({ where: { id } });
  revalidatePath('/admin/dokumen');
  revalidatePath('/dokumen');
}

// ============================================================================
// PEMBANGUNAN (Development Projects)
// ============================================================================

export async function getProjectList() {
  return db.developmentProject.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProjectById(id: string) {
  return db.developmentProject.findUnique({ where: { id } });
}

export async function createProject(formData: FormData) {
  const code = String(formData.get('code'));
  const slug = String(formData.get('slug'));
  const title = String(formData.get('title'));
  const description = String(formData.get('description'));
  const fiscalYear = parseInt(String(formData.get('fiscalYear')), 10);
  const locationLabel = String(formData.get('locationLabel'));
  const budgetAmount = String(formData.get('budgetAmount'));
  const fundingSourceLabel = String(formData.get('fundingSourceLabel'));
  const status = (formData.get('status') as ProjectStatus) || 'PLANNED';
  const physicalProgress = parseInt(String(formData.get('physicalProgress') || '0'), 10);
  const publishStatus = (formData.get('publishStatus') as ContentStatus) || 'DRAFT';

  await db.developmentProject.create({
    data: {
      code,
      slug,
      title,
      description,
      fiscalYear,
      locationLabel,
      budgetAmount,
      fundingSourceLabel,
      status,
      physicalProgress,
      publishStatus,
    },
  });

  revalidatePath('/admin/pembangunan');
  revalidatePath('/pembangunan');
}

export async function updateProject(id: string, formData: FormData) {
  const title = String(formData.get('title'));
  const description = String(formData.get('description'));
  const locationLabel = String(formData.get('locationLabel'));
  const budgetAmount = String(formData.get('budgetAmount'));
  const fundingSourceLabel = String(formData.get('fundingSourceLabel'));
  const status = (formData.get('status') as ProjectStatus) || 'PLANNED';
  const physicalProgress = parseInt(String(formData.get('physicalProgress') || '0'), 10);
  const publishStatus = (formData.get('publishStatus') as ContentStatus) || 'DRAFT';

  await db.developmentProject.update({
    where: { id },
    data: {
      title,
      description,
      locationLabel,
      budgetAmount,
      fundingSourceLabel,
      status,
      physicalProgress,
      publishStatus,
    },
  });

  revalidatePath('/admin/pembangunan');
  revalidatePath('/pembangunan');
}

export async function deleteProject(id: string) {
  await db.developmentProject.delete({ where: { id } });
  revalidatePath('/admin/pembangunan');
  revalidatePath('/pembangunan');
}

// ============================================================================
// PENGADUAN (Complaints) — Read + Update status only
// ============================================================================

export async function getComplaintList() {
  return db.complaint.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      padukuhan: true,
      category: true,
    },
  });
}

export async function getComplaintById(id: string) {
  return db.complaint.findUnique({
    where: { id },
    include: {
      padukuhan: true,
      category: true,
      history: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function updateComplaintStatus(
  id: string,
  newStatus: ComplaintStatus,
  note?: string,
) {
  const complaint = await db.complaint.findUnique({ where: { id } });
  if (!complaint) throw new Error('Pengaduan tidak ditemukan.');

  await db.$transaction([
    db.complaint.update({
      where: { id },
      data: {
        status: newStatus,
        // The schema CHECK constraints require resolvedAt/closedAt to be
        // NULL unless the status justifies them (complaint_resolved_at_/
        // complaint_closed_at_requires_status). Moving a complaint back to
        // an earlier status — e.g. reopening a mistakenly-resolved one —
        // must clear these, not merely leave the previous values in place,
        // or the update violates the constraint. Preserve the original
        // timestamp rather than overwriting it if already set.
        resolvedAt:
          newStatus === 'RESOLVED' || newStatus === 'CLOSED'
            ? (complaint.resolvedAt ?? new Date())
            : null,
        closedAt:
          newStatus === 'CLOSED' ? (complaint.closedAt ?? new Date()) : null,
      },
    }),
    db.complaintStatusHistory.create({
      data: {
        complaintId: id,
        fromStatus: complaint.status,
        toStatus: newStatus,
        note: note || null,
      },
    }),
  ]);

  revalidatePath('/admin/pengaduan');
  revalidatePath(`/admin/pengaduan/${id}`);
}
