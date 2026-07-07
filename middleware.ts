import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Middleware edge-safe: usa solo la config base (sin bcrypt/Prisma) para leer la
// sesión. El matcher excluye /admin/login para no redirigirlo (evita el loop).
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  if (!req.auth?.user) {
    return Response.redirect(new URL('/admin/login', req.nextUrl.origin))
  }
})

export const config = { matcher: ['/admin', '/admin/((?!login).*)'] }
