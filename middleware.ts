import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');
  if (isProtected && !session) {
    const redirect = req.nextUrl.clone();
    redirect.pathname = '/auth/login';
    return NextResponse.redirect(redirect);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*']
};
