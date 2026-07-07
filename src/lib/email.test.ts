import { describe, it, expect } from 'vitest'
import { construirAvisoSolicitud } from './email'

describe('construirAvisoSolicitud', () => {
  it('arma asunto y cuerpo con los datos', () => {
    const { asunto, texto } = construirAvisoSolicitud({
      clienteNombre: 'Ana',
      clienteTelefono: '5512345678',
      tipoEvento: 'Boda',
      fecha: '2026-09-10',
    })
    expect(asunto.toLowerCase()).toContain('solicitud')
    expect(asunto).toContain('2026-09-10')
    expect(texto).toContain('Ana')
    expect(texto).toContain('5512345678')
    expect(texto).toContain('Boda')
  })
})
