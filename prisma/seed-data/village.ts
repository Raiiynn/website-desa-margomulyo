/**
 * Village identity, territory, government structure and statistics.
 *
 * EVERY value here is traceable to docs/SOURCE_DATA.md §3. Withheld values
 * (conflict register §4) are `null` and annotated with the conflict id.
 * Missing values (verification register §5) are `null` and annotated with the
 * V id. Nothing is estimated, averaged or filled in.
 */

/** Provenance line that must travel with the demographic figures (§6 rule 4). */
export const STATISTICS_SOURCE_LABEL =
  'Data Profil Kependudukan Terverifikasi per 1 September 2026 — Sistem Informasi Kalurahan (SIK) Sleman';

export const STATISTICS_REFERENCE_DATE = '2026-09-01';

/** SOURCE_DATA §3.5. Order and names agree across source pages 2, 3 and 8. */
export const PADUKUHAN = [
  { number: 1, name: 'Sawahan', slug: 'sawahan', potentialSummary: 'Sentra pertanian padi sawah utama dan lumbung pangan desa dengan hamparan irigasi lancar.' },
  { number: 2, name: 'Jumeneng', slug: 'jumeneng', potentialSummary: 'Pertanian agrikultur padi berkelanjutan dan pengembangan perikanan kolam air tawar.' },
  { number: 3, name: 'Gerjen', slug: 'gerjen', potentialSummary: 'UMKM pengrajin aktif, perdagangan warung sembako rakyat, dan jasa perbengkelan lokal.' },
  { number: 4, name: 'Ngemplak', slug: 'ngemplak', potentialSummary: 'Pertanian sawah terpadu, gudang lumbung pangan desa, dan penampungan hasil bumi.' },
  { number: 5, name: 'Kamal Kulon', slug: 'kamal-kulon', potentialSummary: 'Budidaya holtikultura sayuran pekarangan, cabai rawit, dan perikanan kolam terpal.' },
  { number: 6, name: 'Sompokan', slug: 'sompokan', potentialSummary: 'Pertanian sawah produktif dan paguyuban pelestari kesenian tradisional karawitan.' },
  { number: 7, name: 'Kregolan', slug: 'kregolan', potentialSummary: 'Sentra kelompok ternak kambing gibas/etawa dan aneka produksi olahan camilan kering.' },
  { number: 8, name: 'Mangsel', slug: 'mangsel', potentialSummary: 'Potensi eduwisata perdesaan terpadu: kebun holtikultura, tempe rumahan, dan peternakan.' },
  { number: 9, name: 'Daplokan', slug: 'daplokan', potentialSummary: 'Pertanian padi sawah subur dan berkembangnya aneka industri makanan olahan rumahan.' },
  { number: 10, name: 'Kasuran', slug: 'kasuran', potentialSummary: 'Pengrajin lokal anyaman bambu, perkakas desa, dan komoditas tanaman pangan palawija.' },
  { number: 11, name: 'Mriyan', slug: 'mriyan', potentialSummary: 'Paguyuban kebudayaan warga yang aktif, tradisi gotong royong, dan pertanian rakyat.' },
  { number: 12, name: 'Jingin', slug: 'jingin', potentialSummary: 'Budidaya ikan air tawar kolam tanah, pembenihan nila, serta pembibitan aneka tanaman.' },
  {
    number: 13,
    name: 'Jamblangan',
    slug: 'jamblangan',
    isHistoricalCore: true,
    potentialSummary: 'Rumah kesenian Jathilan "Turonggo Bekso Tomo" yang tersohor serta bentangan sawah subur.',
  },
] as const;

/**
 * SOURCE_DATA §3.4. `name: null` is deliberate and is the honest state:
 * V01 records that the source verifies these offices and their remits but
 * names only the Lurah and one Kasi.
 */
