import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/db'

describe('conexión a la base de datos', () => {
  it('responde a una consulta trivial', async () => {
    const res = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`
    expect(Array.isArray(res)).toBe(true)
    expect(res.length).toBe(1)
  })

  it('la tabla Reserva existe (esquema migrado)', async () => {
    const count = await prisma.reserva.count()
    expect(typeof count).toBe('number')
  })
})
