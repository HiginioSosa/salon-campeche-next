// Tipos para servicios del salón
export interface Service {
  id: string
  name: string
  description: string
  price: number
  unit?: string
  category:
    | 'venue'
    | 'decoration'
    | 'entertainment'
    | 'food'
    | 'staff'
    | 'equipment'
  isOptional?: boolean
  maxQuantity?: number
  dependencies?: string[] // IDs de servicios que dependen de este
}

// Tipo para cotización de paquetes
export interface QuoteItem {
  serviceId: string
  serviceName: string
  quantity: number
  unitPrice: number
  total: number
  description?: string
}

export interface Quote {
  id: string
  items: QuoteItem[]
  subtotal: number
  total: number
  advancePayment: number // 50% del total
  eventDate?: string
  guestCount: number
  notes?: string
  createdAt: Date
}

// Tipos para calendario de disponibilidad
export interface DateAvailability {
  date: string // formato YYYY-MM-DD
  isAvailable: boolean
  reason?: string // Motivo si no está disponible
  eventType?: string
}

// Tipos para testimonios
export interface Testimonial {
  id: string
  name: string
  eventType: string
  rating: number
  comment: string
  date: string
  location?: string
}

// Tipos para galería
export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
  eventType: string
  featured?: boolean
}

// Tipos para FAQs
export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'booking' | 'services' | 'pricing' | 'policies'
}

// Tipos para formularios de contacto
export interface ContactForm {
  name: string
  email: string
  phone: string
  eventDate?: string
  eventType: string
  guestCount?: number
  message: string
  services?: string[]
}

// Tipos para validaciones
export interface ValidationError {
  field: string
  message: string
}

export interface FormValidation {
  isValid: boolean
  errors: ValidationError[]
}

// Tipos para configuración de eventos
export interface EventConfig {
  maxGuests: {
    firstFloor: number
    bothFloors: number
  }
  minAdvanceBooking: number // días
  maxAdvanceBooking: number // días
  cancellationPolicy: {
    fullRefund: number // días antes del evento
    partialRefund: number // días antes del evento
    noRefund: number // días antes del evento
  }
  additionalHourCost: number
  maxEventTime: string // formato HH:MM
}

// Tipos para navegación
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType
  external?: boolean
}

// Tipos para animaciones
export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
  repeat?: boolean
}
