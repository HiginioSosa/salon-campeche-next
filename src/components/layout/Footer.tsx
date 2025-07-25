import Link from 'next/link'
import { MapPin, Phone, Mail, Facebook, Instagram, Clock } from 'lucide-react'
import { businessInfo } from '@/lib/brand'

const footerNavigation = {
  servicios: [
    { name: 'Renta de Salón', href: '/servicios#salon' },
    { name: 'DJ y Sonido', href: '/servicios#dj' },
    { name: 'Decoración', href: '/servicios#decoracion' },
    { name: 'Mesa de Dulces', href: '/servicios#mesa-dulces' },
    { name: 'Juegos Infantiles', href: '/servicios#juegos' },
  ],
  informacion: [
    { name: 'Acerca de Nosotros', href: '/contacto#nosotros' },
    { name: 'Galería de Eventos', href: '/galeria' },
    { name: 'Testimonios', href: '/#testimonios' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Política de Privacidad', href: '/privacidad' },
  ],
  eventos: [
    { name: 'Bodas', href: '/servicios#bodas' },
    { name: 'XV Años', href: '/servicios#xv-anos' },
    { name: 'Cumpleaños', href: '/servicios#cumpleanos' },
    { name: 'Eventos Corporativos', href: '/servicios#corporativos' },
    { name: 'Baby Shower', href: '/servicios#baby-shower' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 bg-opacity-50 border-t border-gray-800">
      <div className="container-section">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Información de la empresa */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                {/* Logo vertical del salón */}
                <div className="w-12 h-12 bg-accent-3 rounded-lg flex items-center justify-center">
                  <span className="text-background font-caveat font-bold text-xl">
                    SC
                  </span>
                </div>
                <div>
                  <h3 className="font-caveat font-bold text-xl text-foreground">
                    {businessInfo.name}
                  </h3>
                  <p className="font-raleway text-sm text-accent-3">
                    {businessInfo.slogan}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 font-raleway text-sm mb-6 leading-relaxed">
                El escenario perfecto para celebrar tus momentos más importantes. 
                Eventos sociales inolvidables en Ixtapaluca, Estado de México.
              </p>

              {/* Capacidades */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-3 rounded-full mr-3"></span>
                  Hasta {businessInfo.capacity.firstFloor} personas (1 piso)
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-3 rounded-full mr-3"></span>
                  Hasta {businessInfo.capacity.bothFloors} personas (2 pisos)
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                <a
                  href={`https://facebook.com/${businessInfo.contact.social.facebook.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-background" />
                </a>
                <a
                  href={`https://instagram.com/${businessInfo.contact.social.instagram.replace(' ', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-accent-3 rounded-lg flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-background" />
                </a>
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="font-raleway font-bold text-lg text-foreground mb-6">
                Servicios
              </h3>
              <ul className="space-y-3">
                {footerNavigation.servicios.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-accent-3 font-raleway text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-accent-3 transition-colors duration-200"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tipos de Eventos */}
            <div>
              <h3 className="font-raleway font-bold text-lg text-foreground mb-6">
                Tipos de Eventos
              </h3>
              <ul className="space-y-3">
                {footerNavigation.eventos.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-300 hover:text-accent-3 font-raleway text-sm transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-500 rounded-full mr-3 group-hover:bg-accent-3 transition-colors duration-200"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="font-raleway font-bold text-lg text-foreground mb-6">
                Contacto
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-accent-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 font-raleway text-sm leading-relaxed">
                      {businessInfo.contact.address.full}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent-3 flex-shrink-0" />
                  <a
                    href={`tel:${businessInfo.contact.phone}`}
                    className="text-gray-300 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
                  >
                    {businessInfo.contact.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent-3 flex-shrink-0" />
                  <a
                    href={`mailto:${businessInfo.contact.email}`}
                    className="text-gray-300 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
                  >
                    {businessInfo.contact.email}
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-accent-3 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-300 font-raleway text-sm">
                    <p>Eventos hasta las 2:00 AM</p>
                    <p>Horas extras: $250/hora</p>
                  </div>
                </div>
              </div>

              {/* Links de información */}
              <div className="mt-6">
                <h4 className="font-raleway font-semibold text-foreground mb-3 text-sm">
                  Información
                </h4>
                <ul className="space-y-2">
                  {footerNavigation.informacion.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-gray-300 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 font-raleway text-sm">
                © {currentYear} {businessInfo.name}. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 font-raleway text-xs mt-1">
                Desarrollado con ❤️ para celebrar sin límites
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/privacidad"
                className="text-gray-400 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gray-400 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
              >
                Términos
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-gray-400 hover:text-accent-3 font-raleway text-sm transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}