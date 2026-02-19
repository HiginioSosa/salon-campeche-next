'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye,
  Heart,
  Calendar,
  Users,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import {
  MainLayout,
  Section,
  SectionHeader,
  Button,
  Card,
  CardContent,
} from '@/components'

// Simulación de datos de galería
const galleryImages = [
  {
    id: 1,
    title: 'Boda Elena & Carlos',
    eventType: 'Boda',
    guests: 200,
    date: '2024-12-15',
    description:
      'Decoración dorada con luces cálidas, mesas vestidas elegantes y arco floral',
    category: 'boda',
    featured: true,
    location: 'Ambos pisos',
  },
  {
    id: 2,
    title: 'XV Años Sofía',
    eventType: 'XV Años',
    guests: 150,
    date: '2024-11-20',
    description:
      'Tema princesa con colores rosa y dorado, mesa de dulces espectacular',
    category: 'xv-anos',
    featured: true,
    location: 'Primer piso',
  },
  {
    id: 3,
    title: 'Cumpleaños 50 años Roberto',
    eventType: 'Cumpleaños',
    guests: 120,
    date: '2024-10-08',
    description:
      'Celebración familiar con decoración clásica y área de juegos para niños',
    category: 'cumpleanos',
    featured: false,
    location: 'Primer piso',
  },
  {
    id: 4,
    title: 'Baby Shower Familia Martínez',
    eventType: 'Baby Shower',
    guests: 80,
    date: '2024-09-12',
    description:
      'Tonos pasteles, globos y decoración tierna para celebrar la llegada del bebé',
    category: 'baby-shower',
    featured: false,
    location: 'Primer piso',
  },
  {
    id: 5,
    title: 'Aniversario 25 años López',
    eventType: 'Aniversario',
    guests: 180,
    date: '2024-08-25',
    description:
      'Celebración romántica con iluminación especial y música en vivo',
    category: 'aniversario',
    featured: true,
    location: 'Ambos pisos',
  },
  {
    id: 6,
    title: 'Graduación Medicina UNAM',
    eventType: 'Graduación',
    guests: 160,
    date: '2024-07-30',
    description:
      'Evento corporativo elegante con colores institucionales y mesa de honor',
    category: 'graduacion',
    featured: false,
    location: 'Ambos pisos',
  },
  {
    id: 7,
    title: 'Boda Garden Party',
    eventType: 'Boda',
    guests: 220,
    date: '2024-06-15',
    description:
      'Boda al aire libre con decoración natural, luces tipo edison y flores silvestres',
    category: 'boda',
    featured: false,
    location: 'Ambos pisos',
  },
  {
    id: 8,
    title: 'XV Años Temática Vintage',
    eventType: 'XV Años',
    guests: 130,
    date: '2024-05-18',
    description:
      'Decoración vintage con colores pastel, muebles antiguos y detalles dorados',
    category: 'xv-anos',
    featured: false,
    location: 'Primer piso',
  },
  {
    id: 9,
    title: 'Evento Corporativo Tech',
    eventType: 'Corporativo',
    guests: 100,
    date: '2024-04-22',
    description:
      'Evento empresarial moderno con tecnología, presentaciones y networking',
    category: 'corporativo',
    featured: false,
    location: 'Primer piso',
  },
]

