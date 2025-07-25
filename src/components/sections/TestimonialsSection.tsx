'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Section, SectionHeader, Card, CardContent, Button } from '@/components'

const testimonials = [
  {
    id: 1,
    name: "María Elena Rodríguez",
    eventType: "Boda",
    rating: 5,
    date: "Diciembre 2024",
    comment: "¡Increíble! Nuestro día especial fue perfecto gracias al equipo de Salón Campeche. El espacio es hermoso, la atención excepcional y todos nuestros invitados quedaron encantados. La decoración superó nuestras expectativas.",
    guests: 180,
    location: "Ixtapaluca"
  },
  {
    id: 2,
    name: "Carlos y Ana Martínez",
    eventType: "XV Años",
    rating: 5,
    date: "Noviembre 2024",
    comment: "La fiesta de XV años de nuestra hija fue mágica. El DJ mantuvo a todos bailando, la mesa de dulces fue el centro de atención y el servicio de meseros impecable. ¡Totalmente recomendado!",
    guests: 120,
    location: "Chalco"
  },
  {
    id: 3,
    name: "Roberto Hernández",
    eventType: "Cumpleaños",
    rating: 5,
    date: "Octubre 2024",
    comment: "Celebramos los 50 años de mi esposa y fue una noche inolvidable. El salón es elegante, el sonido excelente y la atención personalizada nos hizo sentir especiales. Los juegos para niños fueron un éxito.",
    guests: 95,
    location: "La Paz"
  },
  {
    id: 4,
    name: "Familia Jiménez",
    eventType: "Baby Shower",
    rating: 5,
    date: "Septiembre 2024",
    comment: "Perfecto para nuestro baby shower. El espacio del primer piso fue ideal para 80 personas, la decoración en tonos pasteles quedó preciosa y el equipo nos ayudó en cada detalle. ¡Gracias por hacer este día especial!",
    guests: 80,
    location: "Ixtapaluca"
  },
  {
    id: 5,
    name: "Eduardo y Sofía López",
    eventType: "Aniversario",
    rating: 5,
    date: "Agosto 2024",
    comment: "25 años de matrimonio merecían una celebración especial. El ambiente del salón, la iluminación y la música crearon la atmósfera perfecta. Nuestros hijos y nietos disfrutaron muchísimo.",
    guests: 150,
    location: "Texcoco"
  },
  {
    id: 6,
    name: "Patricia González",
    eventType: "Graduación",
    rating: 5,
    date: "Julio 2024",
    comment: "La graduación de mi hijo fue épica. El sonido fue cristalino para los discursos, la pista de baile perfecta y el servicio de bebidas excelente. El estacionamiento gratuito fue muy conveniente para todos.",
    guests: 200,
    location: "Nezahualcóyotl"
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [isPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <Section variant="gradient" size="xl">
      <SectionHeader
        subtitle="Testimonios Reales"
        title="Lo que dicen nuestros clientes"
        description="Más de 500 eventos exitosos respaldan la calidad de nuestro servicio"
      />

      <div className="max-w-5xl mx-auto">
        {/* Testimonio principal */}
        <div className="relative">
          <Card variant="glass" className="text-center max-w-4xl mx-auto" padding="xl">
            <CardContent>
              {/* Quote icon */}
              <div className="text-accent-3 mb-6 flex justify-center">
                <Quote className="w-12 h-12" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(currentData.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Comentario */}
              <blockquote className="font-raleway text-lg md:text-xl text-gray-200 leading-relaxed mb-8 italic">
                "{currentData.comment}"
              </blockquote>

              {/* Información del cliente */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-caveat font-bold text-2xl text-foreground mb-1">
                    {currentData.name}
                  </h4>
                  <p className="text-accent-3 font-raleway font-semibold">
                    {currentData.eventType} • {currentData.guests} invitados
                  </p>
                  <p className="text-gray-400 font-raleway text-sm">
                    {currentData.location} • {currentData.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Controles de navegación */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="p-2"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Indicadores */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-accent-3 scale-110' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="p-2"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Estadísticas destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="font-caveat font-bold text-4xl md:text-5xl text-accent-3 mb-2">
              500+
            </div>
            <p className="font-raleway text-gray-300 text-sm">
              Eventos Realizados
            </p>
          </div>
          
          <div className="text-center">
            <div className="font-caveat font-bold text-4xl md:text-5xl text-accent-3 mb-2">
              5.0
            </div>
            <p className="font-raleway text-gray-300 text-sm">
              Calificación Promedio
            </p>
          </div>
          
          <div className="text-center">
            <div className="font-caveat font-bold text-4xl md:text-5xl text-accent-3 mb-2">
              98%
            </div>
            <p className="font-raleway text-gray-300 text-sm">
              Clientes Satisfechos
            </p>
          </div>
          
          <div className="text-center">
            <div className="font-caveat font-bold text-4xl md:text-5xl text-accent-3 mb-2">
              3
            </div>
            <p className="font-raleway text-gray-300 text-sm">
              Años de Experiencia
            </p>
          </div>
        </div>

        {/* Mini testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} variant="outlined" padding="md" className="text-center">
              <CardContent>
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="font-raleway text-gray-300 text-sm mb-4 line-clamp-3">
                  "{testimonial.comment.substring(0, 100)}..."
                </p>
                
                <div>
                  <h5 className="font-raleway font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </h5>
                  <p className="text-accent-3 font-raleway text-xs">
                    {testimonial.eventType}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}