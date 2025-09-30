'use client'

import { useState } from 'react'
import {
  Plus,
  Minus,
  Music,
  Sparkles,
  Baby,
  Utensils,
  UserCheck,
  Package,
} from 'lucide-react'
import { Card, CardContent, Button } from '@/components'
import { services } from '@/lib/services'
import type { Service } from '@/types'

interface ServiceSelectorProps {
  selectedServices: { [serviceId: string]: number }
  onServiceUpdate: (serviceId: string, quantity: number) => void
  guestCount: number
  venueType: string
}

export default function ServiceSelector({
  selectedServices,
  onServiceUpdate,
  guestCount,
  venueType,
}: ServiceSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>('entertainment')

  const getServiceIcon = (category: string, serviceId: string) => {
    if (serviceId === 'dj-sonido') return <Music className='w-6 h-6' />
    if (serviceId.includes('inflable') || serviceId.includes('trampolin'))
      return <Baby className='w-6 h-6' />
    if (serviceId.includes('adornos') || serviceId === 'mesa-dulces')
      return <Sparkles className='w-6 h-6' />
    if (serviceId.includes('cerveza')) return <Utensils className='w-6 h-6' />
    if (serviceId === 'meseros') return <UserCheck className='w-6 h-6' />
    return <Package className='w-6 h-6' />
  }

  const getCategoryServices = (category: string) => {
    return services.filter(s => s.category === category && s.isOptional)
  }

  const formatPrice = (price: number, unit?: string) => {
    const formatted = price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    })
    return unit ? `${formatted} / ${unit}` : formatted
  }

  const categories = [
    {
      id: 'entertainment',
      name: 'Entretenimiento',
      icon: <Music className='w-5 h-5' />,
      description: 'DJ, juegos y diversión',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'decoration',
      name: 'Decoración',
      icon: <Sparkles className='w-5 h-5' />,
      description: 'Adornos y ambientación',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'staff',
      name: 'Personal',
      icon: <UserCheck className='w-5 h-5' />,
      description: 'Meseros y servicio',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'equipment',
      name: 'Equipo',
      icon: <Package className='w-5 h-5' />,
      description: 'Vajilla y mobiliario',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'food',
      name: 'Bebidas',
      icon: <Utensils className='w-5 h-5' />,
      description: 'Cerveza y refrescos',
      color: 'from-red-500 to-rose-500',
    },
  ]

  const getServiceRecommendation = (service: Service) => {
    if (service.id === 'dj-sonido' && guestCount > 50) {
      return 'Recomendado para fiestas con más de 50 personas'
    }
    if (service.id === 'meseros' && guestCount > 100) {
      return `Recomendamos ${Math.ceil(guestCount / 40)} meseros para ${guestCount} personas`
    }
    if (service.id === 'vajilla' && guestCount > 0) {
      return `Necesitas ${guestCount} vajillas completas`
    }
    if (service.id.includes('adornos') && venueType === 'ambos-pisos') {
      return 'Perfecto para decorar ambos niveles'
    }
    return null
  }

  const isServicePopular = (serviceId: string) => {
    return ['dj-sonido', 'adornos-con-luz', 'mesa-dulces', 'meseros'].includes(
      serviceId
    )
  }

  return (
    <Card variant='elevated'>
      <CardContent>
        <h2 className='font-caveat font-bold text-2xl lg:text-3xl text-foreground mb-6'>
          Servicios Adicionales
        </h2>

        {/* Categorías */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3 mb-8'>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center group ${
                activeCategory === category.id
                  ? 'bg-accent-3 text-background shadow-accent-glow'
                  : 'bg-gray-900 bg-opacity-30 text-gray-300 hover:bg-accent-3 hover:bg-opacity-20'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto mb-2 flex items-center justify-center rounded-lg bg-gradient-to-r ${category.color} ${
                  activeCategory === category.id ? 'text-white' : 'text-white'
                }`}
              >
                {category.icon}
              </div>
              <h3 className='font-raleway font-semibold text-sm mb-1'>
                {category.name}
              </h3>
              <p className='font-raleway text-xs opacity-80'>
                {category.description}
              </p>
            </button>
          ))}
        </div>

        {/* Servicios de la categoría activa */}
        <div className='space-y-4'>
          {getCategoryServices(activeCategory).map(service => {
            const quantity = selectedServices[service.id] || 0
            const recommendation = getServiceRecommendation(service)
            const isPopular = isServicePopular(service.id)

            return (
              <Card
                key={service.id}
                variant='outlined'
                className={`transition-all duration-300 ${
                  quantity > 0 ? 'border-accent-3 shadow-accent-glow' : ''
                } ${isPopular ? 'ring-1 ring-accent-3 ring-opacity-30' : ''}`}
              >
                <CardContent className='py-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-start space-x-4 flex-1'>
                      {/* Icono y badge popular */}
                      <div className='relative'>
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                            quantity > 0
                              ? 'bg-accent-3 text-background'
                              : 'bg-accent-3 bg-opacity-20 text-accent-3'
                          }`}
                        >
                          {getServiceIcon(service.category, service.id)}
                        </div>
                        {isPopular && (
                          <div className='absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center'>
                            <span className='text-xs'>⭐</span>
                          </div>
                        )}
                      </div>

                      {/* Información del servicio */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-center space-x-2 mb-1'>
                          <h4 className='font-raleway font-semibold text-foreground'>
                            {service.name}
                          </h4>
                          {isPopular && (
                            <span className='bg-yellow-500 text-background px-2 py-1 rounded-full text-xs font-raleway font-bold'>
                              POPULAR
                            </span>
                          )}
                        </div>

                        <p className='text-gray-300 font-raleway text-sm mb-2 leading-relaxed'>
                          {service.description}
                        </p>

                        {/* Precio */}
                        <div className='flex items-center space-x-3 mb-2'>
                          <span className='font-caveat font-bold text-xl text-accent-3'>
                            {formatPrice(service.price, service.unit)}
                          </span>
                          {quantity > 0 && (
                            <span className='text-gray-400 font-raleway text-sm'>
                              Total: $
                              {(service.price * quantity).toLocaleString()}
                            </span>
                          )}
                        </div>

                        {/* Recomendación */}
                        {recommendation && (
                          <div className='flex items-center space-x-2 text-accent-3'>
                            <div className='w-2 h-2 bg-accent-3 rounded-full'></div>
                            <p className='font-raleway text-xs'>
                              {recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Controles de cantidad */}
                    <div className='flex items-center space-x-3 ml-4'>
                      {quantity > 0 ? (
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() =>
                              onServiceUpdate(service.id, quantity - 1)
                            }
                            className='w-8 h-8 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200'
                            aria-label='Disminuir cantidad'
                          >
                            <Minus className='w-4 h-4 text-white' />
                          </button>

                          <div className='w-12 text-center'>
                            <span className='font-raleway font-bold text-foreground text-lg'>
                              {quantity}
                            </span>
                            {service.unit && (
                              <p className='font-raleway text-gray-400 text-xs'>
                                {service.unit}
                                {quantity > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() =>
                              onServiceUpdate(service.id, quantity + 1)
                            }
                            className='w-8 h-8 bg-accent-3 hover:bg-accent-2 rounded-full flex items-center justify-center transition-colors duration-200'
                            aria-label='Aumentar cantidad'
                          >
                            <Plus className='w-4 h-4 text-background' />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size='sm'
                          onClick={() => onServiceUpdate(service.id, 1)}
                          icon={<Plus className='w-4 h-4' />}
                        >
                          Agregar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Resumen de servicios seleccionados */}
        {Object.entries(selectedServices).filter(([, quantity]) => quantity > 0)
          .length > 0 && (
          <div className='mt-8'>
            <Card
              variant='elevated'
              className='border-accent-3 border-opacity-30'
            >
              <CardContent>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-10 h-10 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center'>
                      <Package className='w-5 h-5 text-accent-3' />
                    </div>
                    <div>
                      <h4 className='font-caveat font-bold text-xl text-foreground'>
                        Servicios Adicionales Seleccionados
                      </h4>
                      <p className='font-raleway text-gray-400 text-sm'>
                        {
                          Object.entries(selectedServices).filter(
                            ([, quantity]) => quantity > 0
                          ).length
                        }{' '}
                        {Object.entries(selectedServices).filter(
                          ([, quantity]) => quantity > 0
                        ).length === 1
                          ? 'servicio'
                          : 'servicios'}{' '}
                        agregados
                      </p>
                    </div>
                  </div>

                  <div className='text-right'>
                    <p className='font-raleway text-gray-400 text-sm'>
                      Total servicios adicionales
                    </p>
                    <p className='font-caveat font-bold text-2xl text-accent-3'>
                      $
                      {Object.entries(selectedServices)
                        .reduce((total, [serviceId, quantity]) => {
                          const service = services.find(s => s.id === serviceId)
                          return (
                            total + (service ? service.price * quantity : 0)
                          )
                        }, 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  {Object.entries(selectedServices).map(
                    ([serviceId, quantity]) => {
                      const service = services.find(s => s.id === serviceId)
                      if (!service || quantity === 0) return null

                      return (
                        <div
                          key={serviceId}
                          className='flex items-center justify-between p-4 bg-gray-900 bg-opacity-30 rounded-lg border border-gray-700 hover:border-accent-3 transition-all duration-300'
                        >
                          <div className='flex items-center space-x-4 flex-1'>
                            <div className='w-8 h-8 bg-accent-3 bg-opacity-20 rounded-lg flex items-center justify-center'>
                              {getServiceIcon(service.category, service.id)}
                            </div>

                            <div className='flex-1'>
                              <div className='flex items-center space-x-2 mb-1'>
                                <h5 className='font-raleway font-semibold text-foreground'>
                                  {service.name}
                                </h5>
                                {isServicePopular(service.id) && (
                                  <span className='bg-yellow-500 text-background px-2 py-0.5 rounded-full text-xs font-raleway font-bold'>
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <p className='font-raleway text-gray-400 text-sm'>
                                {service.description}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center space-x-4'>
                            {/* Controles de cantidad */}
                            <div className='flex items-center space-x-2'>
                              <button
                                onClick={() =>
                                  onServiceUpdate(serviceId, quantity - 1)
                                }
                                className='w-8 h-8 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200'
                                aria-label='Disminuir cantidad'
                              >
                                <Minus className='w-4 h-4 text-white' />
                              </button>

                              <div className='w-12 text-center'>
                                <span className='font-raleway font-bold text-foreground text-lg'>
                                  {quantity}
                                </span>
                                {service.unit && (
                                  <p className='font-raleway text-gray-400 text-xs'>
                                    {service.unit}
                                    {quantity > 1 ? 's' : ''}
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() =>
                                  onServiceUpdate(serviceId, quantity + 1)
                                }
                                className='w-8 h-8 bg-accent-3 hover:bg-accent-2 rounded-full flex items-center justify-center transition-colors duration-200'
                                aria-label='Aumentar cantidad'
                              >
                                <Plus className='w-4 h-4 text-background' />
                              </button>
                            </div>

                            {/* Precio total del servicio */}
                            <div className='text-right min-w-[100px]'>
                              <p className='font-raleway text-gray-400 text-xs'>
                                Subtotal
                              </p>
                              <p className='font-raleway font-bold text-accent-3 text-lg'>
                                ${(service.price * quantity).toLocaleString()}
                              </p>
                            </div>

                            {/* Botón para quitar completamente */}
                            <button
                              onClick={() => onServiceUpdate(serviceId, 0)}
                              className='w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200 ml-2'
                              aria-label='Quitar servicio'
                              title='Quitar servicio'
                            >
                              <span className='text-white text-lg font-bold'>
                                ×
                              </span>
                            </button>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
