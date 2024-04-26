'use server'

import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/token'
import {
  ForgotPasswordProps,
  ForgotPasswordSchema,
} from '@/lib/validators/user'

/**
 * Send a password reset email to the user.
 * @param values `ForgotPasswordSchema` validator
 * @returns Success or error JSON object
 */
export const forgotPassword = async (values: ForgotPasswordProps) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { email } = validatedFields.data
  logger.info('forgotPassword (attempt): email=%s', email)

  const user = await db.user.findFirst({
    where: { email },
  })

  if (user) {
    const passwordResetToken = await generatePasswordResetToken({ email })
    await sendPasswordResetEmail({ email, token: passwordResetToken.token })
  }

  return { success: 'Reset email sent.' }
}
