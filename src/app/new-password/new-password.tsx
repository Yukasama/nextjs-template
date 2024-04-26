'use client'

import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NewPasswordSchema } from '@/lib/validators/user'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/actions/reset-password'
import { Chip } from '@/components/ui/chip'
import { AuthCard } from '../(auth)/auth-card'

export const NewPassword = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confPassword: '',
    },
  })

  const { mutate: newPassword, isPending } = useMutation({
    mutationFn: async () => {
      return await resetPassword({
        password: form.getValues('password'),
        token,
      })
    },
    onError: () => setError('Password could not be reset.'),
    onSuccess: () => setSuccess(true),
  })

  return (
    <>
      {success ? (
        <div className="f-col gap-2">
          <div className="bg-green-500 h-10 w-10 f-box self-center rounded-full">
            <CheckCircle />
          </div>
          <div className="f-col items-center">
            <p className="text-xl font-semibold">
              Password successfully reset.
            </p>
            <p className="text-zinc-400 text-[16px]">
              You can now close this tab.
            </p>
          </div>
        </div>
      ) : (
        <AuthCard
          header="Reset your Password"
          subHeader="This will replace your old password."
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => newPassword())}
              className="gap-3 f-col"
            >
              {error && <Chip message={error} isError />}
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
                isLoading={isPending}
                disabled={isPending}
                className="mt-2"
              >
                Reset Password
              </Button>
            </form>
          </Form>
        </AuthCard>
      )}
    </>
  )
}
