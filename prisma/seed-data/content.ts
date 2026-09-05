/**
 * News, agenda and public services.
 *
 * Publication decisions taken here, all traceable to docs/SOURCE_DATA.md:
 *
 *   * Two articles are seeded as DRAFT, not PUBLISHED. Their headlines are
 *     cut off by the source layout (V11), and a truncated headline is not the
 *     article's title. They exist so the kalurahan can complete them; they do
 *     not reach the public site.
 *
 *   * Article bodies are the source's own excerpt text where no fuller text
 *     was published. That is verbatim source content, merely incomplete —
 *     writing a plausible article body would be fabrication.
 *
 *   * Two of the four agenda items are NOT seeded at all: the IKD Mangsel
 *     item has no legible day (V12) and the bansos verification item states
 *     only an end date. An agenda entry with an invented date is worse than
 *     an absent one.
 *
 *   * No article, service or agenda count is recorded anywhere. Conflicts
 *     C02 and C04 have the source claiming 28 services and 24 articles while
 *     documenting 7 of each; totals are derived from real rows.
 */

/**
 * SOURCE_DATA §3.7.
 *
 * `isFilter` marks the six categories that appear on the source's filter row
 * (p4). Three further categories appear only as labels on article cards. See
 * the new verification item V20 — the source's taxonomy is not self-consistent,
 * so both sets are preserved rather than one being forced into the other.
 */
export const NEWS_CATEGORIES = [
  { name: 'Pemerintahan', slug: 'pemerintahan', isFilter: true, sortOrder: 1 },
  { name: 'Bantuan Sosial', slug: 'bantuan-sosial', isFilter: true, sortOrder: 2 },
  { name: 'Pembangunan', slug: 'pembangunan', isFilter: true, sortOrder: 3 },
  { name: 'Kebudayaan', slug: 'kebudayaan', isFilter: true, sortOrder: 4 },
  { name: 'Pelayanan Publik', slug: 'pelayanan-publik', isFilter: true, sortOrder: 5 },
  { name: 'Pengumuman', slug: 'pengumuman', isFilter: true, sortOrder: 6 },
  { name: 'Prestasi Sleman', slug: 'prestasi-sleman', isFilter: false, sortOrder: 7 },
  { name: 'Sosial & Kemasyarakatan', slug: 'sosial-kemasyarakatan', isFilter: false, sortOrder: 8 },
  { name: 'Masyarakat', slug: 'masyarakat', isFilter: false, sortOrder: 9 },
] as const;

