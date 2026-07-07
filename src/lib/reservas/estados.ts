export const ESTADOS = [
  'SOLICITADA',
  'EN_ESPERA',
  'CONFIRMADA',
  'BLOQUEADA',
  'RECHAZADA',
  'CANCELADA',
  'EXPIRADA',
] as const
export type EstadoReserva = (typeof ESTADOS)[number]

export const ESPACIOS = ['PRIMER_PISO', 'AMBOS_PISOS'] as const
export type Espacio = (typeof ESPACIOS)[number]

/** Estados que ocupan la fecha (impiden nuevas reservas). */
export const ESTADOS_ACTIVOS: EstadoReserva[] = [
  'SOLICITADA',
  'EN_ESPERA',
  'CONFIRMADA',
  'BLOQUEADA',
]

/** Transiciones permitidas de la máquina de estados. */
export const TRANSICIONES: Record<EstadoReserva, EstadoReserva[]> = {
  SOLICITADA: ['EN_ESPERA', 'RECHAZADA', 'CANCELADA'],
  EN_ESPERA: ['CONFIRMADA', 'CANCELADA', 'EXPIRADA'],
  CONFIRMADA: ['CANCELADA'],
  BLOQUEADA: ['CANCELADA'],
  RECHAZADA: [],
  CANCELADA: [],
  EXPIRADA: [],
}

export function puedeTransicionar(desde: EstadoReserva, hacia: EstadoReserva): boolean {
  return TRANSICIONES[desde]?.includes(hacia) ?? false
}

export type EstadoPublico = 'disponible' | 'apartada' | 'reservada' | 'no-disponible'

/**
 * Traduce el estado interno de una reserva a lo que ve el público en el calendario.
 * Aplica expiración perezosa: un apartado EN_ESPERA vencido se considera disponible.
 */
export function estadoPublico(
  estado: string,
  expiraEn: Date | null,
  ahora: Date
): EstadoPublico {
  if (estado === 'EN_ESPERA' && expiraEn && expiraEn.getTime() < ahora.getTime()) {
    return 'disponible'
  }
  switch (estado) {
    case 'SOLICITADA':
    case 'EN_ESPERA':
      return 'apartada'
    case 'CONFIRMADA':
      return 'reservada'
    case 'BLOQUEADA':
      return 'no-disponible'
    default:
      return 'disponible' // RECHAZADA, CANCELADA, EXPIRADA
  }
}
