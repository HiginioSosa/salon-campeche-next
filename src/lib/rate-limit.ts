/**
 * Límite de intentos en memoria (para el login del admin). Suficiente para un
 * despliegue de una sola instancia (VPS/Dokploy). Bloquea una clave (p. ej. el
 * correo) tras varios fallos dentro de una ventana de tiempo.
 */
type Registro = { fallos: number; hasta: number }

const intentos = new Map<string, Registro>()
const MAX_FALLOS = 5
const VENTANA_MS = 15 * 60 * 1000 // 15 minutos

export function estaBloqueado(clave: string, ahora: number = Date.now()): boolean {
  const r = intentos.get(clave)
  if (!r) return false
  if (ahora > r.hasta) {
    intentos.delete(clave)
    return false
  }
  return r.fallos >= MAX_FALLOS
}

export function registrarFallo(clave: string, ahora: number = Date.now()): void {
  const r = intentos.get(clave)
  if (!r || ahora > r.hasta) {
    intentos.set(clave, { fallos: 1, hasta: ahora + VENTANA_MS })
  } else {
    r.fallos += 1
    r.hasta = ahora + VENTANA_MS
  }
}

export function limpiarIntentos(clave: string): void {
  intentos.delete(clave)
}
