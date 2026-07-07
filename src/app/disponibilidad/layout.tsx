import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Disponibilidad de Fechas - ${businessInfo.name}`,
  description:
    'Consulta la disponibilidad de fechas para tu evento en nuestro calendario actualizado. Verifica fechas libres para bodas, XV años, cumpleaños y eventos sociales en tiempo real.',
  keywords: [
    'disponibilidad salon campeche',
    'fechas libres salon de fiestas',
    'calendario eventos ixtapaluca',
    'reservar fecha salon',
    'disponibilidad eventos estado mexico',
    'fechas ocupadas salon campeche',
    'calendario salon de fiestas',
    'agendar evento ixtapaluca',
  ],
  openGraph: {
    title: `Calendario de Disponibilidad - ${businessInfo.name}`,
    description:
      'Consulta en tiempo real las fechas disponibles para tu evento. Calendario actualizado con fechas libres y ocupadas.',
    url: '/disponibilidad',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Disponibilidad - ${businessInfo.name}`,
    description:
      'Consulta fechas disponibles para tu evento en nuestro calendario en tiempo real.',
  },
  alternates: {
    canonical: '/disponibilidad',
  },
}

export default function AvailabilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
