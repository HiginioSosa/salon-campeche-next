import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
  /**
   * Si se define, el botón se renderiza como enlace en vez de <button>, evitando
   * el anidamiento inválido <a><button>. Interno usa next/link; externo usa <a>.
   */
  href?: string
  /** Marca el enlace como externo (se abre en una pestaña nueva con rel seguro). */
  external?: boolean
}

const variants = {
  primary:
    'bg-accent-3 hover:bg-accent-2 text-background shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95',
  secondary:
    'bg-transparent border-2 border-accent-3 text-accent-3 hover:bg-accent-3 hover:text-background',
  ghost: 'bg-transparent text-foreground hover:bg-foreground/10',
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

const baseStyles =
  'inline-flex items-center justify-center font-raleway font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-3/50 disabled:opacity-50 disabled:cursor-not-allowed'

export default function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  href,
  external = false,
  children,
  type,
  disabled,
  ...props
}: ButtonProps) {
  const widthClass = fullWidth ? 'w-full' : ''
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`

  const content = (
    <>
      {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
      {!loading && icon && <span className='mr-2'>{icon}</span>}
      {children}
    </>
  )

  // Renderizado como enlace cuando se pasa `href` (evita anidar <a><button>).
  if (href) {
    const anchorProps = props as unknown as AnchorHTMLAttributes<HTMLAnchorElement>
    const isInternal = href.startsWith('/') || href.startsWith('#')

    // Rutas internas: usar next/link para navegación del cliente.
    if (isInternal) {
      return (
        <Link href={href} className={combinedClassName} {...anchorProps}>
          {content}
        </Link>
      )
    }

    // Enlaces externos/protocolos: <a> normal. http(s) abre en pestaña nueva;
    // tel:/mailto: se abren en el mismo contexto.
    const openInNewTab = external || /^https?:/i.test(href)
    return (
      <a
        href={href}
        className={combinedClassName}
        {...(openInNewTab
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={combinedClassName}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
