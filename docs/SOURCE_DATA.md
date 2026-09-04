# SOURCE_DATA.md — Margomulyo Verified Content Register

**This file is the publication gate. No government fact reaches the public site unless it appears in section 3 of this document.**

If a fact is not here, it is either in the conflict register (section 4) or the
verification register (section 5), and in both cases it must **not** be rendered
publicly. Seed data and CMS content are bound by the same rule.

---

## 1. Rules

Per `CLAUDE.md §3`, `MASTER_PROMPT.md §3` and `FULL_BUILD.md §27`:

1. Margomulyo-specific facts come from the source PDF only.
2. Nothing is invented — not officials, statistics, budgets, services, documents,
   projects, contacts, addresses, or public claims.
3. Where the source is silent, the value is `TODO: VERIFY WITH KALURAHAN`.
4. Where the source contradicts itself, **nothing is published** until the
   kalurahan resolves it. A plausible-looking average or a "probably the newer
   page" guess is fabrication.
5. Derived aggregates are not published unless the source states them *and* they
   reconcile with the source's own itemisation.

**Locked decision (approved):** show only what is verified; omit the disputed
aggregate. Do not display `TODO: VERIFY` markers on the public site — they live
here and in the admin CMS, for the kalurahan to resolve.

---

## 2. Provenance

| | |
|---|---|
| File | `Data Konsep Web Desa Margomulyo.pdf` |
| SHA-256 | `2a9afdbb5d5db1946c3e2c71f2f881551f01b95c627cc8c85f11142016a4435e` |
| Size / pages | 181,942,001 bytes · 9 pages |
| Archived at | `docs/source/` (gitignored — checksum and extracted text are committed) |
| Renders | `docs/source/renders/` — regenerate with `python scripts/render-source.py` |
| Nature | Rendered design concept: 9 full-height desktop captures, 1280px wide |

| Page | Screen | Height |
|---|---|---|
| 1 | Beranda | 5845px |
| 2 | Profil Desa | 5842px |
| 3 | Pemerintahan | 5162px |
| 4 | Berita & Informasi | 3754px |
| 5 | Layanan Publik | 4950px |
| 6 | Transparansi | 6055px |
| 7 | Kontak | 4186px |
| 8 | Potensi Desa | 7781px |
| 9 | Direktori UMKM — detail (Tempe Mbok Sri) | 4907px |

A second asset, `Profil UMKM - Kalurahan Margomulyo.png`
(`44de3e73a9d30268c8d3b3cf72f5e0cf9d1e17dc15339660ef3d54341f813a53`), is archived
alongside it and duplicates page 9's subject.

**Verification method.** Text extraction alone is unreliable on this file — it is
a design render, so reading order is lost wherever content sits in columns or
timelines. Every fact below marked ✅ was confirmed by reading the rendered page
image, not the text layer. This mattered: the leadership timeline (§3.4) and the
padukuhan tables (conflict C05) are both unrecoverable from text.

---

## 3. Verified facts

### 3.1 Identity

| Field | Value | Source |
|---|---|---|
| Name | Kalurahan Margomulyo | p1–p9 ✅ |
| Kapanewon | Seyegan | p1 ✅ |
| Kabupaten | Sleman | p1 ✅ |
| Provinsi | Daerah Istimewa Yogyakarta | p2 ✅ |
| Karakteristik | Wilayah Perdesaan | p2 ✅ |
| Position | Pusat sentral Kapanewon Seyegan | p2 ✅ |
| Hari Jadi | 11 November | p2 ✅ |
| Legal basis | Maklumat Nomor 5 Tahun 1948, tertanggal 22 April 1948 | p2 ✅ |
| Formed from | Konsolidasi tiga kelurahan lama: **Gerjen**, **Sompokan**, **Jamblangan** | p2 ✅ |
| Status | Kalurahan Mandiri Budaya | p2, p8 ✅ |
| Motto (kabupaten) | Sleman Sembada | footer, all pages ✅ |

**Visi** (p2, p3 ✅) — verbatim:

> "Menciptakan Tata Kelola Pemerintahan Yang Jujur, Amanah dan Transparan Dalam
> Rangka Mewujudkan Kalurahan Margomulyo Yang Adil, Merata dan Sejahtera."

Attributed on p2 to the Rencana Pembangunan Jangka Menengah Kalurahan (RPJMKal).

**10 Misi Pembangunan Kalurahan** (p2 ✅) — each with its short label:

| # | Misi | Label |
|---|---|---|
| 01 | Mengoptimalkan kinerja pamong kalurahan sesuai tugas pokok dan fungsi serta peraturan perundang-undangan | Tata Kelola Internal |
| 02 | Mengoptimalkan peran dan partisipasi aktif seluruh elemen warga masyarakat dalam perencanaan dan pembangunan kalurahan | Pemberdayaan Sipil |
| 03 | Menjalin kerja sama kolaboratif dengan berbagai pihak dan pemangku kepentingan dalam merealisasikan program kerja kalurahan | Kolaborasi Strategis |
| 04 | Memperbaiki dan merevitalisasi jaringan saluran irigasi pertanian, baik saluran tersier maupun saluran sekunder secara merata | Ketahanan Pangan |
| 05 | Membentuk kepengurusan Badan Usaha Milik Kalurahan (BUMKal) yang profesional, inovatif, dan berdaya saing | Kemandirian Ekonomi |
| 06 | Mendata seluruh aset kalurahan secara komprehensif dan mengoptimalkan pemanfaatannya agar bernilai produktif bagi kas desa | Inventarisasi Aset |
| 07 | Mengoptimalkan mutu pelayanan publik warga, khususnya kemudahan administrasi kependudukan, akses pendidikan, dan fasilitas kesehatan | Layanan Masyarakat |
| 08 | Memfungsikan tim monitoring dan audit berkala dalam berbagai bidang kegiatan anggaran fisik maupun pemberdayaan non-fisik | Akuntabilitas Anggaran |
| 09 | Menanamkan kembali semangat gotong royong serta selalu mengedepankan musyawarah mufakat dalam mengambil setiap keputusan warga | Kearifan Lokal |
| 10 | Mengoptimalkan fungsi lembaga-lembaga kemasyarakatan kalurahan, antara lain LPMK, Karang Taruna, dan Tim Penggerak PKK demi kesejahteraan holistik | Penguatan Lembaga Kalurahan |

