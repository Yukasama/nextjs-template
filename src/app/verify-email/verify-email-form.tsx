'use client'

import { CheckCircle, Loader, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/actions/auth/verify-email'

export const VerifyEmailForm = () => {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  useEffect(() => {
    setMounted(true)
    if (token && mounted) {
      setVerified()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, mounted])

  const { mutate: setVerified, isPending } = useMutation({
    mutationFn: async () => await verifyEmail({ token }),
    onSettled: (data) => {
      if (data && 'error' in data) {
        return setError(data.error)
      }
    },
  })

  return (
    <>
      {(isPending || !mounted) && (
        <div className="flex items-center gap-2 text-zinc-400">
          <Loader className="animate-spin" size={20} />
          Verifying Email...
        </div>
      )}
      {!isPending && mounted && (
        <>
          {error || !token ? (
            <div className="f-col gap-2">
              <div className="bg-red-500 h-10 w-10 f-box self-center rounded-full">
                <X />
              </div>
              <div className="f-col items-center">
                <p className="text-xl font-semibold">
                  No or invalid token provided.
                </p>
                <p className="text-zinc-400 text-[16px]">
                  Please check the URL and try again.
                </p>
              </div>
            </div>
          ) : (
            <div className="f-col gap-2">
              <div className="bg-green-500 h-10 w-10 f-box self-center rounded-full">
                <CheckCircle />
              </div>
              <div className="f-col items-center">
                <p className="text-xl font-semibold">
                  Email verified successfully.
                </p>
                <p className="text-zinc-400 text-[16px]">
                  You can now close this tab.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
