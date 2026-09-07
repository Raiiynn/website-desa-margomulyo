# SECURITY_RLS.md — Database access control

**Scope:** Row Level Security and privilege configuration for the Supabase
PostgreSQL database backing the Kalurahan Margomulyo platform.

**Migration:** `prisma/migrations/20260907120000_rls_security/`
**Applied:** 7 September 2026
**Audited against:** the live project database, not documentation.

This document records what is enforced today and what is deliberately deferred.
It is not a plan. Where a control depends on a milestone that does not exist yet
(authentication, RBAC, Storage), that is stated as a limitation rather than
described as if it were implemented.

---

## 1. Why this work was necessary

Supabase grants every privilege on every table in the `public` schema to the
`anon` and `authenticated` roles by default, and publishes them through the
PostgREST Data API. Nothing in this repository asked for that; it is the
platform default applied to tables created by `postgres`.

The consequence was verified directly against the live project using only the
`anon` key — the key that is designed to be public and shipped to browsers:

| Probe | Result before hardening |
|---|---|
| `GET /rest/v1/permissions` | `200` — the full permission catalogue |
| `GET /rest/v1/role_permissions` | `200` — the complete OWNER/ADMIN/EDITOR/OPERATOR mapping |
| `GET /rest/v1/news?status=eq.DRAFT` | `200` — both unpublished articles, including headlines withheld under `SOURCE_DATA` V11 |
| `GET /rest/v1/government_officials` | `200` — `internalNote`, containing unresolved internal governance questions |
| `GET /rest/v1/users` | `200` |
| `GET /rest/v1/audit_logs` | `200` |
| `GET /rest/v1/complaints` | `200` |
| `PATCH /rest/v1/site_settings` | `204` — **writes accepted** |

`users`, `audit_logs` and `complaints` disclosed nothing only because they were
still empty. The grant inventory showed `anon` holding `INSERT`, `UPDATE`,
`DELETE` and `TRUNCATE` on all 42 tables, so the exposure was not read-only:
anyone holding the anon key could have deleted the database contents.

For a platform whose purpose includes citizen complaints (`reporterName`,
`reporterEmail`, `reporterPhone`, `internalNotes`) and a publication gate that
deliberately withholds disputed facts, this was the most serious defect in the
system.

---

## 2. Security model

Authorization is layered, and the layers are not interchangeable:

```
Browser
   |
Next.js server  <-- primary authorization boundary (application code)
   |
Prisma
   |
PostgreSQL      <-- RLS + privileges: defense in depth
```

**Application authorization remains primary.** RLS does not know which staff
member is acting, what the CMS workflow permits, or whether a complaint may be
viewed by a given operator. Those decisions belong in server code and, from
Phase 3, in the RBAC layer.

**RLS and grants protect the database access path.** They exist because the
Supabase Data API is reachable independently of the application. Even with a
perfect Next.js authorization layer, an open PostgREST endpoint bypasses it
entirely. The database must therefore be safe on its own terms.

---

## 3. How Prisma interacts with RLS

This was measured, not assumed, because getting it wrong would either break the
application or leave it falsely believing it is protected.

```
current_user        postgres
session_user        postgres
rolsuper            false
rolbypassrls        true      <-- Prisma is never subject to RLS
table ownership     postgres owns all 42 tables
```

Two independent reasons make Prisma immune to these policies:

1. `postgres` carries the `BYPASSRLS` attribute.
2. `postgres` owns every table, and PostgreSQL exempts table owners from RLS
   unless `FORCE ROW LEVEL SECURITY` is set.

**`FORCE ROW LEVEL SECURITY` is deliberately not used.** The owner path is the
authorized server path; subjecting it to policies would add a second, redundant
authorization model in a place where the application already decides, and any
mistake in it would silently hide rows from the CMS.

Verified after the migration: Prisma still reads all 7 news rows including the
2 `DRAFT` articles, the full 18-row permission catalogue, all 24 site settings
(public and private), and `government_officials.internalNote`.

**Implication for future work:** if the platform ever adds `@supabase/supabase-js`
and reads through the Data API, these policies stop being defense-in-depth and
become load-bearing application logic. `tests/rls-policy.test.ts` asserts that
no `@supabase/*` package is installed, so that shift cannot happen silently.

---

## 4. Table classification

All 42 tables were classified before any policy was written. Two tables that
might look public are deliberately not — the reasoning is given inline.

### Class A — Public government information (30 tables)

Readable by `anon` through the Data API, filtered by publication state. These
are the facts the platform exists to publish.

| Table | Public read condition |
|---|---|
| `news` | `status = PUBLISHED AND publishedAt IS NOT NULL` |
| `agenda`, `pages`, `services`, `documents`, `local_potentials`, `umkm`, `budgets` | `status = PUBLISHED` |
| `demographic_snapshots` | `isPublished = true` |
| `site_settings` | `isPublic = true` |
| `government_officials` | `isActive = true`, **plus a column-level grant excluding `internalNote`** |
| `budget_lines`, `budget_realizations`, `budget_cycle_stages` | parent `budgets.status = PUBLISHED` |
| `umkm_products` | parent `umkm.status = PUBLISHED` |
| `padukuhan`, `village_institutions`, `village_missions`, `governance_pillars`, `leadership_terms`, `religion_counts`, `education_counts`, `occupation_counts`, `news_categories`, `service_categories`, `service_procedure_steps`, `service_channels`, `local_potential_categories`, `development_projects`, `project_padukuhan` | readable — every row is public by nature |

Two decisions worth stating explicitly:

- **Child tables inherit the parent gate.** Without the `EXISTS` subquery, the
  line items of an unpublished budget would remain readable on their own,
  reconstructing a draft budget from its parts.
