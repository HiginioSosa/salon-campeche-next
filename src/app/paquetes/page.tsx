'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Sparkles,
  MessageCircle,
  ArrowLeft,
  Users,
} from 'lucide-react'
import {
  MainLayout,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
  QuoteSummary,
  PackageComparison,
} from '@/components'
import QuoteCalculator from '@/components/packages/QuoteCalculator'
import ServiceSelector from '@/components/packages/ServiceSelector'
import TipsPanel from '@/components/packages/TipsPanel'
import { businessInfo } from '@/lib/brand'
import type { Quote } from '@/types'

export default function PackagesPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'calculator'>(
    'intro'
  )
  const [calculatorData, setCalculatorData] = useState<{
    selectedServices: { [serviceId: string]: number }
    guestCount: number
    venueType: string
    currentQuote: Quote | null
    eventType: string
    clientName: string
  }>({
    selectedServices: {},
    guestCount: 0,
    venueType: '',
    currentQuote: null,
    eventType: '',
    clientName: '',
  })

  // Memoizar la función onDataChange para evitar re-renders innecesarios
  const handleDataChange = useCallback((data: {
    selectedServices: { [serviceId: string]: number }
    guestCount: number
    venueType: string
    currentQuote: Quote | null
    eventType: string
    clientName: string
  }) => {
    setCalculatorData(data)
  }, [])

  if (currentStep === 'calculator') {
    return (
      <MainLayout whatsAppMessage='¡Hola! Estoy usando su cotizador y me gustaría recibir más información personalizada sobre mi evento.'>
        {/* Header del cotizador */}
        <Section variant='gradient' size='md'>
          <div className='flex items-center justify-between'>
            <div>
              <button
                onClick={() => setCurrentStep('intro')}
                className='flex items-center space-x-2 text-accent-3 hover:text-accent-2 transition-colors duration-200 mb-4'
              >
                <ArrowLeft className='w-4 h-4' />
                <span className='font-raleway text-sm'>Volver a paquetes</span>
              </button>

              <h1 className='font-caveat font-bold text-3xl lg:text-4xl text-foreground mb-2'>
                Cotizador Interactivo
              </h1>
              <p className='font-raleway text-gray-300 text-lg'>
                Personaliza tu evento y obtén una cotización instantánea
              </p>
            </div>

            <div className='hidden md:block'>
              <div className='bg-accent-3 bg-opacity-20 rounded-xl p-4 text-center'>
                <Calculator className='w-8 h-8 text-accent-3 mx-auto mb-2' />
                <p className='font-raleway font-semibold text-foreground text-sm'>
                  Cotización en Tiempo Real
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Calculadora principal */}
        <Section variant='default' size='lg'>
          <QuoteCalculator onDataChange={handleDataChange} />
        </Section>

        {/* Selector de servicios adicionales */}
        {calculatorData.guestCount > 0 && calculatorData.venueType && (
          <Section variant='dark' size='lg'>
            <ServiceSelector
              selectedServices={calculatorData.selectedServices}
              onServiceUpdate={(serviceId, quantity) => {
                setCalculatorData(prev => ({
                  ...prev,
                  selectedServices: {
                    ...prev.selectedServices,
                    [serviceId]: quantity,
                  },
                }))
              }}
              guestCount={calculatorData.guestCount}
              venueType={calculatorData.venueType}
            />
          </Section>
        )}

        {/* CTA de contacto */}
        <Section variant='gradient' size='md'>
          <div className='text-center'>
            <h2 className='font-caveat font-bold text-3xl text-foreground mb-4'>
              ¿Necesitas ayuda personalizada?
            </h2>
            <p className='font-raleway text-gray-300 mb-8 max-w-2xl mx-auto'>
              Nuestro equipo está listo para ayudarte a ajustar tu cotización y
              resolver cualquier duda
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button size='lg' icon={<MessageCircle className='w-5 h-5' />}>
                  Enviar por WhatsApp
                </Button>
              </a>

              <Link href='/contacto'>
                <Button variant='secondary' size='lg'>
                  Contacto Personalizado
                </Button>
              </Link>
            </div>
          </div>
        </Section>

        {/* Resumen flotante de cotización */}
        <QuoteSummary
          quote={calculatorData.currentQuote}
          eventType={calculatorData.eventType || 'Evento'}
          clientName={calculatorData.clientName}
          isVisible={!!calculatorData.currentQuote}
        />

        {/* Panel de tips */}
        <TipsPanel isVisible={true} />
      </MainLayout>
    )
  }

  return (
    <MainLayout whatsAppMessage='¡Hola! Me interesa conocer más sobre sus paquetes para eventos. ¿Podrían ayudarme con información y precios?'>
      {/* Hero Section */}
      <Section variant='gradient' size='xl'>
        <SectionHeader
          subtitle='Paquetes y Cotizaciones'
          title='Encuentra el paquete perfecto para tu evento'
          description='Elige entre nuestros paquetes prediseñados o crea una cotización personalizada con nuestro cotizador interactivo'
        />

        {/* Opciones principales */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {/* Cotizador personalizado */}
          <Card
            variant='elevated'
            className='text-center group hover:scale-105 transition-all duration-300'
          >
            <CardContent className='py-8'>
              <div className='w-20 h-20 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-3 group-hover:text-background transition-all duration-300'>
                <Calculator className='w-10 h-10 text-accent-3 group-hover:text-background' />
              </div>

              <h3 className='font-caveat font-bold text-2xl lg:text-3xl text-foreground mb-4'>
                Cotizador Personalizado
              </h3>

              <p className='font-raleway text-gray-300 text-lg mb-6 leading-relaxed'>
                Crea un paquete único seleccionando exactamente los servicios
                que necesitas. Obtén una cotización instantánea y descarga el
                PDF.
              </p>

              <div className='space-y-3 mb-8 text-left'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Cálculo automático de mesas y personal
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Recomendaciones inteligentes
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Descarga de cotización en PDF
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Envío directo por WhatsApp
                  </span>
                </div>
              </div>

              <Button
                size='lg'
                className='w-full'
                onClick={() => setCurrentStep('calculator')}
                icon={<Calculator className='w-5 h-5' />}
              >
                Crear Cotización Personalizada
              </Button>
            </CardContent>
          </Card>

          {/* Paquetes predefinidos */}
          <Card
            variant='outlined'
            className='text-center group hover:scale-105 transition-all duration-300'
          >
            <CardContent className='py-8'>
              <div className='w-20 h-20 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-3 group-hover:text-background transition-all duration-300'>
                <Sparkles className='w-10 h-10 text-accent-3 group-hover:text-background' />
              </div>

              <h3 className='font-caveat font-bold text-2xl lg:text-3xl text-foreground mb-4'>
                Paquetes Predefinidos
              </h3>

              <p className='font-raleway text-gray-300 text-lg mb-6 leading-relaxed'>
                Selecciona uno de nuestros paquetes más populares, probados en
                cientos de eventos exitosos. Combinaciones perfectas con
                descuentos especiales.
              </p>

              <div className='space-y-3 mb-8 text-left'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    3 paquetes probados y populares
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Precios con descuentos incluidos
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Coordinación simplificada
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                  <span className='font-raleway text-gray-300 text-sm'>
                    Proceso de contratación ágil
                  </span>
                </div>
              </div>

              <Button
                variant='secondary'
                size='lg'
                className='w-full'
                icon={<Sparkles className='w-5 h-5' />}
              >
                Ver Paquetes Predefinidos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Estadísticas rápidas */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto'>
          <div className='text-center'>
            <div className='font-caveat font-bold text-3xl lg:text-4xl text-accent-3 mb-2'>
              15+
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Servicios Disponibles
            </p>
          </div>

          <div className='text-center'>
            <div className='font-caveat font-bold text-3xl lg:text-4xl text-accent-3 mb-2'>
              250
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Capacidad Máxima
            </p>
          </div>

          <div className='text-center'>
            <div className='font-caveat font-bold text-3xl lg:text-4xl text-accent-3 mb-2'>
              50%
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Anticipo Requerido
            </p>
          </div>

          <div className='text-center'>
            <div className='font-caveat font-bold text-3xl lg:text-4xl text-accent-3 mb-2'>
              2AM
            </div>
            <p className='font-raleway text-gray-300 text-sm'>Horario Límite</p>
          </div>
        </div>
      </Section>

      {/* Paquetes predefinidos populares */}
      <Section variant='dark' size='xl'>
        <PackageComparison
          onSelectPackage={packageId => {
            if (packageId === 'custom') {
              setCurrentStep('calculator')
            } else {
              // Aquí podrías precargar el paquete seleccionado en el calculador
              setCurrentStep('calculator')
            }
          }}
          selectedGuestCount={0}
        />
      </Section>

      {/* Proceso de cotización */}
      <Section variant='default' size='lg'>
        <SectionHeader
          title='¿Cómo funciona nuestro sistema de cotización?'
          description='Un proceso simple y transparente para obtener el presupuesto perfecto para tu evento'
        />

        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {[
            {
              step: 1,
              title: 'Selecciona tu información',
              description: 'Número de invitados, tipo de evento y fecha',
              icon: <Users className='w-8 h-8' />,
            },
            {
              step: 2,
              title: 'Elige tus servicios',
              description: 'Personaliza con los servicios que necesitas',
              icon: <Sparkles className='w-8 h-8' />,
            },
            {
              step: 3,
              title: 'Revisa tu cotización',
              description: 'Ve el desglose completo y el total',
              icon: <Calculator className='w-8 h-8' />,
            },
            {
              step: 4,
              title: 'Descarga o envía',
              description: 'PDF descargable o envío por WhatsApp',
              icon: <MessageCircle className='w-8 h-8' />,
            },
          ].map((item, index) => (
            <div key={index} className='text-center'>
              <div className='relative mb-6'>
                <div className='w-16 h-16 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center mx-auto'>
                  <div className='text-accent-3'>{item.icon}</div>
                </div>
                <div className='absolute -top-2 -right-2 w-8 h-8 bg-accent-3 text-background rounded-full flex items-center justify-center font-raleway font-bold text-sm'>
                  {item.step}
                </div>
              </div>

              <h3 className='font-raleway font-bold text-foreground mb-2'>
                {item.title}
              </h3>
              <p className='font-raleway text-gray-300 text-sm'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Final */}
      <Section variant='gradient' size='lg'>
        <div className='text-center'>
          <h2 className='font-caveat font-bold text-4xl lg:text-5xl text-foreground mb-6'>
            ¿Listo para cotizar tu evento perfecto?
          </h2>
          <p className='font-raleway text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Comienza ahora con nuestro cotizador interactivo o explora nuestros
            paquetes predefinidos. ¡Tu evento soñado está a solo unos clics!
          </p>

          <div className='flex flex-col sm:flex-row gap-6 justify-center'>
            <Button
              size='lg'
              onClick={() => setCurrentStep('calculator')}
              icon={<Calculator className='w-5 h-5' />}
            >
              Iniciar Cotización Personalizada
            </Button>

            <Link href='/servicios'>
              <Button variant='secondary' size='lg'>
                Ver Todos los Servicios
              </Button>
            </Link>

            <Link href='/disponibilidad'>
              <Button variant='ghost' size='lg'>
                Verificar Disponibilidad
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </MainLayout>
  )
}
