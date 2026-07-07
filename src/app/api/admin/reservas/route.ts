import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { reservasDelMes } from '@/lib/reservas/service'
import { aVista } from '@/app/admin/vista'

// Agenda de un mes para el panel. Protegida: expone datos de clientes, así que
// requiere sesión de admin.
export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const anio = Number(req.nextUrl.searchParams.get('anio'))
  const mes = Number(req.nextUrl.searchParams.get('mes'))
  if (!anio || !mes || mes < 1 || mes > 12) {
    return NextResponse.json([], { status: 400 })
  }
  const reservas = await reservasDelMes(anio, mes)
  return NextResponse.json(reservas.map(aVista))
}
