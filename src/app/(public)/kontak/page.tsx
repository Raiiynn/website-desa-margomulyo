import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/Badge';
import { ContactMessageForm } from '@/components/forms/ContactMessageForm';
import { getSetting } from '@/data/fixtures';
import { MapPin, Phone, Mail, Clock } from '@/components/ui/Icons';

export const metadata: Metadata = {
  title: 'Kontak Resmi',
  description:
    'Alamat kantor, nomor telepon, WhatsApp, dan jam pelayanan resmi Pemerintah Kalurahan Margomulyo, Kapanewon Seyegan, Sleman.',
};

export default function KontakPage() {
  const address = getSetting(
    'contact.address',
    'Jalan Mulia No. 1, Margomulyo, Seyegan, Sleman, D.I. Yogyakarta 55561'
  );
  const phone = getSetting('contact.phone', '(0274) 4364 719');
  const whatsapp = getSetting('contact.whatsapp', '+62 851 3625 3739');
  const email = getSetting('contact.email', 'desamargomulyo@slemankab.go.id');
  const hoursWeekday = getSetting('service.hoursWeekday', 'Senin–Kamis 08.00–11.00 WIB');
  const hoursFriday = getSetting('service.hoursFriday', 'Jumat 08.00–10.00 WIB');
  const hoursClosed = getSetting(
    'service.hoursClosed',
    'Sabtu, Minggu, dan hari libur nasional tutup'
  );
  const onlineNote = getSetting(
    'service.onlineNote',
    'Layanan mandiri daring (Lukadesi Sleman dan konsultasi WhatsApp pamong) menerima pengajuan 24 jam. Validasi dan verifikasi teknis diproses pada jam kerja berikutnya.'
  );

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: 'Kontak' }]} />

        {/* Page Header */}
        <div className="mt-4 max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Informasi & Kunjungan
          </Badge>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 tracking-tight">
            Kontak & Pelayanan Kalurahan
          </h1>
          <p className="mt-4 text-base text-text-body leading-relaxed">
            Pemerintah Kalurahan Margomulyo siap melayani kebutuhan informasi dan
            administrasi warga melalui saluran tatap muka di kantor balai desa maupun
            saluran daring resmi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Kolom Kiri: Detail Kontak & Jam Pelayanan (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Kartu Alamat & Kontak Cepat */}
            <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-navy-900">
                Pusat Pelayanan Kantor Kalurahan
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-surface-tint text-blue-700 flex items-center justify-center shrink-0 border border-[#d6e7f7]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-semibold text-text-strong block">
                      Alamat Kantor
                    </span>
                    <p className="text-xs text-text-body mt-0.5 leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-surface-tint text-blue-700 flex items-center justify-center shrink-0 border border-[#d6e7f7]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-semibold text-text-strong block">
                      Telepon Resmi
                    </span>
                    <p className="text-xs text-text-body mt-0.5">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-green-700/10 text-green-700 flex items-center justify-center shrink-0 border border-green-700/20">
                    <span className="font-bold text-xs">WA</span>
                  </div>
                  <div>
                    <span className="font-semibold text-text-strong block">
                      WhatsApp Resmi Pamong
                    </span>
                    <p className="text-xs text-text-body mt-0.5">{whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 rounded-lg bg-surface-tint text-blue-700 flex items-center justify-center shrink-0 border border-[#d6e7f7]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-semibold text-text-strong block">
                      Surel Resmi (Email)
                    </span>
                    <p className="text-xs text-text-body mt-0.5">{email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jam Pelayanan Tatap Muka & Daring */}
            <div className="rounded-2xl border border-border bg-band p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-blue-700" />
                <h3 className="font-serif text-lg font-bold text-navy-900">
                  Jam Pelayanan Tatap Muka
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="rounded-xl border border-border bg-white p-4">
                  <span className="font-bold text-navy-900 block">
                    Senin – Kamis
                  </span>
                  <span className="text-blue-700 font-semibold mt-1 block">
                    {hoursWeekday}
                  </span>
                </div>

                <div className="rounded-xl border border-border bg-white p-4">
                  <span className="font-bold text-navy-900 block">Jumat</span>
                  <span className="text-blue-700 font-semibold mt-1 block">
                    {hoursFriday}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-text-muted pt-1">
                ⚠️ {hoursClosed}
              </p>

              <div className="pt-3 border-t border-[#e2e8f0] text-xs text-text-strong leading-relaxed">
                <strong className="text-blue-700">Layanan Daring:</strong> {onlineNote}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Formulir Kirim Pesan Cepat (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-2">
              Kirim Pesan atau Pertanyaan
            </h2>
            <p className="text-xs text-text-body mb-6">
              Sampaikan permohonan informasi atau konfirmasi administrasi langsung ke
              kesekretariatan kalurahan.
            </p>

            <ContactMessageForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
