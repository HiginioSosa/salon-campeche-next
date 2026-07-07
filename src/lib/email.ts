import { Resend } from 'resend'

type AvisoInput = {
  clienteNombre: string
  clienteTelefono: string
  tipoEvento: string
  fecha: string
}

export function construirAvisoSolicitud(r: AvisoInput) {
  const asunto = `Nueva solicitud de fecha (${r.fecha})`
  const texto = [
    'Recibiste una nueva solicitud de reserva:',
    `• Fecha: ${r.fecha}`,
    `• Cliente: ${r.clienteNombre}`,
    `• Teléfono: ${r.clienteTelefono}`,
    `• Tipo de evento: ${r.tipoEvento}`,
    '',
    'Entra al panel para autorizar o rechazar.',
  ].join('\n')
  return { asunto, texto }
}

export async function enviarAvisoNuevaSolicitud(r: AvisoInput): Promise<void> {
  const { asunto, texto } = construirAvisoSolicitud(r)
  const apiKey = process.env.RESEND_API_KEY
  const destino = process.env.CORREO_AVISOS
  if (!apiKey || !destino) {
    // Sin configurar: registrar en consola en vez de fallar. Se usa console.warn
    // (no info) para que sobreviva a `removeConsole` en producción y el dueño
    // pueda ver el aviso en los logs si aún no configura Resend.
    console.warn('[aviso solicitud — configura RESEND_API_KEY/CORREO_AVISOS]', asunto, '\n', texto)
    return
  }
  const resend = new Resend(apiKey)
  await resend.emails.send({
    from: 'Salón Campeche <onboarding@resend.dev>',
    to: destino,
    subject: asunto,
    text: texto,
  })
}
