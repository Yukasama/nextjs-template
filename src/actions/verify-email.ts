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
  const validatedFields = VerifyEmailSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'Invalid fields.' }
  }

  const { token } = validatedFields.data
  logger.info('verifyEmail (attempt): token=%s', token)

  const existingToken = await db.verificationToken.findUnique({
    where: { token },
  })

  const errorMsg = 'Invalid token.'

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

  await Promise.all([
    db.user.update({
      where: { email: existingToken.identifier },
      data: { emailVerified: new Date() },
    }),
    db.verificationToken.delete({
      where: { token: existingToken.token },
    }),
  ])

  return { success: 'Email verified successfully.' }
}
