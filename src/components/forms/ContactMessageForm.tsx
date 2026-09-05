'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { PADUKUHAN } from '@/data/fixtures';
import { ShieldCheck } from '@/components/ui/Icons';

export function ContactMessageForm() {
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div>
        <label htmlFor="kontak-nama-lengkap-sesuai-ktp" className="block text-xs font-semibold text-text-strong mb-1">
          Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
        </label>
        <input
                    id="kontak-nama-lengkap-sesuai-ktp"
          type="text"
          required
          placeholder="Nama pemohon"
          className="w-full rounded-control border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
        />
      </div>

      <div>
        <label htmlFor="kontak-nomor-telepon-whatsapp" className="block text-xs font-semibold text-text-strong mb-1">
          Nomor Telepon / WhatsApp <span className="text-red-500">*</span>
        </label>
        <input
                    id="kontak-nomor-telepon-whatsapp"
          type="tel"
          required
          placeholder="081234567xxx"
          className="w-full rounded-control border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
        />
      </div>

      <div>
        <label htmlFor="kontak-domisili-padukuhan" className="block text-xs font-semibold text-text-strong mb-1">
          Domisili Padukuhan <span className="text-red-500">*</span>
        </label>
        <select
                    id="kontak-domisili-padukuhan"
          required
          className="w-full rounded-control border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700 bg-white"
        >
          <option value="">Pilih Padukuhan Anda</option>
          {PADUKUHAN.map((pad) => (
            <option key={pad.number} value={pad.slug}>
              Padukuhan {pad.name}
            </option>
          ))}
          <option value="luar-desa">Warga Luar Margomulyo</option>
        </select>
      </div>

      <div>
        <label htmlFor="kontak-pesan-keperluan" className="block text-xs font-semibold text-text-strong mb-1">
          Pesan / Keperluan <span className="text-red-500">*</span>
        </label>
        <textarea
                    id="kontak-pesan-keperluan"
          rows={4}
          required
          placeholder="Tuliskan pertanyaan atau keperluan administrasi Anda..."
          className="w-full rounded-control border border-field-border px-3.5 py-2 text-xs text-text-strong focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-700"
        />
      </div>

      <Button type="submit" variant="primary" size="md" className="w-full font-semibold">
        Kirimkan Pesan Sekarang
      </Button>

      <div className="pt-2 text-[11px] text-text-muted text-center flex items-center justify-center gap-1.5">
        <ShieldCheck size={14} className="text-green-700" />
        <span>Kerahasiaan data pemohon terlindungi secara resmi.</span>
      </div>
    </form>
  );
}
