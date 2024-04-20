'use server'

import { getUserByEmail } from '@/lib/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { generateVerificationToken } from '@/lib/token'
import { SignInSchema } from '@/lib/validators/user'
import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'
import { z } from 'zod'

export const login = async (
  values: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = SignInSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (!existingUser?.email || !existingUser?.hashedPassword) {
    return { error: 'Email does not exist!' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(
      verificationToken.identifier,
      verificationToken.token
    )

    return { success: 'Confirmation email sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'Signed in!' }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials.' }
      }

      return { error: 'We have trouble signing you in.' }
    }

    throw error
  }
}
