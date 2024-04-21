import 'server-only'
import { env } from '@/env.mjs'
import { Resend } from 'resend'
import { logger } from './logger'

const resend = new Resend(env.RESEND_API_KEY)
const domain = process.env.VERCEL_URL

interface Props {
  email: string
  token: string
}

export const sendPasswordResetEmail = async ({ email, token }: Props) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  })

  logger.info('sendPasswordResetEmail (success): email=%s', email)
}

export const sendVerificationEmail = async ({ email, token }: Props) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject: 'Confirm your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  })

  logger.info('sendVerificationEmail (success): email=%s', email)
}
