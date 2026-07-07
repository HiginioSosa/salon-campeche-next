import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

// Content-Security-Policy. Usa 'unsafe-inline' para los estilos/scripts inline que
// inyecta Next.js (no hay middleware con nonce) y permite el iframe de Google Maps
// de la página de contacto. Las directivas estructurales (object-src, base-uri,
// frame-ancestors, form-action) aportan protección real contra clickjacking e
// inyección aunque se permita inline.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  'frame-src https://www.google.com https://maps.google.com',
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ')

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Optimización de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // No exponer la tecnología del servidor
  poweredByHeader: false,

  // Configuración experimental para mejor performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Fuerza HTTPS en navegadores durante 2 años.
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Desactiva APIs del navegador que el sitio no usa.
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
}

export default nextConfig
