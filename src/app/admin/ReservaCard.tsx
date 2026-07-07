'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, Button } from '@/components'
import {
  autorizarAction,
  rechazarAction,
  confirmarAction,
  cancelarAction,
} from './actions'

export interface ReservaVista {
  id: string
  fecha: string
  estado: string
  clienteNombre: string
  clienteTelefono: string
  clienteEmail: string | null
  tipoEvento: string
  numInvitados: number | null
  espacio: string | null
  mensajeCliente: string | null
  anticipoMonto: number | null
  expiraEn: string | null
}

const etiquetaEstado: Record<string, { texto: string; clase: string }> = {
  SOLICITADA: { texto: 'Solicitada', clase: 'bg-blue-500/20 text-blue-300' },
  EN_ESPERA: { texto: 'En espera de anticipo', clase: 'bg-yellow-500/20 text-yellow-300' },
  CONFIRMADA: { texto: 'Confirmada', clase: 'bg-green-500/20 text-green-300' },
  BLOQUEADA: { texto: 'Bloqueada', clase: 'bg-gray-500/20 text-gray-300' },
}

export default function ReservaCard({ r }: { r: ReservaVista }) {
  const [pending, startTransition] = useTransition()
  const [monto, setMonto] = useState('')
  const est = etiquetaEstado[r.estado] ?? { texto: r.estado, clase: 'bg-gray-500/20 text-gray-300' }

  const run = (fn: () => Promise<void>) => startTransition(() => fn())

  return (
    <Card variant='outlined' padding='md'>
      <CardContent>
        <div className='flex items-start justify-between gap-3 mb-3'>
          <div>
            <p className='font-caveat font-bold text-2xl text-accent-3'>{r.fecha}</p>
            <p className='font-raleway font-semibold text-foreground'>{r.clienteNombre}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-raleway font-bold ${est.clase}`}>
            {est.texto}
          </span>
        </div>

        <div className='space-y-1 text-sm font-raleway text-gray-300 mb-4'>
          <p>📞 {r.clienteTelefono}{r.clienteEmail ? ` · ✉️ ${r.clienteEmail}` : ''}</p>
          <p>🎉 {r.tipoEvento}{r.numInvitados ? ` · 👥 ${r.numInvitados}` : ''}{r.espacio ? ` · ${r.espacio === 'AMBOS_PISOS' ? 'Ambos pisos' : 'Primer piso'}` : ''}</p>
          {r.estado === 'EN_ESPERA' && r.expiraEn && (
            <p className='text-yellow-400'>⏳ Expira: {new Date(r.expiraEn).toLocaleDateString('es-MX')}</p>
          )}
          {r.anticipoMonto != null && <p>💰 Anticipo: ${r.anticipoMonto.toLocaleString('es-MX')}</p>}
          {r.mensajeCliente && <p className='text-gray-400 italic'>“{r.mensajeCliente}”</p>}
        </div>

        <div className='flex flex-wrap gap-2'>
          {r.estado === 'SOLICITADA' && (
            <>
              <Button size='sm' loading={pending} onClick={() => run(() => autorizarAction(r.id))}>
                Autorizar
              </Button>
              <Button size='sm' variant='outline' loading={pending} onClick={() => run(() => rechazarAction(r.id))}>
                Rechazar
              </Button>
            </>
          )}
          {r.estado === 'EN_ESPERA' && (
            <>
              <input
                className='input-custom w-28 text-sm py-2'
                type='number'
                placeholder='Monto $'
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
              />
              <Button
                size='sm'
                loading={pending}
                onClick={() => run(() => confirmarAction(r.id, monto ? Number(monto) : undefined))}
              >
                Anticipo recibido
              </Button>
              <Button size='sm' variant='outline' loading={pending} onClick={() => run(() => cancelarAction(r.id))}>
                Cancelar
              </Button>
            </>
          )}
          {(r.estado === 'CONFIRMADA' || r.estado === 'BLOQUEADA') && (
            <Button size='sm' variant='outline' loading={pending} onClick={() => run(() => cancelarAction(r.id))}>
              {r.estado === 'BLOQUEADA' ? 'Desbloquear' : 'Cancelar'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
