'use server'

import { getUserByEmail } from '@/lib/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { SignInSchema } from '@/lib/validators/user'
import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'
import { z } from 'zod'
import { logger } from '@/lib/logger'

export const login = async ({
  values,
}: {
  values: z.infer<typeof SignInSchema>
}) => {
  const ERROR_MSG = 'Invalid credentials.'
  const validatedFields = SignInSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: ERROR_MSG }
  }

  const { email, password } = validatedFields.data
  logger.info('login (attempt): email=%s', email)

  const existingUser = await getUserByEmail({ email })
  if (!existingUser?.email) {
    return { error: ERROR_MSG }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken({
      email: existingUser.email,
    })

    await sendVerificationEmail({
      email: verificationToken.identifier,
      token: verificationToken.token,
    })
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })

    logger.info('login (success): email=%s', email)

    return { success: 'Confirmation email sent!' }
  } catch (error) {
    if (error instanceof AuthError) {
      logger.info('login (error): email=%s error=%s', email, error.message)
      if (error.type === 'CredentialsSignin') {
        return { error: ERROR_MSG }
      }

      return { error: 'We have trouble signing you in.' }
    }

    throw error
  }
}
