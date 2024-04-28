'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
import { register } from '@/actions/auth/register'
import { useRouter } from 'next/navigation'
import { defaultLoginRedirect } from '@/config/routes'
import { Chip } from '@/components/ui/chip'

export const SignUpForm = () => {
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
        {error && <Chip message={error} isError />}
        {success && <Chip message={success} />}
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
