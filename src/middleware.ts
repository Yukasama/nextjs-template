import NextAuth from 'next-auth'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  isPathPrivate,
} from './config/routes'
import { authConfig } from '@/config/auth'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    }
    return
  }

  if (!isLoggedIn && isPathPrivate(nextUrl.pathname)) {
    return Response.redirect('http://localhost:3000/sign-in')
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
