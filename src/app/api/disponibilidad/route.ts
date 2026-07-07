import { NextRequest, NextResponse } from 'next/server'
import { disponibilidadMes } from '@/lib/reservas/service'

// Disponibilidad pública de un mes (solo días ocupados). No expone datos de clientes.
export async function GET(req: NextRequest) {
  const anio = Number(req.nextUrl.searchParams.get('anio'))
  const mes = Number(req.nextUrl.searchParams.get('mes'))
  if (!anio || !mes || mes < 1 || mes > 12) {
    return NextResponse.json([], { status: 400 })
  }
  return NextResponse.json(await disponibilidadMes(anio, mes))
}
