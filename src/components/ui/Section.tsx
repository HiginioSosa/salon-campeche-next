import { HTMLAttributes, forwardRef } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'accent' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
  fullHeight?: boolean
  /** Permite contenido posicionado (sticky) que de otro modo recortaría overflow-hidden */
  overflowVisible?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'lg',
      centered = false,
      fullHeight = false,
      overflowVisible = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `relative ${overflowVisible ? '' : 'overflow-hidden'}`

    const variants = {
      default: 'bg-transparent',
      dark: 'bg-gray-900/30',
      accent: 'bg-accent-3/5',
      gradient:
        'bg-gradient-to-br from-accent-3/10 via-accent-2/5 to-accent-1/10',
    }

    const sizes = {
      sm: 'py-8 lg:py-12',
      md: 'py-12 lg:py-16',
      lg: 'py-16 lg:py-24',
      xl: 'py-24 lg:py-32',
    }

    const heightClass = fullHeight ? 'min-h-screen flex items-center' : ''
    const centerClass = centered ? 'text-center' : ''

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${heightClass} ${centerClass} ${className}`

    return (
      <section ref={ref} className={combinedClassName} {...props}>
        <div className='container-section'>{children}</div>
      </section>
    )
  }
)

Section.displayName = 'Section'

// Subcomponente para títulos de sección
export const SectionHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    title: string
    subtitle?: string
    description?: string
    centered?: boolean
    /** Nivel del encabezado del título. Usar 'h1' en el título principal de cada página. */
    as?: 'h1' | 'h2' | 'h3'
  }
>(
  (
    {
      className = '',
      title,
      subtitle,
      description,
      centered = true,
      as: TitleTag = 'h2',
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}
      {...props}
    >
      {subtitle && (
        <p className='font-raleway font-semibold text-accent-3 text-sm lg:text-base uppercase tracking-wide mb-3'>
          {subtitle}
        </p>
      )}

      <TitleTag className='font-caveat font-bold text-3xl lg:text-5xl xl:text-6xl text-foreground mb-4'>
        {title}
      </TitleTag>

      {/* Decorative divider */}
      <div className={`divider ${!centered ? 'mx-0' : ''}`}></div>

      {description && (
        <p
          className={`font-raleway text-gray-300 text-base lg:text-lg max-w-3xl ${centered ? 'mx-auto' : ''} leading-relaxed`}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  )
)

SectionHeader.displayName = 'SectionHeader'

export default Section
