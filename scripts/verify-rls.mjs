#!/usr/bin/env node
/**
 * Live RLS verification against the Supabase Data API.
 *
 * Proves, from the outside, that the anon role sees only what it should. This
 * is the operational counterpart to tests/rls-policy.test.ts: that suite
 * asserts the migration still *declares* the protections, this script asserts
 * the live database still *enforces* them.
 *
 * Run after any migration that touches grants, policies or publication state:
 *
 *   npm run db:verify:rls
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, loaded
 * by scripts/with-env.mjs. The key is never printed. Exits non-zero on any
 * failure so it can gate a deploy.
 */

const URL_BASE = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!URL_BASE || !ANON_KEY) {
  console.error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n' +
      'Run through the wrapper: npm run db:verify:rls',
  );
  process.exit(2);
}

const headers = { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` };
let passed = 0;
const failures = [];

function record(ok, label, detail = '') {
  if (ok) {
    passed += 1;
    console.log(`  PASS  ${label}`);
  } else {
    failures.push(`${label}${detail ? ` — ${detail}` : ''}`);
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function req(path, init = {}) {
  const res = await fetch(`${URL_BASE}/rest/v1/${path}`, { ...init, headers: { ...headers, ...init.headers } });
  let body = null;
  try {
    body = await res.json();
  } catch {
    /* empty body is normal for 204 */
  }
  return { status: res.status, body };
}

/**
 * Sensitive tables. Personal data, the authorization model, the audit trail,
 * storage paths and migration metadata: none has a client-side consumer, so
 * anything other than a denial is a regression.
 */
const DENIED = [
  'users',
  'roles',
  'permissions',
  'role_permissions',
  'audit_logs',
  'complaints',
  'complaint_attachments',
  'complaint_status_history',
  'complaint_categories',
  'media',
  'development_project_updates',
];

/** Public content that must remain reachable. */
const PUBLIC_READABLE = [
  'news',
  'padukuhan',
  'services',
  'documents',
  'budgets',
  'site_settings',
  'development_projects',
];

console.log('A. Sensitive tables are denied to anon');
for (const table of DENIED) {
  const { status } = await req(`${table}?select=*&limit=1`);
  record(status !== 200, `${table} denied`, status === 200 ? 'READABLE (regression)' : `HTTP ${status}`);
}

console.log('\nB. Unpublished content does not leak');
for (const [table, filter] of [
  ['news', 'status=eq.DRAFT'],
  ['news', 'status=eq.REVIEW'],
  ['news', 'status=eq.ARCHIVED'],
]) {
  const { body } = await req(`${table}?select=slug&${filter}`);
  const n = Array.isArray(body) ? body.length : -1;
  record(n === 0, `${table} ${filter} returns nothing`, n > 0 ? `${n} rows leaked` : '');
}

console.log('\nC. Published public content is still readable');
for (const table of PUBLIC_READABLE) {
  const { status, body } = await req(`${table}?select=id&limit=5`);
  const n = Array.isArray(body) ? body.length : 0;
  record(status === 200 && n > 0, `${table} readable`, status === 200 ? `${n} rows` : `HTTP ${status}`);
}

console.log('\nD. Internal columns are withheld');
{
  const withNote = await req('government_officials?select=positionTitle,internalNote&limit=1');
  record(withNote.status !== 200, 'internalNote is not selectable', `HTTP ${withNote.status}`);
  const withoutNote = await req('government_officials?select=positionTitle&limit=1');
  record(withoutNote.status === 200, 'public columns remain selectable', `HTTP ${withoutNote.status}`);
}

console.log('\nE. Writes are rejected');
{
  // Filters match no row, so a permitted write would still change nothing.
  const patch = await req('site_settings?key=eq.__rls_probe_no_such_key__', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ value: 'probe' }),
  });
  record(patch.status !== 204 && patch.status !== 200, 'UPDATE rejected', `HTTP ${patch.status}`);

  const del = await req('news?slug=eq.__rls_probe_no_such_slug__', { method: 'DELETE' });
  record(del.status !== 204 && del.status !== 200, 'DELETE rejected', `HTTP ${del.status}`);

  const ins = await req('site_settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ key: '__rls_probe__', value: 'x', type: 'STRING', group: 'probe', label: 'probe' }),
  });
  record(ins.status !== 201 && ins.status !== 200, 'INSERT rejected', `HTTP ${ins.status}`);
}

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length > 0) {
  console.error('\nRLS VERIFICATION FAILED:');
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
