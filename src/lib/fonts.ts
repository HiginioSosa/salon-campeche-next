import { Caveat, Raleway } from 'next/font/google'

// Configuración de fuente Caveat para títulos
export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
  preload: true,
})

// Configuración de fuente Raleway para subtítulos y texto
export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
  display: 'swap',
  preload: true,
})

// Clases CSS combinadas para facilitar uso
export const fontClasses = `${caveat.variable} ${raleway.variable}`
