import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Preguntas Frecuentes - ${businessInfo.name}`,
  description: 'Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, precios, políticas de cancelación, horarios y equipamiento. Resuelve todas tus dudas sobre eventos en nuestro salón.',
  keywords: [
    'preguntas frecuentes salon campeche',
    'faq salon de fiestas ixtapaluca',
    'dudas eventos estado mexico',
    'politicas salon de fiestas',
    'precios salon campeche',
    'horarios eventos ixtapaluca',
    'capacidad salon de fiestas',
    'servicios incluidos salon',
  ],
  openGraph: {
    title: `FAQ - Resuelve todas tus dudas - ${businessInfo.name}`,
    description: 'Respuestas a las preguntas más frecuentes sobre servicios, precios, políticas y horarios de nuestro salón de fiestas.',
    url: 'https://saloncampeche.com/faq',
    images: [
      {
        url: '/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'FAQ Salón Campeche',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Preguntas Frecuentes - ${businessInfo.name}`,
    description: 'Todas las respuestas sobre servicios, precios y políticas de nuestro salón de fiestas en Ixtapaluca.',
    images: ['/og-faq.jpg'],
  },
  alternates: {
    canonical: 'https://saloncampeche.com/faq',
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
