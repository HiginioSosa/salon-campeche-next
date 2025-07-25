import type { Service } from '@/types'

// Servicios disponibles del salón
export const services: Service[] = [
  // Renta del espacio
  {
    id: 'salon-primer-piso',
    name: 'Renta Primer Piso',
    description: 'Capacidad para máximo 150 personas',
    price: 4000,
    category: 'venue',
    isOptional: false,
  },
  {
    id: 'salon-ambos-pisos',
    name: 'Renta Ambos Pisos',
    description: 'Capacidad para máximo 250 personas',
    price: 6000,
    category: 'venue',
    isOptional: false,
  },

  // Mobiliario
  {
    id: 'mesas-vestidas',
    name: 'Mesas Vestidas',
    description:
      'Mantel blanco + mantel de color + sillas con funda y moño (10 personas por mesa)',
    price: 270,
    unit: 'mesa',
    category: 'equipment',
    isOptional: true,
  },
  {
    id: 'mesas-sencillas',
    name: 'Mesas Sencillas',
    description: 'Mantel blanco + 10 sillas (rectangular o circular)',
    price: 200,
    unit: 'mesa',
    category: 'equipment',
    isOptional: true,
  },

  // Entretenimiento
  {
    id: 'dj-sonido',
    name: 'DJ con Sonido y Luces',
    description: '5 horas de servicio, horario inicial a elegir',
    price: 2700,
    category: 'entertainment',
    isOptional: true,
  },
  {
    id: 'inflable-ninos',
    name: 'Inflable para Niños',
    description: 'Con alberca pequeña de pelotas - todo el día',
    price: 1200,
    category: 'entertainment',
    isOptional: true,
  },
  {
    id: 'trampolin',
    name: 'Trampolín Grande',
    description: 'Todo el día',
    price: 1000,
    category: 'entertainment',
    isOptional: true,
  },

  // Decoración
  {
    id: 'adornos-sencillos',
    name: 'Adornos Sencillos',
    description: 'Arco sencillo + 4 torres con globos + tul y luz en barandal',
    price: 2700,
    category: 'decoration',
    isOptional: true,
  },
  {
    id: 'adornos-con-luz',
    name: 'Adornos con Luz',
    description: 'Arco con luz + 4 torres con globos + tul y luz en barandal',
    price: 3200,
    category: 'decoration',
    isOptional: true,
  },
  {
    id: 'mesa-dulces',
    name: 'Mesa de Dulces',
    description: 'Personalizable según cantidad y personalización solicitada',
    price: 3500,
    category: 'food',
    isOptional: true,
  },

  // Personal y servicio
  {
    id: 'meseros',
    name: 'Servicio de Meseros',
    description: 'Mínimo 3 por evento',
    price: 400,
    unit: 'mesero',
    category: 'staff',
    isOptional: true,
  },
  {
    id: 'vajilla',
    name: 'Vajilla Completa',
    description: 'Vaso + platos 3 tiempos + cubiertos',
    price: 25,
    unit: 'persona',
    category: 'equipment',
    isOptional: true,
  },

  // Bebidas
  {
    id: 'cerveza-corona',
    name: 'Cerveza Corona/Victoria',
    description: 'Cartón de 24 cervezas de media',
    price: 400,
    unit: 'cartón',
    category: 'food',
    isOptional: true,
  },
  {
    id: 'cerveza-indio',
    name: 'Cerveza Indio/Tecate',
    description: 'Cartón de 20 cervezas de media',
    price: 300,
    unit: 'cartón',
    category: 'food',
    isOptional: true,
  },
  {
    id: 'cerveza-xx',
    name: 'Cerveza XX Lager',
    description: 'Cartón de 20 cervezas de media',
    price: 320,
    unit: 'cartón',
    category: 'food',
    isOptional: true,
  },
]

// Funciones auxiliares para cálculos
export const calculateTablesNeeded = (guestCount: number): number => {
  return Math.ceil(guestCount / 10)
}

export const calculateMinimumStaff = (guestCount: number): number => {
  if (guestCount <= 50) return 3
  if (guestCount <= 100) return 4
  if (guestCount <= 150) return 5
  if (guestCount <= 200) return 6
  return 7
}

export const getVenueRecommendation = (
  guestCount: number
): 'primer-piso' | 'ambos-pisos' => {
  return guestCount <= 150 ? 'primer-piso' : 'ambos-pisos'
}

// Paquetes predefinidos populares
export const popularPackages = [
  {
    id: 'basico-150',
    name: 'Paquete Básico',
    description: 'Ideal para eventos hasta 150 personas',
    maxGuests: 150,
    includedServices: [
      'salon-primer-piso',
      'mesas-sencillas', // 15 mesas
      'meseros', // 3 meseros
    ],
    basePrice: 8200,
    popular: false,
  },
  {
    id: 'completo-150',
    name: 'Paquete Completo',
    description: 'Todo incluido para eventos hasta 150 personas',
    maxGuests: 150,
    includedServices: [
      'salon-primer-piso',
      'mesas-vestidas', // 15 mesas
      'dj-sonido',
      'adornos-sencillos',
      'meseros', // 3 meseros
    ],
    basePrice: 14650,
    popular: true,
  },
  {
    id: 'premium-250',
    name: 'Paquete Premium',
    description: 'Experiencia completa para eventos hasta 250 personas',
    maxGuests: 250,
    includedServices: [
      'salon-ambos-pisos',
      'mesas-vestidas', // 25 mesas
      'dj-sonido',
      'adornos-con-luz',
      'mesa-dulces',
      'trampolin',
      'meseros', // 5 meseros
    ],
    basePrice: 25950,
    popular: false,
  },
]
