/**
 * Database seed — verified content only.
 *
 * Governed by docs/SOURCE_DATA.md. Every value written here appears in §3 of
 * that document; values in its conflict register (§4) and verification
 * register (§5) are written as NULL or not written at all.
 *
 * IDEMPOTENT. Every write is an upsert keyed on a natural unique field
 * (slug, code, number, key, fiscal year), so running the seed repeatedly
 * converges on the same state instead of duplicating rows. It is safe to run
 * against a database that already holds data.
 *
 * NOT seeded, deliberately:
 *   * User accounts. Identity is Supabase Auth's job (ADR-0002); a default
 *     administrator with a known password would be a standing credential.
 *   * Complaints. Citizen submissions are private real-world data; inventing
 *     example complaints would put fabricated citizen records in a
 *     government system.
 *   * Complaint categories. The field is verified, its options are not (V14).
 *   * Media. No files exist yet (V04, V16).
 */

import {
  type BudgetLineKind,
  ContentStatus,
  type OfficialKind,
  PrismaClient,
  type ProjectStatus,
  type RoleKey,
  type SettingType,
} from '@prisma/client';

import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from './seed-data/access';
import {
  AGENDA,
  NEWS,
  NEWS_CATEGORIES,
  SERVICE_CATEGORIES,
  SERVICE_CHANNELS,
  SERVICE_PROCEDURE_STEPS,
  SERVICES,
} from './seed-data/content';
import {
  LOCAL_POTENTIAL_CATEGORIES,
  LOCAL_POTENTIALS,
  UMKM,
} from './seed-data/potential';
import {
  BUDGET,
  BUDGET_CYCLE_STAGES,
  BUDGET_EXPENDITURE_ALLOCATION_LINES,
  BUDGET_EXPENDITURE_BIDANG_LINES,
  BUDGET_FINANCING_LINES,
  BUDGET_REALIZATION,
  BUDGET_REVENUE_LINES,
  DEVELOPMENT_PROJECTS,
  DOCUMENTS,
} from './seed-data/transparency';
import {
  DEMOGRAPHICS,
  EDUCATION_LEVELS,
  GOVERNANCE_PILLARS,
  INSTITUTIONS,
  LEADERSHIP_TERMS,
  MISSIONS,
  OCCUPATIONS,
  OFFICIALS,
  PADUKUHAN,
  RELIGIONS,
  SITE_SETTINGS,
  STATISTICS_REFERENCE_DATE,
  STATISTICS_SOURCE_LABEL,
} from './seed-data/village';

const db = new PrismaClient();

function log(step: string, count: number): void {
  process.stdout.write(`  ${step.padEnd(34)} ${String(count).padStart(3)}\n`);
}

async function seedAccess(): Promise<void> {
  for (const role of ROLES) {
    await db.role.upsert({
      where: { key: role.key as RoleKey },
      create: {
        key: role.key as RoleKey,
        name: role.name,
        rank: role.rank,
        description: role.description,
      },
      update: { name: role.name, rank: role.rank, description: role.description },
    });
  }
  log('roles', ROLES.length);

  for (const permission of PERMISSIONS) {
    await db.permission.upsert({
      where: { key: permission.key },
      create: permission,
      update: { description: permission.description, group: permission.group },
    });
  }
  log('permissions', PERMISSIONS.length);

  let grants = 0;
  for (const [roleKey, permissionKeys] of Object.entries(ROLE_PERMISSIONS)) {
    const role = await db.role.findUniqueOrThrow({ where: { key: roleKey as RoleKey } });
    // Replace the grant set so removing a permission from the source of truth
    // actually revokes it, rather than leaving a stale row behind.
    await db.rolePermission.deleteMany({ where: { roleId: role.id } });
    for (const key of permissionKeys) {
      const permission = await db.permission.findUniqueOrThrow({ where: { key } });
      await db.rolePermission.create({
        data: { roleId: role.id, permissionId: permission.id },
      });
      grants += 1;
    }
  }
  log('role permissions', grants);
}

async function seedTerritory(): Promise<void> {
  for (const p of PADUKUHAN) {
    const isHistoricalCore = 'isHistoricalCore' in p ? p.isHistoricalCore : false;
    await db.padukuhan.upsert({
      where: { number: p.number },
      create: {
        number: p.number,
        name: p.name,
        slug: p.slug,
        isHistoricalCore,
        potentialSummary: p.potentialSummary,
        // rwCount / rtCount stay NULL — conflict C05.
      },
      update: {
        name: p.name,
        slug: p.slug,
        isHistoricalCore,
        potentialSummary: p.potentialSummary,
      },
    });
  }
  log('padukuhan', PADUKUHAN.length);
}

