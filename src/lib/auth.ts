/* eslint-disable unicorn/no-null */
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserById } from './data/user'
import NextAuth from 'next-auth'
import { authConfig } from '@/config/auth'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById({ id: token.sub })
      if (!existingUser) {
        return token
      }

      token.name = existingUser.name
      token.email = existingUser.email

      return token
    },
  },
  ...authConfig,
})

export const getUser = async () => {
  const session = await auth()
  return session?.user
}
