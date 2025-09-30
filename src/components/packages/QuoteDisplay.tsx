'use client'

import { Card, CardContent } from '@/components'
import PDFGenerator from './PDFGenerator'
import type { Quote } from '@/types'

interface QuoteDisplayProps {
  quote: Quote | null
  eventType: string
  clientName: string
  guestCount: number
  eventDate: string
  notes: string
  onNotesChange: (notes: string) => void
}

export default function QuoteDisplay({
  quote,
  eventType,
  clientName,
  guestCount,
  eventDate,
  notes,
  onNotesChange,
}: QuoteDisplayProps) {
  if (!quote) {
    return null
  }

  return (
    <Card variant='elevated'>
      <CardContent>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='font-caveat font-bold text-2xl lg:text-3xl text-foreground'>
            Tu Cotización
          </h3>
          <PDFGenerator
            quote={quote}
            eventType={eventType}
            clientName={clientName || 'Cliente'}
          />
        </div>

        {/* Información del evento */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-900 bg-opacity-30 rounded-lg'>
          <div>
            <p className='text-gray-400 font-raleway text-sm'>Tipo de evento</p>
            <p className='text-foreground font-raleway font-semibold'>
              {eventType}
            </p>
          </div>
          <div>
            <p className='text-gray-400 font-raleway text-sm'>
              Número de invitados
            </p>
            <p className='text-foreground font-raleway font-semibold'>
              {guestCount} personas
            </p>
          </div>
          <div>
            <p className='text-gray-400 font-raleway text-sm'>
              Fecha del evento
            </p>
            <p className='text-foreground font-raleway font-semibold'>
              {eventDate || 'Por definir'}
            </p>
          </div>
        </div>

        {/* Tabla de cotización */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='text-left py-3 px-2 font-raleway font-semibold text-gray-300 text-sm'>
                  Concepto
                </th>
                <th className='text-center py-3 px-2 font-raleway font-semibold text-gray-300 text-sm'>
                  Cantidad
                </th>
                <th className='text-right py-3 px-2 font-raleway font-semibold text-gray-300 text-sm'>
                  Precio Unitario
                </th>
                <th className='text-right py-3 px-2 font-raleway font-semibold text-gray-300 text-sm'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, index) => (
                <tr key={index} className='border-b border-gray-800'>
                  <td className='py-3 px-2'>
                    <div>
                      <p className='font-raleway font-medium text-foreground text-sm'>
                        {item.serviceName}
                      </p>
                      {item.description && (
                        <p className='font-raleway text-gray-400 text-xs mt-1'>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className='text-center py-3 px-2 font-raleway text-foreground text-sm'>
                    {item.quantity}
                  </td>
                  <td className='text-right py-3 px-2 font-raleway text-foreground text-sm'>
                    ${item.unitPrice.toLocaleString()}
                  </td>
                  <td className='text-right py-3 px-2 font-raleway font-semibold text-foreground text-sm'>
                    ${item.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className='border-t-2 border-accent-3'>
                <td
                  colSpan={3}
                  className='py-4 px-2 font-raleway font-bold text-foreground text-lg'
                >
                  Total del Paquete
                </td>
                <td className='text-right py-4 px-2 font-caveat font-bold text-accent-3 text-2xl'>
                  ${quote.total.toLocaleString()}
                </td>
              </tr>
              <tr className='border-t border-gray-700'>
                <td
                  colSpan={3}
                  className='py-2 px-2 font-raleway font-semibold text-gray-300'
                >
                  Anticipo para reservar (50%)
                </td>
                <td className='text-right py-2 px-2 font-raleway font-bold text-accent-3 text-lg'>
                  ${quote.advancePayment.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Notas adicionales */}
        <div className='mt-6'>
          <label
            htmlFor='quote-notes'
            className='block text-sm font-raleway font-medium text-gray-300 mb-2'
          >
            Notas adicionales
          </label>
          <textarea
            id='quote-notes'
            value={notes}
            onChange={e => onNotesChange(e.target.value)}
            rows={3}
            className='input-custom w-full resize-none'
            placeholder='Servicios especiales, colores específicos, observaciones...'
          />
        </div>
      </CardContent>
    </Card>
  )
}
