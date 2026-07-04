// proxy.ts
import { createAuthMiddleware } from '@boldmindng/auth';

const HUB_URL =
  process.env['NEXT_PUBLIC_HUB_URL'] ||
  (process.env.NODE_ENV === 'production' ? 'https://boldmind.ng' : 'http://localhost:4001');

export const proxy = createAuthMiddleware({
  protectedPaths: [
    '/dashboard/:path*',
    '/write/:path*',
    '/my-articles/:path*',
    '/analytics/:path*',
    '/settings/:path*',
  ],
  loginUrl: `${HUB_URL}/login`,
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/write/:path*',
    '/my-articles/:path*',
    '/analytics/:path*',
    '/settings/:path*',
  ],
};