import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '@/lib/auth.config'
import { verificarCredenciales } from '@/lib/verificar-credenciales'
import { estaBloqueado, registrarFallo, limpiarIntentos } from '@/lib/rate-limit'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const email = String(c.email)
        // Freno anti fuerza bruta: tras varios fallos bloquea el correo un rato.
        if (estaBloqueado(email)) return null
        const user = await verificarCredenciales(email, String(c.password))
        if (!user) {
          registrarFallo(email)
          return null
        }
        limpiarIntentos(email)
        return { id: user.id, email: user.email }
      },
    }),
  ],
})
