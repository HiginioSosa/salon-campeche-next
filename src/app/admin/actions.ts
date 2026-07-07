'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import * as svc from '@/lib/reservas/service'
import { FechaNoDisponibleError } from '@/lib/reservas/errors'
import type { SolicitudInput } from '@/lib/reservas/validators'

export type ResultadoAccion = { ok: true } | { ok: false; error: string }

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

export async function bloquearAction(
  fecha: string,
  notas?: string
): Promise<ResultadoAccion> {
  await requireAdmin()
  try {
    await svc.bloquearFecha(fecha, notas)
    revalidatePath('/admin')
    return { ok: true }
  } catch (e) {
    if (e instanceof FechaNoDisponibleError) {
      return { ok: false, error: 'Esa fecha ya está ocupada.' }
    }
    return { ok: false, error: 'No se pudo bloquear. Revisa los datos.' }
  }
}

export async function crearManualAction(
  input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }
): Promise<ResultadoAccion> {
  await requireAdmin()
  try {
    await svc.crearReservaManual(input)
    revalidatePath('/admin')
    return { ok: true }
  } catch (e) {
    if (e instanceof FechaNoDisponibleError) {
      return { ok: false, error: 'Esa fecha ya está ocupada.' }
    }
    return { ok: false, error: 'No se pudo guardar. Revisa los datos.' }
  }
}
