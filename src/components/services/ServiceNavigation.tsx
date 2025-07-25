'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-background bg-opacity-90 backdrop-blur-sm rounded-xl border border-gray-800 p-4 max-w-xs">
          <h3 className="font-raleway font-semibold text-foreground text-sm mb-4">
            Navegación Rápida
          </h3>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-accent-3 text-background'
                    : 'text-gray-300 hover:text-accent-3 hover:bg-accent-3 hover:bg-opacity-10'
                }`}
              >
                <span className="font-raleway text-sm">{item.label}</span>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeSection === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
                  }`} 
                />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Button */}
      <div className="lg:hidden fixed bottom-20 left-4 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-accent-3 rounded-full shadow-lg flex items-center justify-center text-background hover:bg-accent-2 transition-all duration-300"
          aria-label="Navegación de servicios"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="lg:hidden fixed inset-0 bg-background bg-opacity-70 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="lg:hidden fixed bottom-36 left-4 right-4 z-40">
            <div className="bg-background bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-800 p-4 max-h-96 overflow-y-auto">
              <h3 className="font-raleway font-semibold text-foreground text-sm mb-4">
                Ir a sección
              </h3>
              <nav className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-accent-3 text-background'
                        : 'text-gray-300 hover:text-accent-3 hover:bg-accent-3 hover:bg-opacity-10'
                    }`}
                  >
                    <span className="font-raleway text-sm">{item.label}</span>
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