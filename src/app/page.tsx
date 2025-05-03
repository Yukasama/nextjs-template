import { logger } from '@/lib/logger';
import { ThemeToggle } from '../features/theme/theme-toggle';

export default function Home() {
  logger.info('Rendering Home component');

  return (
    <div>
      <p>Next.js Template</p>
      <ThemeToggle />
    </div>
  );
}
