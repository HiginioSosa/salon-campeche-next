import { Loader2 } from 'lucide-react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
  variant?: 'default' | 'dots' | 'pulse'
}

export default function Loading({
  size = 'md',
  text,
  fullScreen = false,
  variant = 'default',
}: LoadingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  if (variant === 'dots') {
    return (
      <div
        className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-background bg-opacity-50 z-50' : ''}`}
      >
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-accent-3 rounded-full animate-bounce'></div>
            <div
              className='w-3 h-3 bg-accent-3 rounded-full animate-bounce'
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className='w-3 h-3 bg-accent-3 rounded-full animate-bounce'
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          {text && (
            <p
              className={`font-raleway text-foreground ${textSizes[size]} animate-pulse`}
            >
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'pulse') {
    return (
      <div
        className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-background bg-opacity-50 z-50' : ''}`}
      >
        <div className='flex flex-col items-center space-y-4'>
          <div
            className={`${sizes[size]} bg-accent-3 rounded-full animate-pulse`}
          ></div>
          {text && (
            <p
              className={`font-raleway text-foreground ${textSizes[size]} animate-pulse`}
            >
              {text}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Default spinner
  return (
    <div
      className={`flex items-center justify-center ${fullScreen ? 'fixed inset-0 bg-background bg-opacity-50 z-50' : ''}`}
    >
      <div className='flex flex-col items-center space-y-4'>
        <Loader2 className={`${sizes[size]} text-accent-3 animate-spin`} />
        {text && (
          <p className={`font-raleway text-foreground ${textSizes[size]}`}>
            {text}
          </p>
        )}
      </div>
    </div>
  )
}

// Componente de skeleton para loading de contenido
export function Skeleton({
  className = '',
  variant = 'text',
}: {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
}) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={`animate-pulse bg-gray-700 ${variants[variant]} ${className}`}
    />
  )
}

// Loading específico para cotizaciones
export function QuoteLoading() {
  return (
    <div className='space-y-4'>
      <Skeleton className='h-6 w-48' />
      <div className='space-y-2'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='flex justify-between items-center'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-20' />
          </div>
        ))}
      </div>
      <div className='border-t border-gray-700 pt-4'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-5 w-24' />
          <Skeleton className='h-5 w-24' />
        </div>
      </div>
    </div>
  )
}
