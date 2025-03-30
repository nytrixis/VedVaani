import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the request is for a protected route
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard') ||
                          req.nextUrl.pathname.startsWith('/prashnavali') ||
                          req.nextUrl.pathname.startsWith('/spiritual-twin') ||
                          req.nextUrl.pathname.startsWith('/sound-bath') ||
                          req.nextUrl.pathname.startsWith('/meditation') ||
                          req.nextUrl.pathname.startsWith('/journal')
  
  // Check if the request is for auth pages
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup')

  // If accessing a protected route without being logged in, redirect to login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // If accessing auth pages while logged in, redirect to dashboard
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/prashnavali/:path*', 
    '/spiritual-twin/:path*',
    '/sound-bath/:path*',
    '/meditation/:path*',
    '/journal/:path*',
    '/login',
    '/signup'
  ],
}
