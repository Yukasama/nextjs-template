'use server'

import { db } from '@/lib/db'
import { generateName } from '@/utils/generate-name'
import { logger } from '@/lib/logger'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/token'
import { CreateUserProps, CreateUserSchema } from '@/lib/validators/user'
import { saltAndHashPassword } from '@/utils/password'
import { signIn } from '@/lib/auth'

/**
 * Register a new user with email and password, send a verification email.
 * @param values `CreateUserSchema` validator
 * @returns Success or error JSON object
 */
export const register = async (values: CreateUserProps) => {
  const { email, password } = await CreateUserSchema.parseAsync(values)
  logger.info('register (attempt): email=%s password=%s', email, password)

  const existingUser = await db.user.findFirst({
    where: { email },
  })

  if (existingUser) {
    logger.info('register (error=email_registered): email=%s', email)
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

  await signIn('credentials', {
    email,
    password,
    redirect: false,
  })

  logger.info('register (success): email=%s', email)
  return { success: 'Confirmation email sent.' }
}
