'use client'

import { useState } from 'react'
import { Check, X, Star, Users, Calculator, ArrowRight } from 'lucide-react'
import { Card, CardContent, Button } from '@/components'
import { popularPackages } from '@/lib/services'
import { businessInfo } from '@/lib/brand'

interface PackageComparisonProps {
  onSelectPackage?: (packageId: string) => void
  selectedGuestCount?: number
}

export default function PackageComparison({
  onSelectPackage,
  selectedGuestCount = 0,
}: PackageComparisonProps) {
  const [highlightedPackage, setHighlightedPackage] = useState<string | null>(
    null
  )

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    })
  }

  const getPackageRecommendation = (pkg: (typeof popularPackages)[0]) => {
    if (selectedGuestCount === 0) return null

    if (selectedGuestCount <= pkg.maxGuests) {
      if (selectedGuestCount <= pkg.maxGuests * 0.7) {
        return 'Ideal para tu evento'
      }
      return 'Perfecto para tu número de invitados'
    }
    return 'Capacidad insuficiente'
  }

  const allFeatures = [
    { id: 'salon', name: 'Renta del salón', icon: '🏢' },
    { id: 'mesas-vestidas', name: 'Mesas vestidas', icon: '🍽️' },
    { id: 'mesas-sencillas', name: 'Mesas sencillas', icon: '🪑' },
    { id: 'dj-sonido', name: 'DJ con sonido y luces', icon: '🎵' },
    { id: 'adornos-sencillos', name: 'Decoración sencilla', icon: '🎈' },
    { id: 'adornos-con-luz', name: 'Decoración con luces', icon: '✨' },
    { id: 'mesa-dulces', name: 'Mesa de dulces', icon: '🍭' },
    { id: 'trampolin', name: 'Trampolín', icon: '🤸' },
    { id: 'meseros', name: 'Personal de servicio', icon: '👨‍💼' },
    { id: 'vajilla', name: 'Vajilla completa', icon: '🥄' },
    { id: 'estacionamiento', name: 'Estacionamiento gratuito', icon: '🚗' },
    { id: 'horario', name: 'Hasta las 2:00 AM', icon: '🕐' },
  ]

  const getFeatureStatus = (
    pkg: (typeof popularPackages)[0],
    featureId: string
  ) => {
    if (pkg.includedServices.includes(featureId)) return 'included'
    if (['estacionamiento', 'horario'].includes(featureId)) return 'included' // Siempre incluidos
    if (
      featureId === 'mesas-sencillas' &&
      pkg.includedServices.includes('mesas-vestidas')
    )
      return 'upgrade'
    if (
      featureId === 'adornos-sencillos' &&
      pkg.includedServices.includes('adornos-con-luz')
    )
      return 'upgrade'
    return 'not-included'
  }

  const handleWhatsAppInquiry = (pkg: (typeof popularPackages)[0]) => {
    const message = `¡Hola! Me interesa el ${pkg.name} para mi evento.

Detalles:
- Paquete: ${pkg.name}
- Capacidad: hasta ${pkg.maxGuests} personas
- Precio base: ${formatPrice(pkg.basePrice)}
${selectedGuestCount > 0 ? `- Mis invitados: ${selectedGuestCount} personas` : ''}

¿Podrían darme más información y confirmar disponibilidad?`

    const phoneNumber = businessInfo.contact.whatsapp.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className='space-y-12'>
      <div className='text-center'>
        <h2 className='font-caveat font-bold text-3xl lg:text-4xl text-foreground mb-4'>
          Compara Nuestros Paquetes
        </h2>
        <p className='font-raleway text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed'>
          Encuentra el paquete que mejor se adapte a tu evento y presupuesto.
          Todos incluyen lo esencial para una celebración exitosa.
        </p>
        {selectedGuestCount > 0 && (
          <div className='mt-4 inline-flex items-center space-x-2 bg-accent-3 bg-opacity-20 rounded-full px-4 py-2'>
            <Users className='w-4 h-4 text-accent-3' />
            <span className='font-raleway font-semibold text-accent-3'>
              Para {selectedGuestCount} invitados
            </span>
          </div>
        )}
      </div>

      {/* Tabla de comparación */}
      <div className='overflow-x-auto p-5'>
        <div className='min-w-[1000px]'>
          {/* Headers de paquetes */}
          <div className='flex gap-4 lg:gap-6 mb-8'>
            <div className='flex-shrink-0 w-48 p-2 lg:p-4'>
              <h3 className='font-raleway font-bold text-foreground text-base lg:text-lg'>
                Características
              </h3>
              <p className='font-raleway text-gray-400 text-xs lg:text-sm'>
                Comparación detallada
              </p>
            </div>

            {popularPackages.map(pkg => {
              const recommendation = getPackageRecommendation(pkg)
              const isRecommended =
                recommendation && !recommendation.includes('insuficiente')

              return (
                <Card
                  key={pkg.id}
                  className={`relative flex-1 min-w-0 transition-all duration-300 ${
                    pkg.popular
                      ? 'ring-2 ring-accent-3 ring-opacity-50 scale-105'
                      : ''
                  } ${
                    highlightedPackage === pkg.id ? 'shadow-accent-glow' : ''
                  } ${
                    isRecommended ? 'border-green-500 border-opacity-50' : ''
                  }`}
                  onMouseEnter={() => setHighlightedPackage(pkg.id)}
                  onMouseLeave={() => setHighlightedPackage(null)}
                >
                  {/* Badge de más popular */}
                  {pkg.popular && (
                    <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-10'>
                      <div className='bg-accent-3 text-background px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg'>
                        <Star className='w-3 h-3 fill-current' />
                        <span className='font-raleway font-bold text-xs'>
                          MÁS POPULAR
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Badge de recomendación */}
                  {isRecommended && (
                    <div className='absolute -top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-raleway font-bold'>
                      ✓ Recomendado
                    </div>
                  )}

                  <CardContent className='text-center pt-4 lg:pt-6 px-2 lg:px-4'>
                    <h3 className='font-caveat font-bold text-lg lg:text-xl text-foreground mb-1 lg:mb-2'>
                      {pkg.name}
                    </h3>

                    <div className='font-caveat font-bold text-2xl lg:text-3xl text-accent-3 mb-1 lg:mb-2'>
                      {formatPrice(pkg.basePrice)}
                    </div>

                    <div className='flex items-center justify-center space-x-1 lg:space-x-2 text-gray-300 mb-2 lg:mb-4'>
                      <Users className='w-3 h-3 lg:w-4 lg:h-4' />
                      <span className='font-raleway text-xs lg:text-sm'>
                        Hasta {pkg.maxGuests}
                      </span>
                    </div>

                    {recommendation && (
                      <div
                        className={`text-xs font-raleway font-semibold mb-2 lg:mb-4 px-1 lg:px-2 py-1 rounded-full ${
                          recommendation.includes('insuficiente')
                            ? 'bg-red-500 bg-opacity-20 text-red-400'
                            : 'bg-green-500 bg-opacity-20 text-green-400'
                        }`}
                      >
                        {recommendation}
                      </div>
                    )}

                    <div className='space-y-1 lg:space-y-2'>
                      <Button
                        size='sm'
                        variant={pkg.popular ? 'primary' : 'secondary'}
                        className='w-full text-xs lg:text-sm py-1 lg:py-2'
                        onClick={() => onSelectPackage?.(pkg.id)}
                        icon={<Calculator className='w-3 h-3 lg:w-4 lg:h-4' />}
                      >
                        Personalizar
                      </Button>

                      <Button
                        variant='ghost'
                        size='sm'
                        className='w-full text-xs lg:text-sm py-1 lg:py-2'
                        onClick={() => handleWhatsAppInquiry(pkg)}
                      >
                        Consultar
                        <ArrowRight className='w-3 h-3 lg:w-4 lg:h-4 ml-1' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Filas de características */}
          <div className='space-y-1 lg:space-y-2'>
            {allFeatures.map(feature => (
              <div
                key={feature.id}
                className='flex gap-4 lg:gap-6 py-2 lg:py-3 px-2 lg:px-4 rounded-lg hover:bg-gray-900 hover:bg-opacity-30 transition-colors duration-200'
              >
                <div className='flex-shrink-0 w-48 flex items-center space-x-2 lg:space-x-3'>
                  <span className='text-lg lg:text-xl'>{feature.icon}</span>
                  <span className='font-raleway text-foreground text-xs lg:text-sm'>
                    {feature.name}
                  </span>
                </div>

                {popularPackages.map(pkg => {
                  const status = getFeatureStatus(pkg, feature.id)

                  return (
                    <div
                      key={`${pkg.id}-${feature.id}`}
                      className='flex-1 flex justify-center'
                    >
                      {status === 'included' && (
                        <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                          <Check className='w-4 h-4 text-white' />
                        </div>
                      )}
                      {status === 'upgrade' && (
                        <div className='w-6 h-6 bg-accent-3 rounded-full flex items-center justify-center'>
                          <Star className='w-4 h-4 text-background fill-current' />
                        </div>
                      )}
                      {status === 'not-included' && (
                        <div className='w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center'>
                          <X className='w-4 h-4 text-gray-400' />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Leyenda */}
          <div className='mt-8 flex justify-center space-x-8 text-sm'>
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
                <Check className='w-3 h-3 text-white' />
              </div>
              <span className='font-raleway text-gray-300'>Incluido</span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 bg-accent-3 rounded-full flex items-center justify-center'>
                <Star className='w-3 h-3 text-background fill-current' />
              </div>
              <span className='font-raleway text-gray-300'>
                Versión premium
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center'>
                <X className='w-3 h-3 text-gray-400' />
              </div>
              <span className='font-raleway text-gray-300'>No incluido</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nota sobre personalización */}
      <div className='text-center'>
        <div className='bg-gradient-to-r from-accent-3 to-accent-2 rounded-xl p-6'>
          <h3 className='font-caveat font-bold text-2xl text-background mb-3'>
            ¿Necesitas algo diferente?
          </h3>
          <p className='text-background text-opacity-90 font-raleway mb-4'>
            Todos los paquetes son personalizables. Puedes agregar, quitar o
            modificar servicios según tus necesidades.
          </p>
          <Button
            variant='inverse'
            size='lg'
            className='bg-background text-accent-3 hover:bg-gray-100'
            onClick={() => onSelectPackage?.('custom')}
            icon={<Calculator className='w-5 h-5' />}
          >
            Crear Paquete Personalizado
          </Button>
        </div>
      </div>
    </div>
  )
}
