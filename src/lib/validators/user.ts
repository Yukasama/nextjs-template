import { object, string, z } from 'zod'

const EMAIL_MESSAGE = 'Please enter a valid email.'
const PASSWORD_MESSAGE = 'Password must contain 11 or more characters.'

export const SignInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, EMAIL_MESSAGE)
    .email(EMAIL_MESSAGE),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(11, 'Password must be more than 11 characters'),
})

export const SignUpSchema = object({
  email: string().email(EMAIL_MESSAGE),
  password: string().min(11, PASSWORD_MESSAGE),
  confPassword: string(),
}).refine((data) => data.password === data.confPassword, {
  message: 'Passwords do not match',
  path: ['confPassword'],
})

export const CreateUserSchema = object({
  email: string().email(EMAIL_MESSAGE),
  password: string().min(11, PASSWORD_MESSAGE),
})

export const UserUpdateSchema = object({
  name: string().optional(),
})

export const ForgotPasswordSchema = object({
  email: string().email(EMAIL_MESSAGE),
})

export const ResetPasswordSchema = object({
  password: string().min(11, PASSWORD_MESSAGE),
  token: string(),
})

export const VerifyEmailSchema = object({
  token: string(),
})

export const SendEmailSchema = object({
  email: string().email(EMAIL_MESSAGE),
  token: string(),
})

export const NewPasswordSchema = object({
  password: string().min(11, PASSWORD_MESSAGE),
  confPassword: string(),
}).refine((data) => data.password === data.confPassword, {
  message: 'Passwords do not match.',
  path: ['confPassword'],
})

export type SignInProps = z.infer<typeof SignInSchema>
export type SignUpProps = z.infer<typeof SignUpSchema>
export type CreateUserProps = z.infer<typeof CreateUserSchema>
export type UserUpdateProps = z.infer<typeof UserUpdateSchema>
export type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>
export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>
export type VerifyEmailProps = z.infer<typeof VerifyEmailSchema>
export type SendEmailProps = z.infer<typeof SendEmailSchema>
export type NewPasswordProps = z.infer<typeof NewPasswordSchema>
