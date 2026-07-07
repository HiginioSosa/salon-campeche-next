import { redirect } from 'next/navigation'
import { auth, signOut } from '@/lib/auth'

// Layout de las páginas protegidas del panel. La página de login vive fuera de
// este grupo, así que no queda atrapada en la guardia (evita el loop de redirección).
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  return (
    <div className='min-h-screen bg-background'>
      <header className='flex items-center justify-between px-4 sm:px-8 h-16 border-b border-gray-800'>
        <span className='font-caveat font-bold text-2xl text-foreground'>
          Panel · Salón Campeche
        </span>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}
        >
          <button className='btn-ghost text-sm'>Cerrar sesión</button>
        </form>
      </header>
      <main className='container-section py-8'>{children}</main>
    </div>
  )
}
