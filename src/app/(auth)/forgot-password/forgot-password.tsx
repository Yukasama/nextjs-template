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
import { Chip } from '@nextui-org/chip'
import { trpc } from '@/trpc/client'
import { ForgotPasswordSchema } from '@/lib/validators/user'
import { CheckCircle, CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
  const [error, setError] = useState('')
  const [sent, setSent] = useState('')
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const { mutate: sendMail, isLoading } = trpc.user.resetPassword.useMutation({
    onError: () => setError('Email could not be sent.'),
    onSuccess: () => setSent('Reset Email successfully sent.'),
  })

  return (
    <div className="f-col gap-4">
      {sent && (
        <Chip color="success" variant="shadow" className="self-center">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle size={18} />
            {sent}
          </div>
        </Chip>
      )}
      {error && (
        <Chip color="danger" variant="shadow" className="self-center">
          <div className="flex items-center gap-2 text-white">
            <CircleX size={18} />
            {error}
          </div>
        </Chip>
      )}

      {!sent && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => sendMail(form.getValues().email))}
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
                // <Input
                //   label="Email"
                //   type="email"
                //   labelPlacement="outside"
                //   errorMessage={form.formState.errors.email?.message}
                //   placeholder="john.doe@mail.com"
                //   {...field}
                // />
              )}
            />
            <Button isLoading={isLoading}>Send Password Link</Button>
          </form>
        </Form>
      )}

      <div className="f-box gap-1.5 text-sm">
        <p className="text-zinc-400">
          {!sent ? 'Already signed up?' : 'Password successfully changed?'}
        </p>
        <Link href="/sign-in" className="font-medium">
          {!sent ? 'Sign In.' : 'Head to Login.'}
        </Link>
      </div>
    </div>
  )
}