**4 Pilar Tata Kelola** (p3 ✅): Jujur · Amanah · Transparan · Partisipatif — each
with a one-paragraph definition in the source.

### 3.2 Geography

| Field | Value | Source |
|---|---|---|
| Luas wilayah | 515,20 Ha | p1, p2, p8 ✅ |
| Topografi | Kontur daratan datar, subur, iklim tropis | p2 ✅ |
| Irigasi | Selokan Mataram / Selokan Van der Wijck | p2, p8 ✅ |
| Batas utara | Kalurahan Caturharjo, Kapanewon Sleman | p2 ✅ |
| Batas timur | Kalurahan Sumberadi, Kapanewon Mlati | p2 ✅ |
| Batas selatan | Kalurahan Tirtoadi, Kapanewon Mlati | p2 ✅ |
| Batas barat | Kalurahan Margoagung dan Margodadi, Kapanewon Seyegan | p2 ✅ |
| Balai Kalurahan | Jl. Mulia No. 1, Seyegan, Sleman 55561 | p2, p7 ✅ |
| Akses | ±100 m utara Kantor Kapanewon Seyegan; via Jl. Kebonagung atau jalur Tempel–Seyegan–Godean | p7 ✅ |

Bentang Utara–Selatan (±2,00 km) and Timur–Barat (±1,00 km) are **withheld** — see conflict C08.

### 3.3 Demographics

Sourced from Sistem Informasi Kalurahan (SIK) Sleman, stated as verified
**per 1 September 2026** (p1 ✅). Publish that provenance line with the figures.

| Metric | Value | Source |
|---|---|---|
| Total penduduk | 14.384 jiwa | p1, p2 ✅ |
| Laki-laki | 7.192 (50%) | p2 ✅ |
| Perempuan | 7.192 (50%) | p2 ✅ |
| Rasio jenis kelamin | 1:1 seimbang | p2 ✅ |
| Kepala keluarga | 5.419 KK | p1, p2 ✅ |
| — KK laki-laki | 4.180 | p2 ✅ |
| — KK perempuan | 1.239 | p2 ✅ |
| Penduduk rentan kemiskinan (DTKS) | 1.165 jiwa (8,10%) | p2 ✅ |
| Tingkat penuntasan DTKS | 91,90% mandiri | p2 ✅ |
| Padukuhan | 13 | p1, p2, p3, p8 ✅ |
| RW | 28 | p1, p2, p3 ✅ |

KK gender split reconciles exactly (4.180 + 1.239 = 5.419 ✅). Gender split
reconciles exactly (7.192 × 2 = 14.384 ✅).

**Komposisi keagamaan** (p2 ✅) — publish as stated counts, **without a total**:

| Agama | Jiwa | % |
|---|---|---|
| Islam | 14.065 | 97,78% |
| Katolik | 236 | 1,64% |
| Kristen | 56 | 0,39% |
| Hindu | 6 | 0,04% |
| Buddha | 1 | 0,01% |
| Konghucu / Kepercayaan | 0 | — |

See conflict C06: these sum to 14.364, not 14.384.

**Mata pencaharian — 5 golongan terbanyak** (p2 ✅):

| Golongan | Jiwa |
|---|---|
| Mengurus Rumah Tangga | 2.846 |
| Pelajar / Mahasiswa | 2.782 |
| Buruh Harian Lepas | 2.564 |
| Belum / Tidak Bekerja | 2.478 |
| Karyawan Swasta | 1.528 |

Explicitly a top-5 list, not a complete breakdown — do not total it.

**Pendidikan** — partially withheld, see conflict C07. Publishable:

| Level | Jiwa | Source |
|---|---|---|
| SLTA / Sederajat (mayoritas tertinggi) | 4.837 (33,63%) | p2 ✅ |
| SLTP / Sederajat | 2.287 | p2 ✅ |
| Tidak / Belum Sekolah | 2.114 | p2 ✅ |
| **Lulusan pendidikan tinggi (total)** | **1.288** | p2 ✅ |
| — D1 / D2 | 79 | p2 ✅ |
| — D3 | 305 | p2 ✅ |
| — D4 / S1 | 834 | p2 ✅ |
| — Strata II | 67 | p2 ✅ |
| — Strata III | 3 | p2 ✅ |

Higher-education tiers reconcile exactly (79+305+834+67+3 = 1.288 ✅).
`Tamat SD` and `Belum Tamat SD` are withheld (C07).

### 3.4 Government

**Lurah** — Eko Puji Mulyanto, Lurah Margomulyo, masa bakti **2021–2027**, status
aktif (p1, p2, p3 ✅). Described as penanggung jawab penyelenggaraan pemerintahan,
pembangunan, dan kemasyarakatan kalurahan.

**Kepemimpinan dari masa ke masa** (p2 ✅ — read from the rendered timeline;
the text layer scrambles this ordering completely):

| # | Nama | Keterangan | Periode |
|---|---|---|---|
| 1 | R. Imam Karyono | Lurah Pertama Margomulyo | 1946–1969 |
| 2 | Drs. Asri | Periode Pembangunan Desa Berkelanjutan | 1969–1996 |
| 3 | Suhardjono | Periode Reformasi Desentralisasi | 1996–2004 |
| 4 | Suhardjono | Masa Jabatan Kedua | 2004–2009 |
| 5 | Sunarman | Pemberdayaan Infrastruktur Pertanian | 2009–2015 |
| 6 | Suhardjono | Masa Jabatan Ketiga | 2015–2021 |
| 7 | Eko Puji Mulyanto | Lurah Margomulyo Petahana (Aktif) | 2021–2027 |

