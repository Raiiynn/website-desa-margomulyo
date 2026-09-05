/**
 * Roles and permissions.
 *
 * NOT government content — this is application configuration, so it is not
 * governed by docs/SOURCE_DATA.md. The four roles come from FULL_BUILD §12;
 * the permission keys extend that section's worked examples to cover every
 * admin module in FULL_BUILD §11.
 *
 * No user accounts are seeded. Users are created through Supabase Auth in
 * Phase 3; seeding a default administrator with a known password would be a
 * standing credential in a public-sector system.
 */

export const ROLES = [
  {
    key: 'OWNER',
    name: 'Owner',
    rank: 1,
    description:
      'Otoritas administratif tertinggi. Dapat mengelola peran dan seluruh modul.',
  },
  {
    key: 'ADMIN',
    name: 'Administrator',
    rank: 2,
    description:
      'Mengelola seluruh konten, layanan, transparansi, dan pengguna.',
  },
  {
    key: 'EDITOR',
    name: 'Editor',
    rank: 3,
    description: 'Menyusun dan menerbitkan konten publik.',
  },
  {
    key: 'OPERATOR',
    name: 'Operator',
    rank: 4,
    description: 'Menangani pengaduan dan aspirasi warga.',
  },
] as const;

export const PERMISSIONS = [
  { key: 'news.create', group: 'news', description: 'Membuat berita' },
  { key: 'news.update', group: 'news', description: 'Mengubah berita' },
  { key: 'news.publish', group: 'news', description: 'Menerbitkan berita' },
  { key: 'news.delete', group: 'news', description: 'Menghapus berita' },
  { key: 'agenda.manage', group: 'content', description: 'Mengelola agenda' },
  { key: 'pages.manage', group: 'content', description: 'Mengelola halaman statis' },
  { key: 'media.manage', group: 'content', description: 'Mengelola media' },
  { key: 'services.manage', group: 'services', description: 'Mengelola layanan publik' },
  { key: 'complaints.view', group: 'complaints', description: 'Melihat pengaduan dan aspirasi' },
  { key: 'complaints.update', group: 'complaints', description: 'Memproses pengaduan dan aspirasi' },
  { key: 'documents.manage', group: 'transparency', description: 'Mengelola dokumen publik' },
  { key: 'transparency.manage', group: 'transparency', description: 'Mengelola APBKal dan pembangunan' },
  { key: 'potential.manage', group: 'potential', description: 'Mengelola potensi desa dan UMKM' },
  { key: 'government.manage', group: 'government', description: 'Mengelola struktur pamong dan padukuhan' },
  { key: 'settings.manage', group: 'settings', description: 'Mengubah pengaturan situs' },
  { key: 'users.manage', group: 'users', description: 'Mengelola pengguna' },
  { key: 'roles.manage', group: 'users', description: 'Mengelola peran dan hak akses' },
  { key: 'audit_logs.view', group: 'audit', description: 'Melihat log audit' },
] as const;

export type PermissionKey = (typeof PERMISSIONS)[number]['key'];

const ALL: PermissionKey[] = PERMISSIONS.map((p) => p.key);

const CONTENT: PermissionKey[] = [
  'news.create',
  'news.update',
  'news.publish',
  'news.delete',
  'agenda.manage',
  'pages.manage',
  'media.manage',
  'potential.manage',
];

/**
 * Role → permission grants.
 *
 * OWNER holds everything. ADMIN holds everything except `roles.manage`, so
 * that redefining the permission model itself stays with the highest
 * authority (FULL_BUILD §12). EDITOR is content-only. OPERATOR handles
 * citizen submissions and nothing else — the least privilege that still lets
 * the complaints desk work.
 */
export const ROLE_PERMISSIONS: Record<string, PermissionKey[]> = {
  OWNER: ALL,
  ADMIN: ALL.filter((key) => key !== 'roles.manage'),
  EDITOR: CONTENT,
  OPERATOR: ['complaints.view', 'complaints.update'],
};