async function seedGovernment(): Promise<void> {
  for (const o of OFFICIALS) {
    const existing = await db.governmentOfficial.findFirst({
      where: { positionTitle: o.positionTitle, padukuhanId: null },
    });
    const data = {
      kind: o.kind as OfficialKind,
      positionTitle: o.positionTitle,
      positionAlias: o.positionAlias,
      remit: o.remit,
      name: o.name,
      sortOrder: o.sortOrder,
      termStart: 'termStart' in o ? o.termStart : null,
      termEnd: 'termEnd' in o ? o.termEnd : null,
      internalNote: 'internalNote' in o ? o.internalNote : null,
    };
    if (existing === null) {
      await db.governmentOfficial.create({ data });
    } else {
      await db.governmentOfficial.update({ where: { id: existing.id }, data });
    }
  }
  log('officials (SOTK)', OFFICIALS.length);

  // One Dukuh position per padukuhan. Names are NULL: V01 records that the
  // source verifies the offices but names none of the 13 occupants.
  const padukuhanRows = await db.padukuhan.findMany({ orderBy: { number: 'asc' } });
  for (const p of padukuhanRows) {
    await db.governmentOfficial.upsert({
      where: { padukuhanId_kind: { padukuhanId: p.id, kind: 'DUKUH' } },
      create: {
        kind: 'DUKUH',
        positionTitle: `Dukuh ${p.name}`,
        positionAlias: 'Dukuh',
        remit: `Pamong kewilayahan Padukuhan ${p.name}.`,
        name: null,
        padukuhanId: p.id,
        sortOrder: 100 + p.number,
      },
      update: {
        positionTitle: `Dukuh ${p.name}`,
        remit: `Pamong kewilayahan Padukuhan ${p.name}.`,
        sortOrder: 100 + p.number,
      },
    });
  }
  log('officials (dukuh, unnamed)', padukuhanRows.length);

  for (const term of LEADERSHIP_TERMS) {
    await db.leadershipTerm.upsert({
      where: { sortOrder: term.sortOrder },
      create: {
        sortOrder: term.sortOrder,
        name: term.name,
        description: term.description,
        startYear: term.startYear,
        endYear: term.endYear,
        isIncumbent: 'isIncumbent' in term ? term.isIncumbent : false,
      },
      update: {
        name: term.name,
        description: term.description,
        startYear: term.startYear,
        endYear: term.endYear,
        isIncumbent: 'isIncumbent' in term ? term.isIncumbent : false,
      },
    });
  }
  log('leadership terms', LEADERSHIP_TERMS.length);

  for (const inst of INSTITUTIONS) {
    await db.villageInstitution.upsert({
      where: { slug: inst.slug },
      create: { ...inst },
      update: { ...inst },
    });
  }
  log('village institutions', INSTITUTIONS.length);

  for (const mission of MISSIONS) {
    await db.villageMission.upsert({
      where: { number: mission.number },
      create: { ...mission },
      update: { ...mission },
    });
  }
  log('village missions', MISSIONS.length);

  for (const pillar of GOVERNANCE_PILLARS) {
    await db.governancePillar.upsert({
      where: { sortOrder: pillar.sortOrder },
      create: { ...pillar },
      update: { ...pillar },
    });
  }
  log('governance pillars', GOVERNANCE_PILLARS.length);
}

