import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader, Card, CardContent } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Aviso de Privacidad - ${businessInfo.name}`,
  description: `Aviso de Privacidad Integral de ${businessInfo.name} conforme a la LFPDPPP: datos que recabamos, finalidades, transferencias y derechos ARCO.`,
  alternates: { canonical: '/privacidad' },
  openGraph: {
    title: `Aviso de Privacidad - ${businessInfo.name}`,
    description: 'Cómo tratamos tus datos personales en Salón Campeche.',
    url: '/privacidad',
  },
}

const lastUpdated = 'julio de 2026'

interface LegalSection {
  title: string
  intro?: string
  items?: string[]
  outro?: string
}

const sections: LegalSection[] = [
  {
    title: '1. Responsable del tratamiento',
    intro: `[Razón social o nombre completo del responsable] (en lo sucesivo «${businessInfo.name}», «nosotros» o «el Responsable»), con domicilio en ${businessInfo.contact.address.full}, es responsable del uso y protección de tus datos personales. Para cualquier asunto relacionado con este Aviso de Privacidad puedes contactarnos en el correo ${businessInfo.contact.email} o al teléfono ${businessInfo.contact.phone}.`,
  },
  {
    title: '2. Datos personales que recabamos',
    intro:
      'Para las finalidades descritas en este aviso, podemos recabar las siguientes categorías de datos personales:',
    items: [
      'Datos de identificación y contacto: nombre, teléfono y correo electrónico.',
      'Datos del evento: tipo de evento, fecha tentativa, número de invitados y preferencias de servicios.',
      'Datos de facturación (solo si solicitas factura): RFC, razón social, domicilio fiscal y uso de CFDI.',
      'Datos de pago: los necesarios para procesar anticipos y liquidaciones al momento de contratar.',
    ],
    outro:
      'No recabamos datos personales sensibles. Si nos proporcionas datos de terceros (por ejemplo, invitados o la persona homenajeada), manifiestas contar con su consentimiento para ello.',
  },
  {
    title: '3. Cómo recabamos tus datos',
    intro: 'Obtenemos tus datos personales por las siguientes vías:',
    items: [
      'Directamente, cuando completas los formularios de contacto o cotización de este sitio (que abren una conversación de WhatsApp con la información que escribiste), nos llamas o nos escribes.',
      'Presencialmente o por mensajería, al momento de solicitar información o formalizar la contratación de un evento.',
    ],
    outro:
      'Importante: los formularios de este sitio no envían tu información a un servidor propio ni la almacenan en una base de datos automatizada; su función es abrir WhatsApp para que te comuniques con nosotros.',
  },
  {
    title: '4. Finalidades primarias (necesarias)',
    intro:
      'Utilizamos tus datos personales para las siguientes finalidades que dan origen y son necesarias para la relación con nosotros:',
    items: [
      'Atender tus solicitudes, dudas y consultas.',
      'Elaborar cotizaciones y verificar la disponibilidad de fechas.',
      'Agendar, formalizar y dar seguimiento al contrato de prestación de servicios de tu evento.',
      'Procesar anticipos, pagos y, en su caso, emitir la factura correspondiente.',
      'Coordinar la logística y garantizar la seguridad de las instalaciones y del evento.',
    ],
  },
  {
    title: '5. Finalidades secundarias',
    intro:
      'De manera adicional, y solo si no te opones, podríamos usar tus datos para finalidades que no son necesarias pero nos permiten brindarte una mejor atención:',
    items: [
      'Envío de promociones, paquetes y ofertas especiales.',
      'Felicitaciones y recordatorios de fechas.',
      'Invitaciones a eventos o novedades del salón.',
    ],
    outro: `Si no deseas que tus datos se utilicen para estas finalidades secundarias, envíanos un correo a ${businessInfo.contact.email} con la leyenda «No promociones». Tu negativa no será motivo para negarte los servicios que contrates.`,
  },
  {
    title: '6. Transferencias de datos',
    intro:
      'No transferimos tus datos personales a terceros sin tu consentimiento, salvo en los supuestos previstos por el artículo 37 de la LFPDPPP (por ejemplo, cuando lo exija una autoridad competente). El uso de proveedores que nos prestan servicios (encargados) para operar el evento no se considera transferencia, ya que tratan los datos por cuenta y bajo instrucciones del Responsable.',
  },
  {
    title: '7. Servicios de terceros en el sitio',
    intro:
      'Al enviar un mensaje desde el sitio se utiliza WhatsApp (Meta Platforms, Inc.), sujeto a su propia política de privacidad. La página de contacto muestra un mapa mediante Google Maps (Google LLC), también sujeto a sus términos. Te recomendamos revisar las políticas de dichos proveedores.',
  },
  {
    title: '8. Uso de cookies y tecnologías de rastreo',
    intro:
      'Este sitio no utiliza cookies de rastreo, analítica de terceros ni herramientas de publicidad. Únicamente se emplean los recursos técnicos necesarios para que la página funcione correctamente.',
  },
  {
    title: '9. Medios para ejercer tus derechos ARCO',
    intro:
      'Tienes derecho a conocer qué datos personales tenemos de ti, para qué los utilizamos y las condiciones de su uso (Acceso); a solicitar la corrección de tu información cuando esté desactualizada, sea inexacta o incompleta (Rectificación); a que la eliminemos de nuestros registros cuando consideres que no se está utilizando conforme a este aviso (Cancelación); así como a oponerte al uso de tus datos para fines específicos (Oposición). Para ejercer cualquiera de estos derechos, envía una solicitud al correo ' +
      businessInfo.contact.email +
      ' que incluya:',
    items: [
      'Nombre del titular y un medio para comunicarte la respuesta.',
      'Documento que acredite tu identidad (o la representación legal, en su caso).',
      'Descripción clara y precisa de los datos respecto de los que buscas ejercer el derecho y del derecho que deseas ejercer.',
    ],
    outro:
      'Daremos respuesta a tu solicitud en un plazo máximo de 20 días hábiles. El ejercicio de estos derechos es gratuito.',
  },
  {
    title: '10. Revocación del consentimiento',
    intro: `En todo momento puedes revocar el consentimiento que nos otorgaste para el tratamiento de tus datos personales, enviando tu solicitud a ${businessInfo.contact.email}. Considera que, por obligaciones legales, en algunos casos no será posible concluir el uso de forma inmediata.`,
  },
  {
    title: '11. Cambios al Aviso de Privacidad',
    intro:
      'Este Aviso de Privacidad puede sufrir modificaciones derivadas de nuevos requerimientos legales, de nuestras propias necesidades o de cambios en nuestros servicios. La versión vigente siempre estará disponible en esta página, indicando su fecha de última actualización.',
  },
  {
    title: '12. Consentimiento',
    intro:
      'Al proporcionarnos tus datos personales por cualquiera de los medios señalados, manifiestas tu conformidad con el presente Aviso de Privacidad y consientes el tratamiento de tus datos conforme al mismo.',
  },
  {
    title: '13. Autoridad',
    intro:
      'Si consideras que tu derecho a la protección de datos ha sido vulnerado, puedes acudir al Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI) — www.inai.org.mx.',
  },
]

export default function PrivacyPage() {
  return (
    <MainLayout whatsAppMessage='¡Hola! Tengo una duda sobre su aviso de privacidad.'>
      <Section variant='gradient' size='lg'>
        <SectionHeader
          as='h1'
          subtitle='Aviso de Privacidad Integral'
          title='Aviso de Privacidad'
          description={`Última actualización: ${lastUpdated}`}
        />
      </Section>

      <Section variant='default' size='xl'>
        <div className='max-w-3xl mx-auto space-y-8 font-raleway text-gray-300 leading-relaxed'>
          <Card variant='outlined' padding='md'>
            <CardContent>
              <p className='text-gray-400 text-sm'>
                <strong className='text-accent-3'>Nota (plantilla):</strong> este
                documento es un modelo elaborado conforme a la Ley Federal de
                Protección de Datos Personales en Posesión de los Particulares
                (LFPDPPP). Los campos entre corchetes [ ] requieren tu definición
                y te recomendamos validarlo con un profesional legal antes de su
                publicación definitiva.
              </p>
            </CardContent>
          </Card>

          <p>
            En cumplimiento de la LFPDPPP, su Reglamento y los Lineamientos del
            Aviso de Privacidad, {businessInfo.name} pone a tu disposición el
            presente Aviso de Privacidad Integral, que describe cómo recabamos,
            usamos y protegemos tus datos personales.
          </p>

          {sections.map((section, index) => (
            <div key={index}>
              <h2 className='font-caveat font-bold text-2xl text-foreground mb-3'>
                {section.title}
              </h2>
              {section.intro && <p>{section.intro}</p>}
              {section.items && (
                <ul className='list-disc pl-6 space-y-2 mt-3'>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.outro && <p className='mt-3'>{section.outro}</p>}
            </div>
          ))}
        </div>
      </Section>
    </MainLayout>
  )
}