export const OFFICIALS = [
  {
    kind: 'LURAH',
    positionTitle: 'Lurah Margomulyo',
    positionAlias: null,
    name: 'Eko Puji Mulyanto',
    remit: 'Penanggung jawab penyelenggaraan pemerintahan, pembangunan, dan kemasyarakatan kalurahan.',
    termStart: 2021,
    termEnd: 2027,
    sortOrder: 1,
  },
  {
    kind: 'CARIK',
    positionTitle: 'Carik (Sekretaris Kalurahan)',
    positionAlias: 'Carik',
    name: null,
    remit: 'Membantu Lurah memimpin kesekretariatan kalurahan, urusan administrasi umum, keuangan, dan perencanaan program.',
    sortOrder: 2,
  },
  {
    kind: 'KASI',
    positionTitle: 'Kepala Seksi Pemerintahan',
    positionAlias: 'Jagabaya',
    name: null,
    remit: 'Menangani tata keprajan, pembinaan trantibum, ketenteraman masyarakat, kependudukan, serta pertanahan kalurahan (Sultan Ground).',
    sortOrder: 3,
    internalNote:
      'TODO: VERIFY WITH KALURAHAN — kemungkinan jabatan yang sama dengan "Kasi Tata Pemerintahan" (Rini Sapta Wadani). Sumber memakai dua penyebutan berbeda; jangan digabung tanpa konfirmasi.',
  },
  {
    kind: 'KASI',
    positionTitle: 'Kasi Tata Pemerintahan',
    positionAlias: null,
    name: 'Rini Sapta Wadani',
    remit: 'Petugas penanggung jawab pengaduan masyarakat Kalurahan Margomulyo.',
    sortOrder: 4,
    internalNote:
      'TODO: VERIFY WITH KALURAHAN — sumber menyebut jabatan ini terpisah dari "Kepala Seksi Pemerintahan (Jagabaya)".',
  },
  {
    kind: 'KASI',
    positionTitle: 'Kepala Seksi Pembangunan & Kemakmuran',
    positionAlias: 'Ulu-Ulu',
    name: null,
    remit: 'Mengelola pembangunan infrastruktur fisik, pengairan pertanian, lingkungan hidup, ketahanan pangan, dan pemberdayaan ekonomi warga.',
    sortOrder: 5,
  },
  {
    kind: 'KASI',
    positionTitle: 'Kepala Seksi Kemasyarakatan & Sosial',
    positionAlias: 'Kamituwa',
    name: null,
    remit: 'Melaksanakan pembinaan kesejahteraan sosial, kebudayaan, keagamaan, kesehatan masyarakat, perlindungan perempuan dan anak.',
    sortOrder: 6,
  },
  {
    kind: 'KAUR',
    positionTitle: 'Kaur Tata Usaha & Umum',
    positionAlias: 'Tata Laksana',
    name: null,
    remit: 'Pengelolaan surat masuk/keluar, inventaris aset, dan rumah tangga kalurahan.',
    sortOrder: 7,
  },
  {
    kind: 'KAUR',
    positionTitle: 'Kaur Keuangan',
    positionAlias: 'Danarta',
    name: null,
    remit: 'Pengelolaan kas kalurahan, pelaporan APBKal, dan perpajakan.',
    sortOrder: 8,
  },
  {
    kind: 'KAUR',
    positionTitle: 'Kaur Perencanaan',
    positionAlias: 'Pangripta',
    name: null,
    remit: 'Penyusunan RKP Kalurahan, RPJM Kalurahan, dan evaluasi kinerja.',
    sortOrder: 9,
  },
] as const;

/**
 * SOURCE_DATA §3.4, read from the rendered timeline (conflict C13 — the text
 * layer scrambles the name/period pairing beyond recovery).
 */
export const LEADERSHIP_TERMS = [
  { sortOrder: 1, name: 'R. Imam Karyono', description: 'Lurah Pertama Margomulyo', startYear: 1946, endYear: 1969 },
  { sortOrder: 2, name: 'Drs. Asri', description: 'Periode Pembangunan Desa Berkelanjutan', startYear: 1969, endYear: 1996 },
  { sortOrder: 3, name: 'Suhardjono', description: 'Periode Reformasi Desentralisasi', startYear: 1996, endYear: 2004 },
  { sortOrder: 4, name: 'Suhardjono', description: 'Masa Jabatan Kedua', startYear: 2004, endYear: 2009 },
  { sortOrder: 5, name: 'Sunarman', description: 'Pemberdayaan Infrastruktur Pertanian', startYear: 2009, endYear: 2015 },
  { sortOrder: 6, name: 'Suhardjono', description: 'Masa Jabatan Ketiga', startYear: 2015, endYear: 2021 },
  { sortOrder: 7, name: 'Eko Puji Mulyanto', description: 'Lurah Margomulyo Petahana', startYear: 2021, endYear: 2027, isIncumbent: true },
] as const;

