'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, Modal } from '@/components'
import { getTodayLocalISO } from '@/lib/validators'
import type { DisponibilidadDia } from '@/lib/reservas/service'
import SolicitudForm from './SolicitudForm'

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

function aMapa(dias: DisponibilidadDia[]): Record<string, DisponibilidadDia['estado']> {
  return Object.fromEntries(dias.map((d) => [d.fecha, d.estado]))
}

interface Props {
  anioInicial: number
  mesInicial: number
  diasIniciales: DisponibilidadDia[]
}

export default function CalendarioDisponibilidad({
  anioInicial,
  mesInicial,
  diasIniciales,
}: Props) {
  const [anio, setAnio] = useState(anioInicial)
  const [mes, setMes] = useState(mesInicial) // 1-12
  const [mapa, setMapa] = useState(aMapa(diasIniciales))
  const [fechaSel, setFechaSel] = useState<string | null>(null)
  const hoyISO = getTodayLocalISO()

  // Cambia de mes y recarga su disponibilidad (fetch en el handler, no en un efecto).
  const irAMes = useCallback(async (a: number, m: number) => {
    setAnio(a)
    setMes(m)
    const res = await fetch(`/api/disponibilidad?anio=${a}&mes=${m}`)
    if (res.ok) setMapa(aMapa(await res.json()))
  }, [])

  const mesAnterior = () =>
    mes === 1 ? irAMes(anio - 1, 12) : irAMes(anio, mes - 1)
  const mesSiguiente = () =>
    mes === 12 ? irAMes(anio + 1, 1) : irAMes(anio, mes + 1)

  const diasEnMes = new Date(anio, mes, 0).getDate()
  const primerDia = new Date(anio, mes - 1, 1).getDay()

  const celdas: React.ReactNode[] = []
  for (let i = 0; i < primerDia; i++) celdas.push(<div key={`e-${i}`} className='h-12' />)

  for (let d = 1; d <= diasEnMes; d++) {
    const fecha = `${anio}-${String(mes).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const estado = mapa[fecha] // undefined = disponible
    const esPasada = fecha < hoyISO
    const esHoy = fecha === hoyISO
    const disponible = !estado && !esPasada

    let clases = 'text-foreground hover:bg-accent-3 hover:text-background cursor-pointer'
    if (esPasada) clases = 'text-gray-600 cursor-not-allowed'
    else if (estado === 'apartada') clases = 'bg-yellow-500/20 text-yellow-400 cursor-not-allowed'
    else if (estado === 'reservada') clases = 'bg-red-500/20 text-red-400 cursor-not-allowed'
    else if (estado === 'no-disponible') clases = 'bg-gray-700/40 text-gray-500 cursor-not-allowed'

    celdas.push(
      <button
        key={d}
        onClick={() => disponible && setFechaSel(fecha)}
        disabled={!disponible}
        aria-label={`${d} de ${monthNames[mes - 1]}${disponible ? ', disponible' : ', no disponible'}`}
        className={`h-12 flex items-center justify-center rounded-lg font-raleway font-medium text-sm transition-all duration-200 ${clases} ${
          esHoy ? 'ring-2 ring-accent-3' : ''
        }`}
      >
        {d}
      </button>
    )
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <Card variant='elevated' padding='lg'>
        <CardContent>
          <div className='flex items-center justify-between mb-8'>
            <button
              onClick={mesAnterior}
              className='w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors'
              aria-label='Mes anterior'
            >
              <ChevronLeft className='w-5 h-5 text-foreground' />
            </button>
            <h2 className='font-caveat font-bold text-3xl text-foreground'>
              {monthNames[mes - 1]} {anio}
            </h2>
            <button
              onClick={mesSiguiente}
              className='w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors'
              aria-label='Mes siguiente'
            >
              <ChevronRight className='w-5 h-5 text-foreground' />
            </button>
          </div>

          <div className='grid grid-cols-7 gap-2 mb-4'>
            {dayNames.map((d) => (
              <div key={d} className='h-10 flex items-center justify-center font-raleway font-semibold text-gray-400 text-sm'>
                {d}
              </div>
            ))}
          </div>

          <div className='grid grid-cols-7 gap-2'>{celdas}</div>

          <div className='mt-8 flex flex-wrap justify-center gap-6 text-sm'>
            <Leyenda color='bg-accent-3' texto='Disponible' />
            <Leyenda color='bg-yellow-500' texto='Apartada' />
            <Leyenda color='bg-red-500' texto='Reservada' />
            <Leyenda color='bg-gray-600' texto='No disponible' />
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={fechaSel !== null}
        onClose={() => setFechaSel(null)}
        ariaLabel='Solicitar fecha'
        className='max-w-lg w-full'
      >
        <Card variant='elevated'>
          <CardContent className='p-6'>
            {fechaSel && (
              <SolicitudForm fecha={fechaSel} onClose={() => setFechaSel(null)} />
            )}
          </CardContent>
        </Card>
      </Modal>
    </div>
  )
}

function Leyenda({ color, texto }: { color: string; texto: string }) {
  return (
    <div className='flex items-center space-x-2'>
      <div className={`w-4 h-4 ${color} rounded`} />
      <span className='font-raleway text-gray-300'>{texto}</span>
    </div>
  )
}
