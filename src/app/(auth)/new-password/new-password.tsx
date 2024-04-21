'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightCircle, CircleX } from 'lucide-react'
import { Form, FormField } from '@/components/ui/form'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { trpc } from '@/trpc/client'
import { NewPasswordSchema } from '@/lib/validators/user'
import { useState } from 'react'
import { Chip } from '@nextui-org/chip'

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

  const { mutate: newPassword, isLoading } = trpc.user.newPassword.useMutation({
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
          <Chip color="danger" variant="shadow" className="self-center">
            <div className="flex items-center gap-2 text-white">
              <CircleX size={18} />
              {error}
            </div>
          </Chip>
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              label="Password"
              type="password"
              variant="bordered"
              errorMessage={form.formState.errors.password?.message}
              placeholder="Enter your Password"
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <Input
              label="Confirm Password"
              type="password"
              variant="bordered"
              errorMessage={form.formState.errors.confPassword?.message}
              placeholder="Confirm your Password"
              {...field}
            />
          )}
        />
        <Button
          color="primary"
          isLoading={isLoading}
          className="mt-2"
          type="submit"
        >
          {!isLoading && <ArrowRightCircle size={18} />}
          Change Password
        </Button>
      </form>
    </Form>
  )
}
