import { logger } from '@/lib/logger';
import { ThemeToggle } from '../features/theme/theme-toggle';

export default function Home() {
  logger.info('Rendering Home component');

  return (
    <div>
      <h1>Next.js Template</h1>
      <ThemeToggle />
    </div>
  );
}
