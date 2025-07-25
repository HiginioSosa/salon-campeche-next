import Link from 'next/link'
import { Check, Star, Users, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, Button } from '@/components'
import { popularPackages } from '@/lib/services'

export default function PopularPackages() {
  const formatPrice = (price: number) => {
    return price.toLocaleString('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    })
  }

  const getPackageServices = (serviceIds: string[]) => {
    // Mapeo de IDs a nombres de servicios
    const serviceNames: { [key: string]: string } = {
      'salon-primer-piso': 'Renta primer piso',
      'salon-ambos-pisos': 'Renta ambos pisos',
      'mesas-sencillas': 'Mesas sencillas',
      'mesas-vestidas': 'Mesas vestidas',
      'dj-sonido': 'DJ con sonido y luces',
      'adornos-sencillos': 'Decoración sencilla',
      'adornos-con-luz': 'Decoración con luces',
      'mesa-dulces': 'Mesa de dulces',
      'trampolin': 'Trampolín',
      'meseros': 'Personal de servicio'
    }

    return serviceIds.map(id => serviceNames[id] || id)
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-caveat font-bold text-3xl lg:text-4xl text-foreground mb-4">
          Paquetes Más Populares
        </h2>
        <p className="font-raleway text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
          Combinaciones probadas que nuestros clientes aman. Ahorra tiempo y dinero con nuestros paquetes prediseñados.
        </p>
        <div className="divider"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {popularPackages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`relative transition-all duration-300 ${
              pkg.popular 
                ? 'ring-2 ring-accent-3 ring-opacity-50 scale-105 lg:scale-110' 
                : 'hover:scale-105'
            }`}
            variant={pkg.popular ? 'elevated' : 'default'}
          >
            {/* Badge de más popular */}
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-accent-3 text-background px-6 py-2 rounded-full flex items-center space-x-2 shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-raleway font-bold text-sm">MÁS POPULAR</span>
                </div>
              </div>
            )}

            <CardContent className="h-full flex flex-col">
              {/* Header del paquete */}
              <div className="text-center mb-6 pt-4">
                <h3 className="font-caveat font-bold text-2xl lg:text-3xl text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="font-raleway text-gray-300 text-sm leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Precio destacado */}
              <div className="text-center mb-6">
                <div className="font-caveat font-bold text-4xl lg:text-5xl text-accent-3 mb-1">
                  {formatPrice(pkg.basePrice)}
                </div>
                <div className="font-raleway text-gray-400 text-sm">
                  Precio base estimado
                </div>
                <div className="flex items-center justify-center space-x-1 mt-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span className="font-raleway text-sm">Hasta {pkg.maxGuests} personas</span>
                </div>
              </div>

              {/* Servicios incluidos */}
              <div className="flex-1 mb-6">
                <h4 className="font-raleway font-semibold text-foreground mb-3 text-sm">
                  Servicios incluidos:
                </h4>
                <ul className="space-y-2">
                  {getPackageServices(pkg.includedServices).map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-accent-3 flex-shrink-0" />
                      <span className="font-raleway text-gray-300 text-sm">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Información adicional */}
              <div className="mb-6 p-3 bg-gray-900 bg-opacity-30 rounded-lg">
                <div className="text-center">
                  <div className="font-raleway text-accent-3 text-sm font-semibold mb-1">
                    💰 Anticipo requerido
                  </div>
                  <div className="font-caveat font-bold text-xl text-foreground">
                    {formatPrice(pkg.basePrice / 2)}
                  </div>
                  <div className="font-raleway text-gray-400 text-xs">
                    (50% del total)
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-3">
                <Link href="/paquetes" className="block">
                  <Button 
                    variant={pkg.popular ? 'primary' : 'secondary'} 
                    className="w-full"
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Personalizar Paquete
                  </Button>
                </Link>
                
                <Link href="/contacto" className="block">
                  <Button variant="ghost" className="w-full" size="sm">
                    Solicitar Información
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Nota especial para el paquete popular */}
              {pkg.popular && (
                <div className="mt-4 text-center">
                  <div className="bg-accent-3 bg-opacity-10 rounded-lg p-3 border border-accent-3 border-opacity-30">
                    <p className="font-raleway text-accent-3 text-xs font-semibold">
                      ⭐ Elegido por el 70% de nuestros clientes
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA para paquetes personalizados */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-accent-3 to-accent-2 rounded-2xl p-8 md:p-12">
          <h3 className="font-caveat font-bold text-3xl md:text-4xl text-background mb-4">
            ¿Necesitas algo diferente?
          </h3>
          <p className="text-background text-opacity-90 font-raleway text-lg mb-8 max-w-2xl mx-auto">
            Crea un paquete completamente personalizado con nuestro cotizador interactivo. 
            Combina solo los servicios que necesitas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/paquetes">
              <Button 
                size="lg" 
                className="bg-background text-accent-3 hover:bg-gray-100 w-full sm:w-auto"
                icon={<Calendar className="w-5 h-5" />}
              >
                Cotizador Personalizado
              </Button>
            </Link>
            <Link href="/disponibilidad">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-background text-background hover:bg-background hover:text-accent-3 w-full sm:w-auto"
              >
                Ver Disponibilidad
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Beneficios de elegir un paquete */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-3 text-2xl">💰</span>
          </div>
          <h4 className="font-raleway font-semibold text-foreground mb-2">
            Ahorro Garantizado
          </h4>
          <p className="font-raleway text-gray-300 text-sm">
            Los paquetes incluyen descuentos especiales comparado con servicios individuales
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-3 text-2xl">⚡</span>
          </div>
          <h4 className="font-raleway font-semibold text-foreground mb-2">
            Proceso Simplificado
          </h4>
          <p className="font-raleway text-gray-300 text-sm">
            Un solo contrato, un solo pago, coordinación completa de todos los servicios
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-3 bg-opacity-20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-accent-3 text-2xl">🎯</span>
          </div>
          <h4 className="font-raleway font-semibold text-foreground mb-2">
            Experiencia Comprobada
          </h4>
          <p className="font-raleway text-gray-300 text-sm">
            Combinaciones probadas en cientos de eventos exitosos
          </p>
        </div>
      </div>
    </div>
  )
}