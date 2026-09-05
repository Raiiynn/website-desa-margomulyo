/**
 * APBKal 2026, realisation, development projects and the document repository.
 *
 * Every figure is verified in docs/SOURCE_DATA.md §3.8-§3.10 and reconciles
 * exactly — the seed integrity tests re-verify each identity rather than
 * trusting this file.
 *
 * Two publication rules are visible in the data:
 *
 *   * The homepage's "Transfer 65% / PAD 25% / Lain 10%" pill bar is NOT here.
 *     Conflict C01: it contradicts the itemisation below by roughly 21 points.
 *     The itemisation reconciles to the stated total; the pills do not.
 *
 *   * The five-bidang lines carry `amount: null`. The source published them as
 *     rounded figures ("Rp 391 Jt"), so the exact value is unknown and only
 *     the source's own label and percentage are recorded. Storing a precise
 *     Decimal there would invent precision the kalurahan never published.
 */

export const BUDGET_FISCAL_YEAR = 2026;

export const BUDGET = {
  fiscalYear: BUDGET_FISCAL_YEAR,
  totalRevenue: '3842150000.00',
  totalExpenditure: '3910850000.00',
  financingReceipts: '118700000.00',
  financingOutlays: '50000000.00',
  netFinancing: '68700000.00',
  balanceLabel: 'Anggaran Berimbang (Nol)',
  basis:
    'Penyusunan anggaran partisipatif berlandaskan Perda Kabupaten Sleman dan Keputusan Muskal Margomulyo. Terverifikasi BPKal Sleman.',
} as const;

/** Four sources, summing exactly to totalRevenue. */
export const BUDGET_REVENUE_LINES = [
  { label: 'Dana Desa (Pusat)', amount: '1285400000.00', sortOrder: 1 },
  { label: 'Alokasi Dana Desa (ADD Sleman)', amount: '1410250000.00', sortOrder: 2 },
  { label: 'PADes & Tanah Kas Kalurahan', amount: '514500000.00', sortOrder: 3 },
  { label: 'BKK Keistimewaan & Bagi Hasil Pajak', amount: '632000000.00', sortOrder: 4 },
] as const;

/** Four allocations, summing exactly to totalExpenditure. */
export const BUDGET_EXPENDITURE_ALLOCATION_LINES = [
  { label: 'Belanja Modal Pembangunan', amount: '1603448500.00', percentage: '41.00', sortOrder: 1 },
  { label: 'Penyelenggaraan Pamong', amount: '1329689000.00', percentage: '34.00', sortOrder: 2 },
  { label: 'Pembinaan Warga & Kebudayaan', amount: '469302000.00', percentage: '12.00', sortOrder: 3 },
  { label: 'Pemberdayaan & Penanggulangan', amount: '508410500.00', percentage: '13.00', sortOrder: 4 },
] as const;

/**
 * The Permendagri / Perbup Sleman five-bidang classification of the SAME
 * total. Amounts are null by design — see the file header.
 */
export const BUDGET_EXPENDITURE_BIDANG_LINES = [
  { label: 'Bidang Pelaksanaan Pembangunan', amountLabel: 'Rp 1,60 M', percentage: '41.00', sortOrder: 1 },
  { label: 'Bidang Penyelenggaraan Pemerintahan', amountLabel: 'Rp 1,33 M', percentage: '34.00', sortOrder: 2 },
  { label: 'Bidang Pembinaan Kemasyarakatan', amountLabel: 'Rp 469 Jt', percentage: '12.00', sortOrder: 3 },
  { label: 'Bidang Pemberdayaan Masyarakat', amountLabel: 'Rp 391 Jt', percentage: '10.00', sortOrder: 4 },
  { label: 'Bidang Penanggulangan Bencana & Darurat', amountLabel: 'Rp 117 Jt', percentage: '3.00', sortOrder: 5 },
] as const;

export const BUDGET_FINANCING_LINES = [
  { kind: 'FINANCING_RECEIPT', label: 'Penerimaan (SiLPA TA 2025)', amount: '118700000.00', sortOrder: 1 },
  { kind: 'FINANCING_OUTLAY', label: 'Pengeluaran (Penyertaan BUMKal)', amount: '50000000.00', sortOrder: 2 },
] as const;

export const BUDGET_REALIZATION = {
  period: 'Semester II',
  physicalPercent: '82.00',
  physicalTargetPercent: '80.00',
  physicalNote: 'Melebihi Ekspektasi Tahapan (+2%)',
  cashPercent: '78.00',
  cashAmount: '3050463000.00',
} as const;

