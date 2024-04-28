'use server'

import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { ResetPasswordSchema, ResetPasswordProps } from '@/lib/validators/user'
import bcrypt from 'bcryptjs'

/**
 * Reset the user's password.
 * @param values `ResetPasswordSchema` validator
 * @returns Success or error JSON object
 */
export const resetPassword = async (values: ResetPasswordProps) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { password, token } = validatedFields.data
  logger.info('resetPassword (attempt): token=%s', token)

  const existingToken = await db.verificationToken.findUnique({
    where: { token },
  })

  const errorMsg = 'Invalid fields.'

  if (!existingToken) {
    return { error: errorMsg }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: errorMsg }
  }

  const existingUser = await db.user.findFirst({
    where: { email: existingToken.identifier },
  })

  if (!existingUser) {
    return { error: errorMsg }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await Promise.all([
    db.user.update({
      where: { id: existingUser.id },
      data: { hashedPassword },
    }),
    db.verificationToken.delete({
      where: { token: existingToken.token },
    }),
  ])

  logger.info('resetPassword (success): email=%s', existingUser.email)

  return { success: 'Password successfully reset.' }
}
