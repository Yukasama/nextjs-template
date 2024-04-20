import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserByEmail } from './data/user'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SignInSchema } from './validators/user'
import bcrypt from 'bcryptjs'

export const config = {
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
          if (user?.hashedPassword) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user?.hashedPassword as string
          )

          if (passwordsMatch) {
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

export const getUser = async () => {
  const session = await auth()
  return session?.user
}