Section is labelled "1946 – Sekarang". Two oddities are recorded as stated and
flagged in V09: a 27-year term for Drs. Asri, and Suhardjono's third term being
non-consecutive with his second.

**SOTK — positions** (p3 ✅). Basis: Keistimewaan D.I. Yogyakarta and Peraturan
Daerah Kabupaten Sleman. Positions and their remits are verified; **names are
not** (see V01).

| Jabatan | Sebutan | Remit (source wording) |
|---|---|---|
| Lurah | — | Penyelenggaraan pemerintahan, pembangunan, kemasyarakatan |
| Carik | Sekretaris Kalurahan | Kesekretariatan, administrasi umum, keuangan, perencanaan |
| Kaur Tata Usaha & Umum | Tata Laksana | Surat masuk/keluar, inventaris aset, rumah tangga |
| Kaur Keuangan | Danarta | Pengelolaan kas kalurahan, pelaporan APBKal, perpajakan |
| Kaur Perencanaan | Pangripta | Penyusunan RKPKal, RPJMKal, evaluasi kinerja |
| Kepala Seksi Pemerintahan | Jagabaya | Tata keprajan, trantibum, kependudukan, pertanahan (Sultan Ground) |
| Kepala Seksi Pembangunan & Kemakmuran | Ulu-Ulu | Infrastruktur fisik, pengairan pertanian, lingkungan hidup, ketahanan pangan, pemberdayaan ekonomi |
| Kepala Seksi Kemasyarakatan & Sosial | Kamituwa | Kesejahteraan sosial, kebudayaan, keagamaan, kesehatan, perlindungan perempuan dan anak |
| Dukuh (×13) | Kepala Padukuhan | Pamong kewilayahan |

**Named officials** — only two in the entire source:

| Nama | Jabatan | Source |
|---|---|---|
| Eko Puji Mulyanto | Lurah Margomulyo | p1, p2, p3 ✅ |
| Rini Sapta Wadani | Kasi Tata Pemerintahan; petugas penanggung jawab pengaduan | p5, p7 ✅ |

**BPKal Margomulyo** (p3 ✅) — Badan Permusyawaratan Kalurahan. Lembaga perwujudan
demokrasi, beranggotakan perwakilan warga dari padukuhan berdasarkan musyawarah
mufakat. Three functions stated: fungsi legislasi kalurahan (membahas dan
menyepakati Perkal bersama Lurah), fungsi pengawasan pamong (pelaksanaan Perkal
dan realisasi APBKal), penyerapan aspirasi warga. Musyawarah Kalurahan (Muskal)
held berkala dan terbuka. Membership: not stated (V02).

**Lembaga Kemasyarakatan Kalurahan (LKK)** (p3 ✅) — four described:

| Lembaga | Nama / fokus |
|---|---|
| LPMK Margomulyo | Perencanaan pembangunan partisipatif dari musrenbang padukuhan; menggerakkan swadaya gotong-royong |
| Karang Taruna | "Taruna Bhakti Margomulyo" — sosial, olahraga antar-padukuhan, kesenian daerah, wirausaha muda |
| Tim Penggerak PKK | Kesehatan ibu-anak via Posyandu, pencegahan stunting, HATINYA PKK, kursus keterampilan |
| Satlinmas Kalurahan | Pos kamling di 13 padukuhan, pengamanan hajatan umum, tanggap kebencanaan |

See conflict C12 on the "3 Lembaga Kalurahan" counter.

### 3.5 Padukuhan

**Thirteen padukuhan, in source order** — consistent across p2, p3 and p8 ✅:

| # | Padukuhan | Potensi (p8 ✅) |
|---|---|---|
| 01 | Sawahan | Sentra pertanian padi sawah utama & lumbung pangan desa |
| 02 | Jumeneng | Pertanian padi berkelanjutan & perikanan kolam air tawar |
| 03 | Gerjen | UMKM pengrajin aktif, warung sembako, jasa perbengkelan |
| 04 | Ngemplak | Pertanian sawah terpadu, gudang lumbung pangan, penampungan hasil bumi |
| 05 | Kamal Kulon | Holtikultura sayuran pekarangan, cabai rawit, perikanan kolam terpal |
| 06 | Sompokan | Pertanian sawah produktif & paguyuban pelestari karawitan |
| 07 | Kregolan | Kelompok ternak kambing gibas/etawa & olahan camilan kering |
| 08 | Mangsel | Potensi eduwisata perdesaan: kebun holtikultura, tempe rumahan, peternakan |
| 09 | Daplokan | Pertanian padi sawah subur, industri makanan olahan rumahan |
| 10 | Kasuran | Pengrajin anyaman bambu, perkakas desa, palawija |
| 11 | Mriyan | Paguyuban kebudayaan aktif, gotong royong, pertanian rakyat |
| 12 | Jingin | Budidaya ikan air tawar kolam tanah, pembenihan nila, pembibitan tanaman |
| 13 | Jamblangan | Padukuhan Induk Historis; rumah kesenian Jathilan "Turonggo Bekso Tomo" |

**Per-padukuhan RW/RT counts are withheld entirely** — see conflict C05. Publish
only the corroborated totals: 13 padukuhan, 28 RW.

### 3.6 Public services

Seven services, all **Biaya: Rp 0** (p5 ✅). The source states 100% layanan bebas
pungli.

