'use client'

import { useState } from 'react'
import {
  ChevronUp,
  ChevronDown,
  Calculator,
  MessageCircle,
  Users,
  Calendar,
} from 'lucide-react'
import { Card, CardContent, Button } from '@/components'
import PDFGenerator from './PDFGenerator'
import { businessInfo } from '@/lib/brand'
import type { Quote } from '@/types'

interface QuoteSummaryProps {
  quote: Quote | null
  eventType: string
  clientName?: string
  isVisible?: boolean
}

export default function QuoteSummary({
  quote,
  eventType,
  clientName = 'Cliente',
  isVisible = true,
}: QuoteSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!quote || !isVisible) {
    return null
  }

  const sendWhatsAppMessage = () => {
    const message = `¡Hola! He usado su cotizador y me interesa el siguiente paquete:

*Información del evento:*
- Tipo: ${eventType}
- Invitados: ${quote.guestCount} personas
- Fecha: ${quote.eventDate || 'Por definir'}

*Resumen de la cotización:*
${quote.items.map(item => `• ${item.serviceName} (${item.quantity}) - $${item.total.toLocaleString()}`).join('\n')}

*Total: $${quote.total.toLocaleString()}*
*Anticipo: $${quote.advancePayment.toLocaleString()}*

${quote.notes ? `Notas adicionales: ${quote.notes}` : ''}

¿Podrían confirmar disponibilidad y brindarme más información?`

    const phoneNumber = businessInfo.contact.whatsapp.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className='fixed bottom-4 right-4 z-40 max-w-sm w-full'>
      <Card
        variant='elevated'
        className='shadow-2xl border-accent-3 border-opacity-50'
      >
        <CardContent className='p-4'>
          {/* Header colapsible */}
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-accent-3 bg-opacity-20 rounded-full flex items-center justify-center'>
                <Calculator className='w-5 h-5 text-accent-3' />
              </div>
              <div>
                <h4 className='font-raleway font-bold text-foreground text-sm'>
                  Tu Cotización
                </h4>
                <p className='font-caveat font-bold text-accent-3 text-lg'>
                  ${quote.total.toLocaleString()}
                </p>
              </div>
            </div>

            <button className='text-gray-400 hover:text-accent-3 transition-colors duration-200'>
              {isExpanded ? (
                <ChevronDown className='w-5 h-5' />
              ) : (
                <ChevronUp className='w-5 h-5' />
              )}
            </button>
          </div>

          {/* Contenido expandido */}
          {isExpanded && (
            <div className='mt-4 space-y-4 animate-slide-down'>
              {/* Información básica */}
              <div className='grid grid-cols-2 gap-3 text-xs'>
                <div className='flex items-center space-x-2'>
                  <Users className='w-4 h-4 text-accent-3' />
                  <span className='text-gray-300'>
                    {quote.guestCount} personas
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Calendar className='w-4 h-4 text-accent-3' />
                  <span className='text-gray-300'>
                    {quote.eventDate || 'Sin fecha'}
                  </span>
                </div>
              </div>

              {/* Resumen de servicios */}
              <div>
                <h5 className='font-raleway font-semibold text-foreground text-sm mb-2'>
                  Servicios ({quote.items.length})
                </h5>
                <div className='space-y-1 max-h-32 overflow-y-auto'>
                  {quote.items.slice(0, 4).map((item, index) => (
                    <div key={index} className='flex justify-between text-xs'>
                      <span className='text-gray-300 truncate mr-2'>
                        {item.serviceName} ({item.quantity})
                      </span>
                      <span className='text-accent-3 font-semibold'>
                        ${item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {quote.items.length > 4 && (
                    <p className='text-gray-400 text-xs italic'>
                      + {quote.items.length - 4} servicios más
                    </p>
                  )}
                </div>
              </div>

              {/* Totales */}
              <div className='border-t border-gray-700 pt-3'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='font-raleway font-semibold text-foreground text-sm'>
                    Total:
                  </span>
                  <span className='font-caveat font-bold text-accent-3 text-xl'>
                    ${quote.total.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='font-raleway text-gray-300 text-xs'>
                    Anticipo (50%):
                  </span>
                  <span className='font-raleway font-semibold text-accent-3 text-sm'>
                    ${quote.advancePayment.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Botones de acción */}
              <div className='grid grid-cols-2 gap-2'>
                <Button
                  size='sm'
                  onClick={sendWhatsAppMessage}
                  icon={<MessageCircle className='w-4 h-4' />}
                  className='text-xs py-2'
                >
                  WhatsApp
                </Button>

                <PDFGenerator
                  quote={quote}
                  eventType={eventType}
                  clientName={clientName}
                />
              </div>

              {/* Nota sobre validez */}
              <p className='text-gray-400 text-xs text-center italic'>
                Precios válidos por 30 días
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
