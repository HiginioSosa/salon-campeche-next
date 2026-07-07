'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import * as svc from '@/lib/reservas/service'
import type { SolicitudInput } from '@/lib/reservas/validators'

async function requireAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error('No autorizado')
}

export async function autorizarAction(id: string) {
  await requireAdmin()
  await svc.autorizar(id)
  revalidatePath('/admin')
}

export async function rechazarAction(id: string) {
  await requireAdmin()
  await svc.rechazar(id)
  revalidatePath('/admin')
}

export async function confirmarAction(id: string, monto?: number) {
  await requireAdmin()
  await svc.confirmarAnticipo(id, monto)
  revalidatePath('/admin')
}

export async function cancelarAction(id: string) {
  await requireAdmin()
  await svc.cancelar(id)
  revalidatePath('/admin')
}

export async function bloquearAction(fecha: string, notas?: string) {
  await requireAdmin()
  await svc.bloquearFecha(fecha, notas)
  revalidatePath('/admin')
}

export async function crearManualAction(
  input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }
) {
  await requireAdmin()
  await svc.crearReservaManual(input)
  revalidatePath('/admin')
}
