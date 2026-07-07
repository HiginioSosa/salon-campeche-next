import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/brand'

// Rutas estáticas del sitio con su prioridad y frecuencia de cambio.
const routes: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/servicios', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/paquetes', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/galeria', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/disponibilidad', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/contacto', changeFrequency: 'yearly', priority: 0.8 },
  { path: '/faq', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/privacidad', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terminos', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
