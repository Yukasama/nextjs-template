'use client'

import { CheckCircle, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { verifyEmail } from '@/actions/verify-email'

export const VerifyEmail = () => {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | undefined>('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  useEffect(() => {
    setMounted(true)

    if (token?.length > 0) {
      setVerified()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate: setVerified, isPending } = useMutation({
    mutationFn: async () => {
      return await verifyEmail({ token })
    },
    onSettled: (data) => {
      setError('')
      if (data && 'error' in data) {
        return setError(data.error)
      }
    },
  })

  return (
    <div>
      {isPending ||
        (!mounted && (
          <div className="f-col gap-2 text-zinc-400">Verifying Email...</div>
        ))}
      {!isPending && mounted && error && (
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
      )}
      {!isPending && mounted && !error && (
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
    </div>
  )
}
