'use client'

import { useState } from 'react'
import { Plus, Minus, Info, HelpCircle } from 'lucide-react'
import { Card, CardContent, Button } from '@/components'

interface AdditionalService {
  id: string
  name: string
  description: string
  category: 'food' | 'decoration' | 'entertainment' | 'staff' | 'equipment'
  pricing: 'quote' | 'custom' | 'hourly'
  basePrice?: number
  unit?: string
  popular?: boolean
  examples?: string[]
}

const additionalServices: AdditionalService[] = [
  {
    id: 'catering-taquiza',
    name: 'Taquiza Completa',
    description: 'Servicio de taquiza con guisados variados, tortillas calientes y agua fresca',
    category: 'food',
    pricing: 'quote',
    examples: ['Guisados tradicionales', 'Tortillas hechas a mano', 'Salsas caseras', 'Agua fresca incluida'],
    popular: true
  },
  {
    id: 'catering-buffet',
    name: 'Buffet Completo',
    description: 'Servicio de buffet con variedad de platillos principales, guarniciones y postres',
    category: 'food',
    pricing: 'quote',
    examples: ['Platos principales variados', 'Ensaladas frescas', 'Guarniciones', 'Pan y postres']
  },
  {
    id: 'catering-tres-tiempos',
    name: 'Comida de 3 Tiempos',
    description: 'Servicio formal de comida con entrada, plato fuerte y postre',
    category: 'food',
    pricing: 'quote',
    examples: ['Entrada elegante', 'Plato fuerte a elegir', 'Postre gourmet', 'Servicio a la mesa']
  },
  {
    id: 'fotografia-profesional',
    name: 'Fotografía Profesional',
    description: 'Servicio de fotografía profesional para capturar los mejores momentos',
    category: 'entertainment',
    pricing: 'quote',
    examples: ['Fotógrafo profesional', 'Galería digital', 'Fotos editadas', 'Entrega rápida']
  },
  {
    id: 'video-profesional',
    name: 'Video y Filmación',
    description: 'Servicio de video profesional con edición y entrega digital',
    category: 'entertainment',
    pricing: 'quote',
    examples: ['Camarógrafo profesional', 'Video editado', 'Entrega digital', 'Momentos destacados']
  },
  {
    id: 'animacion-infantil',
    name: 'Animación Infantil',
    description: 'Animadores profesionales para entretener a los niños durante el evento',
    category: 'entertainment',
    pricing: 'hourly',
    basePrice: 800,
    unit: 'hora',
    examples: ['Animadores capacitados', 'Juegos dinámicos', 'Maquillaje artístico', 'Show interactivo']
  },
  {
    id: 'decoracion-tematica',
    name: 'Decoración Temática Premium',
    description: 'Decoración personalizada según el tema específico de tu evento',
    category: 'decoration',
    pricing: 'custom',
    examples: ['Diseño personalizado', 'Elementos temáticos', 'Colores específicos', 'Ambientación completa'],
    popular: true
  },
  {
    id: 'flores-naturales',
    name: 'Arreglos Florales',
    description: 'Arreglos florales naturales para centros de mesa y decoración',
    category: 'decoration',
    pricing: 'quote',
    examples: ['Flores frescas', 'Centros de mesa', 'Arreglos variados', 'Diseño elegante']
  },
  {
    id: 'seguridad-evento',
    name: 'Seguridad Privada',
    description: 'Personal de seguridad para eventos grandes y garantizar tranquilidad',
    category: 'staff',
    pricing: 'hourly',
    basePrice: 300,
    unit: 'hora por guardia',
    examples: ['Personal capacitado', 'Uniforme formal', 'Control de acceso', 'Vigilancia discreta']
  },
  {
    id: 'valet-parking',
    name: 'Valet Parking',
    description: 'Servicio de valet parking para mayor comodidad de tus invitados',
    category: 'staff',
    pricing: 'hourly',
    basePrice: 200,
    unit: 'hora por persona',
    examples: ['Personal uniformado', 'Cuidado de vehículos', 'Servicio profesional', 'Mayor comodidad']
  },
  {
    id: 'equipo-karaoke',
    name: 'Equipo de Karaoke',
    description: 'Sistema de karaoke completo para diversión adicional',
    category: 'equipment',
    pricing: 'quote',
    examples: ['Pantalla grande', 'Micrófonos inalámbricos', 'Catálogo amplio', 'Fácil operación']
  },
  {
    id: 'barra-libre',
    name: 'Barra Libre',
    description: 'Servicio de barra libre con bartender profesional',
    category: 'food',
    pricing: 'quote',
    examples: ['Bartender profesional', 'Bebidas premium', 'Cocteles variados', 'Servicio continuo'],
    popular: true
  }
]