async function seedStatistics(): Promise<void> {
  const referenceDate = new Date(`${STATISTICS_REFERENCE_DATE}T00:00:00Z`);
  const payload = {
    sourceLabel: STATISTICS_SOURCE_LABEL,
    totalPopulation: DEMOGRAPHICS.totalPopulation,
    malePopulation: DEMOGRAPHICS.malePopulation,
    femalePopulation: DEMOGRAPHICS.femalePopulation,
    households: DEMOGRAPHICS.households,
    householdsMaleHead: DEMOGRAPHICS.householdsMaleHead,
    householdsFemaleHead: DEMOGRAPHICS.householdsFemaleHead,
    vulnerablePeople: DEMOGRAPHICS.vulnerablePeople,
    vulnerablePercent: DEMOGRAPHICS.vulnerablePercent,
    completionPercent: DEMOGRAPHICS.completionPercent,
    areaHectares: DEMOGRAPHICS.areaHectares,
    padukuhanCount: DEMOGRAPHICS.padukuhanCount,
    rwCount: DEMOGRAPHICS.rwCount,
    rtCount: DEMOGRAPHICS.rtCount, // NULL — conflict C05.
    isPublished: true,
  };

  const snapshot = await db.demographicSnapshot.upsert({
    where: { referenceDate },
    create: { referenceDate, ...payload },
    update: payload,
  });

  for (const r of RELIGIONS) {
    await db.religionCount.upsert({
      where: { snapshotId_religion: { snapshotId: snapshot.id, religion: r.religion } },
      create: { snapshotId: snapshot.id, ...r },
      update: { people: r.people, percentage: r.percentage, sortOrder: r.sortOrder },
    });
  }
  log('religion counts', RELIGIONS.length);

  for (const e of EDUCATION_LEVELS) {
    await db.educationCount.upsert({
      where: { snapshotId_level: { snapshotId: snapshot.id, level: e.level } },
      create: { snapshotId: snapshot.id, ...e },
      update: {
        people: e.people,
        percentage: e.percentage,
        isTertiary: e.isTertiary,
        sortOrder: e.sortOrder,
      },
    });
  }
  log('education counts', EDUCATION_LEVELS.length);

  for (const o of OCCUPATIONS) {
    await db.occupationCount.upsert({
      where: { snapshotId_occupation: { snapshotId: snapshot.id, occupation: o.occupation } },
      create: { snapshotId: snapshot.id, ...o },
      update: { people: o.people, rank: o.rank },
    });
  }
  log('occupation counts', OCCUPATIONS.length);
}

async function seedSettings(): Promise<void> {
  for (const setting of SITE_SETTINGS) {
    const data = {
      value: setting.value,
      type: setting.type as SettingType,
      group: setting.group,
      label: setting.label,
    };
    await db.siteSetting.upsert({
      where: { key: setting.key },
      create: { key: setting.key, ...data },
      update: data,
    });
  }
  log('site settings', SITE_SETTINGS.length);
}

async function seedContent(): Promise<void> {
  for (const category of NEWS_CATEGORIES) {
    await db.newsCategory.upsert({
      where: { slug: category.slug },
      create: { ...category },
      update: { ...category },
    });
  }
  log('news categories', NEWS_CATEGORIES.length);

  for (const article of NEWS) {
    const category = await db.newsCategory.findUniqueOrThrow({
      where: { slug: article.categorySlug },
    });
    const data = {
      title: article.title,
      excerpt: article.excerpt,
      body: article.body,
      categoryId: category.id,
      status: article.status as ContentStatus,
      publishedAt:
        article.publishedAt === null ? null : new Date(`${article.publishedAt}T00:00:00Z`),
      bylineLabel: article.bylineLabel,
    };
    await db.news.upsert({
      where: { slug: article.slug },
      create: { slug: article.slug, ...data },
      update: data,
    });
  }
  log('news articles', NEWS.length);

  for (const item of AGENDA) {
    const data = {
      title: item.title,
      label: item.label,
      description: item.description,
      startsAt: new Date(item.startsAt),
      location: item.location,
      status: item.status as ContentStatus,
    };
    await db.agenda.upsert({
      where: { slug: item.slug },
      create: { slug: item.slug, ...data },
      update: data,
    });
  }
  log('agenda items', AGENDA.length);

  for (const category of SERVICE_CATEGORIES) {
    await db.serviceCategory.upsert({
      where: { slug: category.slug },
      create: { ...category },
      update: { ...category },
    });
  }
  log('service categories', SERVICE_CATEGORIES.length);

  for (const service of SERVICES) {
    const category = await db.serviceCategory.findUniqueOrThrow({
      where: { slug: service.categorySlug },
    });
    const data = {
      code: service.code,
      badge: service.badge,
      name: service.name,
      description: service.description,
      requirements: service.requirements,
      duration: service.duration,
      output: service.output,
      method: service.method,
      costRupiah: '0.00',
      procedure: null,
      categoryId: category.id,
      status: ContentStatus.PUBLISHED,
      sortOrder: service.sortOrder,
    };
    await db.service.upsert({
      where: { slug: service.slug },
      create: { slug: service.slug, ...data },
      update: data,
    });
  }
  log('services', SERVICES.length);

  for (const step of SERVICE_PROCEDURE_STEPS) {
    await db.serviceProcedureStep.upsert({
      where: { stepNumber: step.stepNumber },
      create: { ...step },
      update: { ...step },
    });
  }
  log('service SOP steps', SERVICE_PROCEDURE_STEPS.length);

  for (const channel of SERVICE_CHANNELS) {
    await db.serviceChannel.upsert({
      where: { sortOrder: channel.sortOrder },
      create: { ...channel },
      update: { name: channel.name, description: channel.description },
    });
  }
  log('service channels', SERVICE_CHANNELS.length);
}

