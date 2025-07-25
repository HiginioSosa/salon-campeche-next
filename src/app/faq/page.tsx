import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Preguntas Frecuentes - ${businessInfo.name}`,
  description: 'Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, precios, políticas y procesos.',
}

export default function FAQPage() {
  return (
    <MainLayout>
      <Section size="xl" centered>
        <SectionHeader
          subtitle="Próximamente"
          title="Preguntas Frecuentes"
          description="Esta página estará disponible en la Fase 7 del desarrollo"
        />
      </Section>
    </MainLayout>
  )
}