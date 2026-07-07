import { z } from 'zod'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const solicitudSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  clienteNombre: z.string().trim().min(2, 'Nombre requerido'),
  clienteTelefono: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 10, 'Teléfono de 10 dígitos'),
  clienteEmail: z
    .union([z.string().trim().regex(emailRegex, 'Email inválido'), z.literal('')])
    .optional(),
  tipoEvento: z.string().trim().min(1, 'Selecciona el tipo de evento'),
  numInvitados: z.coerce.number().int().positive().max(250).optional(),
  espacio: z.enum(['PRIMER_PISO', 'AMBOS_PISOS']).optional(),
  mensajeCliente: z.string().trim().max(1000).optional(),
})

export type SolicitudInput = z.infer<typeof solicitudSchema>
