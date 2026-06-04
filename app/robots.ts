import { MetadataRoute } from 'next'

const BASE_URL =
  (process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.hydroclic.fr').replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/onboarding',
          '/sign-in',
          '/sign-up',
          '/sign-out',
          '/settings',
          '/checkout',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