export const NEWS = [
  {
    slug: 'sinergi-dinsos-dan-pamong-margomulyo-salurkan-beras-bagi-1956-kpm',
    title: 'Sinergi Dinsos dan Pamong Margomulyo Salurkan Beras Bagi 1.956 KPM',
    categorySlug: 'bantuan-sosial',
    publishedAt: '2026-09-01',
    status: 'PUBLISHED',
    bylineLabel: 'Tim Liputan Margomulyo',
    excerpt:
      'Pemerintah Kalurahan Margomulyo bekerja sama dengan Dinas Sosial Kabupaten Sleman telah sukses menyalurkan Cadangan Beras Pemerintah tahap ketiga kepada 1.956 Keluarga Penerima Manfaat secara tertib dan transparan.',
    body:
      'Pemerintahan Kalurahan Margomulyo bekerja sama dengan Dinas Sosial Kabupaten Sleman telah sukses menyalurkan Cadangan Beras Pemerintah tahap ketiga kepada 1.956 Keluarga Penerima Manfaat secara tertib, transparan, dan tepat sasaran di Balai Kalurahan.',
  },
  {
    slug: 'bawa-nama-sleman-di-ajang-apresiasi-widya-manggala-praja',
    title: 'Bawa Nama Sleman di Ajang Apresiasi Widya Manggala Praja',
    categorySlug: 'prestasi-sleman',
    publishedAt: '2026-08-31',
    status: 'PUBLISHED',
    bylineLabel: null,
    excerpt: 'Margomulyo sukses melaju ke tahap final evaluasi tata kelola desa teladan tingkat provinsi.',
    body: 'Margomulyo sukses melaju ke tahap final evaluasi tata kelola desa teladan tingkat provinsi.',
  },
  {
    slug: '14-tahun-keistimewaan-diy-meneguhkan-kalurahan-mandiri-budaya',
    title: '14 Tahun Keistimewaan DIY: Meneguhkan Kalurahan Mandiri Budaya',
    categorySlug: 'kebudayaan',
    publishedAt: '2026-08-30',
    status: 'PUBLISHED',
    bylineLabel: null,
    excerpt: 'Peringatan keistimewaan DIY diramaikan pagelaran seni tradisional jathilan.',
    body: 'Peringatan keistimewaan DIY diramaikan pagelaran seni tradisional jathilan.',
  },
  {
    slug: 'hari-yang-dinanti-tiba-tim-juri-widya-manggala-praja-sambangi-margomulyo',
    title: 'Hari yang Dinanti Tiba! Tim Juri Widya Manggala Praja Besok Sambangi Margomulyo',
    categorySlug: 'pemerintahan',
    publishedAt: '2026-08-28',
    status: 'PUBLISHED',
    bylineLabel: null,
    excerpt: 'Seluruh pamong dan kader masyarakat telah merampungkan berkas portofolio serta gelar kesiapan.',
    body: 'Seluruh pamong dan kader masyarakat telah merampungkan berkas portofolio serta gelar kesiapan.',
  },
  {
    slug: 'hampir-separuh-warga-margomulyo-tercover-perlinsos-2394-kk-resmi-teraktivasi',
    title: 'Hampir Separuh Warga Margomulyo Tercover Perlinsos, 2.394 KK Resmi Teraktivasi',
    categorySlug: 'sosial-kemasyarakatan',
    publishedAt: '2026-08-24',
    status: 'PUBLISHED',
    bylineLabel: null,
    excerpt: 'Pemutakhiran basis data perlindungan sosial berhasil mencatatkan 2.394 Kepala Keluarga.',
    body: 'Pemutakhiran basis data perlindungan sosial berhasil mencatatkan 2.394 Kepala Keluarga.',
  },
  {
    // DRAFT — headline truncated in the source (V11).
    slug: 'gegap-gempita-kemerdekaan-warga-13-padukuhan-rayakan',
    title: 'GEGAP GEMPITA KEMERDEKAAN! Warga 13 Padukuhan Rayakan',
    categorySlug: 'masyarakat',
    publishedAt: null,
    status: 'DRAFT',
    bylineLabel: null,
    excerpt: 'Mulai dari karnaval kostum daur ulang, bazar kuliner UMKM lokal, hingga pentas reog anak.',
    body: 'Mulai dari karnaval kostum daur ulang, bazar kuliner UMKM lokal, hingga pentas reog anak.',
  },
  {
    // DRAFT — headline truncated in the source (V11).
    slug: 'akselerasi-pelayanan-publik-buka-layanan-aktivasi-identitas',
    title: 'Akselerasi Pelayanan Publik: Buka Layanan Aktivasi Identitas',
    categorySlug: 'pelayanan-publik',
    publishedAt: null,
    status: 'DRAFT',
    bylineLabel: null,
    excerpt: 'Warga kini cukup membawa ponsel pintar dan e-KTP untuk mengaktifkan dokumen kependudukan digital.',
    body: 'Warga kini cukup membawa ponsel pintar dan e-KTP untuk mengaktifkan dokumen kependudukan digital.',
  },
] as const;

/** SOURCE_DATA §3.7. Only items with a fully legible date are seeded. */
export const AGENDA = [
  {
    slug: 'rakor-pamong-2026-09-05',
    title: 'Rakor Pamong',
    label: 'Rakor Pamong',
    description: 'Rapat Koordinasi Rutin Pamong & Dukuh.',
    startsAt: '2026-09-05T08:30:00+07:00',
    location: 'Ruang Rapat Balai Kalurahan Margomulyo',
    status: 'PUBLISHED',
  },
  {
    slug: 'evaluasi-sanitasi-posyandu-2026-09-08',
    title: 'Evaluasi Sanitasi & Posyandu Terintegrasi',
    label: 'Kesehatan Warga',
    description: 'Evaluasi sanitasi dan Posyandu terintegrasi bersama kader padukuhan.',
    startsAt: '2026-09-08T08:00:00+07:00',
    location: 'Puskesmas Pembantu Margomulyo',
    status: 'PUBLISHED',
  },
] as const;

