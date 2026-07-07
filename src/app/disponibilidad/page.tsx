import { Clock, Users, MessageCircle, Phone } from 'lucide-react'
import {
  MainLayout,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
} from '@/components'
import { businessInfo } from '@/lib/brand'
import { disponibilidadMes } from '@/lib/reservas/service'
import CalendarioDisponibilidad from './CalendarioDisponibilidad'

// La disponibilidad se lee en cada visita (datos en vivo).
export const dynamic = 'force-dynamic'

export default async function AvailabilityPage() {
  const hoy = new Date()
  const anio = hoy.getFullYear()
  const mes = hoy.getMonth() + 1
  const dias = await disponibilidadMes(anio, mes)
  const wa = `https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`

  return (
    <MainLayout whatsAppMessage='¡Hola! Estoy consultando su calendario de disponibilidad y me gustaría verificar una fecha para mi evento.'>
      <Section variant='gradient' size='lg'>
        <SectionHeader
          as='h1'
          subtitle='Disponibilidad de Fechas'
          title='Consulta y aparta tu fecha'
          description='Elige una fecha disponible y envía tu solicitud. La apartamos temporalmente mientras confirmamos contigo; se reserva en firme con el anticipo.'
        />
      </Section>

      <Section variant='default' size='xl'>
        <CalendarioDisponibilidad
          anioInicial={anio}
          mesInicial={mes}
          diasIniciales={dias}
        />
      </Section>

      {/* Información importante sobre reservas */}
      <Section variant='gradient' size='lg'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='font-caveat font-bold text-4xl text-foreground mb-4'>
              Cómo funciona la reserva
            </h2>
            <p className='font-raleway text-gray-300 text-lg'>
              Todo lo que necesitas saber para apartar tu fecha
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Card variant='glass' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <Clock className='w-6 h-6 text-accent-3' />
                  <h3 className='font-raleway font-bold text-foreground'>Proceso</h3>
                </div>
                <div className='space-y-3 text-sm font-raleway text-gray-300'>
                  {[
                    'Elige una fecha disponible y envía tu solicitud.',
                    'La apartamos temporalmente y te contactamos.',
                    'Firmas y pagas el 50% de anticipo.',
                    '¡Tu fecha queda reservada!',
                  ].map((t, i) => (
                    <div key={i} className='flex items-start space-x-2'>
                      <div className='w-5 h-5 bg-accent-3 rounded-full flex items-center justify-center text-background text-xs font-bold mt-0.5'>
                        {i + 1}
                      </div>
                      <p>{t}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card variant='glass' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <Users className='w-6 h-6 text-accent-3' />
                  <h3 className='font-raleway font-bold text-foreground'>
                    Políticas de reserva
                  </h3>
                </div>
                <div className='space-y-3 text-sm font-raleway text-gray-300'>
                  <p>• <strong>Anticipo:</strong> 50% del total para apartar la fecha.</p>
                  <p>• <strong>Pago final:</strong> hasta un día antes del evento.</p>
                  <p>• <strong>Apartado temporal:</strong> se libera si no se cubre el anticipo en el plazo acordado.</p>
                  <p>• <strong>Cancelación:</strong> políticas flexibles según anticipación.</p>
                  <p>• <strong>Acceso:</strong> desde la hora que necesites.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant='dark' size='lg'>
        <div className='text-center'>
          <h2 className='font-caveat font-bold text-4xl text-foreground mb-6'>
            ¿Dudas con tu fecha?
          </h2>
          <p className='font-raleway text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
            Escríbenos o llámanos y te ayudamos a apartar la fecha perfecta.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button href={wa} external size='lg' icon={<MessageCircle className='w-5 h-5' />}>
              Reservar por WhatsApp
            </Button>
            <Button
              href={`tel:${businessInfo.contact.phone}`}
              variant='secondary'
              size='lg'
              icon={<Phone className='w-5 h-5' />}
            >
              Llamar para reservar
            </Button>
            <Button href='/paquetes' variant='ghost' size='lg'>
              Ver paquetes y precios
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  )
}
