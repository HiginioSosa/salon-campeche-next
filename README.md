# 🎉 Salón Campeche - Sitio Web Oficial

**"Celebra sin límites"**

Sitio web oficial de Salón Campeche, el salón de fiestas más elegante de Ixtapaluca, Estado de México. Una aplicación web moderna desarrollada con Next.js que ofrece una experiencia completa para la planificación y cotización de eventos.

## 🌟 Características Principales

### 🏢 **Información del Salón**

- **Capacidad**: Hasta 150 personas (primer piso) o 250 personas (ambos pisos)
- **Ubicación**: Calle Campeche Mz 22 Lt 626b, Ampliación San Francisco, Ixtapaluca
- **Servicios**: Bodas, XV años, cumpleaños, eventos corporativos y celebraciones especiales

### 💻 **Funcionalidades del Sitio Web**

- **🧮 Cotizador Interactivo**: Calcula precios en tiempo real según servicios seleccionados
- **📅 Verificación de Disponibilidad**: Consulta fechas disponibles para tu evento
- **🖼️ Galería de Eventos**: Visualiza eventos anteriores organizados en el salón
- **📋 Catálogo de Servicios**: Explora todos los servicios disponibles (DJ, decoración, catering, etc.)
- **📞 Contacto Directo**: Integración con WhatsApp para consultas inmediatas
- **❓ FAQ**: Respuestas a preguntas frecuentes sobre el salón y servicios
- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles y desktop

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **Frontend**: [React 19](https://react.dev/) con TypeScript
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) para diseño responsivo
- **Iconos**: [Lucide React](https://lucide.dev/) para iconografía moderna
- **PDF**: [jsPDF](https://github.com/parallax/jsPDF) para generación de cotizaciones
- **Optimización**: Turbopack para desarrollo rápido
- **Linting**: ESLint + Prettier para calidad de código

## 🚀 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd salon-campeche-next

# Instalar dependencias
npm install
# o
yarn install
# o
pnpm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Construir para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar linting
npm run format   # Formatear código con Prettier
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── contacto/          # Página de contacto
│   ├── disponibilidad/    # Verificación de fechas
│   ├── faq/              # Preguntas frecuentes
│   ├── galeria/          # Galería de eventos
│   ├── paquetes/         # Cotizador de paquetes
│   ├── servicios/        # Catálogo de servicios
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── components/            # Componentes reutilizables
│   ├── layout/           # Componentes de layout
│   ├── packages/         # Componentes de paquetes
│   ├── sections/         # Secciones de páginas
│   ├── services/         # Componentes de servicios
│   └── ui/               # Componentes de UI base
├── lib/                  # Utilidades y configuración
│   ├── brand.ts          # Información del negocio
│   ├── fonts.ts          # Configuración de fuentes
│   ├── services.ts       # Datos de servicios
│   └── validators.ts     # Validadores de formularios
└── types/                # Definiciones de TypeScript
    └── index.ts          # Tipos principales
```

## 🎯 Páginas Principales

- **`/`** - Página de inicio con hero section y servicios destacados
- **`/servicios`** - Catálogo completo de servicios disponibles
- **`/paquetes`** - Cotizador interactivo de paquetes
- **`/galeria`** - Galería de eventos realizados
- **`/disponibilidad`** - Verificación de fechas disponibles
- **`/contacto`** - Información de contacto y formulario
- **`/faq`** - Preguntas frecuentes

## 📞 Información de Contacto

**Salón Campeche**

- **Teléfono**: 55 8106 7082
- **WhatsApp**: 55 8106 7082
- **Email**: higinio.sosa.isc@gmail.com
- **Dirección**: Calle Campeche Mz 22 Lt 626b, Ampliación San Francisco, Ixtapaluca, Estado de México

## 🌐 SEO y Optimización

- Metadatos optimizados para cada página
- Datos estructurados JSON-LD para mejor indexación
- Imágenes optimizadas con Next.js Image
- Sitemap automático
- Diseño responsivo y accesible

## 📄 Licencia

Este proyecto es privado y pertenece a Salón Campeche.

---

**Desarrollado con ❤️ para crear experiencias memorables en cada celebración.**
