'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components'
import ReservaCard, { type ReservaVista } from './ReservaCard'

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

interface Props {
  anioInicial: number
  mesInicial: number // 1-12
  reservasIniciales: ReservaVista[]
}

export default function AgendaMes({ anioInicial, mesInicial, reservasIniciales }: Props) {
  const [anio, setAnio] = useState(anioInicial)
  const [mes, setMes] = useState(mesInicial)
  const [reservas, setReservas] = useState(reservasIniciales)
  const [cargando, setCargando] = useState(false)

  // Cambia de mes y recarga su agenda (fetch en el handler, no en un efecto).
  const irAMes = useCallback(async (a: number, m: number) => {
    setAnio(a)
    setMes(m)
    setCargando(true)
    try {
      const res = await fetch(`/api/admin/reservas?anio=${a}&mes=${m}`)
      setReservas(res.ok ? await res.json() : [])
    } finally {
      setCargando(false)
    }
  }, [])

  const mesAnterior = () => (mes === 1 ? irAMes(anio - 1, 12) : irAMes(anio, mes - 1))
  const mesSiguiente = () => (mes === 12 ? irAMes(anio + 1, 1) : irAMes(anio, mes + 1))

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={mesAnterior}
          className='w-9 h-9 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors'
          aria-label='Mes anterior'
        >
          <ChevronLeft className='w-5 h-5 text-foreground' />
        </button>
        <h3 className='font-caveat font-bold text-2xl text-foreground'>
          {monthNames[mes - 1]} {anio}
        </h3>
        <button
          onClick={mesSiguiente}
          className='w-9 h-9 bg-gray-800 hover:bg-accent-3 rounded-full flex items-center justify-center transition-colors'
          aria-label='Mes siguiente'
        >
          <ChevronRight className='w-5 h-5 text-foreground' />
        </button>
      </div>

      {cargando ? (
        <Card variant='outlined' padding='md'>
          <CardContent>
            <p className='font-raleway text-gray-400 text-sm'>Cargando…</p>
          </CardContent>
        </Card>
      ) : reservas.length === 0 ? (
        <Card variant='outlined' padding='md'>
          <CardContent>
            <p className='font-raleway text-gray-400 text-sm'>
              Sin movimientos en {monthNames[mes - 1]}.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {reservas.map((r) => (
            <ReservaCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  )
}
