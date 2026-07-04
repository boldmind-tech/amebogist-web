import { NextResponse } from 'next/server';
import packageJson from '../../../package.json';

// Module-load time = process start time (close enough for an uptime probe
// on a serverless/standalone Next.js instance — resets on cold start/redeploy,
// which is the desired behavior for a health check).
const START_TIME = Date.now();

/**
 * GET /api/health
 *
 * Lightweight liveness/readiness probe for Railway/Vercel/uptime monitors.
 * Mirrors the shape used by `boldmind-service`'s `GET /health` (§4.16):
 *   { status: 'ok', uptime, database?, redis? }
 *
 * amebogist-web has no direct database connection (all data comes from
 * boldmind-service's API), so `database`/`redis` are omitted here.
 *
 * NOTE: once @boldmindng/deploy-config's `createHealthCheckRoute()` is
 * published, this file can be reduced to:
 *
 *   import { createHealthCheckRoute } from '@boldmindng/deploy-config';
 *   export const GET = createHealthCheckRoute({ app: 'amebogist-web' });
 *
 * Until then, this self-contained implementation has no new dependencies.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      app: 'amebogist-web',
      version: packageJson.version,
      uptimeSeconds: Math.floor((Date.now() - START_TIME) / 1000),
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    },
  );
}