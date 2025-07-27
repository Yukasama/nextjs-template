import { FeaturesSection } from '@/features/addon/addons-section';
import { ThemeToggle } from '@/features/theme/theme-toggle';
import { logger } from '@/lib/logger';

export default function Home() {
  logger.info('Rendering Home component');

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[27px] font-bold">Next.js Template</h1>
        <ThemeToggle />
      </div>
      <FeaturesSection />
    </div>
  );
}
