import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Disponibilidad de Fechas - ${businessInfo.name}`,
  description: 'Consulta la disponibilidad de fechas para tu evento en nuestro calendario actualizado.',
}

export default function AvailabilityPage() {
  return (
    <MainLayout>
      <Section size="xl" centered>
        <SectionHeader
          subtitle="Próximamente"
          title="Calendario de Disponibilidad"
          description="Esta página estará disponible en la Fase 7 del desarrollo"
        />
      </Section>
    </MainLayout>
  )
}