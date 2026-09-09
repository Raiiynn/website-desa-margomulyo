/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // TEMPORARY probe: single worker to lower peak memory.
  experimental: { cpus: 1, workerThreads: false },

  // Fail the build on type or lint errors rather than shipping them.
  // Next defaults to failing on type errors; being explicit documents intent.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  // Do not leak the framework version in response headers.
  poweredByHeader: false,

  // Trailing slashes change canonical URLs; keep them off and consistent
  // so /berita and /berita/ do not both resolve (MASTER_PROMPT §27).
  trailingSlash: false,

  images: {
    // The "public" bucket now exists (official portraits, uploaded via
    // Supabase Storage). Scoped to that one bucket's path, not the whole
    // Supabase host, so a future private bucket is not implicitly trusted.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Baseline hardening. The full policy, including CSP, lands in
          // Phase 12 once the asset and font origins are known.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
