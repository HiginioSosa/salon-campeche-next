// src/app/disponibilidad/page.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Phone,
  Clock,
  Users,
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

// Simulación de fechas ocupadas (en un caso real vendría de una API/base de datos)
const unavailableDates = [
  { date: '2025-02-14', reason: 'Boda San Valentín', eventType: 'Boda' },
  { date: '2025-02-22', reason: 'XV Años María', eventType: 'XV Años' },
  {
    date: '2025-03-08',
    reason: 'Evento Corporativo',
    eventType: 'Corporativo',
  },
  { date: '2025-03-15', reason: 'Cumpleaños 50 años', eventType: 'Cumpleaños' },
  { date: '2025-03-22', reason: 'Boda Primavera', eventType: 'Boda' },
  { date: '2025-04-12', reason: 'XV Años Abril', eventType: 'XV Años' },
  { date: '2025-04-19', reason: 'Baby Shower', eventType: 'Baby Shower' },
  { date: '2025-05-10', reason: 'Día de las Madres', eventType: 'Celebración' },
  { date: '2025-05-24', reason: 'Graduación', eventType: 'Graduación' },
]

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

interface DateInfo {
  date: string
  isAvailable: boolean
  reason?: string
  eventType?: string
}

export default function AvailabilityPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [dateInfo, setDateInfo] = useState<DateInfo | null>(null)

  const today = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Obtener días del mes
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Obtener primer día de la semana del mes
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Navegar meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1))
  }

  // Verificar si una fecha está ocupada
  const isDateUnavailable = (dateStr: string) => {
    return unavailableDates.find(unavailable => unavailable.date === dateStr)
  }

  // Verificar si una fecha es pasada
  const isPastDate = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day)
    return date < today
  }

  // Manejar clic en fecha
  const handleDateClick = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const unavailable = isDateUnavailable(dateStr)
    const isPast = isPastDate(currentYear, currentMonth, day)

    setDateInfo({
      date: dateStr,
      isAvailable: !unavailable && !isPast,
      reason: unavailable?.reason,
      eventType: unavailable?.eventType,
    })
    setShowModal(true)
  }
  // Generar días del calendario
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='h-12'></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const unavailable = isDateUnavailable(dateStr)
      const isPast = isPastDate(currentYear, currentMonth, day)
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-12 flex items-center justify-center rounded-lg font-raleway font-medium text-sm transition-all duration-200 relative ${
            isPast
              ? 'text-gray-500 cursor-not-allowed'
              : unavailable
                ? 'bg-red-500 bg-opacity-20 text-red-400 hover:bg-red-500 hover:bg-opacity-30'
                : 'text-foreground hover:bg-accent-3 hover:text-background'
          } ${isToday ? 'ring-2 ring-accent-3' : ''}`}
          disabled={isPast}
        >
          {day}
          {unavailable && !isPast && (
            <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></div>
          )}
          {isToday && (
            <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent-3 rounded-full'></div>
          )}
        </button>
      )
    }

    return days
  }

  const formatDateForDisplay = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <MainLayout whatsAppMessage='¡Hola! Estoy consultando su calendario de disponibilidad y me gustaría verificar una fecha específica para mi evento.'>
      {/* Hero Section */}
      <Section variant='gradient' size='lg'>
        <SectionHeader
          subtitle='Disponibilidad de Fechas'
          title='Consulta nuestro calendario actualizado'
          description='Verifica en tiempo real las fechas disponibles para tu evento y reserva la fecha perfecta para tu celebración'
        />

        {/* Estadísticas del calendario */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-green-500 mb-2'>
              {getDaysInMonth(currentYear, currentMonth) -
                unavailableDates.filter(d =>
                  d.date.startsWith(
                    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`
                  )
                ).length}
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Días Disponibles
            </p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-red-500 mb-2'>
              {
                unavailableDates.filter(d =>
                  d.date.startsWith(
                    `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`
                  )
                ).length
              }
            </div>
            <p className='font-raleway text-gray-300 text-sm'>Días Ocupados</p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              2AM
            </div>
            <p className='font-raleway text-gray-300 text-sm'>Horario Límite</p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              24/7
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Reservas WhatsApp
            </p>
          </div>
        </div>
      </Section>

      {/* Calendario Principal */}
      <Section variant='default' size='xl'>
        <div className='max-w-4xl mx-auto'>
          <Card variant='elevated' padding='lg'>
            <CardContent>
              {/* Header del calendario */}
              <div className='flex items-center justify-between mb-8'>
                <button
                  onClick={goToPreviousMonth}
                  className='w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors duration-200'
                  aria-label='Mes anterior'
                >
                  <ChevronLeft className='w-5 h-5 text-foreground' />
                </button>

                <h2 className='font-caveat font-bold text-3xl text-foreground'>
                  {monthNames[currentMonth]} {currentYear}
                </h2>

                <button
                  onClick={goToNextMonth}
                  className='w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors duration-200'
                  aria-label='Siguiente mes'
                >
                  <ChevronRight className='w-5 h-5 text-foreground' />
                </button>
              </div>

              {/* Días de la semana */}
              <div className='grid grid-cols-7 gap-2 mb-4'>
                {dayNames.map(day => (
                  <div
                    key={day}
                    className='h-10 flex items-center justify-center font-raleway font-semibold text-gray-400 text-sm'
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className='grid grid-cols-7 gap-2'>
                {generateCalendarDays()}
              </div>

              {/* Leyenda */}
              <div className='mt-8 flex flex-wrap justify-center gap-6 text-sm'>
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 bg-green-500 bg-opacity-20 rounded border border-green-500'></div>
                  <span className='font-raleway text-gray-300'>Disponible</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 bg-red-500 bg-opacity-20 rounded border border-red-500 relative'>
                    <div className='absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full'></div>
                  </div>
                  <span className='font-raleway text-gray-300'>Ocupado</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 bg-gray-600 rounded'></div>
                  <span className='font-raleway text-gray-300'>
                    Fecha pasada
                  </span>
                </div>
                <div className='flex items-center space-x-2'>
                  <div className='w-4 h-4 bg-accent-3 bg-opacity-20 rounded border-2 border-accent-3'></div>
                  <span className='font-raleway text-gray-300'>Hoy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Próximos eventos (fechas ocupadas) */}
      <Section variant='dark' size='lg'>
        <SectionHeader
          title='Próximos Eventos Programados'
          description='Estas son las fechas que ya están reservadas en nuestro salón'
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {unavailableDates.slice(0, 6).map((event, index) => (
            <Card key={index} variant='outlined' padding='md'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-3'>
                  <div className='w-10 h-10 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center'>
                    <CalendarIcon className='w-5 h-5 text-red-500' />
                  </div>
                  <div>
                    <p className='font-raleway font-semibold text-foreground'>
                      {new Date(event.date).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    <p className='font-raleway text-gray-400 text-xs'>
                      {new Date(event.date).toLocaleDateString('es-MX', {
                        weekday: 'long',
                      })}
                    </p>
                  </div>
                </div>
                <h4 className='font-raleway font-semibold text-foreground text-sm mb-1'>
                  {event.reason}
                </h4>
                <p className='font-raleway text-gray-300 text-xs'>
                  Tipo: {event.eventType}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Información importante */}
      <Section variant='gradient' size='lg'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='font-caveat font-bold text-4xl text-foreground mb-4'>
              Información Importante sobre Reservas
            </h2>
            <p className='font-raleway text-gray-300 text-lg'>
              Todo lo que necesitas saber para reservar tu fecha
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <Card variant='glass' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <Clock className='w-6 h-6 text-accent-3' />
                  <h3 className='font-raleway font-bold text-foreground'>
                    Proceso de Reserva
                  </h3>
                </div>
                <div className='space-y-3 text-sm font-raleway text-gray-300'>
                  <div className='flex items-start space-x-2'>
                    <div className='w-5 h-5 bg-accent-3 rounded-full flex items-center justify-center text-background text-xs font-bold mt-0.5'>
                      1
                    </div>
                    <p>Verifica disponibilidad en el calendario</p>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-5 h-5 bg-accent-3 rounded-full flex items-center justify-center text-background text-xs font-bold mt-0.5'>
                      2
                    </div>
                    <p>Contacta por WhatsApp o teléfono</p>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-5 h-5 bg-accent-3 rounded-full flex items-center justify-center text-background text-xs font-bold mt-0.5'>
                      3
                    </div>
                    <p>Firma contrato y paga 50% de anticipo</p>
                  </div>
                  <div className='flex items-start space-x-2'>
                    <div className='w-5 h-5 bg-accent-3 rounded-full flex items-center justify-center text-background text-xs font-bold mt-0.5'>
                      4
                    </div>
                    <p>¡Tu fecha queda reservada!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant='glass' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <Users className='w-6 h-6 text-accent-3' />
                  <h3 className='font-raleway font-bold text-foreground'>
                    Políticas de Reserva
                  </h3>
                </div>
                <div className='space-y-3 text-sm font-raleway text-gray-300'>
                  <p>
                    • <strong>Anticipo:</strong> 50% del total para apartar
                    fecha
                  </p>
                  <p>
                    • <strong>Pago final:</strong> Hasta un día antes del evento
                  </p>
                  <p>
                    • <strong>Cancelación:</strong> Políticas flexibles según
                    anticipación
                  </p>
                  <p>
                    • <strong>Modificaciones:</strong> Cambios de fecha sujetos
                    a disponibilidad
                  </p>
                  <p>
                    • <strong>Acceso:</strong> Desde la hora que necesites
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA para reservar */}
      <Section variant='dark' size='lg'>
        <div className='text-center'>
          <h2 className='font-caveat font-bold text-4xl text-foreground mb-6'>
            ¿Encontraste tu fecha perfecta?
          </h2>
          <p className='font-raleway text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
            No dejes que se te escape. Las mejores fechas se reservan
            rápidamente.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a
              href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button size='lg' icon={<MessageCircle className='w-5 h-5' />}>
                Reservar por WhatsApp
              </Button>
            </a>

            <a href={`tel:${businessInfo.contact.phone}`}>
              <Button
                variant='secondary'
                size='lg'
                icon={<Phone className='w-5 h-5' />}
              >
                Llamar para Reservar
              </Button>
            </a>

            <Link href='/paquetes'>
              <Button variant='ghost' size='lg'>
                Ver Paquetes y Precios
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Modal de información de fecha */}
      {showModal && dateInfo && (
        <div className='fixed inset-0 bg-background bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <Card variant='elevated' className='max-w-md w-full'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='font-caveat font-bold text-2xl text-foreground'>
                  Información de Fecha
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className='w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200'
                >
                  <X className='w-4 h-4 text-foreground' />
                </button>
              </div>

              <div className='text-center mb-6'>
                <p className='font-raleway text-gray-300 mb-2'>
                  {formatDateForDisplay(dateInfo.date)}
                </p>

                {dateInfo.isAvailable ? (
                  <div className='flex items-center justify-center space-x-2 text-green-500'>
                    <CheckCircle className='w-6 h-6' />
                    <span className='font-raleway font-semibold'>
                      Fecha Disponible
                    </span>
                  </div>
                ) : (
                  <div className='flex items-center justify-center space-x-2 text-red-500'>
                    <AlertCircle className='w-6 h-6' />
                    <span className='font-raleway font-semibold'>
                      Fecha No Disponible
                    </span>
                  </div>
                )}
              </div>

              {dateInfo.isAvailable ? (
                <div className='space-y-4'>
                  <p className='font-raleway text-gray-300 text-center'>
                    ¡Excelente! Esta fecha está disponible para tu evento.
                  </p>
                  <div className='grid grid-cols-2 gap-4'>
                    <a
                      href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}?text=¡Hola! Me interesa reservar la fecha ${formatDateForDisplay(dateInfo.date)} para mi evento.`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button size='sm' className='w-full'>
                        <MessageCircle className='w-4 h-4 mr-2' />
                        Reservar
                      </Button>
                    </a>
                    <Link href='/paquetes'>
                      <Button variant='secondary' size='sm' className='w-full'>
                        Ver Precios
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  {dateInfo.reason && (
                    <div className='bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-lg p-4'>
                      <p className='font-raleway text-red-400 text-sm text-center'>
                        <strong>Motivo:</strong> {dateInfo.reason}
                      </p>
                      {dateInfo.eventType && (
                        <p className='font-raleway text-red-400 text-xs text-center mt-1'>
                          Tipo de evento: {dateInfo.eventType}
                        </p>
                      )}
                    </div>
                  )}
                  <p className='font-raleway text-gray-300 text-center text-sm'>
                    Esta fecha ya está reservada. Te sugerimos elegir otra fecha
                    disponible.
                  </p>
                  <Button
                    variant='secondary'
                    className='w-full'
                    onClick={() => setShowModal(false)}
                  >
                    Elegir Otra Fecha
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  )
}
