import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
    useCache: true,
    useLightningcss: true,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => [
    {
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://nextjs-template.candlezone.eu',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
      ],
      source: '/(.*)',
    },
  ],
  output: 'standalone', // When using in Docker or similar environments
  serverExternalPackages: ['pino', 'pino-pretty'],
};

export default withBundleAnalyzer(nextConfig);
