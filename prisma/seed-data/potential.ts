/**
 * Local potential and the UMKM directory (docs/SOURCE_DATA.md §3.11).
 *
 * Two values are withheld and seeded null:
 *
 *   * Tempe Mbok Sri's production capacity — conflict C09: the source states
 *     "150 kg/hari" on the potential page and "120+ kg" on the detail page,
 *     and the two may not even measure the same thing (finished tempe vs.
 *     soybean input).
 *
 *   * Its WhatsApp number — conflict C10: the number printed is the
 *     kalurahan's own official hotline. Publishing it would route citizen
 *     orders for a private business to the government complaint line.
 */

/** The five pillars (source p1, p8). */
export const LOCAL_POTENTIAL_CATEGORIES = [
  { name: 'Pertanian', slug: 'pertanian', sortOrder: 1, description: 'Pertanian padi dan irigasi teknis.' },
  { name: 'UMKM', slug: 'umkm', sortOrder: 2, description: 'UMKM dan industri rumahan.' },
  { name: 'Budaya', slug: 'budaya', sortOrder: 3, description: 'Budaya dan seni tradisi.' },
  { name: 'Peternakan', slug: 'peternakan', sortOrder: 4, description: 'Peternakan terpadu.' },
  { name: 'Perikanan', slug: 'perikanan', sortOrder: 5, description: 'Perikanan air tawar.' },
] as const;

export const LOCAL_POTENTIALS = [
  {
    slug: 'pertanian-padi-irigasi-teknis',
    categorySlug: 'pertanian',
    title: 'Pertanian Padi & Irigasi Teknis',
    headline: 'Lumbung Pangan Sleman Barat',
    highlight: 'Hasil Panen Utama: Beras Sleman Unggul',
    padukuhanSlug: null,
    sortOrder: 1,
    description:
      'Didukung jaringan aliran air Selokan Van Der Wijck / Mataram, memelihara ratusan hektar sawah padi kelas satu dengan pola tanam teratur dan pertanian ramah lingkungan. Komoditas padi utama: varietas Ciherang, Inpari 32, dan Menthik Wangi. Pola tanam bergilir padi dan palawija tiga kali panen tiap tahun, dengan pembagian air dipantau gotong royong melalui kelompok Ulu-Ulu desa.',
  },
  {
    slug: 'umkm-industri-rumahan',
    categorySlug: 'umkm',
    title: 'UMKM & Industri Rumahan',
    headline: 'Ekonomi Kerakyatan Mandiri',
    highlight: 'Pemberdayaan Perempuan & Pengrajin Lokal',
    padukuhanSlug: null,
    sortOrder: 2,
    description:
      'Sentra produksi tempe bungkus daun pisang yang harum khas padukuhan, anyaman bambu perabot, aneka camilan rengginang, peyek kacang, dan jamu herbal tradisional.',
  },
  {
    slug: 'budaya-seni-tradisi',
    categorySlug: 'budaya',
    title: 'Budaya & Seni Tradisi',
    headline: 'Kalurahan Mandiri Budaya',
    highlight: 'Warisan Luhur Mataram',
    padukuhanSlug: 'jamblangan',
    sortOrder: 3,
    description:
      'Kesenian Jathilan Turonggo Bekso Tomo di Padukuhan Jamblangan dengan lebih dari 50 penari dan pengrawit aktif, sanggar karawitan laras madya, sendratari rakyat, dan pagelaran wayang kulit merti dusun.',
  },
  {
    slug: 'peternakan-terpadu',
    categorySlug: 'peternakan',
    title: 'Peternakan Terpadu',
    headline: 'Kelompok Tani Ternak',
    highlight: 'Siklus Sirkular Pertanian',
    padukuhanSlug: null,
    sortOrder: 4,
    description:
      'Sentra budidaya sapi potong dan kambing etawa/gibas mandiri, terintegrasi dengan pemanfaatan kotoran ternak menjadi pupuk kandang organik untuk sawah.',
  },
  {
    slug: 'perikanan-air-tawar',
    categorySlug: 'perikanan',
    title: 'Perikanan Air Tawar',
    headline: 'Budidaya Pokdakan',
    highlight: 'Kelimpahan Sumber Air',
    padukuhanSlug: null,
    sortOrder: 5,
    description:
      'Pemanfaatan lahan pekarangan dengan kolam terpal bioflok lele serta kolam air deras tanah untuk gurame dan nila merah berair melimpah.',
  },
] as const;

