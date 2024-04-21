/* eslint-disable unicorn/no-null */
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserByEmail, getUserById } from './data/user'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SignInSchema } from './validators/user'
import Resend from 'next-auth/providers/resend'
import { logger } from './logger'
import bcrypt from 'bcryptjs'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Google,
    GitHub,
    Resend,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          logger.info('authorize (attempt): email=%s', email)

          const user = await getUserByEmail({ email })
          if (!user?.hashedPassword) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          )

          if (passwordsMatch) {
            logger.info('authorize (success): email=%s', email)
            return user
          }
        }

        return null
      },
    }),
  ],
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
})

export const getUser = async () => {
  const session = await auth()
  return session?.user
}
