'use server'

import { getUserByEmail } from '@/utils/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { SignInProps, SignInSchema } from '@/lib/validators/user'
import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'
import { logger } from '@/lib/logger'

/**
 * Sign in user with email and password.
 * @param values `SignInSchema` validator
 * @returns Success or error JSON object
 */
export const login = async (values: SignInProps) => {
  const errorMsg = 'Invalid credentials.'

  const validatedFields = SignInSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: errorMsg }
  }

  const { email, password } = validatedFields.data
  logger.info('login (attempt): email=%s', email)

  const existingUser = await getUserByEmail({ email })
  if (!existingUser?.email) {
    return { error: errorMsg }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    logger.info('login (success): email=%s', email)

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken({
        email: existingUser.email,
      })

      await sendVerificationEmail({
        email: verificationToken.identifier,
        token: verificationToken.token,
      })
    }

    return { success: 'Confirmation email sent.' }
  } catch (error) {
    if (error instanceof AuthError) {
      logger.error('login: email=%s error=%s', email, error.message)
      if (error.type === 'CredentialsSignin') {
        return { error: errorMsg }
      }
    }

    logger.error('login: email=%s error=%s', email, error)
    return { error: 'We have trouble signing you in.' }
  }
}
