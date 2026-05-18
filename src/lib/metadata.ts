import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const constructMetadata: () => Metadata = () => {
  return {
    description: siteConfig.description,
    icons: '/favicon.ico',
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      description: siteConfig.description,
      images: [{ url: '/logo.png' }],
      title: siteConfig.name,
    },
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
  };
};
