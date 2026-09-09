# Kalurahan Margomulyo — Platform Digital

Platform digital resmi **Kalurahan Margomulyo**, Kapanewon Seyegan, Kabupaten
Sleman, Daerah Istimewa Yogyakarta.

Mencakup website publik, portal transparansi APBKal, direktori layanan publik,
kanal pengaduan warga, dan (menyusul) dashboard administrasi.

> **Ini platform pemerintahan, bukan proyek latihan.**
>
> Seluruh fakta tentang Margomulyo — nama pejabat, statistik, anggaran, layanan,
> dokumen — tunduk pada [`docs/SOURCE_DATA.md`](docs/SOURCE_DATA.md). Data yang
> bertentangan atau belum terverifikasi **sengaja ditahan**, bukan diisi dengan
> tebakan. Jangan pernah mengarang informasi pemerintahan.

---

## Prasyarat

| Kebutuhan | Versi | Catatan |
|---|---|---|
| Node.js | **20.12 atau lebih baru** | Lihat catatan di bawah |
| npm | 10+ | Ikut terpasang bersama Node |
| Database PostgreSQL | 15+ | Supabase (disarankan) atau Docker lokal |

> **Catatan soal versi Node.** `package.json` menyatakan `>=20.9.0`, tetapi
> `scripts/with-env.mjs` memakai `process.loadEnvFile()` yang baru ada sejak
> **Node 20.12**. Dengan Node 20.9–20.11, semua perintah `npm run db:*` akan
> gagal. Pakai 20.12+ atau 22 LTS.

---

## Setup

### Langkah 1 — Siapkan database Anda sendiri

**Setiap developer memakai project Supabase sendiri.** Jangan berbagi satu
database, dan jangan meminta file `.env.local` milik developer lain.

Alasannya konkret: file itu memuat `SUPABASE_SERVICE_ROLE_KEY`, yaitu kunci
yang **menembus seluruh Row Level Security** — bisa membaca, mengubah, dan
menghapus semua tabel tanpa terhalang proteksi apa pun. Mengirimkannya lewat
chat berarti kredensial itu tersimpan permanen di riwayat percakapan.

Berbagi database tidak diperlukan karena **seluruh data awal berasal dari
dokumen publik**. Tidak ada data pribadi warga dan tidak ada akun pengguna di
dalamnya, jadi database Anda dan rekan Anda akan berisi hal yang sama persis.

