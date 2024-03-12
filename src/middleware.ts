import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
 
const { auth } = NextAuth(authConfig) 

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  const isPublicPath = ['/login', '/register'].includes(nextUrl.pathname)
  
  if (isPublicPath && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  if (!isPublicPath && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
})
 
export const config = {
  matcher: ['/login' , '/register', '/'],
};