/** SOURCE_DATA §3.8 — the five accountability gates. */
export const BUDGET_CYCLE_STAGES = [
  { stageNumber: 1, name: 'Perencanaan', statusLabel: 'Tuntas', description: 'Musyawarah Padukuhan, Muskal, RKPKal & RKP Kalurahan.' },
  { stageNumber: 2, name: 'Penganggaran', statusLabel: 'Tuntas', description: 'Penyusunan Peraturan Kalurahan APBKal bersama BPKal.' },
  { stageNumber: 3, name: 'Pelaksanaan', statusLabel: 'Sedang Berjalan', description: 'Pengadaan barang/jasa oleh TPK & pekerjaan swakelola warga.' },
  { stageNumber: 4, name: 'Pemeriksaan', statusLabel: 'Tahap Review', description: 'Audit berkala internal BPKal & Inspektorat Daerah Sleman.' },
  { stageNumber: 5, name: 'Pertanggungjawaban', statusLabel: 'Jadwal Des 2026', description: 'Laporan LPPKal, LPPD, dan publikasi terbuka pada papan desa.' },
] as const;

/**
 * SOURCE_DATA §3.9 — five projects.
 *
 * The homepage's "34 dari 41 Proyek Tuntas" counter is NOT recorded anywhere
 * (conflict C03): the transparency page states 28 work packages and documents
 * five projects. Completion counts are derived from real rows.
 *
 * `padukuhanSlugs` resolves the source's location text into the padukuhan
 * spine. EM-01/26 sits at the Balai Kalurahan, which is not a padukuhan, so
 * its list is empty while `locationLabel` still carries the source wording.
 */
export const DEVELOPMENT_PROJECTS = [
  {
    code: 'FIS-01/26',
    slug: 'saluran-irigasi-tersier-sekunder-pertanian-seyegan',
    title: 'Saluran Irigasi Tersier & Sekunder Pertanian Seyegan',
    description: 'Normalisasi debit air dan pengikisan sedimentasi persawahan bulak sawah warga.',
    locationLabel: 'Padukuhan Mangsel & Sompokan',
    padukuhanSlugs: ['mangsel', 'sompokan'],
    budgetAmount: '145000000.00',
    fundingSourceLabel: 'Dana Desa',
    status: 'IN_PROGRESS',
    physicalProgress: 85,
    targetLabel: 'Akhir Triwulan II',
    note: null,
  },
  {
    code: 'FIS-02/26',
    slug: 'cor-blok-jalan-usaha-tani-drainase-pemukiman',
    title: 'Cor Blok Jalan Usaha Tani & Drainase Pemukiman',
    description: 'Akses jalan cor beton sepanjang 450 meter untuk mempercepat mobilitas panen dan distribusi bibit.',
    locationLabel: 'Padukuhan Jamblangan & Sawahan',
    padukuhanSlugs: ['jamblangan', 'sawahan'],
    budgetAmount: '180500000.00',
    fundingSourceLabel: 'Bantuan Keuangan Khusus',
    status: 'COMPLETED',
    physicalProgress: 100,
    targetLabel: null,
    note: 'Telah Diperiksa BPKal',
  },
  {
    code: 'FIS-03/26',
    slug: 'pemeliharaan-balai-padukuhan-posyandu-terintegrasi',
    title: 'Pemeliharaan Balai Padukuhan & Posyandu Terintegrasi',
    description: 'Renovasi ruang layanan balita, lansia dan fasilitas pertemuan kader posyandu padukuhan.',
    locationLabel: 'Padukuhan Gerjen & Jingin',
    padukuhanSlugs: ['gerjen', 'jingin'],
    budgetAmount: '95000000.00',
    fundingSourceLabel: 'Alokasi Dana Desa',
    status: 'IN_PROGRESS',
    physicalProgress: 60,
    targetLabel: null,
    note: 'Tahap Pengecatan & Sanitasi',
  },
  {
    code: 'FIS-04/26',
    slug: 'penguatan-sarana-air-bersih-sanitasi-desa',
    title: 'Penguatan Sarana Air Bersih & Sanitasi Desa',
    description: 'Instalasi tandon komunal serta sambungan perpipaan bersih untuk pencegahan stunting.',
    locationLabel: 'Padukuhan Kasuran & Kamal Kulon',
    padukuhanSlugs: ['kasuran', 'kamal-kulon'],
    budgetAmount: '120000000.00',
    fundingSourceLabel: 'Dana Desa & Swadaya',
    status: 'PLANNED',
    physicalProgress: 0,
    targetLabel: null,
    note: 'Tahap Klarifikasi Lokasi Teknis',
  },
  {
    code: 'EM-01/26',
    slug: 'pelatihan-kewirausahaan-olahan-pangan-umkm',
    title: 'Pelatihan Kewirausahaan Olahan Pangan UMKM',
    description: 'Pelatihan pengemasan higienis, sertifikasi P-IRT dan pendaftaran NIB bagi 45 kelompok wanita tani.',
    locationLabel: 'Balai Kalurahan Margomulyo',
    padukuhanSlugs: [],
    budgetAmount: '38500000.00',
    fundingSourceLabel: 'Bagi Hasil Pajak',
    status: 'COMPLETED',
    physicalProgress: 100,
    targetLabel: null,
    note: 'Laporan TPK Diterima',
  },
] as const;

