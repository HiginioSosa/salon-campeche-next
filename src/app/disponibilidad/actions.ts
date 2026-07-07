'use server'

import { crearSolicitud } from '@/lib/reservas/service'
import { enviarAvisoNuevaSolicitud } from '@/lib/email'
import { FechaNoDisponibleError } from '@/lib/reservas/errors'
import { solicitudSchema, type SolicitudInput } from '@/lib/reservas/validators'

export async function crearSolicitudAction(
  input: SolicitudInput,
  honeypot?: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  // Anti-spam: un bot rellena el campo oculto; los humanos no.
  if (honeypot) return { ok: true }

  const parsed = solicitudSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Revisa los datos del formulario.' }
  }

  try {
    const r = await crearSolicitud(parsed.data)
    // El aviso es secundario: si el correo falla, la solicitud YA se creó y no
    // debe reportarse como error (si no, el cliente reintenta y choca consigo mismo).
    try {
      await enviarAvisoNuevaSolicitud({
        clienteNombre: r.clienteNombre,
        clienteTelefono: r.clienteTelefono,
        tipoEvento: r.tipoEvento,
        fecha: r.fecha,
      })
    } catch (errCorreo) {
      console.error('Falló el aviso de nueva solicitud:', errCorreo)
    }
    return { ok: true }
  } catch (e) {
    if (e instanceof FechaNoDisponibleError) {
      return { ok: false, error: 'Esa fecha ya no está disponible.' }
    }
    return { ok: false, error: 'No se pudo enviar la solicitud. Inténtalo de nuevo.' }
  }
}
