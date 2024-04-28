'use client'

import { cn } from '@/utils/utils'
import { CheckCircle, CircleX } from 'lucide-react'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message: string
  isError?: boolean
}

export const Chip = ({ message, isError, className }: Readonly<Props>) => {
  return (
    <div
      className={cn(
        `chip self-center ${isError ? 'bg-red-500' : 'bg-green-500'}`,
        className
      )}
    >
      <div className="flex items-center gap-2 text-white">
        {isError ? <CircleX size={18} /> : <CheckCircle size={18} />}
        {message}
      </div>
    </div>
  )
}
