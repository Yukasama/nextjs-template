'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SignInSchema } from '@/lib/validators/user'
import { useEffect, useState } from 'react'
import { login } from '@/actions/login'
import { useMutation } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'

export const SignIn = () => {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | undefined>('')

  useEffect(() => setMounted(true), [])

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
    },
  })

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: () =>
      login({
        values: {
          email: form.getValues('email'),
          password: form.getValues('password'),
        },
      }),
    onSettled: (data) => {
      setError('')

      if (data && 'error' in data) {
        return setError(data.error)
      }
    },
    onError: () => toast.error('We have trouble signing you in.'),
  })

  return (
    <Form {...form}>
      <form onSubmit={signIn} className="gap-3 f-col">
        {error && (
          <div className="self-center">
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
        <Link
          href="/forgot-password"
          className="text-[13px] text-end hover:underline underline-offset-3"
        >
          Forgot Password?
        </Link>
        <Button
          className="text-[15px] mt-1 button-secondary font-semibold"
          disabled={!mounted || isPending}
          isLoading={isPending}
        >
          Sign in with Email
        </Button>
      </form>
    </Form>
  )
}