async function seedTransparency(): Promise<void> {
  const budgetPayload = {
    totalRevenue: BUDGET.totalRevenue,
    totalExpenditure: BUDGET.totalExpenditure,
    financingReceipts: BUDGET.financingReceipts,
    financingOutlays: BUDGET.financingOutlays,
    netFinancing: BUDGET.netFinancing,
    balanceLabel: BUDGET.balanceLabel,
    basis: BUDGET.basis,
    status: ContentStatus.PUBLISHED,
  };
  const budget = await db.budget.upsert({
    where: { fiscalYear: BUDGET.fiscalYear },
    create: { fiscalYear: BUDGET.fiscalYear, ...budgetPayload },
    update: budgetPayload,
  });

  const upsertLine = async (
    kind: BudgetLineKind,
    line: { label: string; amount?: string; amountLabel?: string; percentage?: string; sortOrder: number },
  ): Promise<void> => {
    const data = {
      amount: line.amount ?? null,
      amountLabel: line.amountLabel ?? null,
      percentage: line.percentage ?? null,
      sortOrder: line.sortOrder,
    };
    await db.budgetLine.upsert({
      where: { budgetId_kind_label: { budgetId: budget.id, kind, label: line.label } },
      create: { budgetId: budget.id, kind, label: line.label, ...data },
      update: data,
    });
  };

  for (const line of BUDGET_REVENUE_LINES) await upsertLine('REVENUE', line);
  for (const line of BUDGET_EXPENDITURE_ALLOCATION_LINES) {
    await upsertLine('EXPENDITURE_ALLOCATION', line);
  }
  for (const line of BUDGET_EXPENDITURE_BIDANG_LINES) {
    // amount stays undefined -> NULL. The source published only a rounded
    // figure for these; amountLabel preserves its wording.
    await upsertLine('EXPENDITURE_BIDANG', line);
  }
  for (const line of BUDGET_FINANCING_LINES) {
    await upsertLine(line.kind as BudgetLineKind, line);
  }
  log(
    'budget lines',
    BUDGET_REVENUE_LINES.length +
      BUDGET_EXPENDITURE_ALLOCATION_LINES.length +
      BUDGET_EXPENDITURE_BIDANG_LINES.length +
      BUDGET_FINANCING_LINES.length,
  );

  await db.budgetRealization.upsert({
    where: { budgetId_period: { budgetId: budget.id, period: BUDGET_REALIZATION.period } },
    create: { budgetId: budget.id, ...BUDGET_REALIZATION },
    update: { ...BUDGET_REALIZATION },
  });
  log('budget realizations', 1);

  for (const stage of BUDGET_CYCLE_STAGES) {
    await db.budgetCycleStage.upsert({
      where: { budgetId_stageNumber: { budgetId: budget.id, stageNumber: stage.stageNumber } },
      create: { budgetId: budget.id, ...stage },
      update: { name: stage.name, description: stage.description, statusLabel: stage.statusLabel },
    });
  }
  log('budget cycle stages', BUDGET_CYCLE_STAGES.length);

  for (const project of DEVELOPMENT_PROJECTS) {
    const data = {
      slug: project.slug,
      title: project.title,
      description: project.description,
      fiscalYear: BUDGET.fiscalYear,
      locationLabel: project.locationLabel,
      budgetAmount: project.budgetAmount,
      fundingSourceLabel: project.fundingSourceLabel,
      status: project.status as ProjectStatus,
      physicalProgress: project.physicalProgress,
      targetLabel: project.targetLabel,
      note: project.note,
      publishStatus: ContentStatus.PUBLISHED,
    };
    const row = await db.developmentProject.upsert({
      where: { code: project.code },
      create: { code: project.code, ...data },
      update: data,
    });

    await db.projectPadukuhan.deleteMany({ where: { projectId: row.id } });
    for (const slug of project.padukuhanSlugs) {
      const padukuhan = await db.padukuhan.findUniqueOrThrow({ where: { slug } });
      await db.projectPadukuhan.create({
        data: { projectId: row.id, padukuhanId: padukuhan.id },
      });
    }
  }
  log('development projects', DEVELOPMENT_PROJECTS.length);

  for (const doc of DOCUMENTS) {
    const data = {
      title: doc.title,
      category: doc.category,
      categoryLabel: doc.categoryLabel,
      number: doc.number,
      numberYear: doc.numberYear,
      year: doc.year,
      description: doc.description,
      fileType: doc.fileType,
      // sizeBytes stays NULL (V05); mediaId stays NULL (V04).
      publishedAt: doc.publishedAt === null ? null : new Date(`${doc.publishedAt}T00:00:00Z`),
      status: ContentStatus.PUBLISHED,
    };
    await db.document.upsert({
      where: { slug: doc.slug },
      create: { slug: doc.slug, ...data },
      update: data,
    });
  }
  log('documents', DOCUMENTS.length);
}

