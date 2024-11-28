// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from '@clerk/nextjs';

export async function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Check if it's an admin route
  if (path.startsWith('/admin')) {
    // Get the token from cookies or headers
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      // No token found, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Add your authentication logic here
    // This is where you'd verify the token and check admin status
    const isAdmin = true // Replace with your actual admin check

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export default authMiddleware({
  publicRoutes: ['/'],
});

export const config = {
  matcher: [
    '/admin/:path*', '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'
  ]
}