/** SOURCE_DATA §3.4. Conflict C12: the source's "3 Lembaga" counter is withheld. */
export const INSTITUTIONS = [
  {
    kind: 'BPKAL',
    name: 'Badan Permusyawaratan Kalurahan (BPKal) Margomulyo',
    slug: 'bpkal',
    alias: null,
    sortOrder: 1,
    description:
      'Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan kalurahan, beranggotakan perwakilan warga dari padukuhan berdasarkan musyawarah mufakat. Menjalankan fungsi legislasi kalurahan, pengawasan pelaksanaan Perkal dan realisasi APBKal, serta penyerapan aspirasi warga.',
  },
  {
    kind: 'LKK',
    name: 'LPMK Margomulyo',
    slug: 'lpmk',
    alias: 'Lembaga Pemberdayaan Masyarakat Kalurahan',
    sortOrder: 2,
    description:
      'Membantu pamong merencanakan pembangunan partisipatif dari musrenbang padukuhan serta menggerakkan swadaya gotong-royong warga.',
  },
  {
    kind: 'LKK',
    name: 'Karang Taruna',
    slug: 'karang-taruna',
    alias: 'Taruna Bhakti Margomulyo',
    sortOrder: 3,
    description:
      'Wadah generasi muda berkarya di bidang sosial, turnamen olahraga antar-padukuhan, kesenian daerah, dan rintisan wirausaha muda.',
  },
  {
    kind: 'LKK',
    name: 'Tim Penggerak PKK',
    slug: 'pkk',
    alias: 'Kesejahteraan Keluarga',
    sortOrder: 4,
    description:
      'Pelopor kesehatan ibu-anak melalui Posyandu, pencegahan stunting, pemanfaatan pekarangan (HATINYA PKK), dan kursus keterampilan keluarga.',
  },
  {
    kind: 'LKK',
    name: 'Satlinmas Kalurahan',
    slug: 'satlinmas',
    alias: 'Perlindungan Masyarakat',
    sortOrder: 5,
    description:
      'Kesiapsiagaan pos kamling warga di 13 padukuhan, pengamanan hajatan umum, serta tanggap kebencanaan di wilayah Seyegan.',
  },
] as const;

/** SOURCE_DATA §3.1 — the 10 Misi Pembangunan Kalurahan. */
export const MISSIONS = [
  { number: 1, label: 'Tata Kelola Internal', title: 'Optimalisasi Kinerja Pamong', description: 'Mengoptimalkan kinerja pamong kalurahan sesuai tugas pokok dan fungsi serta peraturan perundang-undangan.' },
  { number: 2, label: 'Pemberdayaan Sipil', title: 'Partisipasi Masyarakat', description: 'Mengoptimalkan peran dan partisipasi aktif seluruh elemen warga masyarakat dalam perencanaan dan pembangunan kalurahan.' },
  { number: 3, label: 'Kolaborasi Strategis', title: 'Kemitraan Multisektor', description: 'Menjalin kerja sama kolaboratif dengan berbagai pihak dan pemangku kepentingan dalam merealisasikan program kerja kalurahan.' },
  { number: 4, label: 'Ketahanan Pangan', title: 'Infrastruktur Irigasi', description: 'Memperbaiki dan merevitalisasi jaringan saluran irigasi pertanian, baik saluran tersier maupun saluran sekunder secara merata.' },
  { number: 5, label: 'Kemandirian Ekonomi', title: 'Profesionalisme BUMKal', description: 'Membentuk kepengurusan Badan Usaha Milik Kalurahan (BUMKal) yang profesional, inovatif, dan berdaya saing.' },
  { number: 6, label: 'Inventarisasi Aset', title: 'Pemberdayaan Aset Desa', description: 'Mendata seluruh aset kalurahan secara komprehensif dan mengoptimalkan pemanfaatannya agar bernilai produktif bagi kas desa.' },
  { number: 7, label: 'Layanan Masyarakat', title: 'Kualitas Pelayanan Publik', description: 'Mengoptimalkan mutu pelayanan publik warga, khususnya kemudahan administrasi kependudukan, akses pendidikan, dan fasilitas kesehatan.' },
  { number: 8, label: 'Akuntabilitas Anggaran', title: 'Monitoring & Evaluasi', description: 'Memfungsikan tim monitoring dan audit berkala dalam berbagai bidang kegiatan anggaran fisik maupun pemberdayaan non-fisik.' },
  { number: 9, label: 'Kearifan Lokal', title: 'Gotong Royong & Musyawarah', description: 'Menanamkan kembali semangat gotong royong serta selalu mengedepankan musyawarah mufakat dalam mengambil setiap keputusan warga.' },
  { number: 10, label: 'Penguatan Lembaga Kalurahan', title: 'Penguatan Lembaga Kalurahan', description: 'Mengoptimalkan fungsi lembaga-lembaga kemasyarakatan kalurahan, antara lain Lembaga Pemberdayaan Masyarakat Kalurahan (LPMK), Karang Taruna, dan Tim Penggerak PKK demi kesejahteraan holistik.' },
] as const;

