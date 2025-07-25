'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { businessInfo } from '@/lib/brand'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Paquetes', href: '/paquetes' },
  { name: 'Galería', href: '/galeria' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Disponibilidad', href: '/disponibilidad' },
  { name: 'FAQ', href: '/faq' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-elegant'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-section">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              {/* Logo horizontal del salón - búho minimalista en hexágono chocolate con texto al lado */}
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-3 rounded-lg flex items-center justify-center">
                <span className="text-background font-caveat font-bold text-lg lg:text-xl">
                  SC
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-caveat font-bold text-xl lg:text-2xl text-foreground">
                  {businessInfo.name}
                </h1>
                <p className="font-raleway text-xs lg:text-sm text-accent-3 -mt-1">
                  {businessInfo.slogan}
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-raleway font-medium text-foreground hover:text-accent-3 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-3 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${businessInfo.contact.phone}`}
              className="flex items-center space-x-2 bg-accent-3 hover:bg-accent-2 text-background px-4 py-2 rounded-lg font-raleway font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-foreground hover:text-accent-3 hover:bg-foreground hover:bg-opacity-10 transition-all duration-200"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-screen opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="py-4 space-y-1 bg-background/95 backdrop-blur-lg rounded-lg mt-2 border border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 font-raleway text-foreground hover:text-accent-3 hover:bg-foreground hover:bg-opacity-5 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 py-3">
              <a
                href={`tel:${businessInfo.contact.phone}`}
                className="flex items-center justify-center space-x-2 bg-accent-3 hover:bg-accent-2 text-background px-4 py-3 rounded-lg font-raleway font-semibold transition-all duration-300 w-full"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4" />
                <span>Llamar Ahora</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}