import { describe, it, expect, beforeAll } from 'vitest'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { verificarCredenciales } from './verificar-credenciales'

beforeAll(async () => {
  await prisma.usuarioAdmin.deleteMany()
  await prisma.usuarioAdmin.create({
    data: { email: 'x@y.com', passwordHash: await bcrypt.hash('secreta123', 12) },
  })
})

describe('verificarCredenciales', () => {
  it('acepta credenciales correctas', async () => {
    expect(await verificarCredenciales('x@y.com', 'secreta123')).not.toBeNull()
  })
  it('rechaza contraseña incorrecta', async () => {
    expect(await verificarCredenciales('x@y.com', 'mala')).toBeNull()
  })
  it('rechaza usuario inexistente', async () => {
    expect(await verificarCredenciales('nadie@y.com', 'x')).toBeNull()
  })
})
