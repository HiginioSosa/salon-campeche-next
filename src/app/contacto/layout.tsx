import type { Metadata } from 'next'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Contacto - ${businessInfo.name}`,
  description: `Contáctanos para tu evento. WhatsApp: ${businessInfo.contact.whatsapp}, Tel: ${businessInfo.contact.phone}. Ubicados en ${businessInfo.contact.address.city}, ${businessInfo.contact.address.state}. Respuesta inmediata garantizada.`,
  keywords: [
    'contacto salon campeche',
    'telefono salon de fiestas ixtapaluca',
    'whatsapp eventos estado mexico',
    'direccion salon campeche',
    'cotizacion eventos ixtapaluca',
    'contactar salon de fiestas',
    'telefono salon eventos',
    'ubicacion salon campeche',
  ],
  openGraph: {
    title: `Contáctanos - Respuesta Inmediata - ${businessInfo.name}`,
    description: `📱 WhatsApp: ${businessInfo.contact.whatsapp} | 📞 Tel: ${businessInfo.contact.phone} | 📍 ${businessInfo.contact.address.city}, ${businessInfo.contact.address.state}. ¡Cotiza tu evento ahora!`,
    url: 'https://saloncampeche.com/contacto',
    images: [
      {
        url: '/og-contacto.jpg',
        width: 1200,
        height: 630,
        alt: 'Contacto Salón Campeche',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contacto - ${businessInfo.name}`,
    description: `Respuesta inmediata por WhatsApp. Tel: ${businessInfo.contact.phone}. Ubicación: ${businessInfo.contact.address.city}, ${businessInfo.contact.address.state}.`,
    images: ['/og-contacto.jpg'],
  },
  alternates: {
    canonical: 'https://saloncampeche.com/contacto',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
