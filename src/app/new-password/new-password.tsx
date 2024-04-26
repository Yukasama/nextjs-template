'use client'

import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightCircle } from 'lucide-react'
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

export const NewPassword = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
    onSuccess: () => setSuccess('Password successfully reset.'),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => newPassword())}
        className="gap-3 f-col"
      >
        {error && <Chip message={error} isError />}
        {success && <Chip message={success} />}
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
        <Button isLoading={isPending} disabled={isPending} className="mt-2">
          {!isPending && <ArrowRightCircle size={18} />}
          Change Password
        </Button>
      </form>
    </Form>
  )
}
