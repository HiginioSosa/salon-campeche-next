import type { ValidationError, FormValidation } from '@/types'

export interface QuoteFormData {
  guestCount: number
  eventDate: string
  eventType: string
  venueType: string
  tableType: string
  clientName: string
  notes: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  eventDate?: string
  eventType: string
  guestCount?: number
  message: string
  services?: string[]
}

// Validador para el formulario de cotización
export const validateQuoteForm = (
  data: Partial<QuoteFormData>
): FormValidation => {
  const errors: ValidationError[] = []

  // Validar número de invitados
  if (!data.guestCount || data.guestCount <= 0) {
    errors.push({
      field: 'guestCount',
      message: 'El número de invitados es requerido y debe ser mayor a 0',
    })
  } else if (data.guestCount > 250) {
    errors.push({
      field: 'guestCount',
      message: 'La capacidad máxima del salón es de 250 personas',
    })
  }

  // Validar tipo de evento
  if (!data.eventType) {
    errors.push({
      field: 'eventType',
      message: 'Selecciona el tipo de evento',
    })
  }

  // Validar tipo de salón
  if (!data.venueType) {
    errors.push({
      field: 'venueType',
      message: 'Selecciona el espacio del salón',
    })
  }

  // Validar capacidad vs salón seleccionado
  if (
    data.venueType === 'primer-piso' &&
    data.guestCount &&
    data.guestCount > 150
  ) {
    errors.push({
      field: 'venueType',
      message:
        'El primer piso tiene capacidad máxima de 150 personas. Considera usar ambos pisos.',
    })
  }

  // Validar fecha del evento
  if (data.eventDate) {
    const eventDate = new Date(data.eventDate)
    const today = new Date()
    const minDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 días mínimo

    if (eventDate < today) {
      errors.push({
        field: 'eventDate',
        message: 'La fecha del evento no puede ser en el pasado',
      })
    } else if (eventDate < minDate) {
      errors.push({
        field: 'eventDate',
        message: 'Se recomienda reservar con al menos 7 días de anticipación',
      })
    }
  }

  // Validar nombre del cliente si se proporciona
  if (data.clientName && data.clientName.length < 2) {
    errors.push({
      field: 'clientName',
      message: 'El nombre debe tener al menos 2 caracteres',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validador para formulario de contacto
export const validateContactForm = (
  data: Partial<ContactFormData>
): FormValidation => {
  const errors: ValidationError[] = []

  // Validar nombre
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'El nombre es requerido y debe tener al menos 2 caracteres',
    })
  }

  // Validar email
  if (!data.email) {
    errors.push({
      field: 'email',
      message: 'El email es requerido',
    })
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push({
        field: 'email',
        message: 'Ingresa un email válido',
      })
    }
  }

  // Validar teléfono
  if (!data.phone) {
    errors.push({
      field: 'phone',
      message: 'El teléfono es requerido',
    })
  } else {
    const phoneRegex = /^[0-9]{10}$/
    const cleanPhone = data.phone.replace(/\D/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      errors.push({
        field: 'phone',
        message: 'Ingresa un teléfono válido de 10 dígitos',
      })
    }
  }

  // Validar tipo de evento
  if (!data.eventType) {
    errors.push({
      field: 'eventType',
      message: 'Selecciona el tipo de evento',
    })
  }

  // Validar número de invitados si se proporciona
  if (data.guestCount && (data.guestCount <= 0 || data.guestCount > 250)) {
    errors.push({
      field: 'guestCount',
      message: 'El número de invitados debe estar entre 1 y 250',
    })
  }

  // Validar mensaje
  if (!data.message || data.message.trim().length < 10) {
    errors.push({
      field: 'message',
      message: 'El mensaje debe tener al menos 10 caracteres',
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validador para fechas de disponibilidad
export const validateEventDate = (
  date: string
): { isValid: boolean; message?: string } => {
  if (!date) {
    return { isValid: false, message: 'Selecciona una fecha' }
  }

  const eventDate = new Date(date)
  const today = new Date()
  const maxDate = new Date(
    today.getFullYear() + 2,
    today.getMonth(),
    today.getDate()
  )

  if (eventDate < today) {
    return { isValid: false, message: 'La fecha no puede ser en el pasado' }
  }

  if (eventDate > maxDate) {
    return {
      isValid: false,
      message: 'Solo aceptamos reservas hasta 2 años en adelante',
    }
  }

  // Verificar si es un día de la semana recomendado
  const dayOfWeek = eventDate.getDay()
  if (dayOfWeek === 1 || dayOfWeek === 2) {
    // Lunes o Martes
    return {
      isValid: true,
      message: 'Los lunes y martes tienen descuentos especiales',
    }
  }

  return { isValid: true }
}

// Función para limpiar y formatear teléfono
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`
  }
  return phone
}

// Función para limpiar y formatear nombre
export const formatName = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Validador de servicios seleccionados
export const validateSelectedServices = (
  services: { [key: string]: number },
  guestCount: number
): ValidationError[] => {
  const errors: ValidationError[] = []

  // Verificar si se seleccionaron mesas
  const hasTable = Object.keys(services).some(key => key.includes('mesas'))
  if (!hasTable && guestCount > 0) {
    errors.push({
      field: 'services',
      message: 'Se recomienda agregar mesas y sillas para los invitados',
    })
  }

  // Verificar cantidad de meseros
  const meseros = services['meseros'] || 0
  const recommendedStaff = Math.ceil(guestCount / 40)
  if (meseros > 0 && meseros < Math.max(3, recommendedStaff)) {
    errors.push({
      field: 'meseros',
      message: `Para ${guestCount} invitados se recomienda mínimo ${Math.max(3, recommendedStaff)} meseros`,
    })
  }

  // Verificar servicios de entretenimiento para eventos grandes
  if (guestCount > 100) {
    const hasDJ = services['dj-sonido'] > 0
    const hasEntertainment = Object.keys(services).some(
      key => key.includes('inflable') || key.includes('trampolin')
    )

    if (!hasDJ && !hasEntertainment) {
      errors.push({
        field: 'services',
        message:
          'Para eventos grandes se recomienda agregar DJ o entretenimiento',
      })
    }
  }

  return errors
}

// Función para generar recomendaciones inteligentes
export const generateSmartRecommendations = (
  data: Partial<QuoteFormData>,
  services: { [key: string]: number }
): string[] => {
  const recommendations: string[] = []

  if (!data.guestCount) return recommendations

  // Recomendaciones basadas en el tipo de evento
  if (data.eventType === 'Boda' || data.eventType === 'XV Años') {
    if (!services['dj-sonido']) {
      recommendations.push(
        'Para bodas y XV años es esencial contar con DJ profesional'
      )
    }
    if (!services['adornos-con-luz'] && !services['adornos-sencillos']) {
      recommendations.push(
        'La decoración con luces realza la elegancia de bodas y XV años'
      )
    }
    if (!services['mesa-dulces']) {
      recommendations.push(
        'Una mesa de dulces es perfecta para estos eventos especiales'
      )
    }
  }

  // Recomendaciones basadas en el número de invitados
  if (data.guestCount > 150 && data.venueType === 'primer-piso') {
    recommendations.push(
      'Para mayor comodidad de tus invitados, considera usar ambos pisos'
    )
  }

  if (data.guestCount > 50 && !services['dj-sonido']) {
    recommendations.push(
      'Con más de 50 invitados, el DJ mantiene el ambiente festivo'
    )
  }

  // Recomendaciones de temporada
  const eventDate = data.eventDate ? new Date(data.eventDate) : null
  if (eventDate) {
    const month = eventDate.getMonth()
    if (month >= 11 || month <= 1) {
      // Diciembre, Enero, Febrero
      recommendations.push(
        'En temporada navideña ofrecemos decoraciones temáticas especiales'
      )
    }
    if (month >= 4 && month <= 6) {
      // Mayo, Junio, Julio
      recommendations.push(
        'Temporada alta: te recomendamos reservar con mayor anticipación'
      )
    }
  }

  // Recomendaciones de ahorro
  if (data.guestCount && data.guestCount <= 120) {
    recommendations.push(
      'Para tu número de invitados, el paquete básico podría ser más económico'
    )
  }

  return recommendations
}
