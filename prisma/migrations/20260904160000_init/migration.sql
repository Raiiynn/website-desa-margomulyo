-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "RoleKey" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'OPERATOR');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OfficialKind" AS ENUM ('LURAH', 'CARIK', 'KAUR', 'KASI', 'DUKUH', 'OTHER');

-- CreateEnum
CREATE TYPE "InstitutionKind" AS ENUM ('BPKAL', 'LKK');

-- CreateEnum
CREATE TYPE "ComplaintKind" AS ENUM ('PENGADUAN', 'ASPIRASI');

-- CreateEnum
CREATE TYPE "ComplaintStatus" AS ENUM ('RECEIVED', 'REVIEWED', 'PROCESSING', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "BudgetLineKind" AS ENUM ('REVENUE', 'EXPENDITURE_ALLOCATION', 'EXPENDITURE_BIDANG', 'FINANCING_RECEIPT', 'FINANCING_OUTLAY');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('APBKAL', 'RKPKAL', 'RPJMKAL', 'LPPKAL', 'PERKAL', 'LAKIP');

-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('STRING', 'TEXT', 'NUMBER', 'BOOLEAN', 'URL', 'EMAIL', 'PHONE');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "key" "RoleKey" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSeenAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "actorEmail" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "padukuhan" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isHistoricalCore" BOOLEAN NOT NULL DEFAULT false,
    "potentialSummary" TEXT,
    "rwCount" INTEGER,
    "rtCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "padukuhan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "government_officials" (
    "id" TEXT NOT NULL,
    "kind" "OfficialKind" NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "positionAlias" TEXT,
    "remit" TEXT,
    "name" TEXT,
    "padukuhanId" TEXT,
    "termStart" INTEGER,
    "termEnd" INTEGER,
    "photoMediaId" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "internalNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "government_officials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leadership_terms" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "isIncumbent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leadership_terms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "village_institutions" (
    "id" TEXT NOT NULL,
    "kind" "InstitutionKind" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "alias" TEXT,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "village_institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "village_missions" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "village_missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "governance_pillars" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "governance_pillars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demographic_snapshots" (
    "id" TEXT NOT NULL,
    "referenceDate" DATE NOT NULL,
    "sourceLabel" TEXT NOT NULL,
    "totalPopulation" INTEGER NOT NULL,
    "malePopulation" INTEGER NOT NULL,
    "femalePopulation" INTEGER NOT NULL,
    "households" INTEGER NOT NULL,
    "householdsMaleHead" INTEGER NOT NULL,
    "householdsFemaleHead" INTEGER NOT NULL,
    "vulnerablePeople" INTEGER,
    "vulnerablePercent" DECIMAL(5,2),
    "completionPercent" DECIMAL(5,2),
    "areaHectares" DECIMAL(10,2) NOT NULL,
    "padukuhanCount" INTEGER NOT NULL,
    "rwCount" INTEGER NOT NULL,
    "rtCount" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demographic_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "religion_counts" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "percentage" DECIMAL(5,2),
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "religion_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_counts" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "percentage" DECIMAL(5,2),
    "isTertiary" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "education_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "occupation_counts" (
    "id" TEXT NOT NULL,
    "snapshotId" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "people" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "occupation_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isFilter" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT,
    "bylineLabel" TEXT,
    "coverMediaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "label" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3),
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "metaDescription" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "caption" TEXT,
    "uploadedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT,
    "badge" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "costRupiah" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "procedure" TEXT,
    "categoryId" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_procedure_steps" (
    "id" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "outcome" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_procedure_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_channels" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complaint_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaints" (
    "id" TEXT NOT NULL,
    "kind" "ComplaintKind" NOT NULL,
    "reference" TEXT NOT NULL,
    "trackingTokenHash" TEXT NOT NULL,
    "status" "ComplaintStatus" NOT NULL DEFAULT 'RECEIVED',
    "reporterName" TEXT NOT NULL,
    "reporterPhone" TEXT NOT NULL,
    "reporterEmail" TEXT,
    "padukuhanId" TEXT,
    "categoryId" TEXT,
    "message" VARCHAR(1000) NOT NULL,
    "internalNotes" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "complaints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint_attachments" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaint_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "complaint_status_history" (
    "id" TEXT NOT NULL,
    "complaintId" TEXT NOT NULL,
    "fromStatus" "ComplaintStatus",
    "toStatus" "ComplaintStatus" NOT NULL,
    "note" TEXT,
    "changedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "complaint_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budgets" (
    "id" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "totalRevenue" DECIMAL(18,2) NOT NULL,
    "totalExpenditure" DECIMAL(18,2) NOT NULL,
    "financingReceipts" DECIMAL(18,2) NOT NULL,
    "financingOutlays" DECIMAL(18,2) NOT NULL,
    "netFinancing" DECIMAL(18,2) NOT NULL,
    "balanceLabel" TEXT,
    "basis" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_lines" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "kind" "BudgetLineKind" NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DECIMAL(18,2),
    "amountLabel" TEXT,
    "percentage" DECIMAL(5,2),
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_realizations" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "physicalPercent" DECIMAL(5,2),
    "physicalTargetPercent" DECIMAL(5,2),
    "physicalNote" TEXT,
    "cashPercent" DECIMAL(5,2),
    "cashAmount" DECIMAL(18,2),
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_realizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_cycle_stages" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "stageNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "statusLabel" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "budget_cycle_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "development_projects" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fiscalYear" INTEGER NOT NULL,
    "locationLabel" TEXT NOT NULL,
    "budgetAmount" DECIMAL(18,2) NOT NULL,
    "fundingSourceLabel" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL,
    "physicalProgress" INTEGER NOT NULL DEFAULT 0,
    "financialProgress" INTEGER,
    "targetLabel" TEXT,
    "startDate" DATE,
    "targetDate" DATE,
    "note" TEXT,
    "coverMediaId" TEXT,
    "publishStatus" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "development_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_padukuhan" (
    "projectId" TEXT NOT NULL,
    "padukuhanId" TEXT NOT NULL,

    CONSTRAINT "project_padukuhan_pkey" PRIMARY KEY ("projectId","padukuhanId")
);

-- CreateTable
CREATE TABLE "development_project_updates" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "physicalProgress" INTEGER,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "development_project_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "categoryLabel" TEXT,
    "year" INTEGER,
    "description" TEXT,
    "number" TEXT,
    "numberYear" INTEGER,
    "fileType" TEXT,
    "sizeBytes" INTEGER,
    "mediaId" TEXT,
    "publishedAt" DATE,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_potential_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_potential_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_potentials" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "headline" TEXT,
    "description" TEXT NOT NULL,
    "highlight" TEXT,
    "categoryId" TEXT NOT NULL,
    "padukuhanId" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "local_potentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkm" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "categoryLabel" TEXT,
    "padukuhanId" TEXT,
    "addressDetail" TEXT,
    "foundedYear" INTEGER,
    "hasNib" BOOLEAN NOT NULL DEFAULT false,
    "pirtNumber" TEXT,
    "whatsapp" TEXT,
    "socialMedia" TEXT,
    "dailyCapacityLabel" TEXT,
    "ratingValue" DECIMAL(2,1),
    "ratingCount" INTEGER,
    "workerCount" INTEGER,
    "operatingHours" TEXT,
    "coverMediaId" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umkm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkm_products" (
    "id" TEXT NOT NULL,
    "umkmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "priceRupiah" DECIMAL(18,2),
    "priceUnit" TEXT,
    "packaging" TEXT,
    "badge" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umkm_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" "SettingType" NOT NULL DEFAULT 'STRING',
    "group" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_key_key" ON "roles"("key");

-- CreateIndex
CREATE UNIQUE INDEX "roles_rank_key" ON "roles"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_key_key" ON "permissions"("key");

-- CreateIndex
CREATE INDEX "permissions_group_idx" ON "permissions"("group");

-- CreateIndex
CREATE INDEX "role_permissions_permissionId_idx" ON "role_permissions"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "users"("roleId");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_resource_resourceId_idx" ON "audit_logs"("resource", "resourceId");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE UNIQUE INDEX "padukuhan_number_key" ON "padukuhan"("number");

-- CreateIndex
CREATE UNIQUE INDEX "padukuhan_name_key" ON "padukuhan"("name");

-- CreateIndex
CREATE UNIQUE INDEX "padukuhan_slug_key" ON "padukuhan"("slug");

-- CreateIndex
CREATE INDEX "government_officials_kind_idx" ON "government_officials"("kind");

-- CreateIndex
CREATE INDEX "government_officials_sortOrder_idx" ON "government_officials"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "government_officials_padukuhanId_kind_key" ON "government_officials"("padukuhanId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "leadership_terms_sortOrder_key" ON "leadership_terms"("sortOrder");

-- CreateIndex
CREATE INDEX "leadership_terms_startYear_idx" ON "leadership_terms"("startYear");

-- CreateIndex
CREATE UNIQUE INDEX "village_institutions_name_key" ON "village_institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "village_institutions_slug_key" ON "village_institutions"("slug");

-- CreateIndex
CREATE INDEX "village_institutions_kind_idx" ON "village_institutions"("kind");

-- CreateIndex
CREATE UNIQUE INDEX "village_missions_number_key" ON "village_missions"("number");

-- CreateIndex
CREATE UNIQUE INDEX "governance_pillars_sortOrder_key" ON "governance_pillars"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "governance_pillars_name_key" ON "governance_pillars"("name");

-- CreateIndex
CREATE UNIQUE INDEX "demographic_snapshots_referenceDate_key" ON "demographic_snapshots"("referenceDate");

-- CreateIndex
CREATE UNIQUE INDEX "religion_counts_snapshotId_religion_key" ON "religion_counts"("snapshotId", "religion");

-- CreateIndex
CREATE UNIQUE INDEX "education_counts_snapshotId_level_key" ON "education_counts"("snapshotId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "occupation_counts_snapshotId_occupation_key" ON "occupation_counts"("snapshotId", "occupation");

-- CreateIndex
CREATE UNIQUE INDEX "occupation_counts_snapshotId_rank_key" ON "occupation_counts"("snapshotId", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_name_key" ON "news_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_slug_key" ON "news_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_key" ON "news"("slug");

-- CreateIndex
CREATE INDEX "news_status_publishedAt_idx" ON "news"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "news_categoryId_idx" ON "news"("categoryId");

-- CreateIndex
CREATE INDEX "news_publishedAt_idx" ON "news"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_slug_key" ON "agenda"("slug");

-- CreateIndex
CREATE INDEX "agenda_startsAt_idx" ON "agenda"("startsAt");

-- CreateIndex
CREATE INDEX "agenda_status_startsAt_idx" ON "agenda"("status", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- CreateIndex
CREATE INDEX "pages_status_idx" ON "pages"("status");

-- CreateIndex
CREATE INDEX "media_mimeType_idx" ON "media"("mimeType");

-- CreateIndex
CREATE UNIQUE INDEX "media_bucket_path_key" ON "media"("bucket", "path");

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_name_key" ON "service_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_slug_key" ON "service_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_categoryId_idx" ON "services"("categoryId");

-- CreateIndex
CREATE INDEX "services_status_idx" ON "services"("status");

-- CreateIndex
CREATE UNIQUE INDEX "service_procedure_steps_stepNumber_key" ON "service_procedure_steps"("stepNumber");

-- CreateIndex
CREATE UNIQUE INDEX "service_channels_sortOrder_key" ON "service_channels"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "service_channels_name_key" ON "service_channels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "complaint_categories_name_key" ON "complaint_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "complaint_categories_slug_key" ON "complaint_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "complaints_reference_key" ON "complaints"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "complaints_trackingTokenHash_key" ON "complaints"("trackingTokenHash");

-- CreateIndex
CREATE INDEX "complaints_status_createdAt_idx" ON "complaints"("status", "createdAt");

-- CreateIndex
CREATE INDEX "complaints_kind_status_idx" ON "complaints"("kind", "status");

-- CreateIndex
CREATE INDEX "complaints_padukuhanId_idx" ON "complaints"("padukuhanId");

-- CreateIndex
CREATE INDEX "complaints_createdAt_idx" ON "complaints"("createdAt");

-- CreateIndex
CREATE INDEX "complaint_attachments_complaintId_idx" ON "complaint_attachments"("complaintId");

-- CreateIndex
CREATE UNIQUE INDEX "complaint_attachments_bucket_path_key" ON "complaint_attachments"("bucket", "path");

-- CreateIndex
CREATE INDEX "complaint_status_history_complaintId_createdAt_idx" ON "complaint_status_history"("complaintId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "budgets_fiscalYear_key" ON "budgets"("fiscalYear");

-- CreateIndex
CREATE INDEX "budgets_status_idx" ON "budgets"("status");

-- CreateIndex
CREATE INDEX "budget_lines_budgetId_kind_idx" ON "budget_lines"("budgetId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "budget_lines_budgetId_kind_label_key" ON "budget_lines"("budgetId", "kind", "label");

-- CreateIndex
CREATE UNIQUE INDEX "budget_realizations_budgetId_period_key" ON "budget_realizations"("budgetId", "period");

-- CreateIndex
CREATE UNIQUE INDEX "budget_cycle_stages_budgetId_stageNumber_key" ON "budget_cycle_stages"("budgetId", "stageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "development_projects_code_key" ON "development_projects"("code");

-- CreateIndex
CREATE UNIQUE INDEX "development_projects_slug_key" ON "development_projects"("slug");

-- CreateIndex
CREATE INDEX "development_projects_fiscalYear_status_idx" ON "development_projects"("fiscalYear", "status");

-- CreateIndex
CREATE INDEX "development_projects_publishStatus_idx" ON "development_projects"("publishStatus");

-- CreateIndex
CREATE INDEX "project_padukuhan_padukuhanId_idx" ON "project_padukuhan"("padukuhanId");

-- CreateIndex
CREATE INDEX "development_project_updates_projectId_recordedAt_idx" ON "development_project_updates"("projectId", "recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "documents_slug_key" ON "documents"("slug");

-- CreateIndex
CREATE INDEX "documents_category_year_idx" ON "documents"("category", "year");

-- CreateIndex
CREATE INDEX "documents_status_idx" ON "documents"("status");

-- CreateIndex
CREATE UNIQUE INDEX "local_potential_categories_name_key" ON "local_potential_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "local_potential_categories_slug_key" ON "local_potential_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "local_potentials_slug_key" ON "local_potentials"("slug");

-- CreateIndex
CREATE INDEX "local_potentials_categoryId_idx" ON "local_potentials"("categoryId");

-- CreateIndex
CREATE INDEX "local_potentials_status_idx" ON "local_potentials"("status");

-- CreateIndex
CREATE UNIQUE INDEX "umkm_slug_key" ON "umkm"("slug");

-- CreateIndex
CREATE INDEX "umkm_padukuhanId_idx" ON "umkm"("padukuhanId");

-- CreateIndex
CREATE INDEX "umkm_status_idx" ON "umkm"("status");

-- CreateIndex
CREATE UNIQUE INDEX "umkm_products_umkmId_name_key" ON "umkm_products"("umkmId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "site_settings_key_key" ON "site_settings"("key");

-- CreateIndex
CREATE INDEX "site_settings_group_idx" ON "site_settings"("group");

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "government_officials" ADD CONSTRAINT "government_officials_padukuhanId_fkey" FOREIGN KEY ("padukuhanId") REFERENCES "padukuhan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "government_officials" ADD CONSTRAINT "government_officials_photoMediaId_fkey" FOREIGN KEY ("photoMediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "religion_counts" ADD CONSTRAINT "religion_counts_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "demographic_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_counts" ADD CONSTRAINT "education_counts_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "demographic_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "occupation_counts" ADD CONSTRAINT "occupation_counts_snapshotId_fkey" FOREIGN KEY ("snapshotId") REFERENCES "demographic_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "news_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "service_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_padukuhanId_fkey" FOREIGN KEY ("padukuhanId") REFERENCES "padukuhan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "complaint_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint_attachments" ADD CONSTRAINT "complaint_attachments_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "complaints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint_status_history" ADD CONSTRAINT "complaint_status_history_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "complaints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "complaint_status_history" ADD CONSTRAINT "complaint_status_history_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_lines" ADD CONSTRAINT "budget_lines_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_realizations" ADD CONSTRAINT "budget_realizations_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget_cycle_stages" ADD CONSTRAINT "budget_cycle_stages_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_projects" ADD CONSTRAINT "development_projects_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_padukuhan" ADD CONSTRAINT "project_padukuhan_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_padukuhan" ADD CONSTRAINT "project_padukuhan_padukuhanId_fkey" FOREIGN KEY ("padukuhanId") REFERENCES "padukuhan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_project_updates" ADD CONSTRAINT "development_project_updates_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_project_updates" ADD CONSTRAINT "development_project_updates_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_potentials" ADD CONSTRAINT "local_potentials_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "local_potential_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "local_potentials" ADD CONSTRAINT "local_potentials_padukuhanId_fkey" FOREIGN KEY ("padukuhanId") REFERENCES "padukuhan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "umkm" ADD CONSTRAINT "umkm_padukuhanId_fkey" FOREIGN KEY ("padukuhanId") REFERENCES "padukuhan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "umkm" ADD CONSTRAINT "umkm_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "umkm_products" ADD CONSTRAINT "umkm_products_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "umkm"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- ===========================================================================
-- CHECK constraints
--
-- Hand-added to the generated migration. Prisma cannot express CHECK
-- constraints in schema.prisma, but several invariants here materially
-- protect integrity and belong in the database rather than only in
-- application code (Phase 2 requirement §2).
--
-- Deliberately NOT constrained: the demographic gender/household splits.
-- They reconcile exactly in the verified source (7.192 x 2 = 14.384;
-- 4.180 + 1.239 = 5.419) and are asserted in the seed integrity tests, but a
-- hard equality CHECK would reject a future snapshot that legitimately
-- records an "unknown" bucket. Percentages, non-negative money and progress
-- bounds have no such ambiguity, so they are enforced here.
-- ===========================================================================

-- Publishing workflow: published content must carry a publication timestamp.
ALTER TABLE "news"
  ADD CONSTRAINT "news_published_requires_timestamp"
  CHECK ("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL);

ALTER TABLE "pages"
  ADD CONSTRAINT "pages_published_requires_timestamp"
  CHECK ("status" <> 'PUBLISHED' OR "publishedAt" IS NOT NULL);

-- Territory.
ALTER TABLE "padukuhan"
  ADD CONSTRAINT "padukuhan_number_positive" CHECK ("number" > 0);
ALTER TABLE "padukuhan"
  ADD CONSTRAINT "padukuhan_rw_non_negative" CHECK ("rwCount" IS NULL OR "rwCount" >= 0);
ALTER TABLE "padukuhan"
  ADD CONSTRAINT "padukuhan_rt_non_negative" CHECK ("rtCount" IS NULL OR "rtCount" >= 0);

-- Demographics: counts are non-negative, percentages are 0-100.
ALTER TABLE "demographic_snapshots"
  ADD CONSTRAINT "demographic_counts_non_negative"
  CHECK ("totalPopulation" >= 0 AND "malePopulation" >= 0 AND "femalePopulation" >= 0
     AND "households" >= 0 AND "householdsMaleHead" >= 0 AND "householdsFemaleHead" >= 0
     AND ("vulnerablePeople" IS NULL OR "vulnerablePeople" >= 0));
ALTER TABLE "demographic_snapshots"
  ADD CONSTRAINT "demographic_percentages_in_range"
  CHECK (("vulnerablePercent" IS NULL OR ("vulnerablePercent" >= 0 AND "vulnerablePercent" <= 100))
     AND ("completionPercent" IS NULL OR ("completionPercent" >= 0 AND "completionPercent" <= 100)));
ALTER TABLE "demographic_snapshots"
  ADD CONSTRAINT "demographic_area_positive" CHECK ("areaHectares" > 0);

ALTER TABLE "religion_counts"
  ADD CONSTRAINT "religion_count_valid"
  CHECK ("people" >= 0 AND ("percentage" IS NULL OR ("percentage" >= 0 AND "percentage" <= 100)));
ALTER TABLE "education_counts"
  ADD CONSTRAINT "education_count_valid"
  CHECK ("people" >= 0 AND ("percentage" IS NULL OR ("percentage" >= 0 AND "percentage" <= 100)));
ALTER TABLE "occupation_counts"
  ADD CONSTRAINT "occupation_count_valid"
  CHECK ("people" >= 0 AND "rank" > 0);

-- Services: cost is never negative. Every documented service is Rp 0.
ALTER TABLE "services"
  ADD CONSTRAINT "service_cost_non_negative" CHECK ("costRupiah" >= 0);

-- Budget: money is non-negative and net financing is receipts minus outlays
-- by definition, so the identity is enforced rather than trusted.
ALTER TABLE "budgets"
  ADD CONSTRAINT "budget_amounts_non_negative"
  CHECK ("totalRevenue" >= 0 AND "totalExpenditure" >= 0
     AND "financingReceipts" >= 0 AND "financingOutlays" >= 0);
ALTER TABLE "budgets"
  ADD CONSTRAINT "budget_net_financing_identity"
  CHECK ("netFinancing" = "financingReceipts" - "financingOutlays");
ALTER TABLE "budgets"
  ADD CONSTRAINT "budget_fiscal_year_sane" CHECK ("fiscalYear" BETWEEN 2000 AND 2100);

ALTER TABLE "budget_lines"
  ADD CONSTRAINT "budget_line_amount_non_negative" CHECK ("amount" IS NULL OR "amount" >= 0);
ALTER TABLE "budget_lines"
  ADD CONSTRAINT "budget_line_percentage_in_range"
  CHECK ("percentage" IS NULL OR ("percentage" >= 0 AND "percentage" <= 100));
-- A line must carry either an exact amount or the source's rounded label.
ALTER TABLE "budget_lines"
  ADD CONSTRAINT "budget_line_has_a_figure"
  CHECK ("amount" IS NOT NULL OR "amountLabel" IS NOT NULL);

ALTER TABLE "budget_realizations"
  ADD CONSTRAINT "budget_realization_ranges"
  CHECK (("physicalPercent" IS NULL OR ("physicalPercent" >= 0 AND "physicalPercent" <= 100))
     AND ("physicalTargetPercent" IS NULL OR ("physicalTargetPercent" >= 0 AND "physicalTargetPercent" <= 100))
     AND ("cashPercent" IS NULL OR ("cashPercent" >= 0 AND "cashPercent" <= 100))
     AND ("cashAmount" IS NULL OR "cashAmount" >= 0));

ALTER TABLE "budget_cycle_stages"
  ADD CONSTRAINT "budget_cycle_stage_number_positive" CHECK ("stageNumber" > 0);

-- Development projects.
ALTER TABLE "development_projects"
  ADD CONSTRAINT "project_budget_non_negative" CHECK ("budgetAmount" >= 0);
ALTER TABLE "development_projects"
  ADD CONSTRAINT "project_progress_in_range"
  CHECK ("physicalProgress" BETWEEN 0 AND 100
     AND ("financialProgress" IS NULL OR "financialProgress" BETWEEN 0 AND 100));
ALTER TABLE "development_projects"
  ADD CONSTRAINT "project_completed_is_full"
  CHECK ("status" <> 'COMPLETED' OR "physicalProgress" = 100);
ALTER TABLE "development_projects"
  ADD CONSTRAINT "project_dates_ordered"
  CHECK ("startDate" IS NULL OR "targetDate" IS NULL OR "targetDate" >= "startDate");

ALTER TABLE "development_project_updates"
  ADD CONSTRAINT "project_update_progress_in_range"
  CHECK ("physicalProgress" IS NULL OR "physicalProgress" BETWEEN 0 AND 100);

-- Documents: a size, when known, is positive.
ALTER TABLE "documents"
  ADD CONSTRAINT "document_size_positive" CHECK ("sizeBytes" IS NULL OR "sizeBytes" > 0);

-- Media.
ALTER TABLE "media"
  ADD CONSTRAINT "media_size_positive" CHECK ("sizeBytes" > 0);
ALTER TABLE "media"
  ADD CONSTRAINT "media_dimensions_positive"
  CHECK (("width" IS NULL OR "width" > 0) AND ("height" IS NULL OR "height" > 0));

-- Complaints: a resolution timestamp implies a resolved-or-later status, and
-- a closure timestamp implies a closed status.
ALTER TABLE "complaints"
  ADD CONSTRAINT "complaint_resolved_at_requires_status"
  CHECK ("resolvedAt" IS NULL OR "status" IN ('RESOLVED', 'CLOSED'));
ALTER TABLE "complaints"
  ADD CONSTRAINT "complaint_closed_at_requires_status"
  CHECK ("closedAt" IS NULL OR "status" = 'CLOSED');
ALTER TABLE "complaint_attachments"
  ADD CONSTRAINT "complaint_attachment_size_positive" CHECK ("sizeBytes" > 0);
-- A status transition must actually change the status.
ALTER TABLE "complaint_status_history"
  ADD CONSTRAINT "complaint_history_is_a_transition"
  CHECK ("fromStatus" IS NULL OR "fromStatus" <> "toStatus");

-- UMKM.
ALTER TABLE "umkm"
  ADD CONSTRAINT "umkm_rating_in_range"
  CHECK ("ratingValue" IS NULL OR ("ratingValue" >= 0 AND "ratingValue" <= 5));
ALTER TABLE "umkm"
  ADD CONSTRAINT "umkm_counts_non_negative"
  CHECK (("ratingCount" IS NULL OR "ratingCount" >= 0)
     AND ("workerCount" IS NULL OR "workerCount" >= 0));
ALTER TABLE "umkm_products"
  ADD CONSTRAINT "umkm_product_price_non_negative"
  CHECK ("priceRupiah" IS NULL OR "priceRupiah" >= 0);

-- Roles: rank is positive; OWNER is rank 1.
ALTER TABLE "roles"
  ADD CONSTRAINT "role_rank_positive" CHECK ("rank" > 0);
