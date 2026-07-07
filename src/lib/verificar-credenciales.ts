import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import type { UsuarioAdmin } from '@prisma/client'

/**
 * Valida email + contraseña contra el usuario admin. Módulo aislado de NextAuth
 * para poder probarse sin arrastrar dependencias de Next.js.
 */
export async function verificarCredenciales(
  email: string,
  password: string
): Promise<UsuarioAdmin | null> {
  const user = await prisma.usuarioAdmin.findUnique({ where: { email } })
  if (!user) return null
  const ok = await bcrypt.compare(password, user.passwordHash)
  return ok ? user : null
}
