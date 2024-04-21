'use client'

import { type PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const Provider = ({ children }: Readonly<PropsWithChildren>) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" attribute="class">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
