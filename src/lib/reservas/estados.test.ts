import { describe, it, expect } from 'vitest'
import { puedeTransicionar, estadoPublico, ESTADOS_ACTIVOS } from './estados'

describe('transiciones', () => {
  it('permite SOLICITADA -> EN_ESPERA', () => {
    expect(puedeTransicionar('SOLICITADA', 'EN_ESPERA')).toBe(true)
  })
  it('permite EN_ESPERA -> CONFIRMADA', () => {
    expect(puedeTransicionar('EN_ESPERA', 'CONFIRMADA')).toBe(true)
  })
  it('rechaza CONFIRMADA -> EN_ESPERA', () => {
    expect(puedeTransicionar('CONFIRMADA', 'EN_ESPERA')).toBe(false)
  })
})

describe('estadoPublico', () => {
  const now = new Date('2026-08-01T12:00:00Z')
  it('CONFIRMADA -> reservada', () => {
    expect(estadoPublico('CONFIRMADA', null, now)).toBe('reservada')
  })
  it('EN_ESPERA vigente -> apartada', () => {
    expect(estadoPublico('EN_ESPERA', new Date('2026-08-05'), now)).toBe('apartada')
  })
  it('EN_ESPERA vencida -> disponible (expiración perezosa)', () => {
    expect(estadoPublico('EN_ESPERA', new Date('2026-07-20'), now)).toBe('disponible')
  })
  it('BLOQUEADA -> no-disponible', () => {
    expect(estadoPublico('BLOQUEADA', null, now)).toBe('no-disponible')
  })
  it('activos incluye SOLICITADA', () => {
    expect(ESTADOS_ACTIVOS).toContain('SOLICITADA')
  })
})
