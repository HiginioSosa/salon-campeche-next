'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { businessInfo } from '@/lib/brand'

interface WhatsAppButtonProps {
  message?: string
}

export default function WhatsAppButton({ 
  message = "¡Hola! Me interesa conocer más sobre sus servicios para eventos. ¿Podrían brindarme información?"
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    
    // Mostrar después de 3 segundos en la primera carga
    const timer = setTimeout(() => {
      setShowTooltip(true)
      // Ocultar tooltip después de 5 segundos
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      clearTimeout(timer)
    }
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = businessInfo.contact.whatsapp.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleTooltipClose = () => {
    setShowTooltip(false)
  }

  return (
    <>
      {/* Botón principal de WhatsApp */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="relative">
          {/* Tooltip informativo */}
          {showTooltip && (
            <div className="absolute bottom-16 right-0 mb-2 animate-slide-up">
              <div className="bg-white rounded-lg shadow-xl p-4 max-w-xs relative">
                <button
                  onClick={handleTooltipClose}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Cerrar mensaje"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="pr-6">
                  <h4 className="font-raleway font-semibold text-gray-800 text-sm mb-1">
                    ¡Cotiza tu evento!
                  </h4>
                  <p className="font-raleway text-gray-600 text-xs leading-relaxed">
                    Escríbenos por WhatsApp para recibir atención personalizada
                  </p>
                </div>
                {/* Flecha del tooltip */}
                <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
              </div>
            </div>
          )}

          {/* Botón de WhatsApp */}
          <button
            onClick={handleWhatsAppClick}
            className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-bounce-subtle group"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-200" />
            
            {/* Pulso animado */}
            <div className="absolute inset-0 w-14 h-14 bg-green-500 rounded-full animate-ping opacity-20"></div>
          </button>

          {/* Indicador de notificación */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
      </div>

      {/* Versión móvil siempre visible */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={handleWhatsAppClick}
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform active:scale-95"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      </div>
    </>
  )
}