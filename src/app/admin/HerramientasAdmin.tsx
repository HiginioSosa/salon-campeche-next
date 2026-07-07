'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, Button, Modal } from '@/components'
import { getTodayLocalISO } from '@/lib/validators'
import { crearManualAction, bloquearAction } from './actions'

const tiposEvento = [
  'Boda', 'XV Años', 'Cumpleaños', 'Baby Shower',
  'Aniversario', 'Graduación', 'Corporativo', 'Otro',
]

export default function HerramientasAdmin() {
  const [modal, setModal] = useState<null | 'manual' | 'bloqueo'>(null)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  // Apartado manual
  const [m, setM] = useState({
    fecha: '', clienteNombre: '', clienteTelefono: '', clienteEmail: '',
    tipoEvento: '', numInvitados: '', espacio: '', estado: 'EN_ESPERA',
  })
  // Bloqueo
  const [b, setB] = useState({ fecha: '', notas: '' })

  const cerrar = () => { setModal(null); setError('') }

  const enviarManual = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError('')
    startTransition(async () => {
      try {
        await crearManualAction({
          fecha: m.fecha,
          clienteNombre: m.clienteNombre,
          clienteTelefono: m.clienteTelefono,
          clienteEmail: m.clienteEmail || undefined,
          tipoEvento: m.tipoEvento || 'Evento',
          numInvitados: m.numInvitados ? Number(m.numInvitados) : undefined,
          espacio: m.espacio === 'PRIMER_PISO' || m.espacio === 'AMBOS_PISOS' ? m.espacio : undefined,
          estado: m.estado === 'CONFIRMADA' ? 'CONFIRMADA' : 'EN_ESPERA',
        })
        cerrar()
        setM({ fecha: '', clienteNombre: '', clienteTelefono: '', clienteEmail: '', tipoEvento: '', numInvitados: '', espacio: '', estado: 'EN_ESPERA' })
      } catch {
        setError('No se pudo crear (¿la fecha ya está ocupada?).')
      }
    })
  }

  const enviarBloqueo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError('')
    startTransition(async () => {
      try {
        await bloquearAction(b.fecha, b.notas || undefined)
        cerrar(); setB({ fecha: '', notas: '' })
      } catch {
        setError('No se pudo bloquear (¿la fecha ya está ocupada?).')
      }
    })
  }

  return (
    <>
      <div className='flex flex-wrap gap-3'>
        <Button size='sm' onClick={() => setModal('manual')}>Apartar fecha manualmente</Button>
        <Button size='sm' variant='secondary' onClick={() => setModal('bloqueo')}>Bloquear fecha</Button>
      </div>

      <Modal isOpen={modal === 'manual'} onClose={cerrar} ariaLabel='Apartar fecha manualmente' className='max-w-lg w-full'>
        <Card variant='elevated'><CardContent className='p-6'>
          <h3 className='font-caveat font-bold text-2xl text-foreground mb-4'>Apartar fecha manualmente</h3>
          <form onSubmit={enviarManual} className='space-y-3'>
            <input className='input-custom w-full' type='date' min={getTodayLocalISO()} value={m.fecha} onChange={(e) => setM({ ...m, fecha: e.target.value })} required />
            <input className='input-custom w-full' placeholder='Nombre del cliente *' value={m.clienteNombre} onChange={(e) => setM({ ...m, clienteNombre: e.target.value })} required />
            <div className='grid grid-cols-2 gap-3'>
              <input className='input-custom w-full' type='tel' placeholder='Teléfono (10 dígitos) *' value={m.clienteTelefono} onChange={(e) => setM({ ...m, clienteTelefono: e.target.value })} required />
              <input className='input-custom w-full' type='email' placeholder='Correo' value={m.clienteEmail} onChange={(e) => setM({ ...m, clienteEmail: e.target.value })} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <select className='input-custom w-full' value={m.tipoEvento} onChange={(e) => setM({ ...m, tipoEvento: e.target.value })}>
                <option value=''>Tipo de evento</option>
                {tiposEvento.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input className='input-custom w-full' type='number' min='1' max='250' placeholder='Nº invitados' value={m.numInvitados} onChange={(e) => setM({ ...m, numInvitados: e.target.value })} />
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <select className='input-custom w-full' value={m.espacio} onChange={(e) => setM({ ...m, espacio: e.target.value })}>
                <option value=''>Espacio</option>
                <option value='PRIMER_PISO'>Primer piso</option>
                <option value='AMBOS_PISOS'>Ambos pisos</option>
              </select>
              <select className='input-custom w-full' value={m.estado} onChange={(e) => setM({ ...m, estado: e.target.value })}>
                <option value='EN_ESPERA'>En espera</option>
                <option value='CONFIRMADA'>Confirmada</option>
              </select>
            </div>
            {error && <p className='text-red-400 text-sm'>{error}</p>}
            <div className='flex gap-2'>
              <Button type='submit' className='flex-1' loading={pending}>Guardar</Button>
              <Button type='button' variant='ghost' onClick={cerrar}>Cancelar</Button>
            </div>
          </form>
        </CardContent></Card>
      </Modal>

      <Modal isOpen={modal === 'bloqueo'} onClose={cerrar} ariaLabel='Bloquear fecha' className='max-w-md w-full'>
        <Card variant='elevated'><CardContent className='p-6'>
          <h3 className='font-caveat font-bold text-2xl text-foreground mb-4'>Bloquear fecha</h3>
          <form onSubmit={enviarBloqueo} className='space-y-3'>
            <input className='input-custom w-full' type='date' min={getTodayLocalISO()} value={b.fecha} onChange={(e) => setB({ ...b, fecha: e.target.value })} required />
            <input className='input-custom w-full' placeholder='Motivo (opcional)' value={b.notas} onChange={(e) => setB({ ...b, notas: e.target.value })} />
            {error && <p className='text-red-400 text-sm'>{error}</p>}
            <div className='flex gap-2'>
              <Button type='submit' className='flex-1' loading={pending}>Bloquear</Button>
              <Button type='button' variant='ghost' onClick={cerrar}>Cancelar</Button>
            </div>
          </form>
        </CardContent></Card>
      </Modal>
    </>
  )
}
