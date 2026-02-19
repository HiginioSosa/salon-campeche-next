'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Calendar, Users, Star } from 'lucide-react'
import { Button } from '@/components'
import { businessInfo } from '@/lib/brand'

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Tu celebración perfecta',
      subtitle: 'nos espera',
      description:
        'Espacios elegantes para bodas, XV años y eventos inolvidables',
    },
    {
      title: 'Hasta 250 invitados',
      subtitle: 'en nuestro salón',
      description: 'Dos niveles de pura elegancia para tu evento soñado',
    },
    {
      title: 'Servicios completos',
      subtitle: 'todo incluido',
      description:
        'DJ, decoración, catering y más para una celebración sin preocupaciones',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image with Overlay */}
      <div className='absolute inset-0'>
        {/* Placeholder para imagen principal del salón - Vista panorámica del interior elegante */}
        <div className='w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative'>
          {/* Efecto de partículas flotantes */}
          <div className='absolute inset-0 opacity-20'>
            {[
              { left: 15.2, top: 23.8, delay: 0.5, duration: 3.2 },
              { left: 78.4, top: 67.1, delay: 1.8, duration: 4.1 },
              { left: 42.7, top: 12.5, delay: 2.3, duration: 3.7 },
              { left: 89.1, top: 45.9, delay: 0.9, duration: 4.5 },
              { left: 23.6, top: 78.3, delay: 1.4, duration: 3.9 },
              { left: 67.8, top: 34.2, delay: 2.7, duration: 3.4 },
              { left: 91.3, top: 89.7, delay: 0.3, duration: 4.8 },
              { left: 8.9, top: 56.4, delay: 1.9, duration: 3.6 },
              { left: 54.2, top: 91.8, delay: 2.1, duration: 4.2 },
              { left: 76.5, top: 18.7, delay: 0.7, duration: 3.8 },
              { left: 31.8, top: 73.2, delay: 1.6, duration: 4.3 },
              { left: 95.4, top: 42.6, delay: 2.5, duration: 3.5 },
              { left: 12.7, top: 85.9, delay: 0.8, duration: 4.7 },
              { left: 58.3, top: 29.4, delay: 1.2, duration: 3.3 },
              { left: 83.6, top: 64.8, delay: 2.9, duration: 4.6 },
              { left: 27.9, top: 7.3, delay: 0.4, duration: 3.9 },
              { left: 71.2, top: 52.7, delay: 1.7, duration: 4.1 },
              { left: 46.8, top: 96.1, delay: 2.2, duration: 3.7 },
              { left: 93.5, top: 31.5, delay: 0.6, duration: 4.4 },
              { left: 19.4, top: 68.9, delay: 1.5, duration: 3.6 },
              { left: 64.7, top: 14.2, delay: 2.8, duration: 4.9 },
              { left: 87.1, top: 79.6, delay: 0.2, duration: 3.2 },
              { left: 35.3, top: 48.3, delay: 1.3, duration: 4.8 },
              { left: 79.8, top: 83.7, delay: 2.4, duration: 3.4 },
              { left: 52.6, top: 26.1, delay: 0.9, duration: 4.2 },
            ].map((particle, i) => (
              <div
                key={i}
                className='absolute w-2 h-2 bg-accent-3 rounded-full animate-float'
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Overlay oscuro */}
        <div className='absolute inset-0 bg-background bg-opacity-70' />
      </div>

      <div className='container-section relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20'>
          {/* Contenido principal */}
          <div className='text-center lg:text-left space-y-8 animate-slide-up'>
            {/* Badge de ubicación */}
            <div className='inline-flex items-center px-4 py-2 bg-accent-3 bg-opacity-20 rounded-full backdrop-blur-sm border border-accent-3 border-opacity-30'>
              <span className='text-accent-3 font-raleway font-semibold text-sm'>
                📍 Ixtapaluca, Estado de México
              </span>
            </div>

            {/* Título principal animado */}
            <div className='space-y-4'>
              <h1 className='font-caveat font-bold text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight'>
                <span className='block'>{slides[currentSlide].title}</span>
                <span className='block gradient-text'>
                  {slides[currentSlide].subtitle}
                </span>
              </h1>

              <p className='font-raleway text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed'>
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Estadísticas rápidas */}
            <div className='flex flex-wrap justify-center lg:justify-start gap-6 text-center'>
              <div className='bg-gray-900 bg-opacity-50 rounded-lg px-4 py-3 backdrop-blur-sm'>
                <div className='flex items-center justify-center space-x-2 text-accent-3'>
                  <Users className='w-5 h-5' />
                  <span className='font-raleway font-bold text-lg'>250</span>
                </div>
                <p className='text-gray-300 text-sm font-raleway'>Personas</p>
              </div>

              <div className='bg-gray-900 bg-opacity-50 rounded-lg px-4 py-3 backdrop-blur-sm'>
                <div className='flex items-center justify-center space-x-2 text-accent-3'>
                  <Star className='w-5 h-5' />
                  <span className='font-raleway font-bold text-lg'>5.0</span>
                </div>
                <p className='text-gray-300 text-sm font-raleway'>
                  Calificación
                </p>
              </div>

              <div className='bg-gray-900 bg-opacity-50 rounded-lg px-4 py-3 backdrop-blur-sm'>
                <div className='flex items-center justify-center space-x-2 text-accent-3'>
                  <Calendar className='w-5 h-5' />
                  <span className='font-raleway font-bold text-lg'>150+</span>
                </div>
                <p className='text-gray-300 text-sm font-raleway'>Eventos</p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
              <Link href='/paquetes'>
                <Button size='lg' className='w-full sm:w-auto'>
                  <Calendar className='w-5 h-5 mr-2' />
                  Cotizar mi Evento
                </Button>
              </Link>

              <Link href='/galeria'>
                <Button
                  variant='secondary'
                  size='lg'
                  className='w-full sm:w-auto'
                >
                  <Play className='w-5 h-5 mr-2' />
                  Ver Galería
                </Button>
              </Link>
            </div>

            {/* Información de contacto rápido */}
            <div className='pt-6 border-t border-gray-700'>
              <p className='text-gray-400 font-raleway text-sm mb-2'>
                ¿Tienes dudas? Llámanos ahora
              </p>
              <a
                href={`tel:${businessInfo.contact.phone}`}
                className='text-accent-3 hover:text-accent-2 font-raleway font-bold text-lg transition-colors duration-200'
              >
                {businessInfo.contact.phone}
              </a>
            </div>
          </div>

          {/* Sección visual derecha */}
          <div className='relative animate-fade-in animation-delay-300'>
            {/* Logo principal animado */}
            <div className='text-center space-y-6'>
              {/* Placeholder para logo animado principal */}
              {/* Logo vertical grande con animación sutil del búho */}
              <div className='relative mx-auto'>
                <div className='w-48 h-48 lg:w-64 lg:h-64 mx-auto relative animate-float'>
                  <div className='absolute inset-0 bg-accent-3 rounded-full opacity-20 animate-pulse'></div>
                  <div className='absolute inset-4 bg-gradient-to-br from-accent-3 to-accent-2 rounded-full flex items-center justify-center shadow-accent-glow'>
                    <Image
                      src='/icon-animated.svg'
                      alt='Salón Campeche'
                      width={256}
                      height={256}
                      className='h-48 w-auto lg:h-64'
                      priority
                    />
                  </div>
                </div>

                {/* Texto del logo */}
                <div className='mt-6 space-y-2'>
                  <h2 className='font-caveat font-bold text-3xl lg:text-4xl text-foreground'>
                    {businessInfo.name}
                  </h2>
                  <p className='font-raleway text-accent-3 font-semibold text-lg'>
                    {businessInfo.slogan}
                  </p>
                </div>
              </div>

              {/* Características destacadas */}
              <div className='grid grid-cols-2 gap-4 max-w-sm mx-auto'>
                <div className='bg-gray-900 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm border border-gray-700'>
                  <div className='text-accent-3 text-2xl mb-2'>🎵</div>
                  <p className='text-gray-300 font-raleway text-sm'>
                    DJ & Sonido Profesional
                  </p>
                </div>

                <div className='bg-gray-900 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm border border-gray-700'>
                  <div className='text-accent-3 text-2xl mb-2'>🎊</div>
                  <p className='text-gray-300 font-raleway text-sm'>
                    Decoración Incluida
                  </p>
                </div>

                <div className='bg-gray-900 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm border border-gray-700'>
                  <div className='text-accent-3 text-2xl mb-2'>🚗</div>
                  <p className='text-gray-300 font-raleway text-sm'>
                    Estacionamiento Gratis
                  </p>
                </div>

                <div className='bg-gray-900 bg-opacity-30 rounded-lg p-4 backdrop-blur-sm border border-gray-700'>
                  <div className='text-accent-3 text-2xl mb-2'>🏰</div>
                  <p className='text-gray-300 font-raleway text-sm'>
                    Lugar cómodo y espacioso
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores de slides */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-accent-3' : 'bg-gray-600'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className='absolute bottom-20 transform -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-accent-3 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-accent-3 rounded-full mt-2 animate-pulse'></div>
        </div>
      </div>
    </section>
  )
}
