'use client'

import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from '../ui/WhatsAppButton'

interface MainLayoutProps {
  children: ReactNode
  showWhatsApp?: boolean
  whatsAppMessage?: string
}

export default function MainLayout({ 
  children, 
  showWhatsApp = true,
  whatsAppMessage 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      {showWhatsApp && (
        <WhatsAppButton message={whatsAppMessage} />
      )}
    </div>
  )
}