import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      variant = 'default',
      hover = true,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-300'

    const variants = {
      default: 'bg-gray-900 bg-opacity-50 border border-gray-800',
      elevated: 'bg-gray-900 bg-opacity-70 shadow-elegant',
      outlined: 'bg-transparent border-2 border-gray-700',
      glass:
        'bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700',
    }

    const hoverEffects = hover
      ? 'hover:border-accent-3 hover:shadow-accent-glow hover:transform hover:scale-[1.02]'
      : ''

    const paddings = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    const combinedClassName = `${baseStyles} ${variants[variant]} ${hoverEffects} ${paddings[padding]} ${className}`

    return (
      <div ref={ref} className={combinedClassName} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Subcomponentes para mejor estructura
export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className = '', children, ...props }, ref) => (
  <h3
    ref={ref}
    className={`font-caveat font-bold text-xl lg:text-2xl text-foreground mb-2 ${className}`}
    {...props}
  >
    {children}
  </h3>
))

CardTitle.displayName = 'CardTitle'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`font-raleway text-gray-300 text-sm lg:text-base ${className}`}
    {...props}
  >
    {children}
  </p>
))

CardDescription.displayName = 'CardDescription'

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div ref={ref} className={`${className}`} {...props}>
    {children}
  </div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={`mt-6 pt-4 border-t border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'

export default Card