| # | Layanan | Persyaratan | Waktu | Output | Metode |
|---|---|---|---|---|---|
| 01 | Sinkronisasi Data NIK | Scan/foto KK dan/atau KTP-el asli yang masih berlaku | Maks. 2 hari kerja | NIK aktif & terkonsolidasi nasional | Daring / Loket Kalurahan |
| 02 | Pindah Datang Penduduk NKRI | Scan SKPWNI asli asal, KK tujuan, surat izin pemilik rumah | Maks. 2 hari kerja | KK baru & SK Pindah Datang | Tatap muka / Lukadesi |
| — | Surat Keterangan Kematian *(Layanan Kilat)* | Pengantar RT/RW, Ket. Medis/RS/Pamong, FC KTP almarhum & KK | 30 menit | Surat Keterangan Kematian resmi | Loket Pelayanan Terpadu |
| 04 | Formulir F-1.02 (Pendaftaran Peristiwa) | Kartu Keluarga lama, KTP pemohon, berkas pendukung | 20 menit | Berkas F-1.02 tervalidasi pamong | Tatap muka / Daring |
| 05 | Formulir F.1-15 (Perubahan Data) | Salinan KK, dokumen legal pendukung (ijazah, akta, buku nikah) | 20 menit | Lembar F.1-15 terverifikasi | Loket / Mitra Posyanduku |
| — | Paket 3-in-1 Akta Kelahiran *(Unggulan)* | Surat lahir RS/Bidan, Buku Nikah, KTP orang tua & saksi, KK asli | 7 hari kerja (Terpadu Sleman) | Akta Lahir, KK pembaruan, Kartu Identitas Anak | Lukadesi / Loket Kalurahan |
| 07 | SKPWNI Perpindahan Keluar | Kartu Keluarga asli, KTP pemohon, formulir pengantar pindah | 2 hari kerja | Dokumen SKPWNI & pencabutan KK | Loket Kalurahan & Daring |

**Kategori layanan** (p1, p5 ✅): Kependudukan · Surat Keterangan · Layanan
Mandiri · Aspirasi & Lapor.

**SOP — 4 langkah** (p5 ✅): 01 Persiapan Berkas (Periksa Kelengkapan) → 02
Pengajuan & Loket (Verifikasi Petugas) → 03 Proses & Pengesahan (TTE /
Legalisasi) → 04 Penyerahan Dokumen (100% Selesai & Rp 0).

**4 kanal pelayanan** (p5 ✅): Tatap Muka di Kalurahan · Mitra Posyanduku Daring ·
Kader Posyanduku Padukuhan (jemput bola untuk lansia, difabel, warga sakit) ·
Inovasi Lukadesi Sleman (terhubung Dukcapil Sleman). Warga lansia, difabel dan
ibu hamil diprioritaskan pada antrean Loket Khusus "Margomulyo Peduli Inklusi".

The "28 Standar Operasional" figure is **withheld** — see conflict C02.

### 3.7 News & agenda

Seven articles are documented (p1, p4 ✅). Publish these; publish no total count
(conflict C04).

| Tanggal | Kategori | Judul |
|---|---|---|
| 1 Sep 2026 | Bantuan Sosial · Prestasi | Sinergi Dinsos dan Pamong Margomulyo Salurkan Beras Bagi 1.956 KPM |
| 31 Ags 2026 | Prestasi Sleman | Bawa Nama Sleman di Ajang Apresiasi Widya Manggala Praja |
| 30 Ags 2026 | Kebudayaan | 14 Tahun Keistimewaan DIY: Meneguhkan Kalurahan Mandiri Budaya |
| 28 Ags 2026 | Pemerintahan | Hari yang Dinanti Tiba! Tim Juri Widya Manggala Praja Besok Sambangi Margomulyo |
| 24 Ags 2026 | Sosial & Kemasyarakatan | Hampir Separuh Warga Margomulyo Tercover Perlinsos, 2.394 KK Resmi Teraktivasi |
| 23 Ags 2026 | Masyarakat | GEGAP GEMPITA KEMERDEKAAN! Warga 13 Padukuhan Rayakan… |
| 21 Ags 2026 | Pelayanan Publik | Akselerasi Pelayanan Publik: Buka Layanan Aktivasi Identitas… |

Lead article body (p4 ✅): kerja sama dengan Dinas Sosial Kabupaten Sleman,
penyaluran Cadangan Beras Pemerintah tahap ketiga kepada 1.956 Keluarga Penerima
Manfaat, di Balai Kalurahan. Byline "Tim Liputan Margomulyo", 4 menit baca on p4
/ 3 menit on p1 (V10). Two headlines are truncated by the source layout (V11).

**News categories** (p4 ✅): Semua · Pemerintahan · Bantuan Sosial · Pembangunan ·
Kebudayaan · Pelayanan Publik · Pengumuman.

**Agenda** (p4 ✅):

| Tanggal | Kegiatan | Lokasi / waktu |
|---|---|---|
| 05 Sep | Rakor Pamong — Rapat Koordinasi Rutin Pamong & Dukuh | Ruang Rapat Balai Kalurahan · 08.30 WIB |
| 08 Sep | Evaluasi Sanitasi & Posyandu Terintegrasi | Puskesmas Pembantu Margomulyo · 08.00 WIB |
| Sep *(day not legible — V12)* | Layanan Jemput Bola IKD Padukuhan Mangsel | Balai RW Mangsel, Seyegan · 09.00–13.00 WIB |
| Hingga 15 Sep 2026 | Pembukaan Verifikasi Data Calon Penerima Bantuan Sosial Tahap IV | Warga mencocokkan data via Dukuh, membawa KK dan KTP asli |

### 3.8 Transparency — APBKal TA 2026

All figures p6 ✅. Basis: Perda Kabupaten Sleman dan Keputusan Muskal Margomulyo;
stated "Terverifikasi BPKal Sleman".

**Pendapatan — Rp 3.842.150.000**

| Sumber | Nilai |
|---|---|
| Dana Desa (Pusat) | Rp 1.285.400.000 |
| Alokasi Dana Desa (ADD Sleman) | Rp 1.410.250.000 |
| PADes & Tanah Kas Kalurahan | Rp 514.500.000 |
| BKK Keistimewaan & Bagi Hasil Pajak | Rp 632.000.000 |

Reconciles exactly to Rp 3.842.150.000 ✅.

**Belanja — Rp 3.910.850.000**

