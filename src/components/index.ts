// Layout components
export { default as MainLayout } from './layout/MainLayout'
export { default as Header } from './layout/Header'
export { default as Footer } from './layout/Footer'

// UI components
export { default as Button } from './ui/Button'
export {
  default as Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/Card'
export { default as Section, SectionHeader } from './ui/Section'
export { default as Loading, Skeleton, QuoteLoading } from './ui/Loading'
export { default as WhatsAppButton } from './ui/WhatsAppButton'

// Section components for pages
export { default as HeroSection } from './sections/HeroSection'
export { default as ServicesHighlight } from './sections/ServicesHighlight'
export { default as TestimonialsSection } from './sections/TestimonialsSection'
export { default as FAQSection } from './sections/FAQSection'
export { default as GalleryPreview } from './sections/GalleryPreview'
export { default as ContactCTA } from './sections/ContactCTA'

// Services components
export { default as ServiceCard, ServiceCategory } from './services/ServiceCard'
export { default as AdditionalServices } from './services/AdditionalServices'
export { default as PopularPackages } from './services/PopularPackages'
export { default as ServiceNavigation } from './services/ServiceNavigation'

// Packages components
export { default as QuoteCalculator } from './packages/QuoteCalculator'
export { default as ServiceSelector } from './packages/ServiceSelector'
export { default as QuoteDisplay } from './packages/QuoteDisplay'
export { default as PDFGenerator } from './packages/PDFGenerator'
export { default as QuoteSummary } from './packages/QuoteSummary'
export { default as PackageComparison } from './packages/PackageComparison'
export { default as TipsPanel } from './packages/TipsPanel'
