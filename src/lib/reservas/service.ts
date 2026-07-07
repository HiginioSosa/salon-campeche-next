import { Prisma, type Reserva } from '@prisma/client'
import { prisma } from '@/lib/db'
import { solicitudSchema, type SolicitudInput } from './validators'
import { FechaNoDisponibleError } from './errors'

const DIAS_APARTADO = Number(process.env.DIAS_APARTADO ?? 5)

function esFechaDuplicada(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
}

export async function crearSolicitud(input: SolicitudInput): Promise<Reserva> {
  const d = solicitudSchema.parse(input)
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
