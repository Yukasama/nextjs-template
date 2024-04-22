/* eslint-disable unicorn/no-null */
import { getUserByEmail } from '@/lib/data/user'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { SignInSchema } from '@/lib/validators/user'
import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

// Separate auth configuration from NextAuth configuration
// to prevent edge runtime errors
export const authConfig = {
  providers: [
    Google,
    GitHub,
    Credentials({
      /**
       * Validate the credentials provided by the user.
       * @param credentials Credentials provided by the user
       * @returns User object or null
       */
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
} satisfies NextAuthConfig