/** SOURCE_DATA §3.1 — the 4 Pilar Tata Kelola. */
export const GOVERNANCE_PILLARS = [
  { sortOrder: 1, name: 'Jujur', description: 'Mengedepankan integritas moral dan etika aparatur dalam setiap pengambilan keputusan, bebas dari konflik kepentingan dan pungutan liar.' },
  { sortOrder: 2, name: 'Amanah', description: 'Menjalankan mandat pembangunan dan anggaran desa sebaik-baiknya demi kemaslahatan, kemakmuran, dan keadilan sosial seluruh warga.' },
  { sortOrder: 3, name: 'Transparan', description: 'Seluruh alur APBKal, belanja barang-jasa, dan regulasi dapat diakses secara terbuka oleh publik melalui papan informasi dan website resmi.' },
  { sortOrder: 4, name: 'Partisipatif', description: 'Melibatkan segenap elemen masyarakat desa, tokoh padukuhan, ibu-ibu PKK, serta pemuda dalam setiap proses musyawarah kalurahan.' },
] as const;

/**
 * SOURCE_DATA §3.3.
 *
 * Withheld here and therefore null / absent:
 *   * `rtCount` — conflict C05 (pages 2 and 3 disagree; neither sums to 86).
 *   * Tamat SD and Belum Tamat SD — conflict C07 (identical values on bars of
 *     visibly different length, so at least one label is wrong).
 * Neither the religion nor the education list may be totalled: they sum to
 * 14.364 and 13.796 against a population of 14.384 (C06, C07).
 */
export const DEMOGRAPHICS = {
  totalPopulation: 14384,
  malePopulation: 7192,
  femalePopulation: 7192,
  households: 5419,
  householdsMaleHead: 4180,
  householdsFemaleHead: 1239,
  vulnerablePeople: 1165,
  vulnerablePercent: '8.10',
  completionPercent: '91.90',
  areaHectares: '515.20',
  padukuhanCount: 13,
  rwCount: 28,
  rtCount: null,
} as const;

export const RELIGIONS = [
  { religion: 'Islam', people: 14065, percentage: '97.78', sortOrder: 1 },
  { religion: 'Katolik', people: 236, percentage: '1.64', sortOrder: 2 },
  { religion: 'Kristen', people: 56, percentage: '0.39', sortOrder: 3 },
  { religion: 'Hindu', people: 6, percentage: '0.04', sortOrder: 4 },
  { religion: 'Buddha', people: 1, percentage: '0.01', sortOrder: 5 },
  { religion: 'Konghucu / Kepercayaan', people: 0, percentage: null, sortOrder: 6 },
] as const;

export const EDUCATION_LEVELS = [
  { level: 'SLTA / Sederajat', people: 4837, percentage: '33.63', isTertiary: false, sortOrder: 1 },
  { level: 'SLTP / Sederajat', people: 2287, percentage: null, isTertiary: false, sortOrder: 2 },
  { level: 'Tidak / Belum Sekolah', people: 2114, percentage: null, isTertiary: false, sortOrder: 3 },
  { level: 'D1 / D2', people: 79, percentage: null, isTertiary: true, sortOrder: 4 },
  { level: 'D3', people: 305, percentage: null, isTertiary: true, sortOrder: 5 },
  { level: 'D4 / S1', people: 834, percentage: null, isTertiary: true, sortOrder: 6 },
  { level: 'Strata II', people: 67, percentage: null, isTertiary: true, sortOrder: 7 },
  { level: 'Strata III', people: 3, percentage: null, isTertiary: true, sortOrder: 8 },
] as const;

/** Explicitly a top-5 list in the source, not a complete breakdown. */
export const OCCUPATIONS = [
  { occupation: 'Mengurus Rumah Tangga', people: 2846, rank: 1 },
  { occupation: 'Pelajar / Mahasiswa', people: 2782, rank: 2 },
  { occupation: 'Buruh Harian Lepas', people: 2564, rank: 3 },
  { occupation: 'Belum / Tidak Bekerja', people: 2478, rank: 4 },
  { occupation: 'Karyawan Swasta', people: 1528, rank: 5 },
] as const;

/**
 * SOURCE_DATA §3.1, §3.2, §3.12.
 *
 * Withheld: bentang wilayah (conflict C08 — ±2,00 km x ±1,00 km implies about
 * 200 Ha against a stated 515,20 Ha).
 */
