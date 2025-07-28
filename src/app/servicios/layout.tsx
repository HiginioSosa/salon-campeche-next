import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Servicios Completos - ${businessInfo.name}`,
  description:
    'Descubre todos nuestros servicios para eventos: renta de salón, DJ profesional, decoración elegante, mesa de dulces, juegos infantiles, personal de servicio y más. Precios transparentes y servicio de calidad en Ixtapaluca.',
  keywords: [
    'servicios salon de fiestas',
    'renta salon ixtapaluca',
    'dj bodas estado mexico',
    'decoracion eventos sociales',
    'mesa dulces xv años',
    'juegos infantiles fiestas',
    'meseros eventos',
    'salon campeche servicios',
  ],
  openGraph: {
    title: `Servicios Completos para Eventos - ${businessInfo.name}`,
    description:
      'Conoce todos nuestros servicios profesionales para hacer de tu evento una celebración perfecta. Desde $4,000 pesos.',
    url: 'https://saloncampeche.com/servicios',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
