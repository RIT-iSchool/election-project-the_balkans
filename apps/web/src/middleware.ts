import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const cookies = nextCookies();

  if (!cookies.get('session')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next|favicon.ico|login|_static|ajax).*)'],
};
