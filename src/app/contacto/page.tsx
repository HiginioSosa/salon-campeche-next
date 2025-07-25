import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Contacto - ${businessInfo.name}`,
  description: `Contáctanos para tu evento. Teléfono: ${businessInfo.contact.phone}, ubicados en ${businessInfo.contact.address.full}`,
}

export default function ContactPage() {
  return (
    <MainLayout>
      <Section size="xl" centered>
        <SectionHeader
          subtitle="Próximamente"
          title="Página de Contacto"
          description="Esta página estará disponible en la Fase 6 del desarrollo"
        />
      </Section>
    </MainLayout>
  )
}