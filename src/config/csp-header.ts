import { env } from '@/env.mjs';
import 'server-only';

const isDev = env.NODE_ENV === 'development';

export const generateCspHeader = ({ nonce }: { nonce: string }) => {
  return `
    default-src 'self';
    connect-src 'self' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://va.vercel-scripts.com https://static.cloudflareinsights.com ${isDev ? env.NEXT_PUBLIC_HOST_URL : ''};
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline' https: http: ${isDev ? "'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://lh3.googleusercontent.com https://scontent-frt3-2.xx.fbcdn.net https://avatars.githubusercontent.com https://financialmodelingprep.com http://purecatamphetamine.github.io;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replaceAll(/\s{2,}/g, ' ')
    .trim();
};
