import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-safe Supabase client singleton.
 *
 * Uses the public (anon) key which is safe to expose to the browser.
 * Row Level Security on the Supabase side ensures data safety.
 *
 * Uses `@supabase/ssr`'s `createBrowserClient` so that cookie-based
 * auth sessions are handled consistently between client and server.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
