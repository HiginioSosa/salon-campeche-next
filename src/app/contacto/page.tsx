'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Send,
  User,
  Calendar,
  Users as UsersIcon,
  MessageSquare,
  Shield,
  Award,
  Zap,
} from 'lucide-react'
import {
  MainLayout,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
  Facebook,
  Instagram,
} from '@/components'
import { businessInfo } from '@/lib/brand'

const eventTypes = [
  'Boda',
  'XV Años',
  'Cumpleaños',
  'Baby Shower',
  'Aniversario',
  'Graduación',
  'Corporativo',
  'Otro',
]

const whyChooseUs = [
  {
    icon: <Clock className='w-6 h-6' />,
    title: 'Respuesta Inmediata',
    description:
      'Contestamos por WhatsApp en menos de 15 minutos durante horario laboral',
  },
  {
    icon: <Shield className='w-6 h-6' />,
    title: 'Confianza Garantizada',
    description:
      '150+ eventos exitosos y testimonios reales de clientes satisfechos',
  },
  {
    icon: <Award className='w-6 h-6' />,
    title: 'Calidad Profesional',
    description:
      'Equipo capacitado y servicios de alta calidad para tu evento perfecto',
  },
  {
    icon: <Zap className='w-6 h-6' />,
    title: 'Proceso Simplificado',
    description:
      'Un solo lugar, un solo contrato, coordinación completa de todos los servicios',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
    preferredContact: 'whatsapp',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido'
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email inválido'
    if (!formData.eventType)
      newErrors.eventType = 'Selecciona el tipo de evento'
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      const message = `¡Hola! Me interesa cotizar un evento.

*Información de contacto:*
👤 Nombre: ${formData.name}
📱 Teléfono: ${formData.phone}
📧 Email: ${formData.email}

*Detalles del evento:*
🎉 Tipo: ${formData.eventType}
📅 Fecha: ${formData.eventDate || 'Por definir'}
👥 Invitados: ${formData.guestCount || 'Por definir'}

*Mensaje:*
${formData.message}

¡Espero su respuesta!`

      const phoneNumber = businessInfo.contact.whatsapp.replace(/\D/g, '')
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: '',
      eventDate: '',
      guestCount: '',
      message: '',
      preferredContact: 'whatsapp',
    })
    setIsSubmitted(false)
    setErrors({})
  }

  if (isSubmitted) {
    return (
      <MainLayout>
        <Section variant='gradient' size='xl'>
          <div className='max-w-2xl mx-auto text-center'>
            <Card variant='glass' padding='xl'>
              <CardContent>
                <div className='w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <CheckCircle className='w-10 h-10 text-white' />
                </div>

                <h1 className='font-caveat font-bold text-4xl text-foreground mb-4'>
                  ¡Mensaje enviado exitosamente!
                </h1>

                <p className='font-raleway text-gray-300 mb-8 leading-relaxed text-lg'>
                  Tu consulta ha sido enviada por WhatsApp. Nuestro equipo te
                  responderá muy pronto para ayudarte a planear tu evento
                  perfecto.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                  <Button onClick={resetForm} variant='secondary'>
                    Enviar Otra Consulta
                  </Button>
                  <Link href='/disponibilidad'>
                    <Button>Ver Disponibilidad</Button>
                  </Link>
                </div>

                <div className='text-center'>
                  <p className='font-raleway text-gray-400 text-sm mb-2'>
                    También puedes contactarnos directamente:
                  </p>
                  <a
                    href={`tel:${businessInfo.contact.phone}`}
                    className='font-raleway text-accent-3 hover:text-accent-2 transition-colors duration-200 font-semibold'
                  >
                    📞 {businessInfo.contact.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </MainLayout>
    )
  }

  return (
    <MainLayout whatsAppMessage='¡Hola! Estoy visitando su página de contacto y me gustaría recibir información personalizada sobre mis servicios.'>
      <Section variant='gradient' size='lg'>
        <SectionHeader
          subtitle='Contacto'
          title='¡Hagamos realidad tu evento soñado!'
          description='Estamos aquí para ayudarte en cada paso. Contáctanos y recibe atención personalizada para crear la celebración perfecta.'
        />
      </Section>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <div>
            <Card variant='elevated' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-6'>
                  <div className='w-12 h-12 bg-accent-3/20 rounded-xl flex items-center justify-center'>
                    <MessageSquare className='w-6 h-6 text-accent-3' />
                  </div>
                  <div>
                    <h2 className='font-caveat font-bold text-2xl text-foreground'>
                      Solicita tu Cotización
                    </h2>
                    <p className='font-raleway text-gray-300 text-sm'>
                      Completa el formulario y te contactamos
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                      >
                        Nombre completo *
                      </label>
                      <div className='relative'>
                        <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input
                          type='text'
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`input-custom w-full pl-10 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder='Tu nombre completo'
                        />
                      </div>
                      {errors.name && (
                        <p className='text-red-400 text-xs mt-1'>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                      >
                        Teléfono *
                      </label>
                      <div className='relative'>
                        <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input
                          type='tel'
                          id='phone'
                          name='phone'
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`input-custom w-full pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder='55 1234 5678'
                        />
                      </div>
                      {errors.phone && (
                        <p className='text-red-400 text-xs mt-1'>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                    >
                      Email *
                    </label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`input-custom w-full pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder='tu.email@ejemplo.com'
                      />
                    </div>
                    {errors.email && (
                      <p className='text-red-400 text-xs mt-1'>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                      <label
                        htmlFor='eventType'
                        className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                      >
                        Tipo de evento *
                      </label>
                      <select
                        id='eventType'
                        name='eventType'
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className={`input-custom w-full ${errors.eventType ? 'border-red-500' : ''}`}
                      >
                        <option value=''>Selecciona...</option>
                        {eventTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.eventType && (
                        <p className='text-red-400 text-xs mt-1'>
                          {errors.eventType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='eventDate'
                        className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                      >
                        Fecha tentativa
                      </label>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input
                          type='date'
                          id='eventDate'
                          name='eventDate'
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          className='input-custom w-full pl-10'
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor='guestCount'
                        className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                      >
                        Nº de invitados
                      </label>
                      <div className='relative'>
                        <UsersIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <input
                          type='number'
                          id='guestCount'
                          name='guestCount'
                          value={formData.guestCount}
                          onChange={handleInputChange}
                          className='input-custom w-full pl-10'
                          placeholder='120'
                          min='1'
                          max='250'
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='message'
                      className='block text-sm font-raleway font-medium text-gray-300 mb-2'
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id='message'
                      name='message'
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`input-custom w-full resize-none ${errors.message ? 'border-red-500' : ''}`}
                      placeholder='Cuéntanos sobre tu evento ideal, servicios de interés, presupuesto aproximado, etc.'
                    />
                    {errors.message && (
                      <p className='text-red-400 text-xs mt-1'>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type='submit'
                    loading={isSubmitting}
                    className='w-full'
                    size='lg'
                    icon={<Send className='w-5 h-5' />}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar por WhatsApp'}
                  </Button>

                  <p className='text-gray-400 text-xs text-center'>
                    * Al enviar, tu consulta se abrirá en WhatsApp para contacto
                    directo
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className='space-y-8'>
            <Card variant='elevated' padding='lg'>
              <CardContent>
                <h3 className='font-caveat font-bold text-2xl text-foreground mb-6'>
                  Contáctanos Directamente
                </h3>

                <div className='space-y-4'>
                  <a
                    href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-4 p-4 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-all duration-300 group'
                  >
                    <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center'>
                      <MessageCircle className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-raleway font-semibold text-foreground group-hover:text-green-400 transition-colors duration-200'>
                        WhatsApp
                      </h4>
                      <p className='text-gray-300 text-sm'>
                        {businessInfo.contact.whatsapp}
                      </p>
                      <p className='text-green-400 text-xs'>
                        ✅ Respuesta inmediata
                      </p>
                    </div>
                  </a>

                  <a
                    href={`tel:${businessInfo.contact.phone}`}
                    className='flex items-center space-x-4 p-4 bg-accent-3/20 rounded-lg hover:bg-accent-3/30 transition-all duration-300 group'
                  >
                    <div className='w-12 h-12 bg-accent-3 rounded-full flex items-center justify-center'>
                      <Phone className='w-6 h-6 text-background' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-raleway font-semibold text-foreground group-hover:text-accent-3 transition-colors duration-200'>
                        Llamada directa
                      </h4>
                      <p className='text-gray-300 text-sm'>
                        {businessInfo.contact.phone}
                      </p>
                      <p className='text-accent-3 text-xs'>
                        📞 Lunes a domingo 9:00 AM - 8:00 PM
                      </p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${businessInfo.contact.email}`}
                    className='flex items-center space-x-4 p-4 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-all duration-300 group'
                  >
                    <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
                      <Mail className='w-6 h-6 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-raleway font-semibold text-foreground group-hover:text-blue-400 transition-colors duration-200'>
                        Email
                      </h4>
                      <p className='text-gray-300 text-sm'>
                        {businessInfo.contact.email}
                      </p>
                      <p className='text-blue-400 text-xs'>
                        📧 Respuesta en 24 horas
                      </p>
                    </div>
                  </a>
                </div>

                <div className='mt-6 pt-6 border-t border-gray-700'>
                  <h4 className='font-raleway font-semibold text-foreground mb-4'>
                    Síguenos en redes
                  </h4>
                  <div className='flex space-x-4'>
                    <a
                      href={`https://facebook.com/${businessInfo.contact.social.facebook.replace('@', '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200'
                    >
                      <Facebook className='w-5 h-5' />
                      <span className='font-raleway text-sm'>Facebook</span>
                    </a>
                    <a
                      href={`https://instagram.com/${businessInfo.contact.social.instagram.replace(' ', '')}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-200'
                    >
                      <Instagram className='w-5 h-5' />
                      <span className='font-raleway text-sm'>Instagram</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant='elevated' padding='lg'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <MapPin className='w-6 h-6 text-accent-3' />
                  <h3 className='font-caveat font-bold text-2xl text-foreground'>
                    Nuestra Ubicación
                  </h3>
                </div>

                <div className='mb-4'>
                  <p className='font-raleway text-gray-300 leading-relaxed'>
                    {businessInfo.contact.address.full}
                  </p>
                </div>

                <div className='aspect-video rounded-lg overflow-hidden bg-gray-900'>
                  <iframe
                    src='https://maps.google.com/maps?q=Calle%20Campeche%20Mz%2022%20Lt%20626b,%20Ampliación%20San%20Francisco,%20Ixtapaluca,%20Estado%20de%20México&t=&z=16&ie=UTF8&iwloc=&output=embed'
                    width='100%'
                    height='100%'
                    style={{ border: 0 }}
                    allowFullScreen
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='Ubicación Salón Campeche'
                  />
                </div>

                <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='font-raleway text-gray-300'>
                      Estacionamiento gratuito
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='font-raleway text-gray-300'>
                      Fácil acceso
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='font-raleway text-gray-300'>
                      Transporte público cercano
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <span className='font-raleway text-gray-300'>
                      Zona segura
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant='outlined' padding='md'>
              <CardContent>
                <div className='flex items-center space-x-3 mb-4'>
                  <Clock className='w-5 h-5 text-accent-3' />
                  <h4 className='font-raleway font-semibold text-foreground'>
                    Horarios de Atención
                  </h4>
                </div>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='font-raleway text-gray-300'>
                      Lunes - Viernes:
                    </span>
                    <span className='font-raleway text-foreground font-semibold'>
                      9:00 AM - 8:00 PM
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-raleway text-gray-300'>Sábados:</span>
                    <span className='font-raleway text-foreground font-semibold'>
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='font-raleway text-gray-300'>
                      Domingos:
                    </span>
                    <span className='font-raleway text-foreground font-semibold'>
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className='pt-2 border-t border-gray-700'>
                    <p className='font-raleway text-accent-3 text-xs'>
                      💬 WhatsApp disponible 24/7 para consultas urgentes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Section variant='dark' size='lg'>
          <SectionHeader
            title='¿Por qué elegir Salón Campeche?'
            description='Más de 150 eventos exitosos nos respaldan. Conoce las razones por las que somos la mejor opción para tu celebración.'
          />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {whyChooseUs.map((reason, index) => (
              <Card key={index} hover className='text-center group'>
                <CardContent>
                  <div className='w-16 h-16 bg-accent-3/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-3 group-hover:text-background transition-all duration-300'>
                    <div className='text-accent-3 group-hover:text-background'>
                      {reason.icon}
                    </div>
                  </div>

                  <h3 className='font-raleway font-bold text-foreground mb-3 group-hover:text-accent-3 transition-colors duration-300'>
                    {reason.title}
                  </h3>

                  <p className='font-raleway text-gray-300 text-sm leading-relaxed'>
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-12'>
            <div className='text-center'>
              <div className='font-caveat font-bold text-4xl text-accent-3 mb-2'>
                150+
              </div>
              <p className='font-raleway text-gray-300 text-sm'>
                Eventos Realizados
              </p>
            </div>
            <div className='text-center'>
              <div className='font-caveat font-bold text-4xl text-accent-3 mb-2'>
                98%
              </div>
              <p className='font-raleway text-gray-300 text-sm'>Satisfacción</p>
            </div>
            <div className='text-center'>
              <div className='font-caveat font-bold text-4xl text-accent-3 mb-2'>
                15min
              </div>
              <p className='font-raleway text-gray-300 text-sm'>
                Tiempo de Respuesta
              </p>
            </div>
            <div className='text-center'>
              <div className='font-caveat font-bold text-4xl text-accent-3 mb-2'>
                3
              </div>
              <p className='font-raleway text-gray-300 text-sm'>
                Años de Experiencia
              </p>
            </div>
          </div>
        </Section>

        <Section variant='gradient' size='lg'>
          <div className='text-center'>
            <h2 className='font-caveat font-bold text-4xl text-foreground mb-6'>
              ¡Estamos listos para hacer tu evento realidad!
            </h2>
            <p className='font-raleway text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
              No esperes más. Contáctanos hoy y comencemos a planear la
              celebración de tus sueños.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <a
                href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button size='lg' icon={<MessageCircle className='w-5 h-5' />}>
                  Contactar por WhatsApp
                </Button>
              </a>

              <Link href='/paquetes'>
                <Button variant='secondary' size='lg'>
                  Ver Paquetes y Precios
                </Button>
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  )
}
