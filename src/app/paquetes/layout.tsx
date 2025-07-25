import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Cotizador de Paquetes Interactivo - ${businessInfo.name}`,
  description:
    'Cotiza tu evento personalizado con nuestro sistema interactivo. Combina servicios, obtén precios instantáneos y descarga tu cotización en PDF. Paquetes desde $8,200 pesos.',
  keywords: [
    'cotizador eventos',
    'paquetes salon de fiestas',
    'precio evento personalizado',
    'cotizacion bodas xv años',
    'salon campeche precios',
    'calculadora eventos ixtapaluca',
    'cotizar salon de fiestas',
    'paquetes eventos mexico',
  ],
  openGraph: {
    title: `Cotizador Interactivo - Paquetes desde $8,200 - ${businessInfo.name}`,
    description:
      'Crea el paquete perfecto para tu evento. Sistema inteligente de cotización con recomendaciones automáticas y descarga de PDF.',
    url: 'https://saloncampeche.com/paquetes',
  },
}

export default function PaquetesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
