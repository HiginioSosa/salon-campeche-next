import { Caveat, Raleway } from 'next/font/google'

// Configuración de fuente Caveat para títulos (solo los pesos realmente usados)
export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
  preload: true,
})

// Configuración de fuente Raleway para subtítulos y texto.
// Solo los pesos usados en la UI (400/500/600/700) + itálica para citas.
export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-raleway',
  display: 'swap',
  preload: true,
})

// Clases CSS combinadas para facilitar uso
export const fontClasses = `${caveat.variable} ${raleway.variable}`
