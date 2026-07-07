export class FechaNoDisponibleError extends Error {
  constructor() {
    super('La fecha ya no está disponible')
    this.name = 'FechaNoDisponibleError'
  }
}

export class TransicionInvalidaError extends Error {
  constructor(desde: string, hacia: string) {
    super(`Transición inválida: ${desde} → ${hacia}`)
    this.name = 'TransicionInvalidaError'
  }
}
