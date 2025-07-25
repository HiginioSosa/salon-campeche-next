// src/app/page.tsx

import type { Metadata } from 'next'
import { MainLayout } from '@/components'
import HeroSection from '@/components/sections/HeroSection'
import ServicesHighlight from '@/components/sections/ServicesHighlight'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import GalleryPreview from '@/components/sections/GalleryPreview'
import ContactCTA from '@/components/sections/ContactCTA'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `${businessInfo.name} - ${businessInfo.slogan}`,
  description: `${businessInfo.description} Salón para bodas, XV años, cumpleaños y eventos sociales en ${businessInfo.contact.address.city}, ${businessInfo.contact.address.state}. Capacidad hasta ${businessInfo.capacity.bothFloors} personas.`,
  keywords: [
    'salon de fiestas ixtapaluca',
    'eventos sociales estado de mexico',
    'bodas ixtapaluca',
    'xv años salon campeche',
    'cumpleanos salon de fiestas',
    'salon eventos ixtapaluca',
    'fiestas ampliacion san francisco',
    'salon campeche ixtapaluca'
  ],
  openGraph: {
    title: `${businessInfo.name} - El mejor salón de fiestas en Ixtapaluca`,
    description: `Celebra sin límites en nuestro elegante salón. Capacidad hasta ${businessInfo.capacity.bothFloors} personas, servicios completos y ubicación privilegiada en ${businessInfo.contact.address.city}.`,
    url: 'https://saloncampeche.com',
    siteName: businessInfo.name,
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Salón de fiestas en Ixtapaluca`,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - ${businessInfo.slogan}`,
    description: `El salón de fiestas más elegante de ${businessInfo.contact.address.city}. Eventos hasta ${businessInfo.capacity.bothFloors} personas.`,
    images: ['/og-home.jpg'],
  },
  alternates: {
    canonical: 'https://saloncampeche.com',
  },
}

export default function HomePage() {
  return (
    <MainLayout whatsAppMessage="¡Hola! Me interesa conocer más sobre sus servicios para mi evento. ¿Podrían brindarme información y precios?">
      {/* Hero Section - Sección principal de bienvenida */}
      <HeroSection />

      {/* Services Highlight - Servicios destacados */}
      <ServicesHighlight />

      {/* Gallery Preview - Vista previa de la galería */}
      <GalleryPreview />

      {/* Testimonials - Testimonios de clientes */}
      <TestimonialsSection />

      {/* FAQ Section - Preguntas frecuentes */}
      <FAQSection />

      {/* Contact CTA - Llamada a la acción de contacto */}
      <ContactCTA />
    </MainLayout>
  )
}