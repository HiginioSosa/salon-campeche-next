import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Middleware edge-safe: usa solo la config base (sin bcrypt/Prisma). El callback
// `authorized` protege /admin y redirige al login cuando no hay sesión.
export default NextAuth(authConfig).auth

export const config = { matcher: ['/admin/:path*'] }
