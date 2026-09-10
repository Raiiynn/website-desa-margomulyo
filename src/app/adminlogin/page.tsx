'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Translate common Supabase errors to Indonesian
        const messages: Record<string, string> = {
          'Invalid login credentials':
            'Email atau kata sandi salah. Silakan periksa kembali.',
          'Email not confirmed':
            'Akun belum terverifikasi. Silakan cek email Anda.',
          'Too many requests':
            'Terlalu banyak percobaan. Silakan tunggu beberapa saat.',
        };
        setError(messages[authError.message] ?? authError.message);
        return;
      }

      startTransition(() => {
        router.push('/admin');
        router.refresh();
      });
    } catch {
      setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }

  const loading = isLoading || isPending;

  return (
    <div className="min-h-screen flex flex-col bg-navy-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Top-right subtle geometric pattern */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-72 h-72 rounded-full bg-blue-700/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-600/5 blur-3xl" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Header strip */}
      <div className="relative z-10 px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors text-sm font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          <span>Kembali ke Beranda</span>
        </Link>

        <span className="text-[11px] text-white/30 uppercase tracking-widest font-semibold hidden sm:block">
          Sistem Tata Kelola Kalurahan
        </span>
      </div>

      {/* Main login area */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Brand identity block */}
          <div className="text-center mb-10">
            <Image
              src="/lambang-sleman.png"
              alt=""
              width={54}
              height={64}
              priority
              className="block mx-auto mb-5 h-16 w-auto"
            />

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Panel Pamong
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Masuk untuk mengakses dasbor administrasi Kalurahan Margomulyo
            </p>
          </div>

          {/* Login card */}
          <div className="rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-md p-8 shadow-2xl shadow-black/20">
            {/* Error alert */}
            {error && (
              <div
                className="mb-6 rounded-xl bg-red-500/10 border border-red-400/20 px-4 py-3 flex items-start gap-3"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-400 shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-300 leading-snug">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold text-white/70 uppercase tracking-wider"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="pamong@margomulyo.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 pl-11 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-700/60 focus:border-blue-700/40 transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-white/70 uppercase tracking-wider"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="18"
                        height="11"
                        x="3"
                        y="11"
                        rx="2"
                        ry="2"
                      />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 pl-11 pr-12 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-700/60 focus:border-blue-700/40 transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
                    tabIndex={-1}
                    aria-label={
                      showPassword
                        ? 'Sembunyikan kata sandi'
                        : 'Tampilkan kata sandi'
                    }
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                id="admin-login-submit"
                className="w-full rounded-xl bg-blue-700 text-white font-semibold text-sm py-3 px-4 hover:bg-[#0f6bb0] active:bg-[#01528b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    <span>Masuk ke Panel Administrasi</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer info */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-xs text-white/30 leading-relaxed">
              Hanya untuk aparatur pamong Kalurahan Margomulyo.
              <br />
              Akses tidak sah akan tercatat dan dilaporkan.
            </p>

            <div className="flex items-center justify-center gap-2 text-[11px] text-white/20">
              <span className="h-1 w-1 rounded-full bg-green-700" />
              <span>Koneksi Terenkripsi (SSL/TLS)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-6 py-4 text-center">
        <p className="text-[11px] text-white/20">
          © 2026 Kalurahan Margomulyo, Kapanewon Seyegan, Kabupaten Sleman
        </p>
      </div>
    </div>
  );
}
