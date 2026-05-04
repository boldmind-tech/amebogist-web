import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const HUB_URL =
  process.env['NEXT_PUBLIC_HUB_URL'] ||
  (process.env.NODE_ENV === 'production' ? 'https://boldmind.ng' : 'http://localhost:4001');

const SSO_COOKIE = 'boldmind_sso';

export function proxy(request: NextRequest): NextResponse {
  const token = request.cookies.get(SSO_COOKIE)?.value;

  if (token) return NextResponse.next();

  const loginUrl = new URL(`${HUB_URL}/login`);
  loginUrl.searchParams.set('return_url', request.nextUrl.href);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  // Only guard creator-side routes on amebogist.ng
  // Everything else (articles, categories, search) is public
  matcher: [
    '/create/:path*',
    '/my-articles/:path*',
    '/profile/edit/:path*',
  ],
};