| Alokasi | Nilai | % |
|---|---|---|
| Belanja Modal Pembangunan | Rp 1.603.448.500 | 41% |
| Penyelenggaraan Pamong | Rp 1.329.689.000 | 34% |
| Pembinaan Warga & Kebudayaan | Rp 469.302.000 | 12% |
| Pemberdayaan & Penanggulangan | Rp 508.410.500 | 13% |

Reconciles exactly to Rp 3.910.850.000, and every percentage matches its
share ✅.

**Proporsi 5 bidang belanja** (Permendagri / Perbup Sleman classification):

| Bidang | % | Nilai |
|---|---|---|
| Pelaksanaan Pembangunan | 41% | Rp 1,60 M |
| Penyelenggaraan Pemerintahan | 34% | Rp 1,33 M |
| Pembinaan Kemasyarakatan | 12% | Rp 469 Jt |
| Pemberdayaan Masyarakat | 10% | Rp 391 Jt |
| Penanggulangan Bencana & Darurat | 3% | Rp 117 Jt |

Consistent with the four-line breakdown: the combined "Pemberdayaan &
Penanggulangan" line (Rp 508.410.500 / 13%) equals 391 Jt + 117 Jt ✅.

**Pembiayaan netto — + Rp 68.700.000**

| Item | Nilai |
|---|---|
| Penerimaan (SiLPA TA 2025) | Rp 118.700.000 |
| Pengeluaran (Penyertaan BUMKal) | Rp 50.000.000 |
| Status keseimbangan kas | Anggaran berimbang (nol) |

Reconciles: 118.700.000 − 50.000.000 = 68.700.000, which exactly closes the
3.910.850.000 − 3.842.150.000 deficit ✅.

**Realisasi & kinerja** (p6 ✅)

| Metric | Value |
|---|---|
| Capaian fisik lapangan | 82% (target periode 80%; status "melebihi ekspektasi tahapan +2%") |
| Penyerapan kas keuangan | 78% (SPP sah) |
| Realisasi SP2D kas kalurahan | Rp 3.050.463.000 |

SP2D reconciles to 78,0% of belanja ✅.

**Perencanaan** (p6 ✅): 13 Musyawarah Padukuhan (Musduk), 1 Musyawarah
Perencanaan Desa (Musrenbangkal), evaluasi teknis Kapanewon Seyegan. Kehadiran
unsur warga & BPKal 94% (korum sah). Total padukuhan 13; paket kegiatan **28**.

**Alur siklus tata kelola anggaran** — 5 gerbang (p6 ✅):

| # | Tahap | Isi | Status |
|---|---|---|---|
| 01 | Perencanaan | Musyawarah Padukuhan, Muskal, RKPKal & RKP Kalurahan | Tuntas |
| 02 | Penganggaran | Penyusunan Peraturan Kalurahan APBKal bersama BPKal | Tuntas |
| 03 | Pelaksanaan | Pengadaan barang/jasa oleh TPK & pekerjaan swakelola warga | Sedang berjalan |
| 04 | Pemeriksaan | Audit berkala internal BPKal & Inspektorat Daerah Sleman | Tahap review |
| 05 | Pertanggungjawaban | Laporan LPPKal, LPPD, publikasi terbuka pada papan desa | Jadwal Des 2026 |

**Fokus utama 2026** (p6 ✅): 41% belanja modal ke perbaikan jaringan irigasi
tersier pangan, pengaspalan jalan usaha tani sentra padi Seyegan, dan sanitasi
sehat 13 padukuhan.

**Whistleblowing System (WBS)** (p6 ✅): perlindungan anonimitas 100%, respon
audit ≤ 3×24 jam, diawasi Tim BPKal bersama Inspektorat Kabupaten Sleman. Kanal:
WA Pengawasan 0851 3625 3739, atau surat resmi ke Sekretariat BPKal.

Legal framing displayed on p6: UU No. 14/2008 (KIP), "Sleman Sembada
Berintegritas", "Prinsip Open Village Governance". Year selector offers 2026
(tahun berjalan), 2025, 2024 — only 2026 data exists in the source (V13).

### 3.9 Development projects

Five projects (p6 ✅). Publish these; publish no completion counter (conflict C03).

| ID | Proyek | Lokasi | Alokasi | Sumber | Status | Catatan |
|---|---|---|---|---|---|---|
| FIS-01/26 | Saluran Irigasi Tersier & Sekunder Pertanian Seyegan | Padukuhan Mangsel & Sompokan | Rp 145.000.000 | Dana Desa | Sedang berjalan (85%) | Target selesai akhir Triwulan II |
| FIS-02/26 | Cor Blok Jalan Usaha Tani & Drainase Pemukiman | Padukuhan Jamblangan & Sawahan | Rp 180.500.000 | Bantuan Keuangan Khusus | Selesai (100%) | 450 meter; telah diperiksa BPKal |
| FIS-03/26 | Pemeliharaan Balai Padukuhan & Posyandu Terintegrasi | Padukuhan Gerjen & Jingin | Rp 95.000.000 | Alokasi Dana Desa | Sedang berjalan (60%) | Tahap pengecatan & sanitasi |
| FIS-04/26 | Penguatan Sarana Air Bersih & Sanitasi Desa | Padukuhan Kasuran & Kamal Kulon | Rp 120.000.000 | Dana Desa & Swadaya | Direncanakan (TA 2026) | Tahap klarifikasi lokasi teknis |
| EM-01/26 | Pelatihan Kewirausahaan Olahan Pangan UMKM | Balai Kalurahan Margomulyo | Rp 38.500.000 | Bagi Hasil Pajak | Selesai (100%) | 45 kelompok wanita tani; sertifikasi P-IRT & NIB; laporan TPK diterima |

**Pelaksanaan** (p6 ✅): seluruh pembangunan fisik dikerjakan dengan model padat
karya tunai (PKT) untuk menyerap tenaga kerja lokal; melibatkan Tim Pelaksana
Kegiatan (TPK) warga; prinsip gotong royong & swakelola murni; monitoring BPKal
aktif via SIWASDES.

