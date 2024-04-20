'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export const ThemeToggle = ({
  className,
}: Readonly<React.HTMLAttributes<HTMLButtonElement>>) => {
  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <Button
      className={cn(className)}
      size="icon"
      variant="ghost"
      aria-label="Toggle theme"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      {isLight ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  )
}