const categories = [
  { id: 'all', name: 'Todos', count: galleryImages.length },
  {
    id: 'boda',
    name: 'Bodas',
    count: galleryImages.filter(img => img.category === 'boda').length,
  },
  {
    id: 'xv-anos',
    name: 'XV Años',
    count: galleryImages.filter(img => img.category === 'xv-anos').length,
  },
  {
    id: 'cumpleanos',
    name: 'Cumpleaños',
    count: galleryImages.filter(img => img.category === 'cumpleanos').length,
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    count: galleryImages.filter(img => img.category === 'baby-shower').length,
  },
  {
    id: 'aniversario',
    name: 'Aniversarios',
    count: galleryImages.filter(img => img.category === 'aniversario').length,
  },
  {
    id: 'graduacion',
    name: 'Graduaciones',
    count: galleryImages.filter(img => img.category === 'graduacion').length,
  },
  {
    id: 'corporativo',
    name: 'Corporativos',
    count: galleryImages.filter(img => img.category === 'corporativo').length,
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null)
  const [likedImages, setLikedImages] = useState<number[]>([])

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory)

  const toggleLike = (imageId: number) => {
    setLikedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const openModal = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return

    const currentIndex = filteredImages.findIndex(
      img => img.id === selectedImage.id
    )
    let newIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex])
  }

  return (
    <MainLayout whatsAppMessage='¡Hola! Vi su galería de eventos y me encantaría saber más sobre sus servicios para mi celebración.'>
      {/* Hero Section */}
      <Section variant='gradient' size='lg'>
        <SectionHeader
          subtitle='Galería de Eventos'
          title='Momentos únicos capturados para siempre'
          description='Explora más de 150 eventos realizados y descubre cómo transformamos cada celebración en una experiencia inolvidable'
        />

        {/* Estadísticas destacadas */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              150+
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Eventos Realizados
            </p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              98%
            </div>
            <p className='font-raleway text-gray-300 text-sm'>Satisfacción</p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              8
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Tipos de Eventos
            </p>
          </div>
          <div className='text-center p-4 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm'>
            <div className='font-caveat font-bold text-3xl text-accent-3 mb-2'>
              3
            </div>
            <p className='font-raleway text-gray-300 text-sm'>
              Años de Experiencia
            </p>
          </div>
        </div>
      </Section>

      {/* Filtros de categoría */}
      <Section variant='dark' size='md'>
        <div className='flex items-center justify-between mb-8'>
          <div className='flex items-center space-x-2'>
            <Filter className='w-5 h-5 text-accent-3' />
            <h3 className='font-raleway font-semibold text-foreground'>
              Filtrar por categoría
            </h3>
          </div>
          <p className='font-raleway text-gray-300 text-sm'>
            {filteredImages.length} evento
            {filteredImages.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className='flex flex-wrap gap-3 justify-center'>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-raleway font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-accent-3 text-background shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-accent-3 hover:text-background'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </Section>

      {/* Grid de imágenes */}
      <Section variant='default' size='xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                image.featured ? 'ring-2 ring-accent-3 ring-opacity-50' : ''
              }`}
              onClick={() => openModal(image)}
            >
              <CardContent className='p-0 relative overflow-hidden rounded-xl'>
                {/* Placeholder para imagen del evento */}
                {/* Aquí iría la imagen real: {image.title} - {image.description} */}
                <div
                  className={`aspect-square bg-gradient-to-br transition-all duration-700 group-hover:scale-110 ${
                    index % 6 === 0
                      ? 'from-accent-3 to-accent-2'
                      : index % 6 === 1
                        ? 'from-accent-2 to-accent-1'
                        : index % 6 === 2
                          ? 'from-accent-1 to-accent-3'
                          : index % 6 === 3
                            ? 'from-gray-700 to-accent-3'
                            : index % 6 === 4
                              ? 'from-accent-3 to-gray-700'
                              : 'from-accent-2 to-gray-600'
                  }`}
                >
                  {/* Patrón decorativo */}
                  <div className='absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white to-transparent'></div>
                </div>

                {/* Badge de evento destacado */}
                {image.featured && (
                  <div className='absolute top-4 left-4 bg-accent-3 text-background px-3 py-1 rounded-full'>
                    <span className='font-raleway font-bold text-xs'>
                      DESTACADO
                    </span>
                  </div>
                )}

                {/* Overlay con información */}
                <div className='absolute inset-0 bg-background bg-opacity-80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6'>
                  <div className='transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                    <h3 className='font-caveat font-bold text-2xl text-foreground mb-2'>
                      {image.title}
                    </h3>

                    <p className='font-raleway text-gray-300 text-sm mb-3 leading-relaxed'>
                      {image.description}
                    </p>

                    <div className='flex items-center justify-between text-xs text-gray-400 mb-4'>
                      <div className='flex items-center space-x-4'>
                        <span className='flex items-center'>
                          <Calendar className='w-3 h-3 mr-1' />
                          {new Date(image.date).toLocaleDateString('es-MX')}
                        </span>
                        <span className='flex items-center'>
                          <Users className='w-3 h-3 mr-1' />
                          {image.guests}
                        </span>
                      </div>
                      <span className='bg-accent-3 text-background px-2 py-1 rounded-full text-xs font-semibold'>
                        {image.eventType}
                      </span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          toggleLike(image.id)
                        }}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          likedImages.includes(image.id)
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${likedImages.includes(image.id) ? 'fill-current' : ''}`}
                        />
                        <span className='text-sm'>Me gusta</span>
                      </button>

                      <div className='flex items-center space-x-1 text-accent-3'>
                        <Eye className='w-4 h-4' />
                        <span className='text-sm'>Ver más</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredImages.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Eye className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='font-caveat font-bold text-2xl text-foreground mb-2'>
              No hay eventos en esta categoría
            </h3>
            <p className='font-raleway text-gray-300'>
              Prueba seleccionando otra categoría o ponte en contacto con
              nosotros
            </p>
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section variant='gradient' size='lg'>
        <div className='text-center'>
          <h2 className='font-caveat font-bold text-4xl text-foreground mb-4'>
            ¿Te inspiraste? ¡Haz realidad tu evento!
          </h2>
          <p className='font-raleway text-gray-300 text-lg mb-8 max-w-2xl mx-auto'>
            Cada imagen cuenta una historia única. Permítenos crear la tuya con
            el mismo cuidado y atención al detalle.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/paquetes'>
              <Button size='lg' className='w-full sm:w-auto'>
                Cotizar mi Evento
              </Button>
            </Link>

            <Link href='/contacto'>
              <Button
                variant='secondary'
                size='lg'
                className='w-full sm:w-auto'
              >
                Contactar Ahora
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Modal de imagen */}
      {selectedImage && (
        <div className='fixed inset-0 bg-background bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='relative max-w-4xl w-full'>
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className='absolute top-4 right-4 z-10 w-10 h-10 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-foreground hover:bg-accent-3 hover:text-background transition-all duration-200'
            >
              <X className='w-5 h-5' />
            </button>

            {/* Navegación */}
            <button
              onClick={() => navigateImage('prev')}
              className='absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-foreground hover:bg-accent-3 hover:text-background transition-all duration-200'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-foreground hover:bg-accent-3 hover:text-background transition-all duration-200'
            >
              <ChevronRight className='w-6 h-6' />
            </button>

            {/* Contenido del modal */}
            <div className='bg-gray-900 rounded-2xl overflow-hidden'>
              {/* Imagen principal */}
              {/* Aquí iría la imagen real: {selectedImage.title} - Vista ampliada de {selectedImage.description} */}
              <div className='aspect-video bg-gradient-to-br from-accent-3 to-accent-2 relative'>
                <div className='absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white to-transparent'></div>
              </div>

              {/* Información del evento */}
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='font-caveat font-bold text-3xl text-foreground mb-1'>
                      {selectedImage.title}
                    </h3>
                    <p className='font-raleway text-accent-3 font-semibold'>
                      {selectedImage.eventType} • {selectedImage.location}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleLike(selectedImage.id)}
                    className={`p-2 rounded-full transition-colors duration-200 ${
                      likedImages.includes(selectedImage.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedImages.includes(selectedImage.id) ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>

                <p className='font-raleway text-gray-300 mb-4 leading-relaxed'>
                  {selectedImage.description}
                </p>

                <div className='grid grid-cols-3 gap-4 text-center'>
                  <div>
                    <div className='font-caveat font-bold text-2xl text-accent-3'>
                      {selectedImage.guests}
                    </div>
                    <p className='font-raleway text-gray-400 text-sm'>
                      Invitados
                    </p>
                  </div>
                  <div>
                    <div className='font-caveat font-bold text-2xl text-accent-3'>
                      {new Date(selectedImage.date).toLocaleDateString(
                        'es-MX',
                        { day: 'numeric', month: 'short' }
                      )}
                    </div>
                    <p className='font-raleway text-gray-400 text-sm'>Fecha</p>
                  </div>
                  <div>
                    <div className='font-caveat font-bold text-2xl text-accent-3'>
                      {selectedImage.location === 'Ambos pisos' ? '2' : '1'}
                    </div>
                    <p className='font-raleway text-gray-400 text-sm'>
                      Nivel
                      {selectedImage.location === 'Ambos pisos' ? 'es' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  )
}
