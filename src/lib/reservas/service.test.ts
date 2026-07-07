import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import {
  crearSolicitud,
  autorizar,
  confirmarAnticipo,
  rechazar,
  bloquearFecha,
} from './service'
import { FechaNoDisponibleError, TransicionInvalidaError } from './errors'

const input = {
  fecha: '2026-09-10',
  clienteNombre: 'Ana López',
  clienteTelefono: '5512345678',
  tipoEvento: 'Boda',
}

beforeEach(async () => {
  await prisma.reserva.deleteMany()
})

describe('crearSolicitud', () => {
  it('crea una reserva en estado SOLICITADA', async () => {
    const r = await crearSolicitud(input)
    expect(r.estado).toBe('SOLICITADA')
    expect(r.fecha).toBe('2026-09-10')
    expect(r.clienteNombre).toBe('Ana López')
    expect(r.solicitadaEn).toBeInstanceOf(Date)
  })

  it('rechaza una segunda solicitud para la misma fecha', async () => {
    await crearSolicitud(input)
    await expect(crearSolicitud(input)).rejects.toBeInstanceOf(FechaNoDisponibleError)
  })
})

describe('transiciones de admin', () => {
  it('autorizar: SOLICITADA -> EN_ESPERA y fija expiraEn', async () => {
    const s = await crearSolicitud(input)
    const r = await autorizar(s.id, { diasApartado: 5 })
    expect(r.estado).toBe('EN_ESPERA')
    expect(r.expiraEn).toBeInstanceOf(Date)
    expect(r.autorizadaEn).toBeInstanceOf(Date)
  })

  it('confirmarAnticipo: EN_ESPERA -> CONFIRMADA con monto', async () => {
    const s = await crearSolicitud(input)
    await autorizar(s.id)
    const r = await confirmarAnticipo(s.id, 12000)
    expect(r.estado).toBe('CONFIRMADA')
    expect(r.anticipoMonto).toBe(12000)
    expect(r.anticipoRecibidoEn).toBeInstanceOf(Date)
  })

  it('confirmarAnticipo sobre SOLICITADA lanza TransicionInvalidaError', async () => {
    const s = await crearSolicitud(input)
    await expect(confirmarAnticipo(s.id)).rejects.toBeInstanceOf(TransicionInvalidaError)
  })

  it('rechazar libera la fecha para una nueva solicitud', async () => {
    const s = await crearSolicitud(input)
    await rechazar(s.id)
    await expect(crearSolicitud(input)).resolves.toMatchObject({ estado: 'SOLICITADA' })
  })

  it('bloquearFecha ocupa la fecha', async () => {
    await bloquearFecha('2026-10-01', 'Mantenimiento')
    await expect(
      crearSolicitud({ ...input, fecha: '2026-10-01' })
    ).rejects.toBeInstanceOf(FechaNoDisponibleError)
  })
})
