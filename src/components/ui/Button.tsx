import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-raleway font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-3 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-accent-3 hover:bg-accent-2 text-background shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
      secondary:
        'bg-transparent border-2 border-accent-3 text-accent-3 hover:bg-accent-3 hover:text-background',
      ghost:
        'bg-transparent text-foreground hover:bg-foreground hover:bg-opacity-10',
      outline:
        'bg-transparent border border-gray-600 text-foreground hover:border-accent-3 hover:text-accent-3',
      inverse:
        'bg-gray-900 hover:bg-gray-800 text-foreground border-2 border-gray-700 hover:border-gray-600 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-6 py-3 text-base rounded-lg',
      lg: 'px-8 py-4 text-lg rounded-xl',
    }

    const widthClass = fullWidth ? 'w-full' : ''

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
        {!loading && icon && <span className='mr-2'>{icon}</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
