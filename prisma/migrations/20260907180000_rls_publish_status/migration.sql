-- ===========================================================================
-- RLS CORRECTION: development_projects publication gate
-- ===========================================================================
--
-- The 20260907120000_rls_security migration classified development_projects as
-- reference data readable in full, on the reasoning that its `status` column is
-- ProjectStatus (PLANNED / IN_PROGRESS / COMPLETED) — a lifecycle stage rather
-- than a publication gate. That reasoning was correct about `status` and wrong
-- about the table: DevelopmentProject also carries `publishStatus`
-- (ContentStatus, default DRAFT), which IS the publication gate, and which
-- src/server/queries/transparency.ts already filters on.
--
-- The audit that produced the original classification searched for columns
-- named status / publishedAt / isPublic / isActive / isPublished. `publishStatus`
-- matched none of those patterns and was missed.
--
-- Nothing has leaked: all five seeded projects are PUBLISHED. The exposure
-- would have begun the moment a draft project was created.
--
-- project_padukuhan is the join table between projects and padukuhan. Left
-- open, it would disclose which padukuhan an unpublished project targets, so
-- it inherits the parent gate the same way budget_lines does.
-- ===========================================================================

DROP POLICY IF EXISTS "public reads development_projects" ON public.development_projects;
CREATE POLICY "public reads published projects" ON public.development_projects
  FOR SELECT TO anon, authenticated
  USING ("publishStatus" = 'PUBLISHED'::"ContentStatus");

DROP POLICY IF EXISTS "public reads project_padukuhan" ON public.project_padukuhan;
CREATE POLICY "public reads padukuhan of published projects" ON public.project_padukuhan
  FOR SELECT TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.development_projects p
    WHERE p.id = project_padukuhan."projectId"
      AND p."publishStatus" = 'PUBLISHED'::"ContentStatus"));
