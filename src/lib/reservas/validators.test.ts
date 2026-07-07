import { describe, it, expect } from 'vitest'
import { solicitudSchema } from './validators'

const base = {
  fecha: '2026-09-10',
  clienteNombre: 'Ana López',
  clienteTelefono: '5512345678',
  tipoEvento: 'Boda',
}

describe('solicitudSchema', () => {
  it('acepta una solicitud válida', () => {
    expect(solicitudSchema.safeParse(base).success).toBe(true)
  })
  it('normaliza el teléfono a 10 dígitos', () => {
    const r = solicitudSchema.safeParse({ ...base, clienteTelefono: '55 1234 5678' })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.clienteTelefono).toBe('5512345678')
  })
  it('rechaza teléfono que no tenga 10 dígitos', () => {
    expect(solicitudSchema.safeParse({ ...base, clienteTelefono: '123' }).success).toBe(false)
  })
  it('rechaza fecha con formato inválido', () => {
    expect(solicitudSchema.safeParse({ ...base, fecha: '10/09/2026' }).success).toBe(false)
  })
  it('rechaza nombre vacío', () => {
    expect(solicitudSchema.safeParse({ ...base, clienteNombre: '' }).success).toBe(false)
  })
  it('acepta email vacío', () => {
    expect(solicitudSchema.safeParse({ ...base, clienteEmail: '' }).success).toBe(true)
  })
})
