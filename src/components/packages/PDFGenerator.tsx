'use client'

import { useState } from 'react'
import { jsPDF } from 'jspdf'
import type { Quote } from '@/types'
import { businessInfo } from '@/lib/brand'

interface PDFGeneratorProps {
  quote: Quote
  eventType: string
  clientName?: string
}

export const generateQuotePDF = async ({
  quote,
  eventType,
  clientName = 'Cliente',
}: PDFGeneratorProps) => {
  const doc = new jsPDF()

  // Configuración de fuentes y colores
  const primaryColor = '#ec842f' // accent-3
  const darkColor = '#000000'
  const grayColor = '#666666'

  // Función para agregar texto con color
  const addColoredText = (
    text: string,
    x: number,
    y: number,
    color = darkColor,
    fontSize = 12,
    style = 'normal',
    align = 'left'
  ) => {
    doc.setTextColor(color)
    doc.setFontSize(fontSize)
    if (style === 'bold') {
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }
    doc.text(text, x, y, {
      align: align as 'left' | 'center' | 'right' | 'justify',
    })
  }

  // Header con logo y información del salón
  doc.setFillColor(0, 0, 0) // fondo oscuro como el sitio
  doc.rect(0, 0, 210, 25, 'F')

  try {
    const img = new Image()
    img.src = '/logo-horizontal.png'
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })
    
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(img, 0, 0)
      const dataUrl = canvas.toDataURL('image/png')
      const ratio = img.width / img.height
      const pdfHeight = 14
      const pdfWidth = pdfHeight * ratio
      doc.addImage(dataUrl, 'PNG', 20, 5, pdfWidth, pdfHeight)
    }
  } catch {
    // Fallback si falla cargar el logo
    doc.setFillColor(255, 255, 255)
    doc.circle(28, 12, 8, 'F')
    addColoredText('SC', 25, 14, darkColor, 10, 'bold')
    addColoredText(businessInfo.name, 45, 10, '#ffffff', 16, 'bold')
    addColoredText(businessInfo.slogan, 45, 16, '#ffffff', 10)
  }

  // Información de contacto alineada a la derecha
  addColoredText(businessInfo.contact.phone, 190, 10, '#ffffff', 9, 'normal', 'right')
  addColoredText(businessInfo.contact.email, 190, 16, '#ffffff', 9, 'normal', 'right')

  // Título del documento
  addColoredText('COTIZACIÓN DE EVENTO', 20, 40, primaryColor, 18, 'bold')

  // Línea separadora
  doc.setDrawColor(236, 132, 47)
  doc.setLineWidth(1)
  doc.line(20, 45, 190, 45)

  // Información del cliente y evento
  let yPosition = 60

  // Cuadro de información del evento
  doc.setFillColor(245, 245, 245)
  doc.rect(20, yPosition - 5, 170, 50, 'F')
  doc.setDrawColor(200, 200, 200)
  doc.rect(20, yPosition - 5, 170, 50, 'S')

  addColoredText(
    'INFORMACIÓN DEL EVENTO',
    25,
    yPosition + 5,
    darkColor,
    12,
    'bold'
  )

  const eventInfo = [
    `Cliente: ${clientName}`,
    `Tipo de evento: ${eventType}`,
    `Número de invitados: ${quote.guestCount} personas`,
    `Fecha del evento: ${quote.eventDate || 'Por definir'}`,
    `Fecha de cotización: ${new Date().toLocaleDateString('es-MX')}`,
  ]

  eventInfo.forEach((info, index) => {
    addColoredText(info, 25, yPosition + 15 + index * 6, grayColor, 10)
  })

  yPosition += 55

  // Tabla de servicios
  addColoredText(
    'DETALLE DE SERVICIOS',
    20,
    yPosition,
    primaryColor,
    14,
    'bold'
  )
  yPosition += 10

  // Encabezados de tabla
  doc.setFillColor(236, 132, 47)
  doc.rect(20, yPosition, 170, 8, 'F')

  addColoredText('Concepto', 22, yPosition + 6, '#ffffff', 10, 'bold')
  addColoredText('Cant.', 120, yPosition + 6, '#ffffff', 10, 'bold')
  addColoredText('Precio Unit.', 140, yPosition + 6, '#ffffff', 10, 'bold')
  addColoredText('Total', 170, yPosition + 6, '#ffffff', 10, 'bold')

  yPosition += 12

  // Filas de servicios
  quote.items.forEach((item, index) => {
    // Verificar si necesitamos nueva página antes de dibujar la fila completa
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
      // Repetir encabezados de tabla en nueva página
      addColoredText(
        'DETALLE DE SERVICIOS (cont.)',
        20,
        yPosition,
        primaryColor,
        12,
        'bold'
      )
      yPosition += 6
      doc.setFillColor(236, 132, 47)
      doc.rect(20, yPosition, 170, 8, 'F')
      addColoredText('Concepto', 22, yPosition + 6, '#ffffff', 10, 'bold')
      addColoredText('Cant.', 120, yPosition + 6, '#ffffff', 10, 'bold')
      addColoredText('Precio Unit.', 140, yPosition + 6, '#ffffff', 10, 'bold')
      addColoredText('Total', 170, yPosition + 6, '#ffffff', 10, 'bold')
      yPosition += 12
    }

    // Fondo alternado para filas
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(20, yPosition - 2, 170, 8, 'F')
    }

    const serviceName =
      item.serviceName.length > 40
        ? item.serviceName.substring(0, 37) + '...'
        : item.serviceName

    addColoredText(serviceName, 22, yPosition + 4, darkColor, 9)
    addColoredText(item.quantity.toString(), 125, yPosition + 4, darkColor, 9)
    addColoredText(
      `$${item.unitPrice.toLocaleString()}`,
      145,
      yPosition + 4,
      darkColor,
      9
    )
    addColoredText(
      `$${item.total.toLocaleString()}`,
      175,
      yPosition + 4,
      darkColor,
      9,
      'bold'
    )

    // Descripción multilinea controlada
    if (item.description && item.description !== item.serviceName) {
      const maxCharsPerLine = 65
      const rawDesc = item.description.trim()
      const descLines: string[] = []
      let buffer = ''
      rawDesc.split(' ').forEach(word => {
        if ((buffer + ' ' + word).trim().length <= maxCharsPerLine) {
          buffer = (buffer + ' ' + word).trim()
        } else {
          descLines.push(buffer)
          buffer = word
        }
      })
      if (buffer) descLines.push(buffer)

      descLines.slice(0, 2).forEach(line => {
        yPosition += 5
        addColoredText(line, 25, yPosition + 4, grayColor, 8)
      })
      if (descLines.length > 2) {
        yPosition += 5
        addColoredText('...', 25, yPosition + 4, grayColor, 8)
      }
    }

    yPosition += 10
  })

  // Total
  yPosition += 10
  doc.setDrawColor(236, 132, 47)
  doc.setLineWidth(1)
  doc.line(100, yPosition, 190, yPosition)

  yPosition += 10
  addColoredText('SUBTOTAL:', 105, yPosition, darkColor, 12, 'bold')
  addColoredText(
    `$${quote.subtotal.toLocaleString()}`,
    185,
    yPosition,
    darkColor,
    12,
    'bold',
    'right'
  )

  yPosition += 10
  addColoredText('TOTAL DEL PAQUETE:', 105, yPosition, primaryColor, 14, 'bold')
  addColoredText(
    `$${quote.total.toLocaleString()}`,
    185,
    yPosition,
    primaryColor,
    14,
    'bold',
    'right'
  )

  yPosition += 8
  addColoredText('Anticipo para reservar (50%):', 105, yPosition, grayColor, 10)
  addColoredText(
    `$${quote.advancePayment.toLocaleString()}`,
    185,
    yPosition,
    primaryColor,
    12,
    'bold',
    'right'
  )

  // Notas adicionales
  if (quote.notes && quote.notes.trim()) {
    yPosition += 15
    if (yPosition > 240) {
      doc.addPage()
      yPosition = 20
    }

    addColoredText(
      'NOTAS ADICIONALES:',
      20,
      yPosition,
      primaryColor,
      12,
      'bold'
    )
    yPosition += 8

    // Dividir las notas en líneas
    const notes = quote.notes.trim()
    const maxLineLength = 80
    const words = notes.split(' ')
    let currentLine = ''

    words.forEach(word => {
      if ((currentLine + word).length <= maxLineLength) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        if (currentLine) {
          addColoredText(currentLine, 20, yPosition, grayColor, 10)
          yPosition += 5
        }
        currentLine = word
      }
    })

    if (currentLine) {
      addColoredText(currentLine, 20, yPosition, grayColor, 10)
      yPosition += 5
    }
  }

  // Términos y condiciones
  yPosition += 15
  if (yPosition > 220) {
    doc.addPage()
    yPosition = 20
  }

  addColoredText(
    'TÉRMINOS Y CONDICIONES:',
    20,
    yPosition,
    primaryColor,
    12,
    'bold'
  )

  const terms = [
    '• Anticipo del 50% requerido para reservar la fecha',
    '• El 50% restante se paga hasta un día antes del evento',
    '• Eventos pueden durar hasta las 2:00 AM del día siguiente',
    '• Horas extras tienen un costo de $250 pesos por hora',
    '• Acceso al salón desde la hora que se necesite',
    '• Incluye estacionamiento gratuito en la calle',
    '• Precios válidos por 30 días a partir de la fecha de cotización',
  ]

  terms.forEach(term => {
    yPosition += 6
    if (yPosition > 280) {
      doc.addPage()
      yPosition = 20
    }
    addColoredText(term, 20, yPosition, grayColor, 9)
  })

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    // Línea del footer
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(20, 285, 190, 285)

    // Información de contacto en el footer
    addColoredText(
      `${businessInfo.contact.address.full}`,
      20,
      292,
      grayColor,
      8
    )
    addColoredText(`Página ${i} de ${pageCount}`, 170, 292, grayColor, 8)
  }

  // Generar nombre del archivo
  const fileName = `Cotizacion_${businessInfo.name.replace(' ', '_')}_${eventType.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.pdf`

  // Descargar el PDF
  doc.save(fileName)
}

export default function PDFGenerator({
  quote,
  eventType,
  clientName,
}: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      await generateQuotePDF({ quote, eventType, clientName })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <button
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      className='inline-flex items-center space-x-2 bg-accent-3 hover:bg-accent-2 text-background px-3 py-2 rounded-lg font-raleway font-semibold transition-all duration-300 transform hover:scale-105 text-xs disabled:opacity-50 disabled:cursor-not-allowed'
    >
      <svg
        className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`}
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        {isGenerating ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        ) : (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        )}
      </svg>
      <span>{isGenerating ? 'Generando...' : 'PDF'}</span>
    </button>
  )
}