/** SOURCE_DATA §3.6. */
export const SERVICE_CATEGORIES = [
  { name: 'Kependudukan', slug: 'kependudukan', sortOrder: 1, description: 'NIK, KTP-el, KK, KIA, Pindah Datang wilayah Sleman & NKRI.' },
  { name: 'Surat Keterangan', slug: 'surat-keterangan', sortOrder: 2, description: 'Surat Kematian, Domisili, Pengantar, Usaha, dan surat kilat.' },
  { name: 'Layanan Mandiri', slug: 'layanan-mandiri', sortOrder: 3, description: 'Integrasi Mitra Posyanduku dan Inovasi Lukadesi Sleman.' },
  { name: 'Aspirasi & Lapor', slug: 'aspirasi-lapor', sortOrder: 4, description: 'Kanal respon cepat keluhan pamong dan pengaduan pungli.' },
] as const;

/**
 * SOURCE_DATA §3.6 — seven services, every one Rp 0.
 *
 * `procedure` is null throughout: the source shows a single global 4-step SOP
 * and a per-service "Rincian Prosedur" link with no content behind it.
 */
export const SERVICES = [
  {
    slug: 'sinkronisasi-data-nik',
    code: '01',
    badge: null,
    name: 'Sinkronisasi Data NIK',
    categorySlug: 'kependudukan',
    description: 'Penyelarasan NIK yang tidak terdeteksi pada BPJS, perbankan, atau instansi pusat agar terkonsolidasi nasional.',
    requirements: 'Scan/foto KK dan/atau KTP-el asli yang masih berlaku',
    duration: 'Maksimal 2 hari kerja',
    output: 'NIK aktif & terkonsolidasi nasional',
    method: 'Daring / Loket Kalurahan',
    sortOrder: 1,
  },
  {
    slug: 'pindah-datang-penduduk-nkri',
    code: '02',
    badge: null,
    name: 'Pindah Datang Penduduk NKRI',
    categorySlug: 'kependudukan',
    description: 'Penerimaan warga baru yang bertempat tinggal di wilayah Kalurahan Margomulyo dari luar kabupaten/provinsi.',
    requirements: 'Scan SKPWNI asli asal, KK tujuan, surat izin pemilik rumah',
    duration: 'Maksimal 2 hari kerja',
    output: 'KK baru & SK Pindah Datang',
    method: 'Tatap muka / Lukadesi',
    sortOrder: 2,
  },
  {
    slug: 'surat-keterangan-kematian',
    code: null,
    badge: 'Layanan Kilat',
    name: 'Surat Keterangan Kematian',
    categorySlug: 'surat-keterangan',
    description: 'Penerbitan surat keterangan meninggal dunia untuk pencatatan sipil, ahli waris, perbankan, dan asuransi.',
    requirements: 'Pengantar RT/RW, Keterangan Medis/RS/Pamong, FC KTP almarhum & KK',
    duration: '30 menit (Layanan Kilat)',
    output: 'Surat Keterangan Kematian resmi',
    method: 'Loket Pelayanan Terpadu',
    sortOrder: 3,
  },
  {
    slug: 'formulir-f-1-02-pendaftaran-peristiwa',
    code: '04',
    badge: null,
    name: 'Formulir F-1.02 (Pendaftaran Peristiwa)',
    categorySlug: 'kependudukan',
    description: 'Pencatatan awal biodata keluarga dan pembaruan peristiwa kependudukan untuk pelaporan adminduk resmi.',
    requirements: 'Kartu Keluarga lama, KTP pemohon, berkas pendukung',
    duration: '20 menit',
    output: 'Berkas F-1.02 tervalidasi pamong',
    method: 'Tatap muka / Daring',
    sortOrder: 4,
  },
  {
    slug: 'formulir-f-1-15-perubahan-data',
    code: '05',
    badge: null,
    name: 'Formulir F.1-15 (Perubahan Data)',
    categorySlug: 'kependudukan',
    description: 'Koreksi ejaan nama, tanggal lahir, status pernikahan, tingkat pendidikan, dan profesi pada KK & KTP.',
    requirements: 'Salinan KK, dokumen legal pendukung (ijazah, akta, buku nikah)',
    duration: '20 menit',
    output: 'Lembar F.1-15 terverifikasi',
    method: 'Loket / Mitra Posyanduku',
    sortOrder: 5,
  },
  {
    slug: 'paket-3-in-1-akta-kelahiran',
    code: null,
    badge: 'Unggulan 3-in-1',
    name: 'Paket 3-in-1 Akta Kelahiran',
    categorySlug: 'kependudukan',
    description: 'Satu kali pengajuan langsung memperoleh 3 dokumen sekaligus: Akta Kelahiran, KK Baru, dan KIA.',
    requirements: 'Surat lahir RS/Bidan, Buku Nikah, KTP orang tua & saksi, KK asli',
    duration: '7 hari kerja (Terpadu Sleman)',
    output: 'Akta Lahir, KK pembaruan, Kartu Identitas Anak',
    method: 'Lukadesi / Loket Kalurahan',
    sortOrder: 6,
  },
  {
    slug: 'skpwni-perpindahan-keluar',
    code: '07',
    badge: null,
    name: 'SKPWNI Perpindahan Keluar',
    categorySlug: 'kependudukan',
    description: 'Penerbitan Surat Keterangan Pindah WNI untuk warga yang berpindah domisili ke luar Seyegan / Sleman / DIY.',
    requirements: 'Kartu Keluarga asli, KTP pemohon, formulir pengantar pindah',
    duration: '2 hari kerja',
    output: 'Dokumen SKPWNI & pencabutan KK',
    method: 'Loket Kalurahan & Daring',
    sortOrder: 7,
  },
] as const;

