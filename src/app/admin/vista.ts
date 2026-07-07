import type { Reserva } from '@prisma/client'
import type { ReservaVista } from './ReservaCard'

/** Convierte una fila de Prisma en la vista serializable que consume ReservaCard. */
export function aVista(r: Reserva): ReservaVista {
  return {
    id: r.id,
    fecha: r.fecha,
    estado: r.estado,
    clienteNombre: r.clienteNombre,
    clienteTelefono: r.clienteTelefono,
    clienteEmail: r.clienteEmail,
    tipoEvento: r.tipoEvento,
    numInvitados: r.numInvitados,
    espacio: r.espacio,
    mensajeCliente: r.mensajeCliente,
    anticipoMonto: r.anticipoMonto,
    expiraEn: r.expiraEn ? r.expiraEn.toISOString() : null,
  }
}
