import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Middleware — Auth guard for the admin panel.
 *
 * 1. Refreshes the Supabase auth session on every request (keeps the
 *    cookie alive so Server Components see the latest token).
 * 2. Protects `/admin` routes: unauthenticated users are redirected
 *    to `/adminlogin`.
 * 3. Redirects already-authenticated users away from `/adminlogin`
 *    to `/admin` (no need to see the login page again).
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do NOT call supabase.auth.getSession() here.
  // getUser() actually validates the JWT against the Supabase server,
  // while getSession() only reads from the cookie without validation.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // --- Guard: protect /admin routes ---
  if (pathname.startsWith('/admin') && !pathname.startsWith('/adminlogin')) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/adminlogin';
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- Guard: redirect logged-in users away from /adminlogin ---
  if (pathname.startsWith('/adminlogin')) {
    if (user) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = '/admin';
      return NextResponse.redirect(adminUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all admin routes, including /adminlogin.
     * Excludes _next/static, _next/image, favicon, and public assets.
     */
    '/admin/:path*',
    '/adminlogin/:path*',
  ],
};
