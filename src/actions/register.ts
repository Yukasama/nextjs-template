'use server'

import { db } from '@/lib/db'
import { generateName } from '@/lib/generate-name'
import { logger } from '@/lib/logger'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { CreateUserSchema } from '@/lib/validators/user'
import { saltAndHashPassword } from '@/utils/password'
import { z } from 'zod'

export const register = async ({
  values,
}: {
  values: z.infer<typeof CreateUserSchema>
}) => {
  const { email, password } = await CreateUserSchema.parseAsync(values)
  logger.info('register (attempt): email=%s password=%s', email, password)

  const existingUser = await db.user.count({
    where: { email },
  })

  if (existingUser) {
    logger.info('register (error: email_registered): email=%s', email)
    return { error: 'Email is already registered.' }
  }

  const [pwHash, verificationToken] = await Promise.all([
    saltAndHashPassword(password),
    generateVerificationToken({ email }),
  ])

  logger.info('register (attempt): pwHash=%s', pwHash)

  const name = generateName()

  await Promise.all([
    db.user.create({
      data: { name, email, hashedPassword: pwHash },
    }),
    sendVerificationEmail({
      email: email,
      token: verificationToken.token,
    }),
  ])

  logger.info('register (success): email=%s', email)
  return { success: 'Confirmation email sent!' }
}
