'use client'

import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { capitalize, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useMutation } from '@tanstack/react-query'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  provider: 'google' | 'github'
}

const providerIcons = {
  google: <Icons.Google className="h-[18px]" />,
  github: <Icons.Github className="dark:invert h-[18px]" />,
}

/**
 * OAuth button to sign in with a specified provider.
 * @param provider Provider to sign in with.
 */
export const OAuth = ({ provider, className }: Props) => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: async () => await signIn(provider),
    onError: () => toast.error('We have trouble signing you in.'),
  })

  return (
    <Button
      isLoading={isPending}
      aria-label={`Sign in with ${capitalize(provider)}`}
      className={cn('gap-3', className)}
      onClick={() => login()}
    >
      {!isPending && (
        <>
          {providerIcons[provider]}
          Sign in with {capitalize(provider)}
        </>
      )}
    </Button>
  )
}
