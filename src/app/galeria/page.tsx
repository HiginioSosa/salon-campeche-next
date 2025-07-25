import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Galería de Eventos - ${businessInfo.name}`,
  description:
    'Explora nuestra galería de eventos realizados: bodas, XV años, cumpleaños y más celebraciones inolvidables.',
}

export default function GalleryPage() {
  return (
    <MainLayout>
      <Section size='xl' centered>
        <SectionHeader
          subtitle='Próximamente'
          title='Galería de Eventos'
          description='Esta página estará disponible en la Fase 6 del desarrollo'
        />
      </Section>
    </MainLayout>
  )
}