async function seedPotential(): Promise<void> {
  for (const category of LOCAL_POTENTIAL_CATEGORIES) {
    await db.localPotentialCategory.upsert({
      where: { slug: category.slug },
      create: { ...category },
      update: { ...category },
    });
  }
  log('local potential categories', LOCAL_POTENTIAL_CATEGORIES.length);

  for (const potential of LOCAL_POTENTIALS) {
    const category = await db.localPotentialCategory.findUniqueOrThrow({
      where: { slug: potential.categorySlug },
    });
    const padukuhan =
      potential.padukuhanSlug === null
        ? null
        : await db.padukuhan.findUniqueOrThrow({ where: { slug: potential.padukuhanSlug } });
    const data = {
      title: potential.title,
      headline: potential.headline,
      highlight: potential.highlight,
      description: potential.description,
      categoryId: category.id,
      padukuhanId: padukuhan?.id ?? null,
      status: ContentStatus.PUBLISHED,
      sortOrder: potential.sortOrder,
    };
    await db.localPotential.upsert({
      where: { slug: potential.slug },
      create: { slug: potential.slug, ...data },
      update: data,
    });
  }
  log('local potentials', LOCAL_POTENTIALS.length);

  let productCount = 0;
  for (const business of UMKM) {
    const padukuhan =
      business.padukuhanSlug === null
        ? null
        : await db.padukuhan.findUniqueOrThrow({ where: { slug: business.padukuhanSlug } });
    const data = {
      name: business.name,
      ownerName: business.ownerName,
      summary: business.summary,
      description: business.description,
      categoryLabel: business.categoryLabel,
      padukuhanId: padukuhan?.id ?? null,
      addressDetail: business.addressDetail,
      foundedYear: business.foundedYear,
      hasNib: business.hasNib,
      pirtNumber: business.pirtNumber,
      whatsapp: business.whatsapp, // NULL — conflict C10.
      socialMedia: business.socialMedia,
      dailyCapacityLabel: business.dailyCapacityLabel, // NULL — conflict C09.
      ratingValue: business.ratingValue,
      ratingCount: business.ratingCount,
      workerCount: business.workerCount,
      operatingHours: business.operatingHours,
      status: ContentStatus.PUBLISHED,
      sortOrder: business.sortOrder,
    };
    const row = await db.umkm.upsert({
      where: { slug: business.slug },
      create: { slug: business.slug, ...data },
      update: data,
    });

    for (const product of business.products) {
      await db.umkmProduct.upsert({
        where: { umkmId_name: { umkmId: row.id, name: product.name } },
        create: { umkmId: row.id, ...product },
        update: { ...product },
      });
      productCount += 1;
    }
  }
  log('umkm', UMKM.length);
  log('umkm products', productCount);
}

async function main(): Promise<void> {
  process.stdout.write('\nSeeding verified content (docs/SOURCE_DATA.md §3)\n\n');

  await seedAccess();
  await seedTerritory();
  await seedGovernment();
  await seedStatistics();
  await seedSettings();
  await seedContent();
  await seedTransparency();
  await seedPotential();

  process.stdout.write('\nDone. Withheld by the publication gate:\n');
  process.stdout.write('  C05 per-padukuhan RW/RT and the 86 RT total -> NULL\n');
  process.stdout.write('  C07 Tamat SD / Belum Tamat SD               -> not seeded\n');
  process.stdout.write('  C08 bentang wilayah                         -> not seeded\n');
  process.stdout.write('  C09 UMKM daily capacity                     -> NULL\n');
  process.stdout.write('  C10 UMKM WhatsApp (duplicates the hotline)  -> NULL\n');
  process.stdout.write('  V01 13 dukuh + 7 pamong names               -> NULL\n');
  process.stdout.write('  V04 document files, V05 file sizes          -> NULL\n');
  process.stdout.write('  V11 two truncated headlines                 -> DRAFT, not published\n');
  process.stdout.write('  V12 two agenda items without a full date    -> not seeded\n\n');
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error: unknown) => {
    process.exitCode = 1;
    process.stderr.write(`\nSeed failed: ${String(error)}\n`);
    await db.$disconnect();
  });
