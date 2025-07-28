import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Galería de Eventos - ${businessInfo.name}`,
  description:
    'Explora más de 500 eventos realizados: bodas, XV años, cumpleaños, baby showers y más celebraciones inolvidables en nuestro elegante salón de fiestas en Ixtapaluca.',
  keywords: [
    'galeria eventos salon campeche',
    'fotos bodas ixtapaluca',
    'eventos xv años estado mexico',
    'galeria salon de fiestas',
    'eventos realizados campeche',
    'fotos celebraciones ixtapaluca',
    'salon fiestas galeria',
    'eventos sociales fotos',
  ],
  openGraph: {
    title: `Galería de 500+ Eventos - ${businessInfo.name}`,
    description:
      'Inspírate con nuestra galería de eventos realizados. Bodas, XV años, cumpleaños y más celebraciones únicas e inolvidables.',
    url: 'https://saloncampeche.com/galeria',
    images: [
      {
        url: '/og-galeria.jpg',
        width: 1200,
        height: 630,
        alt: 'Galería de eventos Salón Campeche',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Galería de Eventos - ${businessInfo.name}`,
    description:
      'Más de 500 eventos realizados. Inspírate con bodas, XV años, cumpleaños y celebraciones únicas.',
    images: ['/og-galeria.jpg'],
  },
  alternates: {
    canonical: 'https://saloncampeche.com/galeria',
  },
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
