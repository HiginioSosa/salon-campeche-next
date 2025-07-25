'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Heart, Calendar, Users } from 'lucide-react'
import { Section, SectionHeader, Button } from '@/components'

const galleryImages = [
  {
    id: 1,
    title: "Boda Elegante",
    eventType: "Boda",
    guests: 200,
    date: "Diciembre 2024",
    description: "Decoración en tonos dorados con iluminación cálida",
    category: "boda"
  },
  {
    id: 2,
    title: "XV Años Mágicos",
    eventType: "XV Años",
    guests: 150,
    date: "Noviembre 2024", 
    description: "Tema de princesa con colores rosa y dorado",
    category: "xv-anos"
  },
  {
    id: 3,
    title: "Cumpleaños Familiar",
    eventType: "Cumpleaños",
    guests: 80,
    date: "Octubre 2024",
    description: "Celebración íntima con decoración temática",
    category: "cumpleanos"
  },
  {
    id: 4,
    title: "Evento Corporativo",
    eventType: "Corporativo",
    guests: 120,
    date: "Septiembre 2024",
    description: "Ambiente profesional y elegante",
    category: "corporativo"
  },
  {
    id: 5,
    title: "Baby Shower",
    eventType: "Baby Shower",
    guests: 60,
    date: "Agosto 2024",
    description: "Decoración en tonos pasteles y globos",
    category: "baby-shower"
  },
  {
    id: 6,
    title: "Aniversario",
    eventType: "Aniversario",
    guests: 100,
    date: "Julio 2024",
    description: "25 años de amor celebrados con estilo",
    category: "aniversario"
  }
]

export default function GalleryPreview() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  return (
    <Section variant="default" size="xl">
      <SectionHeader
        subtitle="Galería de Eventos"
        title="Momentos únicos e inolvidables"
        description="Descubre cómo transformamos cada celebración en una experiencia mágica"
      />

      {/* Grid principal de galería */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {/* Placeholder para imagen del evento */}
            {/* Aquí iría la imagen real del evento: {image.title} - {image.description} */}
            <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110 ${
              index % 6 === 0 ? 'from-accent-3 to-accent-2' :
              index % 6 === 1 ? 'from-accent-2 to-accent-1' :
              index % 6 === 2 ? 'from-accent-1 to-accent-3' :
              index % 6 === 3 ? 'from-gray-700 to-accent-3' :
              index % 6 === 4 ? 'from-accent-3 to-gray-700' :
              'from-accent-2 to-gray-600'
            }`}>
              {/* Patrón decorativo */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white to-transparent"></div>
            </div>

            {/* Overlay con información */}
            <div className={`absolute inset-0 bg-background bg-opacity-80 flex flex-col justify-end p-6 transition-all duration-300 ${
              hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="transform transition-transform duration-300 ${hoveredImage === image.id ? 'translate-y-0' : 'translate-y-4'}">
                <h3 className="font-caveat font-bold text-2xl text-foreground mb-2">
                  {image.title}
                </h3>
                
                <p className="font-raleway text-gray-300 text-sm mb-3 leading-relaxed">
                  {image.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {image.date}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {image.guests}
                    </span>
                  </div>
                  <span className="bg-accent-3 text-background px-2 py-1 rounded-full text-xs font-semibold">
                    {image.eventType}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 text-accent-3 hover:text-accent-2 transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Ver más</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-accent-3 transition-colors duration-200">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Me gusta</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Badge del tipo de evento */}
            <div className="absolute top-4 left-4 bg-background bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-accent-3 font-raleway font-semibold text-xs">
                {image.eventType}
              </span>
            </div>

            {/* Indicador de hover */}
            <div className={`absolute top-4 right-4 w-10 h-10 bg-accent-3 rounded-full flex items-center justify-center transition-all duration-300 ${
              hoveredImage === image.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
              <Eye className="w-5 h-5 text-background" />
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas de la galería */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 bg-gray-900 bg-opacity-30 rounded-xl backdrop-blur-sm">
          <div className="font-caveat font-bold text-3xl md:text-4xl text-accent-3 mb-2">
            500+
          </div>
          <p className="font-raleway text-gray-300 text-sm">
            Eventos Fotografiados
          </p>
        </div>
        
        <div className="text-center p-6 bg-gray-900 bg-opacity-30 rounded-xl backdrop-blur-sm">
          <div className="font-caveat font-bold text-3xl md:text-4xl text-accent-3 mb-2">
            50+
          </div>
          <p className="font-raleway text-gray-300 text-sm">
            Tipos de Decoración
          </p>
        </div>
        
        <div className="text-center p-6 bg-gray-900 bg-opacity-30 rounded-xl backdrop-blur-sm">
          <div className="font-caveat font-bold text-3xl md:text-4xl text-accent-3 mb-2">
            12
          </div>
          <p className="font-raleway text-gray-300 text-sm">
            Meses Activos
          </p>
        </div>
        
        <div className="text-center p-6 bg-gray-900 bg-opacity-30 rounded-xl backdrop-blur-sm">
          <div className="font-caveat font-bold text-3xl md:text-4xl text-accent-3 mb-2">
            100%
          </div>
          <p className="font-raleway text-gray-300 text-sm">
            Satisfacción
          </p>
        </div>
      </div>

      {/* Tipos de eventos disponibles */}
      <div className="bg-gradient-to-r from-accent-3 to-accent-2 rounded-2xl p-8 md:p-12 mb-12">
        <div className="text-center mb-8">
          <h3 className="font-caveat font-bold text-3xl md:text-4xl text-background mb-4">
            Especializados en todo tipo de eventos
          </h3>
          <p className="text-background text-opacity-90 font-raleway text-lg max-w-3xl mx-auto">
            Desde íntimas celebraciones familiares hasta grandes recepciones, creamos el ambiente perfecto para cada ocasión especial.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Bodas", icon: "💒", count: "150+" },
            { name: "XV Años", icon: "👑", count: "120+" },
            { name: "Cumpleaños", icon: "🎂", count: "200+" },
            { name: "Baby Shower", icon: "👶", count: "80+" },
            { name: "Aniversarios", icon: "💕", count: "60+" },
            { name: "Corporativos", icon: "🏢", count: "40+" }
          ].map((eventType, index) => (
            <div key={index} className="bg-background bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-2xl mb-2">{eventType.icon}</div>
              <h4 className="font-raleway font-semibold text-background text-sm mb-1">
                {eventType.name}
              </h4>
              <p className="text-background text-opacity-70 text-xs">
                {eventType.count} eventos
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
        <h3 className="font-caveat font-bold text-3xl text-foreground mb-4">
          ¿Quieres ver más inspiración?
        </h3>
        <p className="font-raleway text-gray-300 mb-8 max-w-2xl mx-auto">
          Explora nuestra galería completa y descubre cómo podemos hacer realidad la celebración de tus sueños.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/galeria">
            <Button size="lg" className="w-full sm:w-auto">
              Ver Galería Completa
            </Button>
          </Link>
          
          <Link href="/paquetes">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Cotizar mi Evento
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  )
}