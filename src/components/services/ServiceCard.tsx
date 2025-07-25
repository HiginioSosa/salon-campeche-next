import { ReactNode } from 'react'
import { Card, CardContent, Button } from '@/components'
import { Check, Info } from 'lucide-react'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service & {
    icon?: ReactNode
    features?: string[]
    popular?: boolean
  }
  onSelect?: (serviceId: string) => void
  selected?: boolean
  className?: string
}

export default function ServiceCard({
  service,
  onSelect,
  selected = false,
  className = '',
}: ServiceCardProps) {
  const formatPrice = (price: number, unit?: string) => {
    const formattedPrice = price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    })

    return unit ? `${formattedPrice} / ${unit}` : formattedPrice
  }

  return (
    <Card
      className={`relative group transition-all duration-300 ${
        selected ? 'border-accent-3 shadow-accent-glow' : ''
      } ${service.popular ? 'ring-2 ring-accent-3 ring-opacity-50' : ''} ${className}`}
      hover
    >
      {/* Badge de popular */}
      {service.popular && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-10'>
          <div className='bg-accent-3 text-background px-4 py-1 rounded-full text-xs font-raleway font-bold'>
            MÁS POPULAR
          </div>
        </div>
      )}

      <CardContent className='h-full flex flex-col'>
        {/* Encabezado con icono y título */}
        <div className='flex items-start space-x-4 mb-4'>
          {service.icon && (
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                service.popular
                  ? 'bg-accent-3 text-background'
                  : 'bg-accent-3 bg-opacity-20 text-accent-3 group-hover:bg-accent-3 group-hover:text-background'
              }`}
            >
              {service.icon}
            </div>
          )}

          <div className='flex-1 min-w-0'>
            <h3 className='font-caveat font-bold text-xl lg:text-2xl text-foreground mb-1 group-hover:text-accent-3 transition-colors duration-300'>
              {service.name}
            </h3>
            <p className='text-gray-300 font-raleway text-sm leading-relaxed'>
              {service.description}
            </p>
          </div>
        </div>

        {/* Precio destacado */}
        <div className='mb-4'>
          <div className='flex items-baseline space-x-2'>
            <span
              className={`font-caveat font-bold text-2xl lg:text-3xl ${
                service.popular ? 'text-accent-3' : 'text-foreground'
              }`}
            >
              {formatPrice(service.price, service.unit)}
            </span>
            {service.unit && (
              <span className='text-gray-400 font-raleway text-sm'>
                por {service.unit}
              </span>
            )}
          </div>

          {!service.isOptional && (
            <div className='flex items-center space-x-1 mt-1'>
              <Info className='w-3 h-3 text-accent-3' />
              <span className='text-accent-3 font-raleway text-xs'>
                Servicio requerido
              </span>
            </div>
          )}
        </div>

        {/* Características del servicio */}
        {service.features && service.features.length > 0 && (
          <div className='flex-1 mb-6'>
            <h4 className='font-raleway font-semibold text-foreground text-sm mb-3'>
              Incluye:
            </h4>
            <ul className='space-y-2'>
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className='flex items-center space-x-2 text-gray-300 font-raleway text-sm'
                >
                  <Check className='w-4 h-4 text-accent-3 flex-shrink-0' />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Información adicional */}
        {(service.maxQuantity || service.dependencies) && (
          <div className='mb-4 p-3 bg-gray-900 bg-opacity-30 rounded-lg'>
            {service.maxQuantity && (
              <p className='text-gray-400 font-raleway text-xs mb-1'>
                Máximo: {service.maxQuantity} {service.unit || 'unidades'}
              </p>
            )}
            {service.dependencies && service.dependencies.length > 0 && (
              <p className='text-gray-400 font-raleway text-xs'>
                Requiere: {service.dependencies.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Botón de acción */}
        {onSelect && (
          <Button
            variant={selected ? 'primary' : 'ghost'}
            className='w-full mt-auto'
            onClick={() => onSelect(service.id)}
          >
            {selected ? 'Seleccionado ✓' : 'Agregar al Paquete'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

// Componente para mostrar categorías de servicios
export function ServiceCategory({
  title,
  description,
  children,
  icon,
}: {
  title: string
  description: string
  children: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className='mb-16'>
      <div className='text-center mb-12'>
        {icon && (
          <div className='w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4'>
            <div className='text-accent-3 text-2xl'>{icon}</div>
          </div>
        )}
        <h2 className='font-caveat font-bold text-3xl lg:text-4xl text-foreground mb-4'>
          {title}
        </h2>
        <p className='font-raleway text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed'>
          {description}
        </p>
        <div className='divider'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {children}
      </div>
    </div>
  )
}
