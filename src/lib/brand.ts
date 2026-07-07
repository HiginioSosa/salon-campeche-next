// URL base del sitio. Configurable por entorno para no acoplar el dominio al código.
// Definir NEXT_PUBLIC_SITE_URL en el entorno de despliegue (p.ej. https://tu-dominio.com).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.saloncampeche.com'
).replace(/\/$/, '')

// Información del negocio
export const businessInfo = {
  name: 'Salón Campeche',
  slogan: 'Celebra sin límites',
  description:
    'Salón de Fiestas Campeche es el escenario perfecto para celebrar tus momentos más importantes.',

  // Capacidades
  capacity: {
    firstFloor: 150,
    bothFloors: 250,
  },

  // Información de contacto
  contact: {
    phone: '5581067082',
    whatsapp: '5581067082',
    email: 'higinio.sosa.isc@gmail.com',
    address: {
      street: 'Calle Campeche Mz 22 Lt 626b',
      neighborhood: 'Ampliación San Francisco',
      city: 'Ixtapaluca',
      state: 'Estado de México',
      zipCode: '56587',
      full: 'Calle Campeche Mz 22 Lt 626b, Ampliación San Francisco, Ixtapaluca, Estado de México, CP: 56587',
    },
    // Coordenadas exactas del salón para el pin del mapa. Con null se usa la
    // dirección como texto (menos preciso, no coloca un pin exacto).
    // Cómo obtenerlas: en Google Maps, clic derecho sobre el punto exacto del
    // salón y copia el par "lat, lng" (p.ej. { lat: 19.31234, lng: -98.88765 }).
    location: { lat: 19.350964, lng: -98.844679 } as {
      lat: number
      lng: number
    } | null,
    social: {
      facebook: '@Salon Campeche',
      instagram: 'Salon Campeche',
      // URLs de perfil. TODO: reemplazar por los enlaces reales del negocio.
      facebookUrl: 'https://facebook.com/SalonCampeche',
      instagramUrl: 'https://instagram.com/saloncampeche',
    },
  },

  // Misión y visión
  mission:
    'Brindar experiencias memorables al ofrecer un espacio versátil y elegante, servicios personalizados y atención impecable que superen las expectativas de cada cliente, convirtiendo sus celebraciones en recuerdos únicos y felices.',
  vision:
    'Ser el salón de eventos sociales referente en la región oriente del Estado de México, reconocido por su innovación, excelencia operativa y compromiso con la satisfacción total de nuestros clientes, así como por impulsar el desarrollo de la comunidad mediante celebraciones que inspiren y unan a las personas.',
}

// Paleta de colores del brand
export const brandColors = {
  background: '#000000', // 50%
  foreground: '#f2b98d', // 20%
  accent1: '#cf7b75', // 10%
  accent2: '#de8052', // 10%
  accent3: '#ec842f', // 10%
}

// Clases de CSS para tipografía siguiendo el brand
export const brandTypography = {
  title: 'font-caveat font-bold text-foreground',
  subtitle: 'font-raleway font-bold text-foreground',
  body: 'font-raleway text-foreground',
  accent: 'text-accent-3',
}

// Logo description (para comentarios en código)
export const logoDescription = {
  main: 'Búho minimalista (cuerpo y cabeza fusionados) en naranja cálido dentro de hexágono chocolate oscuro',
  horizontal: 'Logo con texto "Salón Campeche" al lado derecho del símbolo',
  vertical: 'Logo con texto "Salón Campeche" debajo del símbolo',
  animated: 'Logo con sutil animación del búho o efecto de aparición gradual',
}
