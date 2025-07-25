import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Paquetes y Cotizador - ${businessInfo.name}`,
  description: 'Cotiza tu evento personalizado con nuestro sistema interactivo. Combina servicios y obtén precios instantáneos.',
}

export default function PackagesPage() {
  return (
    <MainLayout>
      <Section size="xl" centered>
        <SectionHeader
          subtitle="Próximamente"
          title="Cotizador de Paquetes"
          description="Esta página estará disponible en la Fase 5 del desarrollo"
        />
      </Section>
    </MainLayout>
  )
}