1. Buat project baru gratis di [supabase.com](https://supabase.com).
2. Buka **Project Settings → Database → Connection string**.
3. Salin **dua** connection string berbeda:
   - **Session pooler** — untuk `DATABASE_URL`
   - **Direct connection** — untuk `DIRECT_URL`

> **Kenapa harus Session Pooler, bukan Direct, untuk `DATABASE_URL`?**
>
> Host direct (`db.<ref>.supabase.co`) hanya punya alamat **IPv6**. Banyak
> jaringan rumah dan kantor di Indonesia belum punya rute IPv6, sehingga
> aplikasi gagal connect dengan `P1001: Can't reach database server`. Session
> pooler menyediakan alamat IPv4 dan bekerja di mana saja.
>
> `DIRECT_URL` tetap memakai host direct karena Prisma memerlukannya untuk
> *advisory lock* saat menjalankan migrasi.

### Langkah 2 — Isi konfigurasi

```bash
cp .env.example .env.local
```

Buka `.env.local` dan isi dengan nilai dari **project Anda sendiri**.

Yang **wajib** diisi agar aplikasi jalan:

| Variabel | Dipakai oleh | Keterangan |
|---|---|---|
| `DATABASE_URL` | Prisma (runtime) | Session pooler, IPv4 |
| `DIRECT_URL` | Prisma (migrasi) | Direct connection |
| `NEXT_PUBLIC_SITE_URL` | `src/lib/site.ts` | Boleh `http://localhost:3000` |

Yang **opsional** untuk saat ini:

| Variabel | Status |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Hanya dipakai `npm run db:verify:rls` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Belum dipakai kode mana pun.** Boleh dikosongkan |
| `COMPLAINT_TOKEN_SECRET` | Belum dipakai — menyusul di milestone pengaduan |
| `SUPABASE_BUCKET_PUBLIC`, `SUPABASE_BUCKET_PRIVATE` | Belum dipakai — menyusul di milestone storage |

Verifikasi sendiri kapan saja:

```bash
grep -rl "SUPABASE_SERVICE_ROLE_KEY" src prisma scripts   # tidak ada hasil
```

`.env.local` sudah masuk `.gitignore`. **Jangan pernah commit file ini.**

### Langkah 3 — Jalankan

```bash
npm install         # otomatis menjalankan prisma generate
npm run db:migrate  # membuat 42 tabel, 56 foreign key, 86 CHECK constraint
npm run db:seed     # mengisi data resmi Margomulyo
npm run dev
```

Buka <http://localhost:3000>.

Pastikan berhasil:

```bash
npm run db:status   # harus "Database schema is up to date!"
```

Setelah seed, database Anda berisi 13 padukuhan, 22 jabatan pemerintahan,
7 berita, 7 layanan, 6 dokumen, dan APBKal 2026.

Seed **sengaja tidak** membuat akun pengguna, data pengaduan, atau berkas media —
tidak ada kredensial baku dan tidak ada data warga fiktif.

---

## Alternatif: PostgreSQL lokal dengan Docker

Kalau ingin bekerja offline atau tanpa akun cloud:

```bash
docker run --name margomulyo-db \
  -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=margomulyo \
  -p 5432:5432 -d postgres:16
```

Lalu di `.env.local`:

```bash
DATABASE_URL="postgresql://postgres:devpassword@localhost:5432/margomulyo"
DIRECT_URL="postgresql://postgres:devpassword@localhost:5432/margomulyo"
```

Jalankan `npm run db:migrate && npm run db:seed` seperti biasa.

Perlu diketahui: kebijakan Row Level Security ikut terpasang, tetapi
`npm run db:verify:rls` tidak bisa dipakai karena skrip itu menguji lewat REST
API Supabase yang tidak ada di PostgreSQL biasa.

---

## Perintah

**Pengembangan**

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build |

**Kualitas** — semuanya harus lulus sebelum commit

| Perintah | Fungsi |
|---|---|
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (strict) |
| `npm run test` | Vitest |
| `npm run gates` | Keempatnya berurutan |

**Database** — semuanya lewat `scripts/with-env.mjs` yang memuat `.env.local`

| Perintah | Fungsi |
|---|---|
| `npm run db:status` | Status migrasi |
| `npm run db:migrate` | Terapkan migrasi |
| `npm run db:seed` | Isi data resmi (aman diulang) |
| `npm run db:studio` | Prisma Studio — GUI lokal untuk melihat/mengubah data |
| `npm run db:validate` | Validasi skema |
| `npm run db:verify:rls` | 26 pemeriksaan keamanan RLS langsung ke Supabase |

---

## Arsitektur

```
Browser
   ↓
Next.js Server Component
   ↓
src/server/queries/*        ← satu-satunya jalan baca data
   ↓
src/server/db.ts            ← PrismaClient tunggal, server-only
   ↓
Prisma
   ↓
PostgreSQL (Supabase)       ← RLS aktif sebagai lapisan kedua
```

| Direktori | Isi |
|---|---|
| `src/app/(public)/` | Halaman publik |
| `src/app/(admin)/` | Dashboard admin (masih kerangka) |
| `src/server/` | Akses database — **server-only** |
| `src/components/` | Komponen UI bersama |
| `src/lib/` | Utilitas murni (format, konfigurasi situs) |
| `prisma/` | Skema, migrasi, dan seed |
| `docs/` | Dokumentasi teknis dan tata kelola |

**Aturan batas yang tidak boleh dilanggar:**

- `src/server/*` mengimpor `server-only`. Mengimpornya dari client component
  akan menggagalkan build — itu memang tujuannya.
- Client component tidak boleh mengimpor Prisma atau `@/server/*`. Jika sebuah
  halaman butuh interaksi, pisahkan: `page.tsx` (server, ambil data) +
  `XxxView.tsx` (client, pegang state). Lihat `src/app/(public)/berita/`.
- Kueri publik selalu memfilter status publikasi di level aplikasi, meskipun
  RLS juga melindunginya. Dua lapis, bukan satu.

Detail lengkap: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Troubleshooting

### `PrismaClientInitializationError` / `P1001: Can't reach database server`

Penyebab paling umum: `DATABASE_URL` memakai host **direct** yang hanya punya
alamat IPv6, sedangkan jaringan Anda tidak punya rute IPv6.

Periksa:

```bash
nslookup db.YOUR-PROJECT-REF.supabase.co
```

Kalau hanya muncul alamat IPv6 (`2406:...`), ganti `DATABASE_URL` ke **Session
Pooler**.

Dua hal yang sering salah pada connection string pooler:

1. **Username harus `postgres.<project-ref>`**, bukan `postgres` saja.
2. **Region harus tepat.** Pooler bersifat per-region; salah region memberi
   pesan `Tenant or user not found` meskipun password benar. Salin langsung
   dari dashboard Supabase, jangan menebak.

Sejak halaman membaca database saat request, error ini muncul di **semua**
halaman. Ini disengaja: aplikasi tidak pernah diam-diam kembali ke data statis
saat database bermasalah, karena kegagalan yang tersembunyi jauh lebih berbahaya
di situs pemerintahan.

### `P1012: Environment variable not found: DIRECT_URL`

Prisma CLI hanya membaca `.env`, sedangkan proyek ini memakai `.env.local`.
Jalankan lewat skrip npm (`npm run db:migrate`), bukan `npx prisma` langsung —
`scripts/with-env.mjs` yang memuat file environment-nya.

Kalau tetap gagal, periksa versi Node: `process.loadEnvFile()` butuh 20.12+.

### Build gagal `JavaScript heap out of memory`

Bukan kesalahan kode. `next build` menjalankan beberapa worker sekaligus dan
membutuhkan RAM yang cukup. Tutup aplikasi berat (browser dengan banyak tab,
editor lain) lalu ulangi. Kalau tetap terjadi, kurangi paralelisme lewat
`experimental.cpus` di `next.config.mjs`.

### Halaman kosong atau data tidak muncul

Cek apakah seed sudah berjalan:

```bash
npm run db:studio
```

Tabel `padukuhan` seharusnya berisi 13 baris. Kalau kosong, jalankan
`npm run db:seed`.

---

## Status: yang sudah ada dan yang belum

**Sudah berjalan**

- Website publik — 22 route, membaca langsung dari PostgreSQL
- Skema database — 41 model, 3 migrasi terterap
- Keamanan database — RLS aktif di 42/42 tabel ([`docs/SECURITY_RLS.md`](docs/SECURITY_RLS.md))
- Aksesibilitas WCAG 2.2 AA dan desain responsif 320px ke atas

**Belum ada**

| Bagian | Keterangan |
|---|---|
| Autentikasi | Belum ada login sama sekali |
| Proteksi `/admin` | Halaman bisa dibuka tanpa login — **jangan deploy sebelum ini selesai** |
| Dashboard admin | Masih tampilan statis, belum ada satu pun form |
| Form pengaduan | **Belum tersimpan.** Menampilkan "berhasil" padahal tidak ada yang masuk ke database |
| Unggah berkas | Belum ada storage, termasuk foto pejabat |
| Audit log | Tabel sudah ada, tetapi belum pernah ditulis |
| Deployment | Belum dikonfigurasi |

Rencana pengerjaan berikutnya: [`docs/ADMIN_BACKEND_BUILD.md`](docs/ADMIN_BACKEND_BUILD.md).

---

## Dokumentasi

| Dokumen | Isi |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Aturan kerja di repositori ini |
| [`MASTER_PROMPT.md`](MASTER_PROMPT.md) | Kebutuhan platform secara menyeluruh |
| [`FULL_BUILD.md`](FULL_BUILD.md) | Spesifikasi implementasi |
| [`docs/SOURCE_DATA.md`](docs/SOURCE_DATA.md) | **Gerbang publikasi** — fakta terverifikasi, konflik sumber, data yang ditahan |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arsitektur yang benar-benar terpasang |
| [`docs/DESIGN_REFERENCE.md`](docs/DESIGN_REFERENCE.md) | Aturan visual dan token desain |
| [`docs/SECURITY_RLS.md`](docs/SECURITY_RLS.md) | Model keamanan database |
| [`docs/DEVELOPER_HANDOFF.md`](docs/DEVELOPER_HANDOFF.md) | Audit status menyeluruh |
| [`docs/ADMIN_BACKEND_BUILD.md`](docs/ADMIN_BACKEND_BUILD.md) | Rencana milestone berikutnya |
| [`docs/adr/`](docs/adr/) | Keputusan arsitektur beserta alasannya |

---

## Sebelum commit

```bash
npm run gates
```

Untuk perubahan yang menyentuh database atau kebijakan aksesnya, tambahkan:

```bash
npm run db:verify:rls
```

Jangan pernah melakukan commit terhadap `.env.local`, kredensial, atau fakta
tentang Margomulyo yang belum tercatat di `docs/SOURCE_DATA.md`.
