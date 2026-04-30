import { NextResponse } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'rbzclimatesolutions';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'rbz06042026';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('rbz_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return response;
  }

  return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
}
