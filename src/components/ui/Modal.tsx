'use client'

import { useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  /** id del elemento que titula el diálogo (para aria-labelledby) */
  labelledBy?: string
  /** etiqueta accesible alternativa si no hay título visible */
  ariaLabel?: string
  children: React.ReactNode
  /** clases para el contenedor del contenido */
  className?: string
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Diálogo modal accesible: cierra con Escape y con clic en el fondo, bloquea el
 * scroll del body, atrapa el foco mientras está abierto y lo restaura al cerrar.
 */
export default function Modal({
  isOpen,
  onClose,
  labelledBy,
  ariaLabel,
  children,
  className = '',
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = contentRef.current?.querySelectorAll<HTMLElement>(
        FOCUSABLE
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Enfocar el contenido al abrir
    contentRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      onMouseDown={e => {
        if (e.target === overlayRef.current) onClose()
      }}
    >
      <div ref={contentRef} tabIndex={-1} className={`outline-none ${className}`}>
        {children}
      </div>
    </div>
  )
}
