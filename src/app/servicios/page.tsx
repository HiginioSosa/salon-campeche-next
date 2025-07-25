import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Users, 
  Music, 
  Sparkles, 
  Utensils, 
  UserCheck, 
  Package,
  Home,
  Baby,
  Calculator,
  MessageCircle,
  Star,
  Clock
} from 'lucide-react'
import { MainLayout, Section, SectionHeader, Button, Card, CardContent, AdditionalServices, PopularPackages } from '@/components'
import ServiceCard, { ServiceCategory } from '@/components/services/ServiceCard'
import ServiceNavigation from '@/components/services/ServiceNavigation'
import { businessInfo } from '@/lib/brand'
import { services } from '@/lib/services'

export const metadata: Metadata = {
  title: `Servicios Completos - ${businessInfo.name}`,
  description: 'Descubre todos nuestros servicios para eventos: renta de salón, DJ profesional, decoración elegante, mesa de dulces, juegos infantiles, personal de servicio y más. Precios transparentes y servicio de calidad en Ixtapaluca.',
  keywords: [
    'servicios salon de fiestas',
    'renta salon ixtapaluca',
    'dj bodas estado mexico',
    'decoracion eventos sociales',
    'mesa dulces xv años',
    'juegos infantiles fiestas',
    'meseros eventos',
    'salon campeche servicios'
  ],
  openGraph: {
    title: `Servicios Completos para Eventos - ${businessInfo.name}`,
    description: 'Conoce todos nuestros servicios profesionales para hacer de tu evento una celebración perfecta. Desde $4,000 pesos.',
    url: 'https://saloncampeche.com/servicios',
  },
}

