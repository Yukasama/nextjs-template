/* eslint-disable unicorn/no-null */
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { getUserFromDb } from './data/user'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SignInSchema } from './validators/user'
import Resend from 'next-auth/providers/resend'
import { saltAndHashPassword } from '@/utils/password'
import { ZodError } from 'zod'
import { generateVerificationToken } from './token'
import { sendVerificationEmail } from './mail'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    GitHub,
    Resend,
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await SignInSchema.parseAsync(credentials)
          const pwHash = await saltAndHashPassword(password)

          const user = (await getUserFromDb({ email, pwHash })) ?? undefined
          if (!user) {
            throw new Error('Invalid credentials.')
          }

          if (!user.emailVerified) {
            const verificationToken = await generateVerificationToken({
              email: user.email ?? undefined,
            })

            await sendVerificationEmail({
              email: verificationToken.identifier,
              token: verificationToken.token,
            })
          }

          return user
        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      },
    }),
  ],
})

export const getUser = async () => {
  const session = await auth()
  return session?.user
}
