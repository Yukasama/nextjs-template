import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(1, 'Please enter a valid password.'),
  callbackUrl: z.string().optional(),
})

export const SignUpSchema = z
  .object({
    email: z.string().email('Please enter a valid email.'),
    password: z
      .string()
      .min(11, 'Password must contain 11 or more characters.'),
    confPassword: z.string(),
  })
  .refine((data) => data.password === data.confPassword, {
    message: 'Passwords do not match',
    path: ['confPassword'],
  })

export const CreateUserSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(11, 'Password must be atleast 11 characters.'),
})

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
})
