'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components'
import { crearSolicitudAction } from './actions'
import { businessInfo } from '@/lib/brand'

const tiposEvento = [
  'Boda',
  'XV Años',
  'Cumpleaños',
  'Baby Shower',
  'Aniversario',
  'Graduación',
  'Corporativo',
  'Otro',
]

function fechaLegible(fecha: string): string {
  const [y, m, d] = fecha.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface Props {
  fecha: string
  onClose: () => void
}

export default function SolicitudForm({ fecha, onClose }: Props) {
  const [form, setForm] = useState({
    clienteNombre: '',
    clienteTelefono: '',
    clienteEmail: '',
    tipoEvento: '',
    numInvitados: '',
    espacio: '',
    mensajeCliente: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [pending, startTransition] = useTransition()

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const wa = `https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
    `¡Hola! Me interesa apartar la fecha ${fecha} para un evento.`
  )}`

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    if (form.clienteTelefono.replace(/\D/g, '').length !== 10) {
      setError('El teléfono debe tener 10 dígitos.')
      return
    }
    startTransition(async () => {
      const res = await crearSolicitudAction(
        {
          fecha,
          clienteNombre: form.clienteNombre,
          clienteTelefono: form.clienteTelefono,
          clienteEmail: form.clienteEmail || undefined,
          tipoEvento: form.tipoEvento,
          numInvitados: form.numInvitados ? Number(form.numInvitados) : undefined,
          espacio:
            form.espacio === 'PRIMER_PISO' || form.espacio === 'AMBOS_PISOS'
              ? form.espacio
              : undefined,
          mensajeCliente: form.mensajeCliente || undefined,
        },
        honeypot
      )
      if (res.ok) setEnviado(true)
      else setError(res.error)
    })
  }

  if (enviado) {
    return (
      <div className='text-center p-2'>
        <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CheckCircle className='w-8 h-8 text-white' />
        </div>
        <h3 className='font-caveat font-bold text-2xl text-foreground mb-2'>
          ¡Recibimos tu solicitud!
        </h3>
        <p className='font-raleway text-gray-300 text-sm mb-6'>
          Apartamos temporalmente el {fechaLegible(fecha)}. Te confirmaremos muy pronto.
        </p>
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button href={wa} external icon={<MessageCircle className='w-4 h-4' />}>
            Escríbenos por WhatsApp
          </Button>
          <Button variant='secondary' onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div>
        <h3 className='font-caveat font-bold text-2xl text-foreground'>Solicitar fecha</h3>
        <p className='font-raleway text-accent-3 text-sm capitalize'>{fechaLegible(fecha)}</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <input
          className='input-custom w-full'
          placeholder='Nombre completo *'
          value={form.clienteNombre}
          onChange={(e) => set('clienteNombre', e.target.value)}
          required
        />
        <input
          className='input-custom w-full'
          type='tel'
          placeholder='Teléfono (10 dígitos) *'
          value={form.clienteTelefono}
          onChange={(e) => set('clienteTelefono', e.target.value)}
          required
        />
      </div>

      <input
        className='input-custom w-full'
        type='email'
        placeholder='Correo (opcional)'
        value={form.clienteEmail}
        onChange={(e) => set('clienteEmail', e.target.value)}
      />

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <select
          className='input-custom w-full'
          value={form.tipoEvento}
          onChange={(e) => set('tipoEvento', e.target.value)}
          required
        >
          <option value=''>Tipo de evento *</option>
          {tiposEvento.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          className='input-custom w-full'
          type='number'
          min='1'
          max='250'
          placeholder='Nº invitados'
          value={form.numInvitados}
          onChange={(e) => set('numInvitados', e.target.value)}
        />
        <select
          className='input-custom w-full'
          value={form.espacio}
          onChange={(e) => set('espacio', e.target.value)}
        >
          <option value=''>Espacio</option>
          <option value='PRIMER_PISO'>Primer piso</option>
          <option value='AMBOS_PISOS'>Ambos pisos</option>
        </select>
      </div>

      <textarea
        className='input-custom w-full resize-none'
        rows={3}
        placeholder='Mensaje (opcional)'
        value={form.mensajeCliente}
        onChange={(e) => set('mensajeCliente', e.target.value)}
      />

      {/* Anti-spam: campo oculto */}
      <input
        type='text'
        className='hidden'
        tabIndex={-1}
        autoComplete='off'
        aria-hidden='true'
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      {error && <p className='text-red-400 text-sm'>{error}</p>}

      <div className='flex flex-col sm:flex-row gap-3'>
        <Button type='submit' className='flex-1' loading={pending}>
          Enviar solicitud
        </Button>
        <Button type='button' variant='ghost' onClick={onClose}>
          Cancelar
        </Button>
      </div>
      <p className='font-raleway text-gray-400 text-xs text-center'>
        Al enviar, apartamos la fecha temporalmente mientras confirmamos contigo.
      </p>
    </form>
  )
}
