'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightCircle, CircleX } from 'lucide-react'
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

export const NewPassword = () => {
  const [error, setError] = useState('')
  const router = useRouter()
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
    onError: () => setError('Password could not be updated.'),
    onSuccess: () => router.push('/'),
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          newPassword({
            password: form.getValues('password'),
            token,
          })
        )}
        className="gap-3 f-col"
      >
        {error && (
          <div className="self-center text-sm bg-red-500 rounded-md p-1 px-2.5">
            <div className="flex items-center gap-2 text-white">
              <CircleX size={18} />
              {error}
            </div>
          </div>
        )}
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