### 3.10 Document repository

Six documents (p6 ✅). File sizes are stated as a group and cannot be mapped to
individual documents from the render (V05), so **sizes are withheld**.

| Kategori | Judul | Keterangan |
|---|---|---|
| APBKal 2026 | Peraturan Kalurahan No. 04 Tahun 2026 tentang APBKal TA 2026 | Ditetapkan 30 Des 2025. Lampiran penjabaran pendapatan, belanja, pembiayaan |
| RKPKal Tahunan | Rencana Kerja Pemerintah Kalurahan (RKPKal) Tahun 2026 | Prioritas program pembangunan & daftar usulan padukuhan yang disepakati |
| RPJMKal (periode 6 tahun) | Rencana Pembangunan Jangka Menengah Kalurahan (RPJMKal) 2021–2027 | Visi, misi, arah kebijakan strategis masa jabatan lurah |
| LPPKal (evaluasi tahunan) | Laporan Penyelenggaraan Pemerintahan Kalurahan (LPPKal) Akhir TA 2025 | Pertanggungjawaban kinerja pamong & penyerapan dana pada penutupan buku 2025 |
| Perkal Kebudayaan DIY | Peraturan Kalurahan No. 02 Tahun 2025 tentang Pelestarian Budaya Kalurahan Mandiri Budaya | Payung hukum pemanfaatan BKK Keistimewaan untuk sanggar seni & kearifan lokal |
| LAKIP Desa | Laporan Akuntabilitas Kinerja Pamong Kalurahan Margomulyo 2025 | Matriks penilaian pelayanan administrasi & kepuasan masyarakat (IKM) |

Document filter categories (p6 ✅): Semua Dokumen · APBKal · RKPKal · RPJMKal ·
LPPKal · Peraturan Kalurahan. All listed as PDF. **The actual files do not
exist** (V04).

### 3.11 Local potential

**Five pillars** (p1, p8 ✅):

| Pilar | Detail |
|---|---|
| Pertanian Padi & Irigasi Teknis | Jaringan Selokan Van der Wijck / Mataram; ratusan hektar sawah padi; pola tanam teratur; pertanian ramah lingkungan. Hasil panen utama: beras Sleman unggul |
| UMKM & Industri Rumahan | Tempe bungkus daun pisang, anyaman bambu perabot, rengginang, peyek kacang, jamu herbal tradisional |
| Budaya & Seni Tradisi | Jathilan Turonggo Bekso Tomo, sanggar karawitan laras madya, sendratari rakyat, wayang kulit merti dusun |
| Peternakan Terpadu | Sapi potong, kambing etawa/gibas; kotoran ternak menjadi pupuk kandang organik |
| Perikanan Air Tawar | Kolam terpal bioflok lele, kolam air deras untuk gurame dan nila merah |

**Pertanian** (p8 ✅): 3× panen per tahun (padi–padi–palawija); irigasi tersier
menjangkau 13 padukuhan (stated as "100%"); rintisan pupuk kompos & pengurangan
pestisida. Komoditas padi utama: **Ciherang, Inpari 32, Menthik Wangi**.
Pembagian air dipantau gotong royong via kelompok Ulu-Ulu. Regenerasi petani muda
melalui pelatihan smart agriculture dan traktor modern.

**Kesenian** (p8 ✅): Jathilan / Kuda Lumping **"Turonggo Bekso Tomo"**, Padukuhan
Jamblangan, **50+ penari & pengrawit aktif**. Agenda tahunan Merti Dusun. Four
strands: Jathilan & Reog · Paguyuban Karawitan (laras pelog & slendro, ibu-ibu
PKK dan kelompok pamong) · Seni Sendratari (Ramayana, pewayangan, cerita rakyat,
oleh Karang Taruna) · Wayang Kulit (semalam suntuk, hari jadi kalurahan dan
ruwatan desa).

**Eduwisata Padukuhan Mangsel** (p8 ✅) — explicitly framed as *potensi
pengembangan*, not an operating attraction. Publish with that framing intact.
Four components: Kebun Holtikultura (rintisan durian unggul, buah pekarangan) ·
Sentra Tempe Rumahan (workshop pangan tradisi) · Edukasi Sawah & Air ·
Lingkungan Guyub.

**UMKM binaan** (p8 ✅):

| UMKM | Padukuhan | Detail |
|---|---|---|
| Tempe Tradisional Daun Pisang "Mbok Sri" | Mangsel | Legalitas NIB terverifikasi, izin edar P-IRT Dinkes Sleman. Rating 4.9/5.0 (120+ ulasan) |
| Kerajinan Bambu & Anyaman "Berkah Mulyo" | Sompokan | Besek hantaran, tampah, tudung saji; bambu apus khas Seyegan. NIB resmi, 100% biodegradable |
| Batik Tulis & Ecoprint "Margo Lestari" | Jamblangan | Motif daun jati & flora pekarangan; pewarna alami; Sertifikat Kurasi DIY; binaan PKK |

Kalurahan facilitates NIB, sertifikasi halal and P-IRT free of charge (p8 ✅).

**Tempe Mbok Sri — detail** (p9 ✅):

| Field | Value |
|---|---|
| Pemilik | Ibu Sri Rahayu (Mbok Sri), pengrajin tempe generasi ke-2 |
| Tahun berdiri | 2012 |
| Lokasi | Padukuhan Mangsel RT 03 / RW 08, Margomulyo; ±400 m barat laut Balai Kalurahan |
| Legalitas | NIB & P-IRT terdaftar; binaan Dinas Koperasi Sleman |
| Nomor P-IRT | 2153404010892-27 |
| Media sosial | @tempemboksri.margomulyo |
| Pekerja | 8 warga (ibu binaan desa) |
| Operasional | Senin–Sabtu 06.00–17.00 WIB; Minggu 06.00–12.00 WIB (pengambilan pesanan H-1) |
| Pesanan besar | Konfirmasi maks. H-2 untuk pesanan di atas 100 bungkus |
| Pengiriman | Gratis ongkir 13 padukuhan (min. belanja Rp 30.000); kemasan vakum luar kota |
| Saluran | Workshop rumah · mitra warung (Pasar Seyegan) · bazar desa |

