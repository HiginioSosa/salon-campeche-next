import { Prisma, type Reserva } from '@prisma/client'
import { prisma } from '@/lib/db'
import { solicitudSchema, type SolicitudInput } from './validators'
import { FechaNoDisponibleError, TransicionInvalidaError } from './errors'
import {
  puedeTransicionar,
  estadoPublico,
  ESTADOS_ACTIVOS,
  type EstadoReserva,
  type EstadoPublico,
} from './estados'

const DIAS_APARTADO = Number(process.env.DIAS_APARTADO ?? 5)

const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/

function esFechaDuplicada(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
}

/**
 * Libera un apartado EN_ESPERA vencido de una fecha (lo pasa a EXPIRADA) antes de
 * intentar ocuparla. Sin esto la fila vencida seguiría bloqueando el índice único
 * aunque el calendario la muestre disponible (la expiración en lectura es perezosa).
 */
async function liberarExpiradaDeFecha(fecha: string): Promise<void> {
  await prisma.reserva.updateMany({
    where: { fecha, estado: 'EN_ESPERA', expiraEn: { lt: new Date() } },
    data: { estado: 'EXPIRADA' },
  })
}

export async function crearSolicitud(input: SolicitudInput): Promise<Reserva> {
  const d = solicitudSchema.parse(input)
  await liberarExpiradaDeFecha(d.fecha)
  try {
    return await prisma.reserva.create({
      data: {
        fecha: d.fecha,
        estado: 'SOLICITADA',
        espacio: d.espacio ?? null,
        clienteNombre: d.clienteNombre,
        clienteTelefono: d.clienteTelefono,
        clienteEmail: d.clienteEmail || null,
        tipoEvento: d.tipoEvento,
        numInvitados: d.numInvitados ?? null,
        mensajeCliente: d.mensajeCliente || null,
        solicitadaEn: new Date(),
      },
    })
  } catch (e) {
    if (esFechaDuplicada(e)) throw new FechaNoDisponibleError()
    throw e
  }
}

async function transicionar(
  id: string,
  hacia: EstadoReserva,
  extra: Prisma.ReservaUpdateInput = {}
): Promise<Reserva> {
  const actual = await prisma.reserva.findUniqueOrThrow({ where: { id } })
  if (!puedeTransicionar(actual.estado as EstadoReserva, hacia)) {
    throw new TransicionInvalidaError(actual.estado, hacia)
  }
  return prisma.reserva.update({ where: { id }, data: { estado: hacia, ...extra } })
}

export function autorizar(id: string, opts?: { diasApartado?: number }): Promise<Reserva> {
  const dias = opts?.diasApartado ?? DIAS_APARTADO
  const expiraEn = new Date()
  expiraEn.setDate(expiraEn.getDate() + dias)
  expiraEn.setHours(23, 59, 59, 999)
  return transicionar(id, 'EN_ESPERA', { autorizadaEn: new Date(), expiraEn })
}

export function rechazar(id: string): Promise<Reserva> {
  return transicionar(id, 'RECHAZADA')
}

export function confirmarAnticipo(id: string, monto?: number): Promise<Reserva> {
  return transicionar(id, 'CONFIRMADA', {
    anticipoRecibidoEn: new Date(),
    confirmadaEn: new Date(),
    ...(monto != null ? { anticipoMonto: monto } : {}),
  })
}

export function cancelar(id: string): Promise<Reserva> {
  return transicionar(id, 'CANCELADA')
}

export async function bloquearFecha(
  fecha: string,
  notasInternas?: string
): Promise<Reserva> {
  if (!FECHA_REGEX.test(fecha)) throw new Error('Fecha inválida')
  await liberarExpiradaDeFecha(fecha)
  try {
    return await prisma.reserva.create({
      data: {
        fecha,
        estado: 'BLOQUEADA',
        clienteNombre: '(Bloqueo interno)',
        clienteTelefono: '',
        tipoEvento: 'Bloqueo',
        notasInternas: notasInternas ?? null,
      },
    })
  } catch (e) {
    if (esFechaDuplicada(e)) throw new FechaNoDisponibleError()
    throw e
  }
}

export async function crearReservaManual(
  input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }
): Promise<Reserva> {
  if (input.estado !== 'EN_ESPERA' && input.estado !== 'CONFIRMADA') {
    throw new Error('Estado inicial inválido')
  }
  const d = solicitudSchema.parse(input)
  await liberarExpiradaDeFecha(d.fecha)
  const ahora = new Date()
  const expiraEn = new Date()
  expiraEn.setDate(expiraEn.getDate() + DIAS_APARTADO)
  expiraEn.setHours(23, 59, 59, 999)
  try {
    return await prisma.reserva.create({
      data: {
        fecha: d.fecha,
        estado: input.estado,
        espacio: d.espacio ?? null,
        clienteNombre: d.clienteNombre,
        clienteTelefono: d.clienteTelefono,
        clienteEmail: d.clienteEmail || null,
        tipoEvento: d.tipoEvento,
        numInvitados: d.numInvitados ?? null,
        mensajeCliente: d.mensajeCliente || null,
        solicitadaEn: ahora,
        autorizadaEn: ahora,
        expiraEn: input.estado === 'EN_ESPERA' ? expiraEn : null,
        confirmadaEn: input.estado === 'CONFIRMADA' ? ahora : null,
        anticipoRecibidoEn: input.estado === 'CONFIRMADA' ? ahora : null,
      },
    })
  } catch (e) {
    if (esFechaDuplicada(e)) throw new FechaNoDisponibleError()
    throw e
  }
}

export type DisponibilidadDia = { fecha: string; estado: EstadoPublico }

/** Días ocupados del mes (mes 1-12) para el calendario público. */
export async function disponibilidadMes(
  anio: number,
  mes: number
): Promise<DisponibilidadDia[]> {
  const prefijo = `${anio}-${String(mes).padStart(2, '0')}` // 'YYYY-MM'
  const reservas = await prisma.reserva.findMany({
    where: { estado: { in: ESTADOS_ACTIVOS }, fecha: { startsWith: prefijo } },
  })
  const ahora = new Date()
  return reservas
    .map((r) => ({ fecha: r.fecha, estado: estadoPublico(r.estado, r.expiraEn, ahora) }))
    .filter((d) => d.estado !== 'disponible')
}

/** Solicitudes pendientes de revisión (bandeja del panel). */
export function listarSolicitudesPendientes(): Promise<Reserva[]> {
  return prisma.reserva.findMany({
    where: { estado: 'SOLICITADA' },
    orderBy: { solicitadaEn: 'asc' },
  })
}

/** Reservas activas de hoy en adelante (para la agenda del panel). */
export function listarActivasFuturas(): Promise<Reserva[]> {
  const hoy = new Date()
  const hoyISO = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`
  return prisma.reserva.findMany({
    where: {
      estado: { in: ['EN_ESPERA', 'CONFIRMADA', 'BLOQUEADA'] },
      fecha: { gte: hoyISO },
    },
    orderBy: { fecha: 'asc' },
  })
}
