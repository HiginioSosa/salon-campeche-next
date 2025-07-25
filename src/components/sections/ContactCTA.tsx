'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, MessageCircle, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'
import { Section, Button, Card, CardContent } from '@/components'
import { businessInfo } from '@/lib/brand'

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const eventTypes = [
    'Boda',
    'XV Años', 
    'Cumpleaños',
    'Baby Shower',
    'Aniversario',
    'Graduación',
    'Corporativo',
    'Otro'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío (aquí iría la lógica real de envío)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Generar mensaje de WhatsApp
      const message = `¡Hola! Me interesa cotizar un evento.

*Información del evento:*
- Nombre: ${formData.name}
- Teléfono: ${formData.phone}
- Tipo de evento: ${formData.eventType}
- Fecha tentativa: ${formData.eventDate || 'Por definir'}
- Número de invitados: ${formData.guestCount || 'Por definir'}
- Mensaje: ${formData.message || 'Sin mensaje adicional'}

¡Espero su respuesta!`

      const phoneNumber = businessInfo.contact.whatsapp.replace(/\D/g, '')
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <Section variant="gradient" size="xl">
        <div className="max-w-2xl mx-auto text-center">
          <Card variant="glass" padding="xl">
            <CardContent>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="font-caveat font-bold text-3xl text-foreground mb-4">
                ¡Mensaje enviado exitosamente!
              </h2>
              
              <p className="font-raleway text-gray-300 mb-8 leading-relaxed">
                Tu consulta ha sido enviada por WhatsApp. Nuestro equipo te responderá muy pronto 
                para ayudarte a planear tu evento perfecto.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({
                      name: '', phone: '', eventType: '', eventDate: '', guestCount: '', message: ''
                    })
                  }}
                  variant="secondary"
                >
                  Enviar Otra Consulta
                </Button>
                
                <Link href="/disponibilidad">
                  <Button>
                    Ver Disponibilidad
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    )
  }

  return (
    <Section variant="gradient" size="xl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-caveat font-bold text-4xl md:text-5xl text-foreground mb-4">
            ¿Listo para planear tu evento?
          </h2>
          <p className="font-raleway text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contáctanos ahora y recibe atención personalizada para crear la celebración de tus sueños
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulario de contacto rápido */}
          <Card variant="glass" padding="lg">
            <CardContent>
              <h3 className="font-caveat font-bold text-2xl text-foreground mb-6">
                Cotización Rápida
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-custom w-full"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-custom w-full"
                      placeholder="55 1234 5678"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="eventType" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                      Tipo de evento
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="input-custom w-full"
                    >
                      <option value="">Selecciona el tipo</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                      Fecha del evento
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="input-custom w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="guestCount" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                    Número aproximado de invitados
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="input-custom w-full"
                    placeholder="ej. 120"
                    min="1"
                    max="250"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-raleway font-medium text-gray-300 mb-2">
                    Mensaje adicional
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-custom w-full resize-none"
                    placeholder="Cuéntanos sobre tu evento ideal, servicios de interés, etc."
                  />
                </div>

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full"
                  icon={<Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
                </Button>
              </form>

              <p className="text-gray-400 text-xs mt-4 text-center">
                * Al enviar, tu consulta se abrirá en WhatsApp para contacto directo
              </p>
            </CardContent>
          </Card>

          {/* Información de contacto e incentivos */}
          <div className="space-y-6">
            
            {/* Información de contacto */}
            <Card variant="elevated" padding="lg">
              <CardContent>
                <h3 className="font-caveat font-bold text-2xl text-foreground mb-6">
                  Múltiples formas de contacto
                </h3>
                
                <div className="space-y-4">
                  <a 
                    href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-raleway font-semibold text-foreground group-hover:text-green-400 transition-colors duration-200">
                        WhatsApp
                      </h4>
                      <p className="text-gray-300 text-sm">{businessInfo.contact.whatsapp}</p>
                      <p className="text-green-400 text-xs">Respuesta inmediata</p>
                    </div>
                  </a>

                  <a 
                    href={`tel:${businessInfo.contact.phone}`}
                    className="flex items-center space-x-4 p-4 bg-accent-3 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-accent-3 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-raleway font-semibold text-foreground group-hover:text-accent-3 transition-colors duration-200">
                        Llamada directa
                      </h4>
                      <p className="text-gray-300 text-sm">{businessInfo.contact.phone}</p>
                      <p className="text-accent-3 text-xs">Lunes a domingo</p>
                    </div>
                  </a>

                  <a 
                    href={`mailto:${businessInfo.contact.email}`}
                    className="flex items-center space-x-4 p-4 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-raleway font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200">
                        Email
                      </h4>
                      <p className="text-gray-300 text-sm">{businessInfo.contact.email}</p>
                      <p className="text-blue-400 text-xs">Respuesta en 24h</p>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <Card variant="outlined" padding="lg">
              <CardContent>
                <h3 className="font-caveat font-bold text-xl text-foreground mb-4">
                  ¿Por qué elegirnos?
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: <Clock className="w-4 h-4" />, text: "Respuesta inmediata por WhatsApp" },
                    { icon: <MapPin className="w-4 h-4" />, text: "Ubicación accesible en Ixtapaluca" },
                    { icon: <CheckCircle className="w-4 h-4" />, text: "3 años de experiencia comprobada" },
                    { icon: <Phone className="w-4 h-4" />, text: "Atención personalizada garantizada" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-accent-3">
                        {item.icon}
                      </div>
                      <p className="font-raleway text-gray-300 text-sm">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links adicionales */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/disponibilidad" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Ver Disponibilidad
                </Button>
              </Link>
              
              <Link href="/paquetes" className="flex-1">
                <Button variant="ghost" className="w-full">
                  Cotizador Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}