'use client';

import { getQueryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  nonce?: string;
}

export const Provider = ({ children, nonce }: Readonly<Props>) => {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute="class" disableTransitionOnChange nonce={nonce}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
