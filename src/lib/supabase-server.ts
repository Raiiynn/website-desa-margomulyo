import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Server-side Supabase client.
 *
 * Must only be called within Server Components, Server Actions, or
 * Route Handlers — anywhere `next/headers` cookies are available.
 *
 * The cookie adapter ensures the same auth session is visible both
 * on the server and in the browser via `@supabase/ssr`.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` is called from a Server Component where cookies
            // cannot be modified. This is expected — the middleware will
            // handle the refresh instead.
          }
        },
      },
    },
  );
}
