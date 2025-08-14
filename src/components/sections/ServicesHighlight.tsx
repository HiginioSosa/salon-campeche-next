import Link from 'next/link'
import { Music, Sparkles, Baby, Utensils, Camera, Users } from 'lucide-react'
import { Section, SectionHeader, Card, CardContent, Button } from '@/components'

const services = [
  {
    icon: <Users className='w-8 h-8' />,
    title: 'Renta del Salón',
    description: 'Espacios elegantes de 1 o 2 pisos para hasta 250 invitados',
    features: [
      'Primer piso: 150 personas',
      'Ambos pisos: 250 personas',
      'Estacionamiento gratuito',
    ],
    price: 'Desde $4,000',
    href: '/servicios#salon',
  },
  {
    icon: <Music className='w-8 h-8' />,
    title: 'DJ & Sonido',
    description: 'Equipo profesional de sonido y DJ para 5 horas de diversión',
    features: [
      'Sonido profesional',
      'Luces de ambiente',
      'Música personalizada',
    ],
    price: '$2,700',
    href: '/servicios#dj',
  },
  {
    icon: <Sparkles className='w-8 h-8' />,
    title: 'Decoración',
    description: 'Adornos elegantes para hacer tu evento único y memorable',
    features: ['Arco de globos', 'Torres decorativas', 'Iluminación especial'],
    price: 'Desde $2,700',
    href: '/servicios#decoracion',
  },
  {
    icon: <Utensils className='w-8 h-8' />,
    title: 'Mesa de Dulces',
    description: 'Mesa personalizada con dulces y treats para todos los gustos',
    features: [
      'Diseño personalizado',
      'Dulces variados',
      'Decoración temática',
    ],
    price: 'Desde $3,500',
    href: '/servicios#mesa-dulces',
  },
  {
    icon: <Baby className='w-8 h-8' />,
    title: 'Juegos Infantiles',
    description: 'Diversión asegurada para los más pequeños de la celebración',
    features: [
      'Inflable con alberca',
      'Trampolín grande',
      'Supervisión incluida',
    ],
    price: 'Desde $1,000',
    href: '/servicios#juegos',
  },
  {
    icon: <Camera className='w-8 h-8' />,
    title: 'Servicios Adicionales',
    description: 'Meseros, vajilla, bebidas y más para complementar tu evento',
    features: [
      'Personal de servicio',
      'Vajilla completa',
      'Bebidas disponibles',
    ],
    price: 'Variable',
    href: '/servicios#adicionales',
  },
]

export default function ServicesHighlight() {
  return (
    <Section variant='dark' size='xl'>
      <SectionHeader
        subtitle='Nuestros Servicios'
        title='Todo lo que necesitas para tu evento perfecto'
        description='Ofrecemos servicios completos para que tu celebración sea inolvidable sin preocupaciones'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {services.map(service => (
          <Card key={service.title} hover className='group'>
            <CardContent className='h-full flex flex-col'>
              {/* Icono y título */}
              <div className='flex items-center space-x-4 mb-4'>
                <div className='w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center text-accent-3 group-hover:bg-accent-3 group-hover:text-background transition-all duration-300'>
                  {service.icon}
                </div>
                <div>
                  <h3 className='font-caveat font-bold text-xl text-foreground group-hover:text-accent-3 transition-colors duration-300'>
                    {service.title}
                  </h3>
                  <p className='text-accent-2 font-raleway font-semibold text-lg'>
                    {service.price}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <p className='text-gray-300 font-raleway text-sm mb-4 leading-relaxed flex-grow'>
                {service.description}
              </p>

              {/* Características */}
              <ul className='space-y-2 mb-6'>
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className='flex items-center text-gray-400 font-raleway text-sm'
                  >
                    <span className='w-2 h-2 bg-accent-3 rounded-full mr-3 flex-shrink-0'></span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Botón de acción */}
              <Link href={service.href} className='mt-auto'>
                <Button
                  variant='ghost'
                  className='w-full justify-center group-hover:bg-accent-3 group-hover:text-background'
                >
                  Ver Detalles
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action */}
      <div className='text-center mt-16'>
        <div className='bg-gradient-to-r from-accent-3 to-accent-2 rounded-2xl p-8 md:p-12 shadow-2xl'>
          <h3 className='font-caveat font-bold text-3xl md:text-4xl text-background mb-4'>
            ¿Necesitas un paquete personalizado?
          </h3>
          <p className='text-background text-opacity-90 font-raleway text-lg mb-8 max-w-2xl mx-auto leading-relaxed'>
            Combina nuestros servicios y crea el paquete perfecto para tu
            evento. Obtén una cotización instantánea y personalizada.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/paquetes'>
              <Button variant='inverse' size='lg' className='w-full sm:w-auto'>
                Cotizar Paquete
              </Button>
            </Link>
            <Link href='/servicios'>
              <Button variant='inverse' size='lg' className='w-full sm:w-auto'>
                Ver Todos los Servicios
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
