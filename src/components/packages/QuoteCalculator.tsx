'use client'

import { useState, useEffect, useCallback, useId } from 'react'
import { Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components'
import { services, calculateTablesNeeded } from '@/lib/services'
import {
  validateQuoteForm,
  generateSmartRecommendations,
} from '@/lib/validators'
import type { Quote, QuoteItem } from '@/types'

interface QuoteCalculatorState {
  guestCount: number
  eventDate: string
  eventType: string
  selectedServices: { [serviceId: string]: number } // serviceId -> quantity
  venueType: 'primer-piso' | 'ambos-pisos' | ''
  tableType: 'sencillas' | 'vestidas' | ''
  notes: string
  clientName: string
}

interface QuoteCalculatorProps {
  onDataChange?: (data: {
    selectedServices: { [serviceId: string]: number }
    guestCount: number
    venueType: string
    currentQuote: Quote | null
    eventType: string
    clientName: string
  }) => void
  /** Estado externo de servicios seleccionados (ServiceSelector) */
  selectedServicesExternal?: { [serviceId: string]: number }
}

const eventTypes = [
  'Boda',
  'XV Años',
  'Cumpleaños',
  'Baby Shower',
  'Aniversario',
  'Graduación',
  'Corporativo',
  'Otro',
]

export default function QuoteCalculator({
  onDataChange,
  selectedServicesExternal,
}: QuoteCalculatorProps) {
  const quoteId = useId()

  const [state, setState] = useState<QuoteCalculatorState>({
    guestCount: 0,
    eventDate: '',
    eventType: '',
    selectedServices: {},
    venueType: '',
    tableType: '',
    notes: '',
    clientName: '',
  })

  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])
  // Control interno para habilitar el cálculo (cuando el usuario terminó datos básicos)
  const [basicInfoCompleted, setBasicInfoCompleted] = useState(false)

  // Usar servicios externos si están disponibles, sino usar estado interno
  const effectiveSelectedServices = selectedServicesExternal || state.selectedServices

  // Solo sincronizar servicios externos si realmente han cambiado
  useEffect(() => {
    if (selectedServicesExternal) {
      const currentKeys = Object.keys(state.selectedServices).sort()
      const externalKeys = Object.keys(selectedServicesExternal).sort()
      const keysChanged = currentKeys.join(',') !== externalKeys.join(',')
      const valuesChanged = Object.entries(selectedServicesExternal).some(
        ([key, value]) => state.selectedServices[key] !== value
      )
      
      if (keysChanged || valuesChanged) {
        setState(prev => ({
          ...prev,
          selectedServices: selectedServicesExternal,
        }))
      }
    }
  }, [selectedServicesExternal, state.selectedServices])

  // Notificar cambios al componente padre
  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        selectedServices: effectiveSelectedServices,
        guestCount: state.guestCount,
        venueType: state.venueType,
        currentQuote,
        eventType: state.eventType,
        clientName: state.clientName,
      })
    }
  }, [effectiveSelectedServices, state.guestCount, state.venueType, currentQuote, state.eventType, state.clientName, onDataChange])

  const updateState = (updates: Partial<QuoteCalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }))
  }

  const validateInputs = useCallback((): string[] => {
    const validation = validateQuoteForm({
      guestCount: state.guestCount,
      eventDate: state.eventDate,
      eventType: state.eventType,
      venueType: state.venueType,
      tableType: state.tableType,
      notes: state.notes,
      clientName: state.clientName,
    })

    return validation.errors.map(error => error.message)
  }, [state])

  const generateRecommendations = useCallback(() => {
    const smartRecs = generateSmartRecommendations(
      {
        guestCount: state.guestCount,
        eventDate: state.eventDate,
        eventType: state.eventType,
        venueType: state.venueType,
        tableType: state.tableType,
        notes: state.notes,
        clientName: state.clientName,
      },
      effectiveSelectedServices
    )

    setRecommendations(smartRecs)
  }, [state, effectiveSelectedServices])

  const calculateQuote = useCallback(() => {
    const validationErrors = validateInputs()
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      setCurrentQuote(null)
      return
    }

    const quoteItems: QuoteItem[] = []
    let subtotal = 0

    // Agregar servicio de salón
    if (state.venueType) {
      const venueService = services.find(
        s =>
          s.id ===
          (state.venueType === 'primer-piso'
            ? 'salon-primer-piso'
            : 'salon-ambos-pisos')
      )
      if (venueService) {
        quoteItems.push({
          serviceId: venueService.id,
          serviceName: venueService.name,
          quantity: 1,
          unitPrice: venueService.price,
          total: venueService.price,
          description: venueService.description,
        })
        subtotal += venueService.price
      }
    }

    // Calcular mesas automáticamente si se seleccionó un tipo
    if (state.tableType && state.guestCount > 0) {
      const tablesNeeded = calculateTablesNeeded(state.guestCount)
      const tableServiceId =
        state.tableType === 'vestidas' ? 'mesas-vestidas' : 'mesas-sencillas'
      const tableService = services.find(s => s.id === tableServiceId)

      if (tableService) {
        const total = tableService.price * tablesNeeded
        quoteItems.push({
          serviceId: tableService.id,
          serviceName: tableService.name,
          quantity: tablesNeeded,
          unitPrice: tableService.price,
          total,
          description: `${tableService.description} - Calculado para ${state.guestCount} personas`,
        })
        subtotal += total
      }
    }

    // Agregar servicios adicionales seleccionados
    Object.entries(effectiveSelectedServices).forEach(([serviceId, quantity]) => {
      if (quantity > 0) {
        const service = services.find(s => s.id === serviceId)
        if (service) {
          const total = service.price * quantity
          quoteItems.push({
            serviceId: service.id,
            serviceName: service.name,
            quantity,
            unitPrice: service.price,
            total,
            description: service.unit
              ? `${service.description} (${service.unit})`
              : service.description,
          })
          subtotal += total
        }
      }
    })

    const quote: Quote = {
      id: `quote-${quoteId.replace(/:/g, '-')}`,
      items: quoteItems,
      subtotal,
      total: subtotal,
      advancePayment: subtotal * 0.5,
      eventDate: state.eventDate,
      guestCount: state.guestCount,
      notes: state.notes,
      createdAt: new Date(),
    }

    setCurrentQuote(quote)
  }, [state, validateInputs, quoteId, effectiveSelectedServices])  // Calcular cotización automáticamente cuando cambian los datos
  useEffect(() => {
    const ready = state.guestCount > 0 && !!state.venueType && !!state.eventType
    if (ready && !basicInfoCompleted) {
      setBasicInfoCompleted(true)
    }
    if (ready) {
      calculateQuote()
      generateRecommendations()
    } else {
      setCurrentQuote(null)
    }
  }, [
    state.guestCount,
    state.venueType,
    state.eventType,
    state.tableType,
    effectiveSelectedServices,
    calculateQuote,
    generateRecommendations,
    basicInfoCompleted,
  ])

  return (
    <div className='max-w-7xl mx-auto space-y-8'>
      {/* Información básica del evento */}
      <Card variant='elevated'>
        <CardContent>
          <h2 className='font-caveat font-bold text-2xl lg:text-3xl text-foreground mb-6'>
            Información de tu Evento
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Número de invitados */}
            <div>
              <label
                htmlFor='guestCount'
                className='block text-sm font-raleway font-medium text-gray-300 mb-2'
              >
                Número de invitados *
              </label>
              <div className='relative'>
                <Users className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='number'
                  id='guestCount'
                  value={state.guestCount || ''}
                  onChange={e =>
                    updateState({ guestCount: parseInt(e.target.value) || 0 })
                  }
                  className='input-custom w-full pl-10'
                  placeholder='ej. 120'
                  min='1'
                  max='250'
                />
              </div>
            </div>

            {/* Fecha del evento */}
            <div>
              <label
                htmlFor='eventDate'
                className='block text-sm font-raleway font-medium text-gray-300 mb-2'
              >
                Fecha del evento
              </label>
              <div className='relative'>
                <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <input
                  type='date'
                  id='eventDate'
                  value={state.eventDate}
                  onChange={e => updateState({ eventDate: e.target.value })}
                  className='input-custom w-full pl-10'
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Tipo de evento */}
            <div>
              <label
                htmlFor='eventType'
                className='block text-sm font-raleway font-medium text-gray-300 mb-2'
              >
                Tipo de evento *
              </label>
              <select
                id='eventType'
                value={state.eventType}
                onChange={e => updateState({ eventType: e.target.value })}
                className='input-custom w-full'
              >
                <option value=''>Selecciona...</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de salón */}
            <div>
              <label
                htmlFor='venueType'
                className='block text-sm font-raleway font-medium text-gray-300 mb-2'
              >
                Espacio del salón *
              </label>
              <select
                id='venueType'
                value={state.venueType}
                onChange={e =>
                  updateState({
                    venueType: e.target
                      .value as QuoteCalculatorState['venueType'],
                  })
                }
                className='input-custom w-full'
              >
                <option value=''>Selecciona...</option>
                <option value='primer-piso'>Primer piso (hasta 150)</option>
                <option value='ambos-pisos'>Ambos pisos (hasta 250)</option>
              </select>
            </div>
          </div>

          {/* Tipo de mesas */}
          {state.guestCount > 0 && (
            <div className='mt-6'>
              <label className='block text-sm font-raleway font-medium text-gray-300 mb-3'>
                Mesas y sillas (opcional - calculamos{' '}
                {calculateTablesNeeded(state.guestCount)} mesas para{' '}
                {state.guestCount} personas)
              </label>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <button
                  onClick={() => updateState({ tableType: '' })}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    state.tableType === ''
                      ? 'border-accent-3 bg-accent-3 bg-opacity-10'
                      : 'border-gray-700 hover:border-accent-3'
                  }`}
                >
                  <h4 className='font-raleway font-semibold text-foreground mb-1'>
                    Sin mesas
                  </h4>
                  <p className='text-gray-300 text-sm mb-2'>
                    Solo renta del salón
                  </p>
                  <p className='text-accent-3 font-raleway font-bold'>
                    $0 adicional
                  </p>
                </button>

                <button
                  onClick={() => updateState({ tableType: 'sencillas' })}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    state.tableType === 'sencillas'
                      ? 'border-accent-3 bg-accent-3 bg-opacity-10'
                      : 'border-gray-700 hover:border-accent-3'
                  }`}
                >
                  <h4 className='font-raleway font-semibold text-foreground mb-1'>
                    Mesas Sencillas
                  </h4>
                  <p className='text-gray-300 text-sm mb-2'>
                    Mantel blanco + 10 sillas
                  </p>
                  <p className='text-accent-3 font-raleway font-bold'>
                    $200 / mesa × {calculateTablesNeeded(state.guestCount)} = $
                    {(
                      200 * calculateTablesNeeded(state.guestCount)
                    ).toLocaleString()}
                  </p>
                </button>

                <button
                  onClick={() => updateState({ tableType: 'vestidas' })}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    state.tableType === 'vestidas'
                      ? 'border-accent-3 bg-accent-3 bg-opacity-10'
                      : 'border-gray-700 hover:border-accent-3'
                  }`}
                >
                  <h4 className='font-raleway font-semibold text-foreground mb-1'>
                    Mesas Vestidas ⭐
                  </h4>
                  <p className='text-gray-300 text-sm mb-2'>
                    Mantel de color + sillas con funda y moño
                  </p>
                  <p className='text-accent-3 font-raleway font-bold'>
                    $270 / mesa × {calculateTablesNeeded(state.guestCount)} = $
                    {(
                      270 * calculateTablesNeeded(state.guestCount)
                    ).toLocaleString()}
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Nombre del cliente para el PDF */}
          <div className='mt-6'>
            <label
              htmlFor='clientName'
              className='block text-sm font-raleway font-medium text-gray-300 mb-2'
            >
              Tu nombre (opcional - para la cotización)
            </label>
            <input
              type='text'
              id='clientName'
              value={state.clientName}
              onChange={e => updateState({ clientName: e.target.value })}
              className='input-custom w-full'
              placeholder='Nombre completo'
            />
          </div>
        </CardContent>
      </Card>

      {/* Errores y recomendaciones */}
      {(errors.length > 0 || recommendations.length > 0) && (
        <div
          className={
            errors.length > 0 && recommendations.length > 0
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-4'
              : 'max-w-3xl mx-auto'
          }
        >
          {errors.length > 0 && (
            <Card
              variant='outlined'
              className='border-red-500 border-opacity-50 mb-4'
            >
              <CardContent>
                <div className='flex items-center space-x-2 mb-3'>
                  <AlertCircle className='w-5 h-5 text-red-500' />
                  <h4 className='font-raleway font-semibold text-red-500'>
                    Revisar información
                  </h4>
                </div>
                <ul className='space-y-1'>
                  {errors.map((error, index) => (
                    <li
                      key={index}
                      className='text-red-400 font-raleway text-sm'
                    >
                      • {error}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {recommendations.length > 0 && (
            <Card
              variant='outlined'
              className='border-accent-3 border-opacity-50'
            >
              <CardContent>
                <div className='flex items-center space-x-2 mb-3'>
                  <CheckCircle className='w-5 h-5 text-accent-3' />
                  <h4 className='font-raleway font-semibold text-accent-3'>
                    Recomendaciones
                  </h4>
                </div>
                <ul className='space-y-1'>
                  {recommendations.map((rec, index) => (
                    <li
                      key={index}
                      className='text-gray-300 font-raleway text-sm'
                    >
                      • {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
