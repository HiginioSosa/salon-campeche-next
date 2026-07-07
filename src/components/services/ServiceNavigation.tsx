'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
}

const navigationItems: NavigationItem[] = [
  { id: 'salon', label: 'Renta del Salón', href: '#salon' },
  { id: 'entretenimiento', label: 'Entretenimiento', href: '#entretenimiento' },
  { id: 'decoracion', label: 'Decoración', href: '#decoracion' },
  { id: 'mobiliario', label: 'Mobiliario', href: '#mobiliario' },
  { id: 'personal', label: 'Personal', href: '#personal' },
  { id: 'bebidas', label: 'Bebidas', href: '#bebidas' },
  { id: 'paquetes', label: 'Paquetes', href: '#paquetes' },
  { id: 'adicionales', label: 'Adicionales', href: '#adicionales' },
]

export default function ServiceNavigation() {
  const [activeSection, setActiveSection] = useState<string>('salon')
  const [isOpen, setIsOpen] = useState(false)

  const handleScroll = useCallback(() => {
    const sections = navigationItems.map(item => item.id)
    const viewportHeight = window.innerHeight
    const scrollPosition = window.scrollY
    const documentHeight = document.documentElement.scrollHeight

    const isAtBottom = scrollPosition + viewportHeight >= documentHeight - 10
    if (isAtBottom) {
      setActiveSection(sections[sections.length - 1])
      return
    }

    let currentSection = sections[0]
    let maxVisibility = 0
    let foundActiveSection = false

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (!element) continue

      const rect = element.getBoundingClientRect()
      const elementHeight = rect.height
      const visibleTop = Math.max(0, -rect.top)
      const visibleBottom = Math.max(0, rect.bottom - viewportHeight)
      const visibleHeight = elementHeight - visibleTop - visibleBottom
      const visibilityRatio = Math.max(0, visibleHeight / elementHeight)
      const isInUpperHalf = rect.top < viewportHeight * 0.5 && rect.bottom > 0

      if (isInUpperHalf && visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio
        currentSection = sectionId
        foundActiveSection = true
      }
    }

    if (foundActiveSection) {
      setActiveSection(currentSection)
    }
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        requestAnimationFrame(handleScroll)
      }, 100)
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    requestAnimationFrame(handleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Botón flotante de navegación rápida (todas las pantallas). Se ubica en la
          esquina inferior izquierda para no solapar el contenido ni el botón de
          WhatsApp (esquina inferior derecha). */}
      <div className='fixed bottom-6 left-4 sm:left-6 z-40'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-12 h-12 bg-accent-3 rounded-full shadow-lg flex items-center justify-center text-background hover:bg-accent-2 transition-all duration-300'
          aria-label='Navegación de servicios'
          aria-expanded={isOpen}
          aria-controls='service-nav-menu'
        >
          {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 bg-background/70 backdrop-blur-sm z-30'
            onClick={() => setIsOpen(false)}
          />

          <div
            id='service-nav-menu'
            className='fixed bottom-24 left-4 sm:left-6 w-[calc(100%-2rem)] max-w-sm z-40'
          >
            <div className='bg-background/95 backdrop-blur-sm rounded-xl border border-gray-800 p-4 max-h-[70vh] overflow-y-auto'>
              <h3 className='font-raleway font-semibold text-foreground text-sm mb-4'>
                Ir a sección
              </h3>
              <nav className='grid grid-cols-2 gap-2'>
                {navigationItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-accent-3 text-background'
                        : 'text-gray-300 hover:text-accent-3 hover:bg-accent-3/10'
                    }`}
                    aria-current={activeSection === item.id ? 'true' : 'false'}
                  >
                    <span className='font-raleway text-sm'>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  )
}