export const SITE_SETTINGS = [
  { key: 'village.name', value: 'Kalurahan Margomulyo', group: 'identity', label: 'Nama kalurahan', type: 'STRING' },
  { key: 'village.kapanewon', value: 'Kapanewon Seyegan', group: 'identity', label: 'Kapanewon', type: 'STRING' },
  { key: 'village.kabupaten', value: 'Kabupaten Sleman', group: 'identity', label: 'Kabupaten', type: 'STRING' },
  { key: 'village.provinsi', value: 'Daerah Istimewa Yogyakarta', group: 'identity', label: 'Provinsi', type: 'STRING' },
  { key: 'village.anniversary', value: '11 November', group: 'identity', label: 'Hari jadi', type: 'STRING' },
  {
    key: 'village.vision',
    value:
      'Menciptakan Tata Kelola Pemerintahan Yang Jujur, Amanah dan Transparan Dalam Rangka Mewujudkan Kalurahan Margomulyo Yang Adil, Merata dan Sejahtera.',
    group: 'identity',
    label: 'Visi kalurahan',
    type: 'TEXT',
  },
  {
    key: 'village.sambutanHeading',
    value: 'Membangun Margomulyo yang Guyub, Mandiri, dan Berbudaya',
    group: 'identity',
    label: 'Judul kata sambutan Lurah',
    type: 'STRING',
  },
  {
    key: 'village.sambutanQuote',
    value:
      'Selamat datang di website resmi Kalurahan Margomulyo. Website ini menjadi media informasi, pelayanan dan keterbukaan Pemerintah Kalurahan Margomulyo kepada masyarakat.',
    group: 'identity',
    label: 'Kutipan sambutan Lurah',
    type: 'TEXT',
  },
  {
    key: 'village.sambutanBody',
    value:
      'Sebagai jantung sentra Kapanewon Seyegan, kami berkomitmen mengakselerasi digitalisasi birokrasi tanpa melepaskan akar kebudayaan Sleman yang guyub rukun. Seluruh data anggaran, layanan administrasi kependudukan, hingga aspirasi warga kini terpadu dalam satu wadah digital terbuka.',
    group: 'identity',
    label: 'Paragraf sambutan Lurah',
    type: 'TEXT',
  },
  {
    key: 'village.legalBasis',
    value:
      'Maklumat Nomor 5 Tahun 1948 tertanggal 22 April 1948 — konsolidasi tiga kelurahan lama: Gerjen, Sompokan, dan Jamblangan.',
    group: 'identity',
    label: 'Dasar pembentukan',
    type: 'TEXT',
  },
  { key: 'contact.address', value: 'Jalan Mulia No. 1, Margomulyo, Seyegan, Sleman, D.I. Yogyakarta 55561', group: 'contact', label: 'Alamat kantor', type: 'TEXT' },
  { key: 'contact.phone', value: '(0274) 4364 719', group: 'contact', label: 'Telepon kantor', type: 'PHONE' },
  { key: 'contact.whatsapp', value: '+62 851 3625 3739', group: 'contact', label: 'WhatsApp resmi', type: 'PHONE' },
  { key: 'contact.email', value: 'desamargomulyo@slemankab.go.id', group: 'contact', label: 'Surel resmi', type: 'EMAIL' },
  { key: 'service.hoursWeekday', value: 'Senin–Kamis 08.00–11.00 WIB', group: 'service', label: 'Jam layanan Senin–Kamis', type: 'STRING' },
  { key: 'service.hoursFriday', value: 'Jumat 08.00–10.00 WIB', group: 'service', label: 'Jam layanan Jumat', type: 'STRING' },
  { key: 'service.hoursClosed', value: 'Sabtu, Minggu, dan hari libur nasional tutup', group: 'service', label: 'Hari tutup', type: 'STRING' },
  {
    key: 'service.onlineNote',
    value:
      'Layanan mandiri daring (Lukadesi Sleman dan konsultasi WhatsApp pamong) menerima pengajuan 24 jam. Validasi dan verifikasi teknis diproses pada jam kerja berikutnya.',
    group: 'service',
    label: 'Catatan layanan daring',
    type: 'TEXT',
  },
  { key: 'complaint.officer', value: 'Rini Sapta Wadani', group: 'complaint', label: 'Petugas penanggung jawab pengaduan', type: 'STRING' },
  { key: 'complaint.responseStandard', value: 'Respon awal maksimal 1 x 24 jam kerja', group: 'complaint', label: 'Standar penanganan', type: 'STRING' },
] as const;
