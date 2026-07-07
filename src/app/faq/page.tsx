// src/app/faq/page.tsx

'use client'

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Phone,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import {
  MainLayout,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
} from '@/components'
import { businessInfo } from '@/lib/brand'

const faqs = [
  // Capacidad y distribución
  {
    id: 1,
    category: 'capacity',
    question: '¿Cuál es la capacidad máxima del salón?',
    answer:
      'Nuestro salón tiene capacidad para hasta 150 personas en el primer piso y hasta 250 personas utilizando ambos niveles. Recomendamos usar el 80% de la capacidad máxima para mayor comodidad de tus invitados.',
    popular: true,
  },
  {
    id: 2,
    category: 'capacity',
    question: '¿Cómo se distribuyen las mesas en el salón?',
    answer:
      'Utilizamos mesas circulares o rectangulares para 10 personas cada una. Para 150 personas necesitarías 15 mesas, y para 250 personas, 25 mesas. Podemos adaptar la distribución según tus necesidades específicas.',
  },
  {
    id: 3,
    category: 'capacity',
    question: '¿Puedo usar solo el primer piso para eventos pequeños?',
    answer:
      'Sí, absolutamente. El primer piso es perfecto para eventos de hasta 150 personas y tiene un costo de $4,000 pesos. Es ideal para celebraciones más íntimas.',
  },

  // Servicios incluidos vs adicionales
  {
    id: 4,
    category: 'services',
    question: '¿Qué incluye la renta básica del salón?',
    answer:
      'La renta básica incluye: uso del espacio, mesas y sillas básicas, acceso desde la hora que necesites (incluso días previos), estacionamiento gratuito en la calle, y uso hasta las 2:00 AM del día siguiente.',
    popular: true,
  },
  {
    id: 5,
    category: 'services',
    question: '¿La decoración está incluida en la renta?',
    answer:
      'La decoración no está incluida en la renta básica, pero ofrecemos paquetes de decoración desde $2,700 pesos (sencilla) hasta $3,200 pesos (con luces). También puedes traer tu propia decoración.',
  },
  {
    id: 6,
    category: 'services',
    question: '¿Puedo traer mi propio DJ o debo contratar el suyo?',
    answer:
      'Tienes total flexibilidad. Puedes traer tu propio DJ/música o contratar nuestro servicio profesional de DJ con sonido y luces por $2,700 pesos (5 horas).',
  },
  {
    id: 7,
    category: 'services',
    question: '¿El servicio de meseros es obligatorio?',
    answer:
      'No es obligatorio, pero lo recomendamos especialmente para eventos de más de 100 personas. Ofrecemos personal capacitado a $400 pesos por mesero, con un mínimo de 3 meseros por evento.',
  },

  // Políticas de cancelación
  {
    id: 8,
    category: 'policies',
    question: '¿Cuál es la política de cancelación?',
    answer:
      'Manejamos políticas flexibles según el tiempo de anticipación. Te recomendamos contactarnos directamente para conocer las condiciones específicas según tu fecha de evento.',
  },
  {
    id: 9,
    category: 'policies',
    question: '¿Cuánto tiempo antes debo hacer la reservación?',
    answer:
      'Recomendamos reservar con al menos 2-3 semanas de anticipación. Para fechas populares (diciembre, mayo-julio) sugerimos reservar con 1-2 meses de anticipación.',
    popular: true,
  },
  {
    id: 10,
    category: 'policies',
    question: '¿Qué porcentaje debo pagar como anticipo?',
    answer:
      'Requerimos el 50% del total como anticipo para apartar tu fecha. El 50% restante se paga hasta un día antes del evento.',
  },

  // Horarios de eventos
  {
    id: 11,
    category: 'schedule',
    question: '¿Hasta qué hora puede durar mi evento?',
    answer:
      'Los eventos pueden durar hasta las 2:00 AM del día siguiente. Si necesitas horas extras, el costo es de $250 pesos por hora adicional.',
    popular: true,
  },
  {
    id: 12,
    category: 'schedule',
    question: '¿Puedo acceder al salón antes de mi evento?',
    answer:
      'Sí, puedes acceder desde la hora que necesites el día de tu evento, e incluso días previos para decorar, ensayar o preparar. Esto está incluido en la renta.',
  },
  {
    id: 13,
    category: 'schedule',
    question: '¿Qué pasa si mi evento se extiende más allá de las 2:00 AM?',
    answer:
      'Puedes extender tu evento pagando $250 pesos por cada hora adicional. Te recomendamos confirmar esto al momento de la contratación.',
  },

  // Equipamiento disponible
  {
    id: 14,
    category: 'equipment',
    question: '¿Qué tipo de mesas y sillas tienen disponibles?',
    answer:
      'Tenemos mesas circulares y rectangulares para 10 personas. Ofrecemos mesas sencillas ($200/mesa) con mantel blanco y sillas, o mesas vestidas ($270/mesa) con mantel de color, sillas con funda y moño.',
  },
  {
    id: 15,
    category: 'equipment',
    question: '¿Tienen equipo de sonido disponible?',
    answer:
      'Sí, incluimos equipo de sonido profesional, luces y DJ por $2,700 pesos durante 5 horas. También puedes traer tu propio equipo si prefieres.',
  },
  {
    id: 16,
    category: 'equipment',
    question: '¿Proporcionan vajilla y cubiertos?',
    answer:
      'Sí, ofrecemos vajilla completa (vaso, platos para 3 tiempos y cubiertos) a $25 pesos por persona. También puedes traer tu propia vajilla.',
  },

  // Servicios de comida y bebida
  {
    id: 17,
    category: 'food',
    question: '¿Puedo traer mi propia comida y bebidas?',
    answer:
      'Sí, puedes traer tu propia comida y bebidas, o podemos cotizarte servicios de catering personalizados (taquiza, buffet, 3 tiempos). También vendemos cerveza por cartones.',
  },
  {
    id: 18,
    category: 'food',
    question: '¿Qué opciones de bebidas alcohólicas manejan?',
    answer:
      'Ofrecemos cerveza Corona/Victoria ($400/cartón de 24), Indio/Tecate ($300/cartón de 20), y XX Lager ($320/cartón de 20). Para otros tipos de bebidas, podemos cotizarte opciones.',
  },
]

