-- ===========================================================================
-- RLS SECURITY HARDENING
-- ===========================================================================
--
-- WHY THIS MIGRATION EXISTS
--
-- Supabase grants ALL privileges on every table in `public` to the `anon` and
-- `authenticated` roles by default, and exposes them through the PostgREST
-- Data API. Immediately after the initial migration, this was verified against
-- the live project using the anon key alone:
--
--   GET   /rest/v1/permissions        -> 200, full RBAC model readable
--   GET   /rest/v1/role_permissions   -> 200, full role mapping readable
--   GET   /rest/v1/news?status=eq.DRAFT
--                                     -> 200, both unpublished articles readable
--   GET   /rest/v1/government_officials
--                                     -> 200, internal TODO notes readable
--   PATCH /rest/v1/site_settings      -> 204, writes accepted
--
-- users, audit_logs and complaints returned 200 as well; they leaked nothing
-- only because they are still empty. Once citizens file complaints,
-- reporterName / reporterEmail / reporterPhone / internalNotes would have been
-- world-readable, and TRUNCATE was granted to anon on all 42 tables.
--
-- SECURITY MODEL
--
-- Application authorization (Next.js server + Prisma) remains the primary
-- boundary. This migration is defense-in-depth for the database access path.
--
-- Prisma connects as `postgres`, which owns every table and carries
-- rolbypassrls = true (verified against the live database, not assumed).
-- Enabling RLS therefore does not affect Prisma. RLS is deliberately ENABLED
-- and never FORCED, so the owner path stays unaffected even if the BYPASSRLS
-- attribute were later removed.
--
-- Two independent layers are applied, because either alone is brittle:
--   1. Privilege layer - REVOKE removes the Data API path entirely.
--   2. Policy layer    - RLS denies by default if a grant is ever restored
--                        (a dashboard click, or Supabase default privileges
--                        applying to a table added by a future migration).
--
-- ===========================================================================


-- ---------------------------------------------------------------------------
-- 1. NO WRITE PATH THROUGH THE DATA API, ANYWHERE
--
-- Every mutation in this platform is a server-side action behind application
-- authorization. Neither anon nor authenticated has any legitimate reason to
-- write directly, so the privilege is removed wholesale rather than being
-- fenced off with policies.
-- ---------------------------------------------------------------------------
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON ALL TABLES IN SCHEMA public FROM anon, authenticated;


-- ---------------------------------------------------------------------------
-- 2. SENSITIVE TABLES: NO DATA API ACCESS AT ALL
--
-- Personal data, the authorization model, the audit trail, storage paths and
-- migration metadata. None of these is public content, and no client-side
-- consumer exists for any of them.
-- ---------------------------------------------------------------------------
REVOKE ALL ON TABLE
  public.users,
  public.roles,
  public.permissions,
  public.role_permissions,
  public.audit_logs,
  public.complaints,
  public.complaint_attachments,
  public.complaint_status_history,
  public.complaint_categories,
  public.media,
  public.development_project_updates,
  public._prisma_migrations
FROM anon, authenticated;


-- ---------------------------------------------------------------------------
-- 3. ENABLE RLS ON EVERY TABLE
--
-- Including the tables above: with RLS on and no permissive policy, the result
-- is deny-by-default for every non-owner, non-BYPASSRLS role. Idempotent.
-- ---------------------------------------------------------------------------
DO $rls$
DECLARE t text;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $rls$;


-- ---------------------------------------------------------------------------
-- 4. PUBLIC READ POLICIES
--
-- Class A is genuinely public government information. These policies encode
-- the publication gate at the database layer, so a draft cannot become
-- publicly readable merely by sharing a table with published rows.
--
-- Read-only by construction: SELECT policies only, and section 1 already
-- removed every write privilege.
-- ---------------------------------------------------------------------------

-- 4a. Publication-gated content ---------------------------------------------

DROP POLICY IF EXISTS "public reads published news" ON public.news;
CREATE POLICY "public reads published news" ON public.news
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus" AND "publishedAt" IS NOT NULL);

