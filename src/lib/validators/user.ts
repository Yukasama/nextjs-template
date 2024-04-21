import { object, string, infer } from 'zod'

const EMAIL_MESSAGE = 'Please enter a valid email.'
const PASSWORD_MESSAGE = 'Password must contain 11 or more characters.'

export const SignInSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
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

export const NewPasswordSchema = object({
  password: string().min(11, PASSWORD_MESSAGE),
  confPassword: string(),
}).refine((data) => data.password === data.confPassword, {
  message: 'Passwords do not match.',
  path: ['confPassword'],
})

export type CreateUserProps = infer<typeof CreateUserSchema>

export type UserUpdateProps = infer<typeof UserUpdateSchema>

export type ResetPasswordProps = infer<typeof ResetPasswordSchema>
