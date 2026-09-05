'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PADUKUHAN, getSetting } from '@/data/fixtures';
import {
  ShieldCheck,
  CheckCircle,
  Search,
} from '@/components/ui/Icons';

interface TrackingResult {
  token: string;
  status: string;
  date: string;
  category: string;
  officer: string;
  note: string;
}

export default function PengaduanPage() {
  const officer = getSetting('complaint.officer', 'Rini Sapta Wadani');
  const responseStandard = getSetting(
    'complaint.responseStandard',
    'Respon awal maksimal 1 x 24 jam kerja'
  );

  // Form state
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate generation of confidential citizen tracking token
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const token = `MGM-2026-${randomHex}`;
    setSubmittedToken(token);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;

    // Simulate looking up tracking status
    setTrackingResult({
      token: trackingInput.trim().toUpperCase(),
      status: 'Sedang Diproses (Processing)',
      date: '4 September 2026',
      category: 'Infrastruktur & Pengairan',
      officer: officer,
      note: 'Laporan telah diverifikasi oleh tim Kasi Pembangunan dan dijadwalkan tinjauan lapangan bersama TPK padukuhan terkait.',
    });
  };

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Pengaduan & Aspirasi' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Kanal Pengawasan Partisipatif
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Layanan Pengaduan & Aspirasi Warga
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Sampaikan aspirasi, saran pembangunan, atau laporan pengaduan pelayanan
            desa secara aman dan bertanggung jawab. Kerahasiaan identitas Anda
            terlindungi dengan opsi pelaporan anonim.
          </p>
        </div>

        {/* Accountability & Privacy Standard Strip */}
        <div className="rounded-2xl border border-border bg-band p-6 sm:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block">
                Petugas Penanggung Jawab
              </span>
              <p className="font-serif text-lg font-bold text-navy-900">
                {officer}
              </p>
              <p className="text-xs text-text-body">
                Kasi Tata Pemerintahan Kalurahan
              </p>
            </div>

            <div className="md:pl-6 space-y-1 pt-4 md:pt-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-green-700 block">
                Standar Penanganan
              </span>
              <p className="font-serif text-lg font-bold text-navy-900">
                Maksimal 1 x 24 Jam
              </p>
              <p className="text-xs text-text-body">{responseStandard}</p>
            </div>

            <div className="md:pl-6 space-y-1 pt-4 md:pt-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-750 block">
                Jaminan Kerahasiaan
              </span>
              <p className="font-serif text-lg font-bold text-navy-900 flex items-center gap-1.5">
                <ShieldCheck size={18} className="text-gold-600" />
                <span>Opsi Anonim</span>
              </p>
              <p className="text-xs text-text-body">
                Token pelacak rahasia satu arah
              </p>
            </div>
          </div>
        </div>

        {/* Form and Tracking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          {/* Formulir Pengaduan (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-2">
              Formulir Aduan & Aspirasi Masyarakat
            </h2>
            <p className="text-xs text-text-body mb-6">
              Isi formulir berikut dengan informasi yang akurat demi kelancaran
              tindak lanjut aparatur desa.
            </p>

            {submittedToken ? (
              <div className="rounded-xl border border-green-700/30 bg-green-700/5 p-6 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-700/15 text-green-800 mx-auto flex items-center justify-center">
                  <CheckCircle size={28} />
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900">
                  Aduan Berhasil Terdaftar!
                </h3>
                <p className="text-xs text-text-body max-w-md mx-auto leading-relaxed">
                  Laporan Anda telah masuk ke sistem registrasi aduan Kalurahan Margomulyo.
                  Simpan token pelacak rahasia ini untuk memeriksa perkembangan penanganan:
                </p>
                <div className="p-3 bg-white border border-field-border rounded-lg font-mono font-bold text-lg text-navy-900 tracking-wider inline-block">
                  {submittedToken}
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setSubmittedToken(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Kirim Aduan Lain
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pengaduan-jenis-pengajuan" className="block text-xs font-semibold text-text-strong mb-1">
                    Jenis Pengajuan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pengaduan-jenis-pengajuan"
                    required
                    className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 bg-white"
                  >
                    <option value="PENGADUAN">Laporan Pengaduan Masyarakat</option>
                    <option value="ASPIRASI">Aspirasi & Usulan Pembangunan</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pengaduan-kategori-laporan" className="block text-xs font-semibold text-text-strong mb-1">
                    Kategori Laporan <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pengaduan-kategori-laporan"
                    required
                    className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 bg-white"
                  >
                    <option value="infrastruktur">Pelaksanaan Pembangunan & Saluran Irigasi</option>
                    <option value="pelayanan">Pelayanan Administrasi & Pamong</option>
                    <option value="bansos">Penyaluran Bantuan Sosial & Kesejahteraan</option>
                    <option value="trantibum">Ketertiban, Keamanan, & Trantibum</option>
                    <option value="lainnya">Lain-lain / Aspirasi Warga</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pengaduan-wilayah-padukuhan-terkait" className="block text-xs font-semibold text-text-strong mb-1">
                    Wilayah Padukuhan Terkait <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="pengaduan-wilayah-padukuhan-terkait"
                    required
                    className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 bg-white"
                  >
                    <option value="">Pilih Padukuhan Terkait</option>
                    {PADUKUHAN.map((pad) => (
                      <option key={pad.number} value={pad.slug}>
                        Padukuhan {pad.name}
                      </option>
                    ))}
                    <option value="seluruh-desa">Seluruh Wilayah Kalurahan</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pengaduan-judul-pokok-aduan" className="block text-xs font-semibold text-text-strong mb-1">
                    Judul Pokok Aduan <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="pengaduan-judul-pokok-aduan"
                    type="text"
                    required
                    placeholder="Tuliskan pokok persoalan secara ringkas..."
                    className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>

                <div>
                  <label htmlFor="pengaduan-rincian-keterangan-kronologi" className="block text-xs font-semibold text-text-strong mb-1">
                    Rincian Keterangan / Kronologi <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="pengaduan-rincian-keterangan-kronologi"
                    rows={4}
                    required
                    maxLength={1000}
                    placeholder="Jelaskan secara runtut lokasi kejadian, pihak terkait, atau saran perbaikan yang diusulkan (maksimal 1.000 karakter)..."
                    className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>

                {/* Anonymous Option */}
                <div className="rounded-xl border border-border bg-band p-4 flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="anonymous-toggle"
                      className="font-semibold text-xs text-text-strong cursor-pointer"
                    >
                      Kirim Sebagai Laporan Anonim
                    </label>
                    <p className="text-[11px] text-text-body">
                      Nama dan kontak Anda tidak akan ditampilkan ke publik.
                    </p>
                  </div>
                  <input
                    id="anonymous-toggle"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-700"
                  />
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pengaduan-nama-lengkap-pelapor" className="block text-xs font-semibold text-text-strong mb-1">
                        Nama Lengkap Pelapor
                      </label>
                      <input
                    id="pengaduan-nama-lengkap-pelapor"
                        type="text"
                        placeholder="Nama Anda"
                        className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="pengaduan-nomor-whatsapp-pelapor" className="block text-xs font-semibold text-text-strong mb-1">
                        Nomor WhatsApp Pelapor
                      </label>
                      <input
                    id="pengaduan-nomor-whatsapp-pelapor"
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        className="w-full rounded-[10px] border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                      />
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full font-semibold">
                    Kirimkan Laporan & Terbitkan Token
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Kolom Kanan: Pelacakan Token Aduan (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                Lacak Progres Aduan
              </h3>
              <p className="text-xs text-text-body mb-5">
                Masukkan token pelacak rahasia Anda untuk memantau status tindak lanjut petugas:
              </p>

              <form onSubmit={handleTrack} className="space-y-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Contoh: MGM-2026-AB12CD"
                    className="w-full rounded-xl border border-field-border pl-9 pr-3.5 py-2 text-xs font-mono uppercase text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" className="w-full">
                  Cek Status Laporan
                </Button>
              </form>

              {trackingResult && (
                <div className="mt-6 pt-5 border-t border-[#f1f5f9] space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-navy-900">
                      {trackingResult.token}
                    </span>
                    <Badge variant="blue">{trackingResult.status}</Badge>
                  </div>
                  <div className="text-text-body space-y-1">
                    <p><strong>Tanggal Masuk:</strong> {trackingResult.date}</p>
                    <p><strong>Kategori:</strong> {trackingResult.category}</p>
                    <p><strong>Petugas Verifikator:</strong> {trackingResult.officer}</p>
                  </div>
                  <div className="rounded-lg bg-band p-3 text-[11px] text-text-strong border border-border">
                    <strong>Catatan Petugas:</strong> {trackingResult.note}
                  </div>
                </div>
              )}
            </div>

            {/* SOP 5 Tahap Pengaduan */}
            <div className="rounded-2xl border border-[#d6e7f7] bg-surface-tint p-6 text-xs space-y-3">
              <h4 className="font-bold text-sm text-navy-900">
                Alur Status Penanganan Pengaduan
              </h4>
              <div className="space-y-2 text-text-body">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">1. Received:</span>
                  <span>Aduan masuk ke sistem dan tercatat resmi.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">2. Reviewed:</span>
                  <span>Kasi Tata Pemerintahan menelaah dokumen dan keabsahan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">3. Processing:</span>
                  <span>Koordinasi teknis ke pamong pelaksana atau rapat padukuhan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">4. Resolved:</span>
                  <span>Tindakan perbaikan tuntas dan hasil diinformasikan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">5. Closed:</span>
                  <span>Aduan selesai dan diarsipkan dalam laporan berkala.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