- **`development_projects.status` is not a publication gate.** It is
  `ProjectStatus` (`PLANNED` / `IN_PROGRESS` / `COMPLETED`) — a lifecycle
  stage. Filtering on it would hide planned projects from a transparency
  portal, which inverts the intent. A row-level condition here would be
  theatre, so the policy is a plain readable one.

### Class B / C — Personal, privileged and internal (11 tables)

No Data API access at all: `REVOKE ALL` plus RLS with no policy.

| Table | Why |
|---|---|
| `users` | staff PII (`email`) |
| `roles`, `permissions`, `role_permissions` | the authorization model itself; disclosing it hands an attacker the map |
| `audit_logs` | the security trail, plus `actorEmail` and `ipAddress` |
| `complaints` | citizen PII and `internalNotes`; private by construction — the schema has no `isPublic` column by design |
| `complaint_attachments`, `complaint_status_history` | inherit the sensitivity of the complaint |
| `complaint_categories` | no client-side consumer; kept with the complaint family rather than exposed for symmetry alone |
| `media` | storage paths, including future private-bucket paths for complaint attachments |
| `development_project_updates` | authored by staff, carries `createdById`, and has no publication column to gate on |

### Class D — System (1 table)

| Table | Handling |
|---|---|
| `_prisma_migrations` | `REVOKE ALL`; migration history is internal infrastructure |

---

## 5. Controls applied

The migration applies two independent layers, because either alone is brittle.

**1. Privilege layer.** `REVOKE` removes the Data API path outright. A revoked
privilege cannot be re-enabled by a policy mistake.

- Every write privilege (`INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`,
  `REFERENCES`, `TRIGGER`) revoked from `anon` and `authenticated` on **all**
  tables. There is no legitimate client-side write path in this architecture;
  every mutation is a server action behind application authorization.
- `REVOKE ALL` on the 12 Class B/C/D tables.
- Column-level `GRANT SELECT (…)` on `government_officials`, listing the 14
  public columns and omitting `internalNote`. RLS filters rows, not columns, so
  this is the only mechanism that withholds a single field.

**2. Policy layer.** RLS is enabled on all 42 tables. With RLS on and no
permissive policy, the result is deny-by-default. This matters because grants
can come back: a click in the Supabase dashboard, or a future migration adding
a table.

**3. Future tables default to closed.**
`ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM anon,
authenticated` removes the default that caused this exposure. A table added by
a later migration is unreachable through the Data API until someone grants
access deliberately.

`service_role` retains its grants. It bypasses RLS by design and is the
intended privileged server path. `SUPABASE_SERVICE_ROLE_KEY` is currently
declared in the environment but read by no code; it must never gain a
`NEXT_PUBLIC_` prefix or reach the browser.

---

## 6. Verification

Two complementary layers, because a static check cannot prove enforcement and a
live check cannot run in CI without credentials.

**`tests/rls-policy.test.ts` — 46 tests, no network.** Asserts the migration
still declares every protection: write revocation, per-table denials, the
publication conditions, parent-gated child policies, the column-level grant,
absence of `FORCE ROW LEVEL SECURITY`, and absence of any `@supabase/*`
dependency. Runs in the standard gate.

**`npm run db:verify:rls` — live, against the real Data API.** Proves
enforcement from the outside using the anon key. 26 checks:

```
A. 11 sensitive tables denied            all 401
B. DRAFT / REVIEW / ARCHIVED news        0 rows
C. 7 public tables still readable        rows returned
D. internalNote not selectable           401
   public columns still selectable       200
E. UPDATE / DELETE / INSERT rejected     401
```

Run it after any migration touching grants, policies or publication state. It
exits non-zero on failure, so it can gate a deploy.

---

## 7. Known limitations

These are consequences of milestones that do not exist yet. None is a defect in
the RLS configuration itself.

| Limitation | Depends on |
|---|---|
| No per-user row filtering. Policies distinguish public from non-public, not "this operator may see this complaint". | Phase 3 authentication + RBAC |
| `authenticated` is treated exactly like `anon`. There are no authenticated users yet, and granting that role anything before Supabase Auth exists would be granting to nobody, or to anyone who later signs up. | Phase 3 authentication |
| `/admin` is still reachable without login. RLS does not protect an application route; the database is safe, the page is not. | Phase 3 authentication |
| Complaint tracking tokens are still generated in the browser with `Math.random()` and nothing is persisted. The `complaints` table is protected but unused. | Phase 8 complaint workflow |
| Storage buckets are unconfigured. `media` is locked down, but no bucket policy or signed-URL path exists yet. | Storage milestone |
| Audit log writes do not happen. The table is protected and empty; nothing appends to it. | Phase 3 RBAC |
| No rate limiting or CSRF protection on the application surface. | Phase 8 |

---

## 8. Requirements for the authentication milestone

When Supabase Auth lands, this configuration must be revisited deliberately —
not extended by reflex:

1. **Decide whether `authenticated` should receive any grant at all.** If staff
   continue to work through the Next.js server, the answer is no, and the
   current posture stands unchanged.
2. **If any client-side read is introduced,** policies must key on
   `auth.uid()` and the staff role, and the "primary boundary" claim in §2 must
   be re-examined, because the Data API would then serve real users.
3. **`users.id` must align with `auth.users.id`.** The schema already types it
   as `uuid` for this reason.
4. **Complaint access must remain server-side.** A citizen retrieves their own
   complaint by presenting a token that is verified against
   `trackingTokenHash`; that comparison belongs in server code, not in a
   policy, and the token must never be stored in plaintext.
