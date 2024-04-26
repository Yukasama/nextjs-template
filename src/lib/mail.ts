'use server'

import { env } from '@/env.mjs'
import { Resend } from 'resend'
import { logger } from './logger'
import { SendEmailProps, SendEmailSchema } from './validators/user'

const resend = new Resend(env.RESEND_API_KEY)
const domain = 'localhost:3000'

/**
 * Send a password reset email to given email.
 * @param values `SendEmailSchema` validator
 */
export const sendPasswordResetEmail = async (values: SendEmailProps) => {
  const validatedFields = SendEmailSchema.safeParse(values)
  if (!validatedFields.success) {
    throw new Error('Invalid fields.')
  }

  const { email, token } = validatedFields.data

  const resetLink = `${domain}/new-password?token=${token}`

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })

  logger.info('sendPasswordResetEmail: email=%s', email)
}

/**
 * Send a verification email to given email.
 * @param values `SendEmailSchema` validator
 */
export const sendVerificationEmail = async (values: SendEmailProps) => {
  const validatedFields = SendEmailSchema.safeParse(values)
  if (!validatedFields.success) {
    throw new Error('Invalid fields.')
  }

  const { email, token } = validatedFields.data

  const confirmLink = `${domain}/verify-email?token=${token}`

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  })

  logger.info('sendVerificationEmail: email=%s', email)
}
