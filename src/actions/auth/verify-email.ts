'use server'

import { db } from '@/lib/db'
import { logger } from '@/lib/logger'
import { VerifyEmailProps, VerifyEmailSchema } from '@/lib/validators/user'

/**
 * Verify the email of a user.
 * @param values `VerifyEmailSchema` validator
 * @returns Success or error JSON object
 */
export const verifyEmail = async (values: VerifyEmailProps) => {
  const errorMsg = 'No or invalid token provided.'
  const validatedFields = VerifyEmailSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: errorMsg }
  }

  const { token } = validatedFields.data
  logger.info('verifyEmail (attempt): token=%s', token)

  const existingToken = await db.verificationToken.findFirst({
    where: { token },
    orderBy: {
      expires: 'desc',
    },
  })

  if (!existingToken) {
    return { error: errorMsg }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()
  if (hasExpired) {
    return { error: errorMsg }
  }

  const existingUser = await db.user.count({
    where: { email: existingToken.identifier },
  })

  if (!existingUser) {
    return { error: errorMsg }
  }

  await db.$transaction(async (db) => {
    await db.user.update({
      where: { email: existingToken.identifier },
      data: { emailVerified: new Date() },
    })
    await db.verificationToken.delete({
      where: { token: existingToken.token },
    })
  })

  logger.info('verifyEmail (success): email=%s', existingToken.identifier)
  return { success: 'Email verified successfully.' }
}
