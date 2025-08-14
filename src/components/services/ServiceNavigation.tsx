'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronRight, Menu, X } from 'lucide-react'

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

    // Check if we're at the bottom of the page
    const isAtBottom = scrollPosition + viewportHeight >= documentHeight - 10

    if (isAtBottom) {
      // If at bottom, keep the last section active
      setActiveSection(sections[sections.length - 1])
      return
    }

    // Find the section that's most visible in the viewport
    let currentSection = sections[0]
    let maxVisibility = 0
    let foundActiveSection = false

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (!element) continue

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const elementHeight = rect.height

      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, -elementTop)
      const visibleBottom = Math.max(0, elementBottom - viewportHeight)
      const visibleHeight = elementHeight - visibleTop - visibleBottom
      const visibilityRatio = Math.max(0, visibleHeight / elementHeight)

      // Consider section active if it's in the upper half of viewport
      const isInUpperHalf =
        elementTop < viewportHeight * 0.5 && elementBottom > 0

      if (isInUpperHalf && visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio
        currentSection = sectionId
        foundActiveSection = true
      }
    }

    // Only update if we found an active section, otherwise keep current
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
    handleScroll() // Check initial position

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
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className='hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40'>
        <div className='bg-background bg-opacity-90 backdrop-blur-sm rounded-xl border border-gray-800 p-4 max-w-xs'>
          <h3 className='font-raleway font-semibold text-foreground text-sm mb-4'>
            Navegación Rápida
          </h3>
          <nav className='space-y-2'>
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-accent-3 text-background'
                    : 'text-gray-300 hover:text-accent-3 hover:bg-accent-3 hover:bg-opacity-10'
                }`}
                aria-current={activeSection === item.id ? 'true' : 'false'}
              >
                <span className='font-raleway text-sm'>{item.label}</span>
                <ChevronRight
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeSection === item.id
                      ? 'rotate-90'
                      : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <div className='lg:hidden fixed bottom-20 left-4 z-40'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-12 h-12 bg-accent-3 rounded-full shadow-lg flex items-center justify-center text-background hover:bg-accent-2 transition-all duration-300'
          aria-label='Navegación de servicios'
        >
          {isOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className='lg:hidden fixed inset-0 bg-background bg-opacity-70 backdrop-blur-sm z-30'
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className='lg:hidden fixed bottom-36 left-4 right-4 z-40'>
            <div className='bg-background bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-800 p-4 max-h-96 overflow-y-auto'>
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
                        : 'text-gray-300 hover:text-accent-3 hover:bg-accent-3 hover:bg-opacity-10'
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
