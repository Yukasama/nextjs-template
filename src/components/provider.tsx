'use client'

import { type PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'

export const Provider = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      {children}
    </ThemeProvider>
  )
}
