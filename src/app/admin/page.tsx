import type { Reserva } from '@prisma/client'
import { Card, CardContent } from '@/components'
import {
  listarSolicitudesPendientes,
  listarActivasFuturas,
} from '@/lib/reservas/service'
import ReservaCard, { type ReservaVista } from './ReservaCard'
import HerramientasAdmin from './HerramientasAdmin'

function aVista(r: Reserva): ReservaVista {
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

export default async function AdminPage() {
  const [pendientes, activas] = await Promise.all([
    listarSolicitudesPendientes(),
    listarActivasFuturas(),
  ])

  return (
    <div className='space-y-10'>
      {/* Bandeja de solicitudes */}
      <section>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='font-caveat font-bold text-3xl text-foreground'>
            Solicitudes pendientes
          </h1>
          {pendientes.length > 0 && (
            <span className='px-3 py-1 rounded-full bg-accent-3 text-background text-sm font-raleway font-bold'>
              {pendientes.length}
            </span>
          )}
        </div>
        {pendientes.length === 0 ? (
          <Card variant='outlined' padding='md'>
            <CardContent>
              <p className='font-raleway text-gray-400 text-sm'>
                No hay solicitudes por revisar.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {pendientes.map((r) => (
              <ReservaCard key={r.id} r={aVista(r)} />
            ))}
          </div>
        )}
      </section>

      {/* Herramientas */}
      <section>
        <h2 className='font-caveat font-bold text-2xl text-foreground mb-4'>
          Herramientas
        </h2>
        <HerramientasAdmin />
      </section>

      {/* Agenda: reservas activas */}
      <section>
        <h2 className='font-caveat font-bold text-3xl text-foreground mb-4'>
          Próximas reservas
        </h2>
        {activas.length === 0 ? (
          <Card variant='outlined' padding='md'>
            <CardContent>
              <p className='font-raleway text-gray-400 text-sm'>
                Aún no hay fechas apartadas ni confirmadas.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {activas.map((r) => (
              <ReservaCard key={r.id} r={aVista(r)} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export const dynamic = 'force-dynamic'
