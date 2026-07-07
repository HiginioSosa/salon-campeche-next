import type { MetadataRoute } from 'next'
import { businessInfo } from '@/lib/brand'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${businessInfo.name} - ${businessInfo.slogan}`,
    short_name: businessInfo.name,
    description: businessInfo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ec842f',
    lang: 'es-MX',
    categories: ['events', 'business', 'lifestyle'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
