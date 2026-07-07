'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Section, Card, CardContent, Button } from '@/components'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setCargando(false)
    if (res?.error) setError('Credenciales incorrectas')
    else window.location.href = '/admin'
  }

  return (
    <Section variant='gradient' size='xl'>
      <div className='max-w-md mx-auto'>
        <Card variant='elevated' padding='lg'>
          <CardContent>
            <h1 className='font-caveat font-bold text-3xl text-foreground mb-2'>
              Panel · Salón Campeche
            </h1>
            <p className='font-raleway text-gray-300 text-sm mb-6'>
              Acceso solo para el administrador.
            </p>
            <form onSubmit={onSubmit} className='space-y-4'>
              <input
                className='input-custom w-full'
                type='email'
                placeholder='Correo'
                autoComplete='username'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className='input-custom w-full'
                type='password'
                placeholder='Contraseña'
                autoComplete='current-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className='text-red-400 text-sm'>{error}</p>}
              <Button type='submit' className='w-full' size='lg' loading={cargando}>
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
