'use server'

import { v4 as uuidv4 } from 'uuid'
import { db } from '@/lib/db'
import { TOKEN_CONFIG } from '@/config/token'

export const generatePasswordResetToken = async (email: string) => {
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

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + TOKEN_CONFIG.verifyTokenExpiry)

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
