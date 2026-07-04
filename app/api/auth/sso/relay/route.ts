import { NextRequest, NextResponse } from 'next/server';
import { exchangeSsoToken } from '@boldmindng/auth/server';
import { AUTH_CONFIG } from '@boldmindng/auth';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('sso_token');
  const returnPath = request.nextUrl.searchParams.get('return_path') ?? '/dashboard';

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { accessToken, refreshToken, user } = await exchangeSsoToken(token);

  const response = NextResponse.redirect(new URL(returnPath, request.url));
  response.cookies.set(AUTH_CONFIG.refreshCookieName ?? 'amg_refresh', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    domain: '.amebogist.ng',
    maxAge: 60 * 60 * 24 * 7, // 7 days, matches REFRESH_TOKEN_EXPIRES_IN
  });

  // accessToken is handed to AuthProvider via a short-lived, non-httpOnly
  // bootstrap cookie OR a one-time client fetch to /auth/refresh on mount —
  // never persisted to localStorage (per CRITICAL_BROWSER_STORAGE rule).
  return response;
}