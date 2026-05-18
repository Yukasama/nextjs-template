import Image from 'next/image';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export const Loader = ({ className, size = 48 }: Readonly<Props>) => {
  return (
    <Image
      alt="loading"
      className={cn('dark:invert', className)}
      height={size}
      src="/spinner.svg"
      width={size}
    />
  );
};
