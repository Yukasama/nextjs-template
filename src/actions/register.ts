'use server'

import { db } from '@/lib/db'
import { generateName } from '@/lib/generate-name'
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

  const existingUser = await db.user.count({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Email is already registered.' }
  }

  const [hashedPassword, verificationToken] = await Promise.all([
    saltAndHashPassword(password),
    generateVerificationToken({ email }),
  ])

  const name = generateName()

  await Promise.all([
    db.user.create({
      data: { name, email, hashedPassword },
    }),
    sendVerificationEmail({
      email: email,
      token: verificationToken.token,
    }),
  ])

  return { success: 'Confirmation email sent!' }
}