/**
 * SOURCE_DATA §3.10 — six documents.
 *
 * `sizeBytes` is null for all of them (V05: the source lists six sizes as an
 * unmapped group, so none can be attributed to a specific document) and no
 * media is attached (V04: the files themselves do not exist). The UI must
 * render "belum tersedia" rather than a broken download link.
 */
export const DOCUMENTS = [
  {
    slug: 'perkal-04-2026-apbkal-ta-2026',
    title: 'Peraturan Kalurahan No. 04 Tahun 2026 tentang APBKal TA 2026',
    category: 'APBKAL',
    categoryLabel: 'APBKal 2026',
    number: '04',
    numberYear: 2026,
    year: 2026,
    publishedAt: '2025-12-30',
    fileType: 'PDF',
    description: 'Dokumen lampiran sah penjabaran pendapatan, belanja, dan pembiayaan Kalurahan Margomulyo.',
  },
  {
    slug: 'rkpkal-2026',
    title: 'Rencana Kerja Pemerintah Kalurahan (RKPKal) Tahun 2026',
    category: 'RKPKAL',
    categoryLabel: 'RKPKal Tahunan',
    number: null,
    numberYear: null,
    year: 2026,
    publishedAt: null,
    fileType: 'PDF',
    description: 'Rencana prioritas program pembangunan dan daftar usulan padukuhan yang disepakati.',
  },
  {
    slug: 'rpjmkal-2021-2027',
    title: 'Rencana Pembangunan Jangka Menengah Kalurahan (RPJMKal) 2021-2027',
    category: 'RPJMKAL',
    categoryLabel: 'RPJMKal Periode 6 Tahun',
    number: null,
    numberYear: null,
    year: 2021,
    publishedAt: null,
    fileType: 'PDF',
    description: 'Visi, misi, arah kebijakan strategis pembangunan Kalurahan Margomulyo masa jabatan lurah.',
  },
  {
    slug: 'lppkal-akhir-ta-2025',
    title: 'Laporan Penyelenggaraan Pemerintahan Kalurahan (LPPKal) Akhir TA 2025',
    category: 'LPPKAL',
    categoryLabel: 'LPPKal Evaluasi Tahunan',
    number: null,
    numberYear: null,
    year: 2025,
    publishedAt: null,
    fileType: 'PDF',
    description: 'Pertanggungjawaban kinerja pamong dan penyerapan dana 100% pada penutupan buku tahun 2025.',
  },
  {
    slug: 'perkal-02-2025-pelestarian-budaya',
    title: 'Peraturan Kalurahan No. 02 Tahun 2025 tentang Pelestarian Budaya Kalurahan Mandiri Budaya',
    category: 'PERKAL',
    categoryLabel: 'Perkal Kebudayaan DIY',
    number: '02',
    numberYear: 2025,
    year: 2025,
    publishedAt: null,
    fileType: 'PDF',
    description: 'Payung hukum pemanfaatan Bantuan Keuangan Khusus Keistimewaan untuk sanggar seni & kearifan lokal.',
  },
  {
    slug: 'lakip-pamong-2025',
    title: 'Laporan Akuntabilitas Kinerja Pamong Kalurahan Margomulyo 2025',
    category: 'LAKIP',
    categoryLabel: 'LAKIP Desa',
    number: null,
    numberYear: null,
    year: 2025,
    publishedAt: null,
    fileType: 'PDF',
    description: 'Matriks penilaian pelayanan administrasi dan kepuasan masyarakat (IKM) Kalurahan Margomulyo.',
  },
] as const;
