import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => [
    {
      headers: [
        {
          key: 'Access-Control-Allow-Origin',
          value: 'https://nextjs-template.com',
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
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
      source: '/(.*)',
    },
  ],
  // output: 'standalone', # When using in Docker or similar environments
  serverExternalPackages: ['pino', 'pino-pretty'],
};

export default withBundleAnalyzer(nextConfig);
