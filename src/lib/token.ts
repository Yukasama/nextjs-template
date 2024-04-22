'use server'

import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { tokenConfig } from '@/config/token'

interface Props {
  email: string
}

/**
 * Generate a password reset token for the user.
 * @param email Email of the user where token will be created
 * @returns Verification token
 */
export const generatePasswordResetToken = async ({ email }: Props) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + 3600 * 1000)

  const existingToken = await db.verificationToken.findFirst({
    where: { identifier: email },
  })

  if (existingToken) {
    await db.verificationToken.delete({
      where: { token: existingToken.token },
    })
  }

  return await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })
}

/**
 * Generate a verification token for the user.
 * @param email Email of the user where token will be created
 * @returns Verification token
 */
export const generateVerificationToken = async ({ email }: Props) => {
  if (!email) {
    throw new Error('Email is required')
  }

  const token = uuidv4()
  const expires = new Date(Date.now() + tokenConfig.verifyTokenExpiry)

  const existingToken = await db.verificationToken.findFirst({
    where: { identifier: email },
  })

  if (existingToken) {
    await db.verificationToken.delete({
      where: { token: existingToken.token },
    })
  }

  return await db.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })
}
