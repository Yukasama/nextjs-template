'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ForgotPasswordSchema } from '@/lib/validators/user'
import { CheckCircle, CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/actions/forgot-password'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [sent, setSent] = useState('')

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { mutate: sendMail, isPending } = useMutation({
    mutationFn: async () =>
      await forgotPassword({ email: form.getValues('email') }),
    onError: () => setError('Email could not be sent.'),
    onSuccess: () => setSent('Reset Email successfully sent.'),
  })

  return (
    <div className="f-col gap-4">
      {sent && (
        <div className="self-center chip bg-green-500">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle size={18} />
            {sent}
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
      {!sent && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => sendMail())}
            className="gap-4 f-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@mail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={isPending} disabled={isPending}>
              Send Password Link
            </Button>
          </form>
        </Form>
      )}
      <div className="f-box gap-1.5 text-sm">
        <p className="text-zinc-400">
          {sent ? 'Password successfully changed?' : 'Already signed up?'}
        </p>
        <Link href="/sign-in" className="font-medium">
          {sent ? 'Head to Login.' : 'Sign In.'}
        </Link>
      </div>
    </div>
  )
}
