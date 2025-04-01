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
                          req.nextUrl.pathname.startsWith('/features') ||
                          req.nextUrl.pathname.startsWith('/profile') ||
                          req.nextUrl.pathname.startsWith('/prashnavali') ||
                          req.nextUrl.pathname.startsWith('/spiritual-twin') ||
                          req.nextUrl.pathname.startsWith('/sound-bath') ||
                          req.nextUrl.pathname.startsWith('/anushakti') ||
                          req.nextUrl.pathname.startsWith('/journal')
  
  // Check if the request is for auth pages
  const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                    req.nextUrl.pathname.startsWith('/signup')

  // If accessing a protected route without being logged in, redirect to login
  if (isProtectedRoute && !session) {
    // Save the original URL the user was trying to access
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If accessing auth pages while logged in, redirect to dashboard
  if (isAuthPage && session) {
    // Check if there's a redirectedFrom parameter in the URL
    const redirectedFrom = req.nextUrl.searchParams.get('redirectedFrom')
    if (redirectedFrom) {
      // Redirect to the original URL the user was trying to access
      return NextResponse.redirect(new URL(redirectedFrom, req.url))
    }
    // Otherwise, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/features/:path*',
    '/profile/:path*',
    '/prashnavali/:path*', 
    '/spiritual-twin/:path*',
    '/sound-bath/:path*',
    '/anushakti/:path*',
    '/journal/:path*',
    '/login',
    '/signup'
  ],
}
