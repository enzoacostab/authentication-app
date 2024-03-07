import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const token = cookies().get('token')
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register'
  
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = { matcher: ['/', '/login', '/register'] }