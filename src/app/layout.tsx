import type { Metadata } from 'next'
import './globals.css'
import { fontClasses } from '@/lib/fonts'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
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
  metadataBase: new URL('https://saloncampeche.com'), // Cambiar por URL real
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://saloncampeche.com', // Cambiar por URL real
    siteName: businessInfo.name,
    title: `${businessInfo.name} - ${businessInfo.slogan}`,
    description: businessInfo.description,
    images: [
      {
        url: '/og-image.jpg', // Imagen para compartir en redes sociales
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Salón de Fiestas`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - ${businessInfo.slogan}`,
    description: businessInfo.description,
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'google-site-verification-code', // Agregar código real de Google Search Console
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es-MX' className={fontClasses}>
      <head>
        {/* Preload de recursos críticos */}
        <link rel='preload' href='/logo-horizontal.webp' as='image' />
        <link rel='preload' href='/hero-background.webp' as='image' />

        {/* Favicons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        {/* Theme color */}
        <meta name='theme-color' content='#ec842f' />
        <meta name='msapplication-TileColor' content='#000000' />

        {/* Datos estructurados JSON-LD para SEO */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              name: businessInfo.name,
              description: businessInfo.description,
              url: 'https://saloncampeche.com',
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
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '19.3167', // Coordenadas aproximadas de Ixtapaluca
                longitude: '-98.8833',
              },
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
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Parking',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Sound System',
                  value: true,
                },
              ],
              maximumAttendeeCapacity: 250,
              priceRange: '$$',
            }),
          }}
        />
      </head>
      <body className='min-h-screen antialiased'>{children}</body>
    </html>
  )
}
