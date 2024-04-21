import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: '/',
    },
    {
      url: '/sign-in',
    },
    {
      url: '/sign-up',
    },
    {
      url: '/verify-email',
    },
    {
      url: '/dashboard',
    },
  ]
}
