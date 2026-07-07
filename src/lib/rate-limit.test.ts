import { describe, it, expect } from 'vitest'
import { estaBloqueado, registrarFallo, limpiarIntentos } from './rate-limit'

describe('rate-limit', () => {
  it('no bloquea una clave nueva', () => {
    expect(estaBloqueado('nueva@x.com', 1000)).toBe(false)
  })

  it('bloquea tras 5 fallos dentro de la ventana', () => {
    const clave = 'brute@x.com'
    const t0 = 1000
    for (let i = 0; i < 5; i++) registrarFallo(clave, t0)
    expect(estaBloqueado(clave, t0)).toBe(true)
  })

  it('no bloquea con 4 fallos', () => {
    const clave = 'casi@x.com'
    const t0 = 1000
    for (let i = 0; i < 4; i++) registrarFallo(clave, t0)
    expect(estaBloqueado(clave, t0)).toBe(false)
  })

  it('limpiarIntentos libera la clave (login correcto)', () => {
    const clave = 'ok@x.com'
    const t0 = 1000
    for (let i = 0; i < 5; i++) registrarFallo(clave, t0)
    expect(estaBloqueado(clave, t0)).toBe(true)
    limpiarIntentos(clave)
    expect(estaBloqueado(clave, t0)).toBe(false)
  })

  it('el bloqueo caduca pasada la ventana de 15 min', () => {
    const clave = 'caduca@x.com'
    const t0 = 1000
    for (let i = 0; i < 5; i++) registrarFallo(clave, t0)
    expect(estaBloqueado(clave, t0)).toBe(true)
    const despues = t0 + 15 * 60 * 1000 + 1
    expect(estaBloqueado(clave, despues)).toBe(false)
  })
})