DROP POLICY IF EXISTS "public reads published agenda" ON public.agenda;
CREATE POLICY "public reads published agenda" ON public.agenda
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published pages" ON public.pages;
CREATE POLICY "public reads published pages" ON public.pages
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published services" ON public.services;
CREATE POLICY "public reads published services" ON public.services
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published documents" ON public.documents;
CREATE POLICY "public reads published documents" ON public.documents
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published potentials" ON public.local_potentials;
CREATE POLICY "public reads published potentials" ON public.local_potentials
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published umkm" ON public.umkm;
CREATE POLICY "public reads published umkm" ON public.umkm
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published budgets" ON public.budgets;
CREATE POLICY "public reads published budgets" ON public.budgets
  FOR SELECT TO anon, authenticated
  USING (status = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads published demographics" ON public.demographic_snapshots;
CREATE POLICY "public reads published demographics" ON public.demographic_snapshots
  FOR SELECT TO anon, authenticated
  USING ("isPublished" = true);

-- site_settings mixes public identity values with internal configuration in
-- one table, so the row flag is the gate.
DROP POLICY IF EXISTS "public reads public settings" ON public.site_settings;
CREATE POLICY "public reads public settings" ON public.site_settings
  FOR SELECT TO anon, authenticated
  USING ("isPublic" = true);

-- Active officials only. The internalNote column is additionally withheld by a
-- column-level grant in section 5 - RLS filters rows, not columns.
DROP POLICY IF EXISTS "public reads active officials" ON public.government_officials;
CREATE POLICY "public reads active officials" ON public.government_officials
  FOR SELECT TO anon, authenticated
  USING ("isActive" = true);


-- 4b. Children of publication-gated parents ---------------------------------
-- These inherit the parent gate. Without the EXISTS check, the line items of
-- an unpublished budget would still be readable on their own.

DROP POLICY IF EXISTS "public reads lines of published budgets" ON public.budget_lines;
CREATE POLICY "public reads lines of published budgets" ON public.budget_lines
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.budgets b
    WHERE b.id = budget_lines."budgetId"
      AND b.status = 'PUBLISHED'::"ContentStatus"));

DROP POLICY IF EXISTS "public reads realizations of published budgets" ON public.budget_realizations;
CREATE POLICY "public reads realizations of published budgets" ON public.budget_realizations
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.budgets b
    WHERE b.id = budget_realizations."budgetId"
      AND b.status = 'PUBLISHED'::"ContentStatus"));

DROP POLICY IF EXISTS "public reads stages of published budgets" ON public.budget_cycle_stages;
CREATE POLICY "public reads stages of published budgets" ON public.budget_cycle_stages
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.budgets b
    WHERE b.id = budget_cycle_stages."budgetId"
      AND b.status = 'PUBLISHED'::"ContentStatus"));

DROP POLICY IF EXISTS "public reads products of published umkm" ON public.umkm_products;
CREATE POLICY "public reads products of published umkm" ON public.umkm_products
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.umkm u
    WHERE u.id = umkm_products."umkmId"
      AND u.status = 'PUBLISHED'::"ContentStatus"));


-- 4c. Reference data with no publication state ------------------------------
-- Territory, statistics, taxonomies and the governance record. Every row is
-- public by nature, so these get a plain readable policy rather than an
-- invented filter.
--
-- development_projects.status is ProjectStatus (PLANNED / IN_PROGRESS /
-- COMPLETED) - a lifecycle stage, not a publication gate - so it is not
-- filtered here.
DO $ref$
DECLARE t text;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'padukuhan',
    'village_institutions',
    'village_missions',
    'governance_pillars',
    'leadership_terms',
    'religion_counts',
    'education_counts',
    'occupation_counts',
    'news_categories',
    'service_categories',
    'service_procedure_steps',
    'service_channels',
    'local_potential_categories',
    'development_projects',
    'project_padukuhan'
  ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'public reads ' || t, t);
    EXECUTE format(
      'CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (true)',
      'public reads ' || t, t);
  END LOOP;
END $ref$;


-- ---------------------------------------------------------------------------
-- 5. COLUMN-LEVEL WITHHOLDING: government_officials.internalNote
--
-- RLS cannot hide a column. internalNote carries unresolved internal
-- governance questions (for example, whether two source spellings denote the
-- same office) which are working notes, not public record. The table grant is
-- narrowed to the public columns only.
-- ---------------------------------------------------------------------------
REVOKE SELECT ON TABLE public.government_officials FROM anon, authenticated;
GRANT SELECT (
  id, "padukuhanId", kind, "positionTitle", "positionAlias", name, remit,
  "termStart", "termEnd", "sortOrder", "isActive", "photoMediaId",
  "createdAt", "updatedAt"
) ON TABLE public.government_officials TO anon, authenticated;


-- ---------------------------------------------------------------------------
-- 6. FUTURE TABLES DEFAULT TO CLOSED
--
-- Supabase default privileges hand every newly created table to anon and
-- authenticated. That is how this exposure arose in the first place. Removing
-- the default means a table added by a later migration is unreachable through
-- the Data API until someone grants access deliberately.
-- ---------------------------------------------------------------------------
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  REVOKE ALL ON TABLES FROM anon, authenticated;
