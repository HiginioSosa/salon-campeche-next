'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle, Clock, MapPin } from 'lucide-react'
import { Section, SectionHeader, Card, CardContent, Button } from '@/components'

const faqs = [
  {
    id: 1,
    category: 'general',
    question: '¿Cuál es la capacidad máxima del salón?',
    answer:
      'Nuestro salón tiene capacidad para hasta 150 personas en el primer piso y hasta 250 personas utilizando ambos pisos. Podemos adaptarnos a eventos de diferentes tamaños para garantizar comodidad y elegancia.',
  },
  {
    id: 2,
    category: 'booking',
    question: '¿Cómo es el proceso de reservación?',
    answer:
      'El proceso es muy sencillo: 1) Selecciona los servicios que deseas, 2) Verificamos disponibilidad de fecha, 3) Firma del contrato con 50% de anticipo, 4) El 50% restante se paga hasta un día antes del evento.',
  },
  {
    id: 3,
    category: 'services',
    question: '¿Qué incluye la renta básica del salón?',
    answer:
      'La renta básica incluye el uso del espacio, mesas y sillas básicas, acceso desde la hora que necesites (incluso días previos para decoración), estacionamiento gratuito en la calle, y uso hasta las 2:00 AM.',
  },
  {
    id: 4,
    category: 'pricing',
    question: '¿Cuánto cuesta agregar horas extras?',
    answer:
      'Si tu evento necesita extenderse más allá de las 2:00 AM, el costo de horas extras es de $250 pesos por hora adicional. Te recomendamos confirmar esto al momento de la contratación.',
  },
  {
    id: 5,
    category: 'policies',
    question: '¿Cuál es la política de cancelación?',
    answer:
      'Entendemos que los planes pueden cambiar. Manejamos políticas flexibles según el tiempo de anticipación. Para conocer los detalles específicos de cancelación y reembolsos, contáctanos directamente.',
  },
  {
    id: 6,
    category: 'services',
    question: '¿Puedo traer mi propio DJ o debo contratar el suyo?',
    answer:
      '¡Tienes total flexibilidad! Puedes traer tu propio DJ o contratar nuestro servicio profesional de DJ con sonido y luces por $2,700 pesos (5 horas). Nuestro equipo cuenta con experiencia en todo tipo de eventos.',
  },
]

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <Section variant='dark' size='xl'>
      <SectionHeader
        subtitle='Preguntas Frecuentes'
        title='Resolvemos tus dudas'
        description='Las preguntas más comunes sobre nuestros servicios y procesos'
      />

      <div className='max-w-4xl mx-auto'>
        <div className='space-y-4 mb-12'>
          {faqs.map(faq => (
            <Card
              key={faq.id}
              variant='outlined'
              className={`transition-all duration-300 ${
                openFAQ === faq.id ? 'border-accent-3 shadow-accent-glow' : ''
              }`}
              padding='md'
            >
              <CardContent>
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className='w-full flex items-center justify-between text-left group'
                  aria-expanded={openFAQ === faq.id}
                >
                  <h3 className='font-raleway font-semibold text-lg text-foreground group-hover:text-accent-3 transition-colors duration-200 pr-4'>
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-3 transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openFAQ === faq.id
                      ? 'max-h-96 opacity-100 mt-4'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className='border-t border-gray-700 pt-4'>
                    <p className='font-raleway text-gray-300 leading-relaxed'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info cards rápidas */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <Card variant='glass' padding='md' className='text-center'>
            <CardContent>
              <div className='w-12 h-12 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Clock className='w-6 h-6 text-accent-3' />
              </div>
              <h4 className='font-raleway font-semibold text-foreground mb-2'>
                Horario Flexible
              </h4>
              <p className='text-gray-300 text-sm'>
                Acceso desde cuando lo necesites, eventos hasta las 2:00 AM
              </p>
            </CardContent>
          </Card>

          <Card variant='glass' padding='md' className='text-center'>
            <CardContent>
              <div className='w-12 h-12 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <MapPin className='w-6 h-6 text-accent-3' />
              </div>
              <h4 className='font-raleway font-semibold text-foreground mb-2'>
                Ubicación Ideal
              </h4>
              <p className='text-gray-300 text-sm'>
                Fácil acceso y estacionamiento gratuito en Ixtapaluca
              </p>
            </CardContent>
          </Card>

          <Card variant='glass' padding='md' className='text-center'>
            <CardContent>
              <div className='w-12 h-12 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                <HelpCircle className='w-6 h-6 text-accent-3' />
              </div>
              <h4 className='font-raleway font-semibold text-foreground mb-2'>
                Atención Personal
              </h4>
              <p className='text-gray-300 text-sm'>
                Te acompañamos de principio a fin en tu evento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to action */}
        <div className='text-center'>
          <h3 className='font-caveat font-bold text-3xl text-foreground mb-4'>
            ¿Tienes más preguntas?
          </h3>
          <p className='font-raleway text-gray-300 mb-8 max-w-2xl mx-auto'>
            Nuestro equipo está listo para resolver todas tus dudas y ayudarte a
            planear el evento perfecto.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/faq'>
              <Button size='lg' className='w-full sm:w-auto'>
                Ver Todas las FAQ
              </Button>
            </Link>

            <Link href='/contacto'>
              <Button
                variant='secondary'
                size='lg'
                className='w-full sm:w-auto'
              >
                Contactar por WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
