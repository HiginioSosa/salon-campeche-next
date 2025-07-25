'use client'

import { useState, useEffect } from 'react'
import { Lightbulb, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components'

const tips = [
  {
    id: 1,
    title: 'Anticipo del 50%',
    content:
      'Solo necesitas pagar el 50% para reservar tu fecha. El resto se paga hasta un día antes del evento.',
    category: 'financiero',
  },
  {
    id: 2,
    title: 'Capacidad ideal',
    content:
      'Para mayor comodidad, considera 80% de la capacidad máxima. Esto permite mejor circulación y ambiente.',
    category: 'planificacion',
  },
  {
    id: 3,
    title: 'Horario flexible',
    content:
      'Puedes acceder al salón desde la hora que necesites, incluso días antes para decorar o ensayar.',
    category: 'logistica',
  },
  {
    id: 4,
    title: 'DJ vs Música',
    content:
      'Para más de 50 invitados, un DJ profesional mantiene mejor el ambiente que solo música pregrabada.',
    category: 'entretenimiento',
  },
  {
    id: 5,
    title: 'Mesas vestidas',
    content:
      'Las mesas vestidas dan un toque más elegante y solo cuestan $70 más por mesa que las sencillas.',
    category: 'decoracion',
  },
  {
    id: 6,
    title: 'Personal de servicio',
    content:
      'Recomendamos 1 mesero por cada 40-50 invitados para un servicio óptimo durante el evento.',
    category: 'servicio',
  },
  {
    id: 7,
    title: 'Estacionamiento',
    content:
      'El estacionamiento en la calle es gratuito y hay buen espacio para todos los invitados.',
    category: 'logistica',
  },
  {
    id: 8,
    title: 'Temporada alta',
    content:
      'Diciembre y mayo-julio son temporada alta. Reserva con más anticipación en estos meses.',
    category: 'planificacion',
  },
]

interface TipsPanelProps {
  isVisible?: boolean
  onClose?: () => void
}

export default function TipsPanel({
  isVisible = true,
  onClose,
}: TipsPanelProps) {
  const [currentTip, setCurrentTip] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    if (!isVisible || isMinimized) return

    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length)
    }, 8000) // Cambiar tip cada 8 segundos

    return () => clearInterval(interval)
  }, [isVisible, isMinimized])

  const nextTip = () => {
    setCurrentTip(prev => (prev + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTip(prev => (prev - 1 + tips.length) % tips.length)
  }

  if (!isVisible) return null

  const tip = tips[currentTip]

  return (
    <div className='fixed bottom-4 left-4 z-30 max-w-sm'>
      <Card variant='glass' className='border-accent-3 border-opacity-30'>
        <CardContent className='p-4'>
          {!isMinimized ? (
            <>
              {/* Header */}
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center space-x-2'>
                  <div className='w-8 h-8 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center'>
                    <Lightbulb className='w-4 h-4 text-accent-3' />
                  </div>
                  <div>
                    <h4 className='font-raleway font-semibold text-foreground text-sm'>
                      Tip #{tip.id}
                    </h4>
                    <p className='font-raleway text-accent-3 text-xs capitalize'>
                      {tip.category}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-1'>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className='text-gray-400 hover:text-accent-3 transition-colors duration-200'
                    aria-label='Minimizar tips'
                  >
                    <span className='text-xs'>−</span>
                  </button>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className='text-gray-400 hover:text-accent-3 transition-colors duration-200'
                      aria-label='Cerrar tips'
                    >
                      <X className='w-4 h-4' />
                    </button>
                  )}
                </div>
              </div>

              {/* Contenido del tip */}
              <div className='mb-4'>
                <h5 className='font-raleway font-semibold text-foreground text-sm mb-2'>
                  {tip.title}
                </h5>
                <p className='font-raleway text-gray-300 text-xs leading-relaxed'>
                  {tip.content}
                </p>
              </div>

              {/* Controles de navegación */}
              <div className='flex items-center justify-between'>
                <div className='flex space-x-1'>
                  <button
                    onClick={prevTip}
                    className='w-6 h-6 bg-gray-700 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors duration-200'
                    aria-label='Tip anterior'
                  >
                    <ChevronLeft className='w-3 h-3 text-white' />
                  </button>
                  <button
                    onClick={nextTip}
                    className='w-6 h-6 bg-gray-700 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors duration-200'
                    aria-label='Siguiente tip'
                  >
                    <ChevronRight className='w-3 h-3 text-white' />
                  </button>
                </div>

                {/* Indicador de progreso */}
                <div className='flex space-x-1'>
                  {tips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTip(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentTip ? 'bg-accent-3' : 'bg-gray-600'
                      }`}
                      aria-label={`Ir al tip ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Vista minimizada */
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <div className='w-6 h-6 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center'>
                  <Lightbulb className='w-3 h-3 text-accent-3' />
                </div>
                <span className='font-raleway text-foreground text-sm'>
                  Tips
                </span>
              </div>

              <button
                onClick={() => setIsMinimized(false)}
                className='text-gray-400 hover:text-accent-3 transition-colors duration-200 text-xs'
                aria-label='Expandir tips'
              >
                +
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