Products (p9 ✅):

| Produk | Harga | Kemasan |
|---|---|---|
| Tempe Daun Pisang Original | Rp 2.500 / bks | Sedang (180 gr) & Jumbo (350 gr) |
| Keripik Tempe Gurih Sleman | Rp 15.000 / pouch | Pouch 250 gr & 500 gr |
| Tempe Mendoan Mentah Siap Masak | Rp 12.000 / pack | 10 lembar tipis + bumbu celup |
| Tempe Bacem Manis Gurih Siap Saji | Rp 18.000 / pack | Vakum kedap udara, isi 6 potong tebal |

Production capacity is **withheld** — see conflict C09. The WhatsApp number on
p9 is **withheld** — see conflict C10.

### 3.12 Contact

All p1, p7 ✅ (identical in every page footer).

| Field | Value |
|---|---|
| Alamat | Jalan Mulia No. 1, Margomulyo, Seyegan, Sleman, D.I. Yogyakarta 55561 |
| Telepon kantor | (0274) 4364 719 |
| WhatsApp resmi | +62 851 3625 3739 |
| Email | desamargomulyo@slemankab.go.id |
| Jam layanan | Senin–Kamis 08.00–11.00 WIB · Jumat 08.00–10.00 WIB · Sabtu, Minggu & hari libur nasional tutup |
| Layanan daring | Lukadesi & WhatsApp dapat menerima pengajuan 24 jam; verifikasi pada jam kerja berikutnya |

**Pengaduan** (p5, p7 ✅). Petugas penanggung jawab: **Ibu Rini Sapta Wadani**.
Standar penanganan: respon awal maksimal 1×24 jam kerja. Four channels:

| # | Kanal | Detail |
|---|---|---|
| 01 | Meja Pelayanan Pengaduan Terpadu | Loket konsultasi & pengaduan di kantor kalurahan, jam operasional |
| 02 | WhatsApp khusus aduan | 0851 3625 3739 — pesan cepat, bukti foto, dokumen keluhan |
| 03 | Surel resmi pengaduan | desamargomulyo@slemankab.go.id (subjek: PENGADUAN) |
| 04 | Kotak saran fisik | Amplop saran anonim di ruang tunggu loket |

Kerahasiaan identitas pelapor dijamin (p5, p7 ✅).

**Contact form fields** (p7 ✅): Nama Lengkap* · Nomor WhatsApp/HP* · Email
(opsional) · Kategori Keperluan* · Padukuhan Domisili* (13 options) · Isi Pesan /
Pengaduan / Aspirasi* (maks. 1.000 karakter). Category options are not enumerated
in the source (V14).

**Fasilitas kompleks** (p7 ✅): pendopo & ruang layanan terbuka, ruang tunggu
nyaman, area bermain anak, pojok laktasi, parkir luas, ramah disabilitas.

---

## 4. Conflict register

Every conflict below was confirmed against the rendered page image. **Resolution
"withhold" means the value must not appear anywhere in the public UI, seed data,
or CMS defaults** until the kalurahan resolves it.

| ID | Conflict | Evidence | Resolution |
|---|---|---|---|
| **C01** | APBKal revenue split | p1 pills read "Transfer 65% · PAD 25% · Lain 10%" ✅. p6 itemisation gives transfers (DD+ADD+BKK) = Rp 3.327.650.000 ≈ 86,6% and PADes = Rp 514.500.000 ≈ 13,4%. The pills contradict the itemisation by ~21 points. | **Publish the p6 itemisation. Delete the three-segment pill bar.** The itemisation reconciles exactly to the stated total; the pills do not. |
| **C02** | Service count | p1: "Lihat Seluruh Katalog Layanan (28 Standar Operasional)" ✅. p5: "Semua Layanan (7)" with 7 detailed ✅. | **Publish 7 services, no total badge.** Note: p6 separately states "28 Kegiatan" for APBKal work packages — the p1 label may be a mislabel of that unrelated figure. |
| **C03** | Project count | p1: "82% Target Fisik Terealisasi — 34 dari 41 Proyek Tuntas" ✅. p6: "Paket Kegiatan: 28 Kegiatan", 5 projects detailed ✅. | **Publish 5 projects and the 82% figure (corroborated on both pages). Withhold "34 dari 41".** |
| **C04** | News count | p4: "Menampilkan 1-7 dari 24 Warta Kalurahan" ✅, 7 articles present. | **Publish 7 articles; no total.** Pagination derives from actual record count. |
| **C05** | Per-padukuhan RW/RT | p2 and p3 both list all 13 padukuhan with RW/RT — and **disagree on 9 of 13**. p2 sums to 28 RW / **88** RT; p3 sums to 28 RW / **87** RT; both pages state a rekapitulasi of 28 RW / **86** RT. No page reconciles with its own total. | **Withhold all per-padukuhan RW/RT figures and the 86 RT total.** Publish only "13 Padukuhan" and "28 RW", which every page corroborates and both itemisations sum to. |
| **C06** | Religion totals | p2 counts sum to 14.364 ✅ against a stated population of 14.384 — 20 unaccounted. | **Publish per-religion counts and percentages as stated; do not render a total or a "sisanya" bucket.** |
| **C07** | Education totals | p2 shows "Tamat SD / Sederajat 1.635" and "Belum Tamat SD 1.635" ✅ — identical values whose progress bars are visibly *different lengths*, so at least one label is wrong. All categories sum to 13.796 vs. population 14.384. | **Withhold both SD-level figures.** Publish SLTA, SLTP, Tidak/Belum Sekolah and the higher-education tiers, which reconcile internally. Render no total. |
| **C08** | Geographic extent | p2: bentang U–S ±2,00 km, T–B ±1,00 km ✅ → ≈200 Ha, against a stated 515,20 Ha. | **Withhold both bentang figures.** Publish luas wilayah 515,20 Ha (corroborated on p1, p2, p8). |
| **C09** | UMKM capacity | p8: "Kapasitas Produksi 150 kg/hari". p9: "120+ kg Kedelai Diolah / Hari". | **Withhold capacity.** Note these may measure different things (finished tempe vs. soybean input) — the kalurahan should confirm which. |
| **C10** | UMKM phone number | p9 lists Tempe Mbok Sri's WhatsApp as +62 851-3625-3739 — **identical to the kalurahan's official number** ✅. Near-certainly a concept placeholder. | **Withhold.** Publishing it would route citizen orders to the government hotline. |
| **C11** | Copyright year | Every footer reads "© 2025" while all content is dated 2026 ✅. | **Use the current year dynamically.** Not a factual claim about the kalurahan. |
| **C12** | Lembaga count | p3 header: "3 Lembaga Kalurahan" ✅. p3 LKK section describes **4** (LPMK, Karang Taruna, PKK, Satlinmas) ✅. p2 Misi 10 names exactly 3 (LPMK, Karang Taruna, PKK) ✅. | **Publish the 4 described lembaga; withhold the "3" counter.** The 3 likely traces to Misi 10's wording, which uses "antara lain" (non-exhaustive). |
| **C13** | Leadership timeline | Text extraction scrambles names against periods beyond recovery. | **Resolved by reading the render** — mapping in §3.4 is authoritative. Two oddities flagged as V09. |

