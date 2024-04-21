'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      className="absolute top-5 left-5"
      color="primary"
      aria-label="Back"
    >
      <ArrowLeft size={18} />
      Back
    </Button>
  )
}
