export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/auth/error',
  '/reset',
  '/new-password',
]

export const isPathPrivate = (pathname: string) => {
  const privateRoutes = ['/settings/(.*)', '/dashboard']
  const regexPatterns = privateRoutes.map(
    (route) =>
      new RegExp(
        '^' + route.replaceAll('/', '\\/').replaceAll('.*$', '.*') + '$'
      )
  )
  return regexPatterns.some((pattern) => pattern.test(pathname))
}

export const apiAuthPrefix = '/api'

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
