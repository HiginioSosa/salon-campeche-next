import type { NextAuthConfig } from 'next-auth'

/**
 * Configuración base compatible con Edge (sin bcrypt ni Prisma). La usa el
 * middleware para verificar la sesión y proteger /admin. Los proveedores
 * (Credentials) se añaden en auth.ts, que corre en Node.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      const esAdmin =
        pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
      if (esAdmin) return !!auth?.user
      return true
    },
  },
}