export default function ServicesPage() {
  // Organizar servicios por categorías
  const venueServices = services.filter(s => s.category === 'venue').map(s => ({
    ...s,
    icon: <Home className="w-8 h-8" />,
    features: s.id === 'salon-primer-piso' 
      ? ['Capacidad hasta 150 personas', 'Mesas y sillas básicas', 'Estacionamiento gratuito', 'Acceso flexible de horario']
      : ['Capacidad hasta 250 personas', 'Dos niveles completos', 'Mesas y sillas básicas', 'Estacionamiento gratuito', 'Acceso flexible de horario'],
    popular: s.id === 'salon-primer-piso'
  }))

  const equipmentServices = services.filter(s => s.category === 'equipment').map(s => ({
    ...s,
    icon: <Package className="w-8 h-8" />,
    features: s.id === 'mesas-vestidas' 
      ? ['Mantel blanco base', 'Mantel de color a elegir', 'Sillas con funda blanca', 'Moño de color a elegir', '10 personas por mesa']
      : s.id === 'mesas-sencillas'
      ? ['Mantel blanco', '10 sillas incluidas', 'Rectangulares o circulares', 'Funcional y económico']
      : ['Vaso de cristal', 'Platos para 3 tiempos', 'Cubiertos completos', 'Presentación elegante'],
    popular: s.id === 'mesas-vestidas'
  }))

  const entertainmentServices = services.filter(s => s.category === 'entertainment').map(s => ({
    ...s,
    icon: s.id === 'dj-sonido' ? <Music className="w-8 h-8" /> : <Baby className="w-8 h-8" />,
    features: s.id === 'dj-sonido' 
      ? ['5 horas de servicio', 'Equipo de sonido profesional', 'Sistema de luces', 'Música personalizada', 'Micrófono inalámbrico']
      : s.id === 'inflable-ninos'
      ? ['Inflable seguro', 'Alberca de pelotas', 'Todo el día', 'Supervisión recomendada']
      : ['Trampolín grande', 'Todo el día', 'Instalación incluida', 'Seguro y divertido'],
    popular: s.id === 'dj-sonido'
  }))

  const decorationServices = services.filter(s => s.category === 'decoration').map(s => ({
    ...s,
    icon: <Sparkles className="w-8 h-8" />,
    features: s.id === 'adornos-sencillos'
      ? ['Arco de globos sencillo', '4 torres decorativas', 'Tul en barandal', 'Iluminación básica']
      : s.id === 'adornos-con-luz'
      ? ['Arco con iluminación LED', '4 torres decorativas', 'Tul en barandal', 'Iluminación especializada', 'Efectos de luz']
      : ['Diseño personalizado', 'Dulces variados', 'Decoración temática', 'Presentación profesional'],
    popular: s.id === 'mesa-dulces'
  }))

  const foodServices = services.filter(s => s.category === 'food' && s.id !== 'mesa-dulces').map(s => ({
    ...s,
    icon: <Utensils className="w-8 h-8" />,
    features: s.id.includes('corona') 
      ? ['24 cervezas de 355ml', 'Corona y Victoria', 'Servidas frías', 'Cartón completo']
      : s.id.includes('indio')
      ? ['20 cervezas de 355ml', 'Indio y Tecate', 'Servidas frías', 'Cartón completo']
      : ['20 cervezas de 355ml', 'XX Lager', 'Servidas frías', 'Cartón completo'],
  }))

  const staffServices = services.filter(s => s.category === 'staff').map(s => ({
    ...s,
    icon: <UserCheck className="w-8 h-8" />,
    features: ['Personal capacitado', 'Uniformados', 'Servicio profesional', 'Mínimo 3 por evento'],
    popular: true
  }))

  return (
    <MainLayout whatsAppMessage="¡Hola! Me interesa conocer más detalles sobre sus servicios y precios. ¿Podrían ayudarme?">
      {/* Service Navigation */}
      <ServiceNavigation />
      
      {/* Hero Section */}
      <Section variant="gradient" size="xl">
        <SectionHeader
          subtitle="Nuestros Servicios"
          title="Todo lo que necesitas para tu evento perfecto"
          description="Servicios profesionales y completos para hacer de tu celebración una experiencia inolvidable"
        />

        {/* Estadísticas destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-accent-3" />
            </div>
            <div className="font-caveat font-bold text-3xl text-accent-3 mb-1">250</div>
            <p className="font-raleway text-gray-300 text-sm">Personas máximo</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-accent-3" />
            </div>
            <div className="font-caveat font-bold text-3xl text-accent-3 mb-1">15+</div>
            <p className="font-raleway text-gray-300 text-sm">Servicios disponibles</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8 text-accent-3" />
            </div>
            <div className="font-caveat font-bold text-3xl text-accent-3 mb-1">24/7</div>
            <p className="font-raleway text-gray-300 text-sm">Atención disponible</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-accent-3" />
            </div>
            <div className="font-caveat font-bold text-3xl text-accent-3 mb-1">3</div>
            <p className="font-raleway text-gray-300 text-sm">Paquetes populares</p>
          </div>
        </div>

        {/* CTA inicial */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/paquetes">
              <Button size="lg" icon={<Calculator className="w-5 h-5" />}>
                Cotizar Paquete
              </Button>
            </Link>
            <a 
              href={`https://wa.me/52${businessInfo.contact.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
                Consultar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </Section>

      {/* Servicios por categorías */}
      <Section variant="dark" size="xl">
        
        {/* Renta del Salón */}
        <div id="salon">
          <ServiceCategory
            title="Renta del Salón"
            description="Elige el espacio perfecto para tu evento, desde celebraciones íntimas hasta grandes recepciones"
            icon={<Home className="w-8 h-8" />}
          >
            {venueServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>

        {/* Entretenimiento */}
        <div id="entretenimiento">
          <ServiceCategory
            title="Entretenimiento y Música"
            description="Mantén a tus invitados bailando y divirtiéndose con nuestros servicios de entretenimiento profesional"
            icon={<Music className="w-8 h-8" />}
          >
            {entertainmentServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>

        {/* Decoración */}
        <div id="decoracion">
          <ServiceCategory
            title="Decoración y Ambientación"
            description="Transforma el espacio con decoraciones elegantes que reflejen el estilo de tu celebración"
            icon={<Sparkles className="w-8 h-8" />}
          >
            {decorationServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>

        {/* Mobiliario y Equipo */}
        <div id="mobiliario">
          <ServiceCategory
            title="Mobiliario y Equipo"
            description="Mesas, sillas y vajilla de calidad para el confort y elegancia de tus invitados"
            icon={<Package className="w-8 h-8" />}
          >
            {equipmentServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>

        {/* Personal de Servicio */}
        <div id="personal">
          <ServiceCategory
            title="Personal de Servicio"
            description="Equipo profesional capacitado para atender a tus invitados con la máxima calidad"
            icon={<UserCheck className="w-8 h-8" />}
          >
            {staffServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>

        {/* Bebidas */}
        <div id="bebidas">
          <ServiceCategory
            title="Bebidas y Refrescos"
            description="Selección de bebidas para complementar tu celebración"
            icon={<Utensils className="w-8 h-8" />}
          >
            {foodServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </ServiceCategory>
        </div>
      </Section>

      {/* Paquetes Populares */}
      <Section variant="gradient" size="xl">
        <div id="paquetes">
          <PopularPackages />
        </div>
      </Section>

      {/* Servicios Adicionales Personalizables */}
      <Section variant="default" size="xl">
        <div id="adicionales">
          <AdditionalServices />
        </div>
      </Section>

      {/* Información importante */}
      <Section variant="default" size="lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-caveat font-bold text-3xl lg:text-4xl text-foreground text-center mb-12">
            Información Importante
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="outlined">
              <CardContent>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">
                  📅 Proceso de Reservación
                </h3>
                <div className="space-y-3 text-gray-300 font-raleway text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-accent-3 text-background rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <p>Selección de servicios y verificación de disponibilidad</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-accent-3 text-background rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <p>Firma de contrato y pago inicial del 50%</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-accent-3 text-background rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <p>Pago final hasta un día antes del evento</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-accent-3 text-background rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <p>Acceso al salón desde la hora que necesites</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <h3 className="font-raleway font-bold text-xl text-foreground mb-4">
                  ⏰ Horarios y Políticas
                </h3>
                <div className="space-y-3 text-gray-300 font-raleway text-sm">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-accent-3 mt-1" />
                    <p>Eventos pueden durar hasta las 2:00 AM</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-accent-3 mt-1" />
                    <p>Horas extras: $250 pesos por hora adicional</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-accent-3 mt-1" />
                    <p>Acceso flexible para decoración previa</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-accent-3 mt-1" />
                    <p>Estacionamiento gratuito en la calle</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA Final */}
      <Section variant="gradient" size="lg">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-caveat font-bold text-4xl lg:text-5xl text-foreground mb-6">
            ¿Listo para cotizar tu evento?
          </h2>
          <p className="font-raleway text-xl text-gray-300 mb-8 leading-relaxed">
            Combina nuestros servicios y crea el paquete perfecto para tu celebración. 
            Obtén una cotización instantánea y personalizada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/paquetes">
              <Button size="lg" icon={<Calculator className="w-5 h-5" />} className="w-full sm:w-auto">
                Cotizador Interactivo
              </Button>
            </Link>
            
            <Link href="/disponibilidad">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Ver Disponibilidad
              </Button>
            </Link>
            
            <Link href="/contacto">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Contactar Ahora
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-6 bg-background bg-opacity-50 rounded-xl backdrop-blur-sm">
            <p className="font-raleway text-gray-300 text-sm mb-2">
              💡 <strong>Tip:</strong> Los servicios más populares son:
            </p>
            <p className="font-raleway text-accent-3 text-sm">
              Salón + Mesas Vestidas + DJ + Decoración = Paquete Completo desde $14,650
            </p>
          </div>
        </div>
      </Section>
    </MainLayout>
  )
}