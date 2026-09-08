# SERVER DATA INTEGRATION — KALURAHAN MARGOMULYO

## ROLE

You are a Senior Full-Stack Engineer taking over the existing
Kalurahan Margomulyo government-scale web platform.

The database is now ACTIVE and verified.

Your task is to migrate the public website from static fixture data
to the existing server-side Prisma data layer.

This is a DATA INTEGRATION milestone.

It is NOT a UI redesign, authentication milestone, RBAC milestone,
or forms/mutations milestone.

---

# 1. CURRENT STATE

The project has successfully completed:

- source/data foundation
- design system
- public website UI
- Prisma schema
- initial database migration
- database activation
- database seed
- RLS security hardening

Current verified database state:

- 42 tables
- 56 foreign keys
- 86 CHECK constraints
- RLS enabled on 42/42 tables
- 30 public SELECT policies
- 12 sensitive/internal tables deny-by-default
- 179 existing tests before RLS
- 225 tests after RLS
- lint PASS
- typecheck PASS
- build PASS
- 24 routes

RLS migration:

    20260907120000_rls_security

The RLS security milestone is complete.

The database is currently populated with legitimate seed data including:

- 13 padukuhan
- 22 government positions
- 7 news records
- 7 services
- 6 transparency documents
- APBKal 2026

The seed intentionally does NOT create:

- users
- complaints
- fake citizen records

---

# 2. CURRENT ARCHITECTURE

Current application flow:

    page
      ↓
    src/data/fixtures.ts
      ↓
    presentation

