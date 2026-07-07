import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fontClasses } from '@/lib/fonts'
import { businessInfo, siteUrl } from '@/lib/brand'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${businessInfo.name} - ${businessInfo.slogan}`,
    template: `%s | ${businessInfo.name}`,
  },
  description: businessInfo.description,
  keywords: [
    'salón de fiestas',
    'eventos sociales',
    'bodas',
    'XV años',
    'cumpleaños',
    'Ixtapaluca',
    'Estado de México',
    'salon campeche',
    'eventos',
    'celebraciones',
  ],
  authors: [{ name: businessInfo.name }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/android-chrome-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: businessInfo.name,
    title: `${businessInfo.name} - ${businessInfo.slogan}`,
    description: businessInfo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - ${businessInfo.slogan}`,
    description: businessInfo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Para verificar el sitio en Google Search Console, definir
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION en el entorno con el código real.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#ec842f',
}

// Datos estructurados JSON-LD para SEO (schema.org EventVenue).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: businessInfo.name,
  description: businessInfo.description,
  url: siteUrl,
  image: `${siteUrl}/logo-horizontal.png`,
  telephone: businessInfo.contact.phone,
  email: businessInfo.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: businessInfo.contact.address.street,
    addressLocality: businessInfo.contact.address.city,
    addressRegion: businessInfo.contact.address.state,
    postalCode: businessInfo.contact.address.zipCode,
    addressCountry: 'MX',
  },
  ...(businessInfo.contact.location
    ? {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: String(businessInfo.contact.location.lat),
          longitude: String(businessInfo.contact.location.lng),
        },
      }
    : {}),
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '09:00',
    closes: '02:00',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Sound System',
      value: true,
    },
  ],
  maximumAttendeeCapacity: businessInfo.capacity.bothFloors,
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es-MX' className={fontClasses}>
      <body
        className='min-h-screen antialiased'
        suppressHydrationWarning={true}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
