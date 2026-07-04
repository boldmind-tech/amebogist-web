import { NextResponse } from 'next/server';
import { authApi } from '@boldmindng/api-client';

export async function POST() {
  await authApi.logout().catch(() => null); // revoke refresh family server-side
  const response = NextResponse.json({ success: true });
  response.cookies.delete('amg_refresh');
  return response;
}