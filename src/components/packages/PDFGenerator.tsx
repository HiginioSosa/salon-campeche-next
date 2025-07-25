'use client'

import { jsPDF } from 'jspdf'
import type { Quote } from '@/types'
import { businessInfo } from '@/lib/brand'

interface PDFGeneratorProps {
  quote: Quote
  eventType: string
  clientName?: string
}

export const generateQuotePDF = ({
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
    style = 'normal'
  ) => {
    doc.setTextColor(color)
    doc.setFontSize(fontSize)
    if (style === 'bold') {
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }
    doc.text(text, x, y)
  }

  // Header con logo y información del salón
  doc.setFillColor(236, 132, 47) // accent-3
  doc.rect(0, 0, 210, 40, 'F')

  // Logo placeholder (aquí iría el logo real)
  doc.setFillColor(255, 255, 255)
  doc.circle(30, 20, 12, 'F')
  addColoredText('SC', 25, 25, darkColor, 16, 'bold')

  // Información del salón
  addColoredText(businessInfo.name, 50, 15, '#ffffff', 20, 'bold')
  addColoredText(businessInfo.slogan, 50, 25, '#ffffff', 12)
  addColoredText(
    `${businessInfo.contact.phone} | ${businessInfo.contact.email}`,
    50,
    32,
    '#ffffff',
    10
  )

  // Título del documento
  addColoredText('COTIZACIÓN DE EVENTO', 20, 55, primaryColor, 18, 'bold')

  // Línea separadora
  doc.setDrawColor(236, 132, 47)
  doc.setLineWidth(1)
  doc.line(20, 60, 190, 60)

  // Información del cliente y evento
  let yPosition = 75

  // Cuadro de información del evento
  doc.setFillColor(245, 245, 245)
  doc.rect(20, yPosition - 5, 170, 35, 'F')
  doc.setDrawColor(200, 200, 200)
  doc.rect(20, yPosition - 5, 170, 35, 'S')

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
    addColoredText(info, 25, yPosition + 15 + index * 5, grayColor, 10)
  })

  yPosition += 45

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
    // Fondo alternado
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250)
      doc.rect(20, yPosition - 2, 170, 8, 'F')
    }

    // Verificar si necesitamos nueva página
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    // Nombre del servicio (truncar si es muy largo)
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

    // Descripción si existe y hay espacio
    if (item.description && item.description !== item.serviceName) {
      yPosition += 5
      const description =
        item.description.length > 60
          ? item.description.substring(0, 57) + '...'
          : item.description
      addColoredText(description, 25, yPosition + 4, grayColor, 8)
    }

    yPosition += 10
  })

  // Total
  yPosition += 5
  doc.setDrawColor(236, 132, 47)
  doc.setLineWidth(1)
  doc.line(120, yPosition, 190, yPosition)

  yPosition += 8
  addColoredText('SUBTOTAL:', 130, yPosition, darkColor, 12, 'bold')
  addColoredText(
    `$${quote.subtotal.toLocaleString()}`,
    175,
    yPosition,
    darkColor,
    12,
    'bold'
  )

  yPosition += 8
  addColoredText('TOTAL DEL PAQUETE:', 130, yPosition, primaryColor, 14, 'bold')
  addColoredText(
    `$${quote.total.toLocaleString()}`,
    175,
    yPosition,
    primaryColor,
    14,
    'bold'
  )

  yPosition += 10
  addColoredText('Anticipo para reservar (50%):', 130, yPosition, grayColor, 10)
  addColoredText(
    `$${quote.advancePayment.toLocaleString()}`,
    175,
    yPosition,
    primaryColor,
    12,
    'bold'
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
  const handleGeneratePDF = () => {
    generateQuotePDF({ quote, eventType, clientName })
  }

  return (
    <button
      onClick={handleGeneratePDF}
      className='inline-flex items-center space-x-2 bg-accent-3 hover:bg-accent-2 text-background px-3 py-2 rounded-lg font-raleway font-semibold transition-all duration-300 transform hover:scale-105 text-xs'
    >
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
      <span>PDF</span>
    </button>
  )
}
