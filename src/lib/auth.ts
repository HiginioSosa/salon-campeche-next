import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from '@/lib/auth.config'
import { verificarCredenciales } from '@/lib/verificar-credenciales'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const user = await verificarCredenciales(String(c.email), String(c.password))
        return user ? { id: user.id, email: user.email } : null
      },
    }),
  ],
})
