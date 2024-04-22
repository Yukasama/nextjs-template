'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckCircle, CircleX } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SignUpSchema } from '@/lib/validators/user'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/actions/register'
import { useRouter } from 'next/navigation'
import { defaultLoginRedirect } from '@/config/routes'

export const SignUp = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState('')

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confPassword: '',
    },
  })

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: async () => {
      return await register({
        email: form.getValues('email'),
        password: form.getValues('password'),
      })
    },
    onSettled: (data) => {
      setError('')
      setSuccess('')

      if (data && 'error' in data) {
        return setError(data.error)
      }
      if (data && 'success' in data) {
        router.push(defaultLoginRedirect)
      }
    },
    onError: () => setError('We currently have trouble signing you up.'),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => createUser())}
        className="gap-3 f-col"
      >
        {success && (
          <div className="self-center chip bg-green-500">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle size={18} />
              {success}
            </div>
          </div>
        )}
        {error && (
          <div className="self-center chip bg-red-500">
            <div className="flex items-center gap-2 text-white">
              <CircleX size={18} />
              {error}
            </div>
          </div>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={isPending}
                  placeholder="john.doe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={isPending}
                  placeholder="Enter your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  disabled={isPending}
                  placeholder="Confirm your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-[15px] mt-1 font-semibold"
          isLoading={isPending}
          disabled={isPending}
        >
          Sign up with Email
        </Button>
      </form>
    </Form>
  )
}