export default function AdditionalServices() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const toggleExpanded = (serviceId: string) => {
    setExpandedService(prev => prev === serviceId ? null : serviceId)
  }

  const categorizeServices = () => {
    const categories = {
      food: additionalServices.filter(s => s.category === 'food'),
      decoration: additionalServices.filter(s => s.category === 'decoration'),
      entertainment: additionalServices.filter(s => s.category === 'entertainment'),
      staff: additionalServices.filter(s => s.category === 'staff'),
      equipment: additionalServices.filter(s => s.category === 'equipment')
    }
    return categories
  }

  const categories = categorizeServices()
  const categoryNames = {
    food: 'Alimentos y Bebidas',
    decoration: 'Decoración Especial',
    entertainment: 'Entretenimiento Extra',
    staff: 'Personal Especializado',
    equipment: 'Equipo Adicional'
  }

  const getPricingDisplay = (service: AdditionalService) => {
    if (service.pricing === 'quote') {
      return 'Cotización'
    } else if (service.pricing === 'custom') {
      return 'Personalizado'
    } else if (service.pricing === 'hourly' && service.basePrice) {
      return `$${service.basePrice.toLocaleString()} / ${service.unit}`
    }
    return 'Consultar'
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="font-caveat font-bold text-3xl lg:text-4xl text-foreground mb-4">
          Servicios Adicionales Personalizables
        </h2>
        <p className="font-raleway text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Complementa tu evento con servicios especializados que harán la diferencia. 
          Cada servicio se cotiza según tus necesidades específicas.
        </p>
        <div className="divider"></div>
      </div>

      {Object.entries(categories).map(([categoryKey, services]) => (
        <div key={categoryKey} className="space-y-6">
          <h3 className="font-raleway font-bold text-2xl text-foreground mb-6">
            {categoryNames[categoryKey as keyof typeof categoryNames]}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map(service => (
              <Card 
                key={service.id} 
                className={`transition-all duration-300 ${
                  selectedServices.includes(service.id) ? 'border-accent-3 shadow-accent-glow' : ''
                } ${service.popular ? 'ring-1 ring-accent-3 ring-opacity-30' : ''}`}
              >
                <CardContent>
                  {/* Header con badge popular */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-caveat font-bold text-xl text-foreground">
                          {service.name}
                        </h4>
                        {service.popular && (
                          <span className="bg-accent-3 text-background px-2 py-1 rounded-full text-xs font-raleway font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="font-raleway text-gray-300 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => toggleExpanded(service.id)}
                      className="text-accent-3 hover:text-accent-2 transition-colors duration-200 ml-4"
                      aria-label="Ver más información"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Precio */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-caveat font-bold text-2xl text-accent-3">
                        {getPricingDisplay(service)}
                      </span>
                      {service.pricing === 'quote' && (
                        <div className="flex items-center space-x-1 text-gray-400">
                          <HelpCircle className="w-3 h-3" />
                          <span className="text-xs font-raleway">Se cotiza por separado</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Información expandida */}
                  {expandedService === service.id && service.examples && (
                    <div className="mb-4 p-3 bg-gray-900 bg-opacity-30 rounded-lg">
                      <h5 className="font-raleway font-semibold text-foreground text-sm mb-2">
                        Incluye:
                      </h5>
                      <ul className="space-y-1">
                        {service.examples.map((example, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-accent-3 rounded-full"></span>
                            <span className="font-raleway text-gray-300 text-xs">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Botón de selección */}
                  <Button
                    variant={selectedServices.includes(service.id) ? 'primary' : 'ghost'}
                    className="w-full"
                    onClick={() => toggleService(service.id)}
                    icon={selectedServices.includes(service.id) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  >
                    {selectedServices.includes(service.id) ? 'Remover de Cotización' : 'Agregar a Cotización'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Resumen de servicios seleccionados */}
      {selectedServices.length > 0 && (
        <div className="sticky bottom-4 z-40">
          <Card variant="elevated" className="bg-accent-3 border-accent-3">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-raleway font-bold text-background mb-1">
                    Servicios Adicionales Seleccionados
                  </h4>
                  <p className="font-raleway text-background text-opacity-90 text-sm">
                    {selectedServices.length} servicio{selectedServices.length > 1 ? 's' : ''} agregado{selectedServices.length > 1 ? 's' : ''} para cotización
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedServices([])}
                    className="text-background hover:bg-background hover:bg-opacity-20"
                  >
                    Limpiar
                  </Button>
                  <Button
                    size="sm"
                    className="bg-background text-accent-3 hover:bg-gray-100"
                  >
                    Solicitar Cotización
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Información importante */}
      <div className="bg-gray-900 bg-opacity-30 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="font-raleway font-bold text-foreground mb-4 flex items-center">
          <Info className="w-5 h-5 text-accent-3 mr-2" />
          Información Importante sobre Servicios Adicionales
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-raleway text-gray-300">
          <div>
            <p className="mb-2">
              • Los servicios de comida se cotizan según el número de invitados
            </p>
            <p className="mb-2">
              • La decoración temática depende de la complejidad del diseño
            </p>
            <p>
              • Los servicios por horas tienen un mínimo de contratación
            </p>
          </div>
          <div>
            <p className="mb-2">
              • Todos los servicios incluyen personal capacitado
            </p>
            <p className="mb-2">
              • Se requiere confirmación con 15 días de anticipación
            </p>
            <p>
              • Disponibilidad sujeta a fecha del evento
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}