---

## 5. Verification register — `TODO: VERIFY WITH KALURAHAN`

| ID | Item | Impact | Blocks |
|---|---|---|---|
| **V01** | Names of all 13 Dukuh and of the Carik, Jagabaya, Ulu-Ulu, Kamituwa, Danarta, Pangripta and Tata Laksana. Source names only the Lurah and Rini Sapta Wadani. | `/pemerintahan` and `/padukuhan` are core routes that will be largely position-only. | Phase 5 |
| **V02** | BPKal membership and leadership (Ketua). | BPKal section is descriptive only. | Phase 5 |
| **V03** | LPMK / Karang Taruna / PKK / Satlinmas leadership. | Lembaga cards are descriptive only. | Phase 5 |
| **V04** | The six official PDF documents themselves. Only titles and metadata exist. | `/dokumen` has no downloadable files. | Phase 7 |
| **V05** | Per-document file sizes. Source lists six sizes (14.1, 4.2, 8.6, 6.5, 2.1, 3.8 MB) as an unmapped group. | Sizes withheld from document cards. | Phase 7 |
| **V06** | The remaining 21 services, if "28 Standar Operasional" is accurate (C02). | Service catalogue shows 7. | Phase 6 |
| **V07** | The remaining 23 development projects, if "41 proyek" is accurate (C03). | Project tracker shows 5. | Phase 7 |
| **V08** | The remaining 17 news articles, if "24 warta" is accurate (C04). | News archive shows 7. | Phase 5 |
| **V09** | Leadership timeline oddities: Drs. Asri's 27-year term (1969–1996), and Suhardjono's three non-consecutive terms with Sunarman's between the 2nd and 3rd. | Published as stated; flagged for confirmation. | — |
| **V10** | Lead article reading time: "3 menit" (p1) vs "4 menit" (p4). | Compute from body length instead. | Phase 5 |
| **V11** | Two news headlines truncated by the source layout: the 23 Ags and 21 Ags items. | Headlines incomplete. | Phase 5 |
| **V12** | Date of the "Layanan Jemput Bola IKD Padukuhan Mangsel" agenda item — month shown, day not legible. | Agenda entry incomplete. | Phase 5 |
| **V13** | APBKal data for 2025 and 2024. The year selector offers them; only 2026 exists. | Year selector shows 2026 only, or disables empty years. | Phase 7 |
| **V14** | "Kategori Keperluan" options for the contact form. Field exists; options not enumerated. | Category taxonomy must be defined with the kalurahan. | Phase 8 |
| **V15** | Official kalurahan logo/lambang as a vector asset. Only a low-resolution raster appears in the header render. | Header and favicon need the real mark. | Phase 4 |
| **V16** | Photography rights and consent for the images in the concept (Lurah portrait, bansos distribution, village scenes). | Cannot ship concept imagery without confirmed provenance. | Phase 5 |
| **V17** | Geographic coordinates for the Balai Kalurahan map embed. | Map uses the postal address until confirmed. | Phase 5 |
| **V18** | Whether "Lukadesi" and "Posyanduku" integrations are live systems with APIs, or referral channels only. | Determines whether "Layanan Mandiri" links out or integrates. | Phase 6 |
| **V19** | Statistics reference date. Stated "per 1 September 2026" — confirm this is the intended publication basis. | Provenance line is published with the figures. | Phase 5 |

---

## 6. Publication rules

Derived from the register above. These become assertions in the Phase 13 test
suite:

1. **Never render a total the source contradicts** — no "86 RT", no "28 layanan",
   no "41 proyek", no "24 warta", no population total beneath the religion or
   education breakdowns.
2. **Never render a withheld value** — per-padukuhan RW/RT, bentang wilayah,
   Tamat SD / Belum Tamat SD, UMKM production capacity, UMKM phone number,
   per-document file sizes.
3. **Pagination and counts are computed from real records**, never hardcoded from
   the concept.
4. **Provenance travels with statistics** — the SIK Sleman line accompanies the
   demographic figures wherever they appear.
5. **Framing is preserved** — Mangsel eduwisata is "potensi pengembangan", not an
   operating attraction; APBKal figures are TA 2026 tahun berjalan.
6. **Seed data is real or absent.** No lorem ipsum, no invented officials, no
   filler articles to make a grid look full. Empty states are the correct answer
   to missing content.
