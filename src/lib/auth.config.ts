import type { NextAuthConfig } from 'next-auth'

/**
 * Configuración base compatible con Edge (sin bcrypt ni Prisma). La usa el
 * middleware para verificar la sesión y proteger /admin. Los proveedores
 * (Credentials) se añaden en auth.ts, que corre en Node.
 */
export const authConfig: NextAuthConfig = {
  // Autohospedado: confiar en el host del propio servidor (evita el error
  // UntrustedHost de Auth.js en producción). También configurable con AUTH_TRUST_HOST.
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [],
}