Target architecture:

    Server Component / Server-side page
      ↓
    src/server/queries/*
      ↓
    src/server/db.ts
      ↓
    Prisma
      ↓
    Supabase PostgreSQL

Do not introduce a client-side Supabase database architecture.

Do not expose Prisma to the browser.

---

# 3. REQUIRED READING

Read before modifying code:

- CLAUDE.md
- MASTER_PROMPT.md
- PROJECT_CONTEXT.md
- FULL_BUILD.md
- docs/DEVELOPER_HANDOFF.md
- docs/ARCHITECTURE.md
- docs/SOURCE_DATA.md
- docs/DESIGN_REFERENCE.md
- docs/SECURITY_RLS.md
- prisma/schema.prisma
- src/data/fixtures.ts
- src/server/
- src/app/
- existing tests

Inspect the actual current repository state.

Do not assume the documentation is perfectly synchronized with
implementation.

If documentation and implementation differ, report the difference.

---

# 4. OBJECTIVE

Replace public-page fixture reads with real database reads through
the existing server-only data layer.

The UI should remain visually unchanged.

The user should not be able to distinguish whether the data came
from fixtures or PostgreSQL except where the database contains
different legitimate data.

---

# 5. SCOPE

Migrate public read-only domains first.

Priority:

1. Village profile
2. Government structure
3. Padukuhan
4. News
5. Services
6. Transparency
7. Development information
8. Village potential/local economy
9. Public statistics
10. Contact/public configuration where appropriate

Do NOT implement:

- authentication
- Supabase Auth
- login/register
- RBAC
- admin authorization
- complaint submission
- complaint tracking persistence
- contact form mutations
- Storage
- media upload
- audit log mutations
- admin CMS
- UI redesign

Those are separate milestones.

---

# 6. AUDIT EXISTING DATA LAYER

First inspect:

    src/server/db.ts
    src/server/serialize.ts
    src/server/padukuhan.ts
    src/server/transparency.ts
    src/server/content.ts
    src/server/profile.ts

Determine:

- which query functions already exist
- which queries are complete
- which queries are missing
- which queries still depend on fixtures
- whether returned data matches existing presentation types
- whether Decimal/date values are correctly serialized
- whether query functions are server-only

Do not duplicate existing query logic.

Reuse and improve existing server query modules where appropriate.

---

# 7. FIXTURE-TO-DATABASE MAPPING

Create an explicit migration matrix.

For every public fixture domain:

| Fixture | Database model | Query module | Public page | Status |
|---|---|---|---|---|

Examples:

    news fixture
        ↓
    News model
        ↓
    src/server/queries/content.ts
        ↓
    /berita

Do this for every migrated domain.

Do not silently omit fixture fields.

If a fixture field has no database equivalent:

1. identify it
2. determine whether it is intentionally static configuration
3. determine whether it should remain static
4. report it

Do NOT modify the schema just to make fixture parity easier.

---

# 8. PUBLICATION RULES

Respect the existing publication model.

Public pages must never query unpublished/private records.

The application-level query must explicitly request public/published
records where applicable, even though database RLS also protects the
Data API.

Defense in depth:

    Application query
        +
    Database RLS

Do not rely solely on RLS for application behavior.

---

# 9. SOURCE-DATA PUBLICATION GATE

Read:

    docs/SOURCE_DATA.md

The database seed intentionally withholds disputed source facts.

Do not reintroduce withheld values into the public website simply
because a database field exists.

Examples of intentionally withheld/conflicted source data must remain
withheld unless the source-of-truth documentation is explicitly updated.

Never invent missing Margomulyo facts.

---

# 10. SERVER-ONLY BOUNDARY

Maintain strict boundaries.

Allowed:

    Server Component
        ↓
    server query
        ↓
    Prisma

Not allowed:

    Client Component
        ↓
    Prisma

Not allowed:

    Browser
        ↓
    Supabase database

Not allowed:

    NEXT_PUBLIC_SUPABASE_* secrets used as a database authorization
    mechanism for sensitive data.

Do not import server-only modules into client components.

Keep `server-only` protections intact.

---

# 11. PAGE MIGRATION STRATEGY

Migrate pages incrementally.

For each page:

1. identify fixture imports
2. identify required database query
3. implement/reuse query
4. replace fixture usage
5. preserve existing component interfaces
6. preserve existing UI
7. run tests
8. run typecheck
9. inspect rendered output

Do not perform a giant global search-and-replace.

---

# 12. STATIC CONTENT DECISION

Not everything must come from PostgreSQL.

For each fixture dataset classify it as:

### DATABASE-BACKED

Data that belongs in PostgreSQL.

Examples:

- news
- services
- padukuhan
- government records
- transparency records
- development records
- public statistics

### STATIC CONFIGURATION

Data that is legitimately application configuration.

Examples may include:

- navigation structure
- design metadata
- static labels
- route configuration

### SOURCE-DOCUMENT CONTENT

Facts that are intentionally withheld or awaiting official verification.

These must remain governed by:

    docs/SOURCE_DATA.md

Do not force all fixture data into the database.

---

# 13. EMPTY STATE BEHAVIOR

The database may legitimately return zero records.

Do not fall back silently to fake fixture data.

Instead:

    database result = empty
        ↓
    intentional empty state

If a page requires a minimum record that should exist according
to the seed, fail loudly during development/testing.

Do not hide database failures by returning fixture data.

---

# 14. ERROR HANDLING

Database failures must not silently become fake content.

Do NOT do:

    try database
    catch
        return fixtures

That would make production failures invisible.

Use proper error handling and existing Next.js error boundaries
where appropriate.

---

# 15. PERFORMANCE

Use Prisma efficiently.

Avoid:

- N+1 queries
- querying entire tables unnecessarily
- repeated identical queries in the same render
- fetching sensitive columns unnecessarily
- loading unpublished records only to filter them in JavaScript

Prefer:

- `select`
- `include` only when needed
- database filtering
- ordering at database level
- pagination where applicable
- existing Next.js caching/revalidation patterns where appropriate

Do not prematurely introduce Redis or another caching system.

---

# 16. SERIALIZATION

Prisma values must remain safe for Next.js boundaries.

Pay particular attention to:

- Decimal
- Date
- UUID
- nullable values
- nested relations

Use the existing serializer utilities where appropriate.

Do not convert everything blindly to strings.

Presentation types should remain semantically correct.

---

# 17. NEWS MIGRATION

News is a critical first integration candidate.

Verify:

- published news appears
- draft news does not appear
- author relationship works where appropriate
- publication date works
- slug works
- detail route works
- empty state works

The public website must not expose the withheld draft headlines.

---

# 18. TRANSPARENCY MIGRATION

Verify:

- APBKal 2026 appears correctly
- transparency documents appear correctly
- withheld/conflicting source values remain withheld
- financial values use proper Decimal handling
- publication state is respected
- document records do not expose private storage paths

Do not implement document downloads in this milestone unless an existing
safe public-document mechanism already exists.

Storage is a later milestone.

---

# 19. PADUKUHAN MIGRATION

The source of truth contains:

- 13 padukuhan
- 28 RW

Per-padukuhan RW/RT data has known source conflicts and must remain
withheld where required by `docs/SOURCE_DATA.md`.

Do not reconstruct disputed counts from incomplete data.

---

# 20. PRESERVE EXISTING UI

This milestone is NOT UI work.

Do not change:

- typography
- spacing
- colors
- layout
- breakpoints
- component design
- animations
- responsive behavior
- accessibility patterns

Only change the data source and the minimum code necessary to support
real database data.

If a UI problem is discovered, document it separately instead of
fixing it opportunistically.

---

# 21. TESTING

Add or update tests for migrated query functions.

Test:

- correct database mapping
- publication filtering
- empty results
- serialization
- relations
- error behavior
- no fixture fallback

Existing RLS tests must remain intact.

Run:

    npm run lint
    npm run typecheck
    npm run test
    npm run build

Also run:

    git diff --check

---

# 22. FIXTURE USAGE AUDIT

After migration, search the entire application for:

    from "@/data/fixtures"
    from "@/data/fixtures.ts"
    fixtures
    fixture

Classify every remaining usage:

- migrated and removable
- intentionally static
- test fixture
- source-document fixture
- still requires migration

Do NOT delete `fixtures.ts` until the audit confirms that it is no
longer required.

---

# 23. ROUTE COVERAGE

Verify every existing public route that currently displays
fixture-backed data.

Pay particular attention to:

- /
- /profil
- /pemerintahan
- /berita
- /berita/[slug]
- /layanan
- /transparansi
- /pembangunan
- /potensi
- /padukuhan
- /statistik

If a route does not currently exist, do not invent it during this
milestone.

Report route/documentation mismatches.

---

# 24. BROWSER VERIFICATION

After migration, run browser smoke testing for representative routes.

Verify at minimum:

Desktop:

    1280 × 800
    1440 × 900

Mobile:

    390 × 844
    320 × 844

Check:

- real DB content appears
- no loading loops
- no runtime errors
- no hydration errors
- no overflow
- no broken links
- no draft/private content leaks
- no visual regressions

Do not redesign anything discovered during smoke testing.

---

# 25. DATABASE VERIFICATION

Before completion verify that the application is genuinely reading
from PostgreSQL.

Do not merely verify that Prisma can connect.

Demonstrate at least several representative page/query paths:

    page
      ↓
    server query
      ↓
    Prisma
      ↓
    Supabase PostgreSQL

Record the verification in the final report.

---

# 26. SECURITY VERIFICATION

Search for accidental client exposure:

- Prisma imports inside client components
- server query imports inside client components
- direct Supabase REST usage
- direct database URLs in client code
- service role key usage
- anonymous database access from browser

Do not expose credential values in logs.

---

# 27. DOCUMENTATION

Update:

    docs/DEVELOPER_HANDOFF.md

to reflect:

- database activation complete
- RLS complete
- server data integration progress
- migrated domains
- remaining fixture usage
- known limitations

Update:

    docs/ARCHITECTURE.md

if the actual data flow changed.

Create if useful:

    docs/DATA_INTEGRATION.md

Document the final:

    Page → Query → Prisma → PostgreSQL

architecture.

Write documentation as a professional engineering document.

Do not produce raw AI notes.

---

# 28. STOP CONDITIONS

STOP and report instead of guessing if:

- a database field does not map cleanly to a fixture field
- source-data publication rules conflict with database contents
- a query requires schema changes
- a page requires authentication
- a page requires RBAC
- a missing relation makes the data model ambiguous
- database behavior contradicts documentation
- a migration appears necessary
- a fixture contains data that was intentionally withheld

Do not solve unrelated architecture problems during this milestone.

---

# 29. DEFINITION OF DONE

This milestone is complete only when:

- public database-backed pages use Prisma/server queries
- no public page silently falls back to fixtures
- publication filtering works
- sensitive data remains inaccessible
- source-data publication gates remain intact
- server-only boundaries remain intact
- Prisma integration works
- tests pass
- lint passes
- typecheck passes
- build passes
- browser smoke tests pass
- documentation is updated
- remaining fixture usage is explicitly classified

---

# 30. FINAL REPORT

Provide:

## Integration Status

- completed domains
- remaining domains
- remaining fixture usage

## Data Flow

Show:

    Page
      ↓
    Server Query
      ↓
    Prisma
      ↓
    Supabase PostgreSQL

## Changed Files

List every changed file.

## Database Queries

List the query modules/functions used.

## Security Verification

Confirm:

- no client Prisma
- no direct sensitive Supabase access
- no service-role exposure
- publication filtering intact

## Quality Gates

Report:

- lint
- typecheck
- Vitest
- build
- browser smoke tests

## Remaining Risks

Clearly distinguish:

- Auth
- RBAC
- complaints
- forms
- Storage
- audit logging
- deployment

These remain future milestones.

## Commit Recommendation

Do NOT commit automatically.

Provide a recommended commit message.

---

# EXECUTION RULE

Audit first.

Map fixtures to real database models.

Migrate incrementally.

Verify each domain.

Do not redesign the UI.

Do not implement authentication.

Do not implement RBAC.

Do not implement mutations.

Do not delete fixtures prematurely.

Never use fake fallback data to hide database failures.

Never invent Margomulyo facts.

Never expose sensitive data.

Never reset the database.