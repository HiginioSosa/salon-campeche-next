import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import { crearSolicitud } from './service'
import { FechaNoDisponibleError } from './errors'

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
