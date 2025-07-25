'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { HTMLAttributes } from 'react';

export const ThemeToggle = ({
  className,
}: Readonly<HTMLAttributes<HTMLButtonElement>>) => {
  const { setTheme, theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <Button
      aria-label="Toggle theme"
      className={cn(className)}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      size="icon"
      suppressHydrationWarning
      variant="ghost"
    >
      {isLight ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};