export const UMKM = [
  {
    slug: 'tempe-daun-pisang-mbok-sri',
    name: 'Tempe Tradisional Daun Pisang "Mbok Sri"',
    padukuhanSlug: 'mangsel',
    ownerName: 'Sri Rahayu (Mbok Sri)',
    categoryLabel: 'Industri Pengolahan Pangan & Kuliner Tradisional',
    foundedYear: 2012,
    hasNib: true,
    pirtNumber: '2153404010892-27',
    socialMedia: '@tempemboksri.margomulyo',
    addressDetail: 'Padukuhan Mangsel RT 03 / RW 08, Kalurahan Margomulyo, Kapanewon Seyegan, Kabupaten Sleman, D.I. Yogyakarta 55561',
    ratingValue: '4.9',
    ratingCount: 120,
    workerCount: 8,
    operatingHours: 'Senin–Sabtu 06.00–17.00 WIB; Minggu 06.00–12.00 WIB (pengambilan pesanan H-1)',
    // Withheld: C09 (capacity) and C10 (phone number).
    dailyCapacityLabel: null,
    whatsapp: null,
    sortOrder: 1,
    summary:
      'Produsen tempe bungkus daun pisang alami khas Seyegan, Sleman dengan ragi tradisional warisan turun-temurun tanpa bahan pengawet kimia.',
    description:
      'Bermula dari dapur tradisional di Padukuhan Mangsel pada tahun 2012, Ibu Sri Rahayu merintis produksi tempe berbalut daun pisang dengan tekad mempertahankan cara fermentasi alami tanpa ragi instan ataupun bahan pengembang sintetis. Daun pisang kluthuk dan kepok didatangkan langsung dari kebun warga Margomulyo. Dengan dukungan pembinaan Pemerintah Kalurahan Margomulyo dan pendampingan UMKM Kapanewon Seyegan, usaha ini meningkatkan standarisasi produksi melalui fasilitasi perizinan P-IRT resmi, peralatan perendaman kedelai stainless steel higienis, serta pelatihan sanitasi olahan pangan.',
    products: [
      { name: 'Tempe Daun Pisang Original', priceRupiah: '2500.00', priceUnit: '/ bks', packaging: 'Sedang (180 gr) & Jumbo (350 gr)', badge: 'Tempe Daun Segar', sortOrder: 1, description: 'Tempe bertekstur padat dengan fermentasi alami ragi lokal. Bebas ragi kimia, aromatik saat digoreng langsung atau dibacem.' },
      { name: 'Keripik Tempe Gurih Sleman', priceRupiah: '15000.00', priceUnit: '/ pouch', packaging: 'Pouch 250 gram & 500 gram', badge: 'Olahan Krispi Gurih', sortOrder: 2, description: 'Irisan tempe super tipis berbalut tepung beras dan rempah ketumbar bawang putih asli. Renyah tidak berminyak, tahan hingga 3 bulan.' },
      { name: 'Tempe Mendoan Mentah Siap Masak', priceRupiah: '12000.00', priceUnit: '/ pack', packaging: '10 lembar tipis + bumbu celup khas', badge: 'Siap Goreng Keluarga', sortOrder: 3, description: 'Lembaran tempe tipis khusus mendoan basah atau krispi. Sudah dilengkapi racikan bumbu celup rempah tradisional Margomulyo.' },
      { name: 'Tempe Bacem Manis Gurih Siap Saji', priceRupiah: '18000.00', priceUnit: '/ pack', packaging: 'Vakum kedap udara, isi 6 potong tebal', badge: 'Khas Mataraman Jogja', sortOrder: 4, description: 'Dimasak perlahan dengan air kelapa segar dan gula kelapa Kulon Progo. Dikemas vakum higienis, tinggal digoreng atau dihangatkan sebentar.' },
    ],
  },
  {
    slug: 'kerajinan-bambu-anyaman-berkah-mulyo',
    name: 'Kerajinan Bambu & Anyaman "Berkah Mulyo"',
    padukuhanSlug: 'sompokan',
    ownerName: null,
    categoryLabel: 'Kriya Ramah Lingkungan',
    foundedYear: null,
    hasNib: true,
    pirtNumber: null,
    socialMedia: null,
    addressDetail: null,
    ratingValue: null,
    ratingCount: null,
    workerCount: null,
    operatingHours: null,
    dailyCapacityLabel: null,
    whatsapp: null,
    sortOrder: 2,
    summary:
      'Kolektif pengrajin senior memproduksi besek hantaran, tampah, tudung saji, dan wadah ramah lingkungan berbahan bambu apus khas Seyegan.',
    description:
      'Memenuhi permintaan pasar souvenir dan kuliner tradisional se-DIY. Produk 100% biodegradable dan dikerjakan oleh kelompok pengrajin padukuhan.',
    products: [],
  },
  {
    slug: 'batik-tulis-ecoprint-margo-lestari',
    name: 'Batik Tulis & Ecoprint "Margo Lestari"',
    padukuhanSlug: 'jamblangan',
    ownerName: null,
    categoryLabel: 'Wastra Seni Budaya',
    foundedYear: null,
    hasNib: false,
    pirtNumber: null,
    socialMedia: null,
    addressDetail: null,
    ratingValue: null,
    ratingCount: null,
    workerCount: null,
    operatingHours: null,
    dailyCapacityLabel: null,
    whatsapp: null,
    sortOrder: 3,
    summary:
      'Karya busana dan selendang motif daun jati serta flora pekarangan Seyegan dengan teknik pewarnaan ramah lingkungan.',
    description:
      'Memadukan estetika budaya Yogyakarta Mandiri Budaya dengan pewarna alami, binaan Tim Penggerak PKK kalurahan dan bersertifikat Kurasi DIY.',
    products: [],
  },
] as const;