/** SOURCE_DATA §3.6 — the global 4-step SOP. */
export const SERVICE_PROCEDURE_STEPS = [
  { stepNumber: 1, title: 'Persiapan Berkas', outcome: 'Periksa Kelengkapan', description: 'Siapkan dokumen fotokopi dan bawa dokumen fisik asli (KTP-el, KK, atau surat pengantar RT/RW) sesuai rincian persyaratan layanan.' },
  { stepNumber: 2, title: 'Pengajuan & Loket', outcome: 'Verifikasi Petugas', description: 'Datang langsung ke Loket Kalurahan pada jam operasional atau kirimkan via Kader Posyanduku Padukuhan dan kanal daring Lukadesi.' },
  { stepNumber: 3, title: 'Proses & Pengesahan', outcome: 'TTE / Legalisasi', description: 'Pamong memvalidasi data ke sistem kependudukan Sleman, mencetak draft dokumen, dan mendapatkan tandatangan Lurah / Carik.' },
  { stepNumber: 4, title: 'Penyerahan Dokumen', outcome: '100% Selesai & Rp 0', description: 'Dokumen resmi diserahkan langsung di loket, diantar oleh kader Posyanduku padukuhan, atau dikirim format digital bertanda tangan elektronik.' },
] as const;

/** SOURCE_DATA §3.6 — the 4 delivery channels. */
export const SERVICE_CHANNELS = [
  { sortOrder: 1, name: 'Tatap Muka di Kalurahan', description: 'Pelayanan di Loket Terpadu Pamong Kalurahan Margomulyo Seyegan Sleman dengan ruang tunggu nyaman ber-AC.' },
  { sortOrder: 2, name: 'Mitra Posyanduku Daring', description: 'Pendampingan adminduk dan integrasi pendataan keluarga sehat secara mobile langsung dari ponsel pintar Anda.' },
  { sortOrder: 3, name: 'Kader Posyanduku Padukuhan', description: 'Layanan jemput bola bagi lansia, penyandang disabilitas, dan warga sakit melalui kader posyandu padukuhan setempat.' },
  { sortOrder: 4, name: 'Inovasi Lukadesi Sleman', description: 'Layanan umum kependudukan terintegrasi desa Sleman Mandiri dengan sistem otomatis terhubung Dukcapil Sleman.' },
] as const;