const categories = [
  {
    id: 'all',
    name: 'Todas',
    icon: <HelpCircle className='w-5 h-5' />,
    count: faqs.length,
  },
  {
    id: 'capacity',
    name: 'Capacidad',
    icon: <Users className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'capacity').length,
  },
  {
    id: 'services',
    name: 'Servicios',
    icon: <CheckCircle className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'services').length,
  },
  {
    id: 'policies',
    name: 'Políticas',
    icon: <AlertTriangle className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'policies').length,
  },
  {
    id: 'schedule',
    name: 'Horarios',
    icon: <Clock className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'schedule').length,
  },
  {
    id: 'equipment',
    name: 'Equipamiento',
    icon: <DollarSign className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'equipment').length,
  },
  {
    id: 'food',
    name: 'Comida y Bebida',
    icon: <Calendar className='w-5 h-5' />,
    count: faqs.filter(f => f.category === 'food').length,
  },
]

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory =
      selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const popularFAQs = faqs.filter(faq => faq.popular)

  // Datos estructurados FAQPage para rich results en buscadores.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <MainLayout whatsAppMessage='¡Hola! Tengo algunas dudas sobre sus servicios. ¿Podrían ayudarme con información específica?'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero Section */}
      <Section variant='gradient' size='lg'>
        <SectionHeader
          as='h1'
          subtitle='Preguntas Frecuentes'
          title='Resuelve todas tus dudas'
          description='Encuentra respuestas rápidas a las preguntas más comunes sobre nuestros servicios, precios y políticas'
        />

        {/* Estadísticas rápidas */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
          <div className='text-center p-4 bg-background/50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              {faqs.length}
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Preguntas Respondidas
            </p>
          </div>
          <div className='text-center p-4 bg-background/50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              6
            </div>
            <p className='font-raleway text-gray-300 text-sm'>Categorías</p>
          </div>
          <div className='text-center p-4 bg-background/50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              24/7
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Soporte WhatsApp
            </p>
          </div>
          <div className='text-center p-4 bg-background/50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              &lt;15min
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Tiempo de Respuesta
            </p>
          </div>
        </div>

        {/* Buscador */}
        <div className='max-w-2xl mx-auto'>
          <div className='relative'>
            <HelpCircle className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            <input
              type='text'
              placeholder='Busca tu pregunta aquí...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className='input-custom w-full pl-12 py-4 text-lg'
            />
          </div>
        </div>
      </Section>

      {/* Preguntas Populares */}
      {searchTerm === '' && selectedCategory === 'all' && (
        <Section variant='dark' size='md'>
          <h2 className='font-caveat font-bold text-2xl text-foreground text-center mb-8'>
            📌 Preguntas Más Populares
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {popularFAQs.map(faq => (
              <Card key={faq.id} variant='outlined' padding='md' hover>
                <CardContent>
                  <div className='flex items-start space-x-3'>
                    <div className='w-8 h-8 bg-accent-3/20 rounded-full flex items-center justify-center shrink-0 mt-1'>
                      <span className='text-accent-3 text-sm font-bold'>?</span>
                    </div>
                    <div className='flex-1'>
                      <h3 className='font-raleway font-semibold text-foreground mb-2 text-sm'>
                        {faq.question}
                      </h3>
                      <p className='font-raleway text-gray-300 text-xs leading-relaxed'>
                        {faq.answer.length > 100
                          ? `${faq.answer.substring(0, 100)}...`
                          : faq.answer}
                      </p>
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className='text-accent-3 hover:text-accent-2 font-raleway text-xs mt-2 transition-colors duration-200'
                      >
                        Ver respuesta completa →
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Filtros por categoría */}
      <Section variant='default' size='md'>
        <div className='flex items-center justify-between mb-8'>
          <h3 className='font-raleway font-semibold text-foreground text-lg'>
            Categorías
          </h3>
          <p className='font-raleway text-gray-300 text-sm'>
            {filteredFAQs.length} pregunta{filteredFAQs.length !== 1 ? 's' : ''}{' '}
            encontrada{filteredFAQs.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8'>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                selectedCategory === category.id
                  ? 'bg-accent-3 text-background shadow-lg'
                  : 'bg-gray-900/30 text-gray-300 hover:bg-accent-3/20'
              }`}
            >
              <div className='flex justify-center mb-2'>{category.icon}</div>
              <div className='font-raleway font-semibold text-sm mb-1'>
                {category.name}
              </div>
              <div className='text-xs opacity-75'>({category.count})</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Lista de FAQs */}
      <Section variant='default' size='xl'>
        <div className='max-w-4xl mx-auto space-y-4'>
          {filteredFAQs.map(faq => (
            <Card
              key={faq.id}
              variant='outlined'
              className={`transition-all duration-300 ${
                openFAQ === faq.id ? 'border-accent-3 shadow-accent-glow' : ''
              } ${faq.popular ? 'ring-1 ring-accent-3/30' : ''}`}
              padding='md'
            >
              <CardContent>
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className='w-full flex items-center justify-between text-left group'
                  aria-expanded={openFAQ === faq.id}
                >
                  <div className='flex items-start space-x-4 flex-1'>
                    {faq.popular && (
                      <div className='bg-accent-3 text-background px-2 py-1 rounded-full text-xs font-raleway font-bold shrink-0'>
                        POPULAR
                      </div>
                    )}
                    <h3 className='font-raleway font-semibold text-lg text-foreground group-hover:text-accent-3 transition-colors duration-200'>
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-accent-3 transition-transform duration-300 shrink-0 ml-4 ${
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

          {filteredFAQs.length === 0 && (
            <div className='text-center py-12'>
              <div className='w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
                <HelpCircle className='w-12 h-12 text-gray-400' />
              </div>
              <h3 className='font-caveat font-bold text-2xl text-foreground mb-2'>
                No se encontraron preguntas
              </h3>
              <p className='font-raleway text-gray-300 mb-4'>
                Intenta con otros términos de búsqueda o selecciona otra
                categoría
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
              >
                Ver Todas las Preguntas
              </Button>
            </div>
          )}
        </div>
      </Section>

      {/* Información de contacto directo */}
      <Section variant='gradient' size='lg'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='font-caveat font-bold text-4xl text-foreground mb-4'>
              ¿No encontraste tu respuesta?
            </h2>
            <p className='font-raleway text-gray-300 text-lg max-w-2xl mx-auto'>
              Nuestro equipo está disponible para resolver cualquier duda
              específica sobre tu evento
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card variant='glass' padding='lg' className='text-center'>
              <CardContent>
                <div className='w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MessageCircle className='w-8 h-8 text-green-500' />
                </div>
                <h3 className='font-raleway font-bold text-foreground mb-2'>
                  WhatsApp
                </h3>
                <p className='font-raleway text-gray-300 text-sm mb-4'>
                  Respuesta inmediata las 24 horas
                </p>
                <Button
                  href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
                  size='sm'
                >
                  Enviar Mensaje
                </Button>
              </CardContent>
            </Card>

            <Card variant='glass' padding='lg' className='text-center'>
              <CardContent>
                <div className='w-16 h-16 bg-accent-3/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Phone className='w-8 h-8 text-accent-3' />
                </div>
                <h3 className='font-raleway font-bold text-foreground mb-2'>
                  Llamada
                </h3>
                <p className='font-raleway text-gray-300 text-sm mb-4'>
                  Lunes a domingo 9:00 AM - 8:00 PM
                </p>
                <Button
                  href={`tel:${businessInfo.contact.phone}`}
                  variant='secondary'
                  size='sm'
                >
                  Llamar Ahora
                </Button>
              </CardContent>
            </Card>

            <Card variant='glass' padding='lg' className='text-center'>
              <CardContent>
                <div className='w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <MapPin className='w-8 h-8 text-blue-500' />
                </div>
                <h3 className='font-raleway font-bold text-foreground mb-2'>
                  Visítanos
                </h3>
                <p className='font-raleway text-gray-300 text-sm mb-4'>
                  Conoce nuestras instalaciones
                </p>
                <Button href='/contacto' variant='ghost' size='sm'>
                  Ver Ubicación
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Enlaces relacionados */}
      <Section variant='dark' size='md'>
        <div className='text-center'>
          <h3 className='font-caveat font-bold text-2xl text-foreground mb-8'>
            Enlaces Útiles
          </h3>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button href='/servicios' variant='secondary'>
              Ver Todos los Servicios
            </Button>

            <Button href='/paquetes'>Cotizar mi Evento</Button>

            <Button href='/disponibilidad' variant='ghost'>
              Verificar Disponibilidad
            </Button>
          </div>
        </div>
      </Section>
    </MainLayout>
  )
}
