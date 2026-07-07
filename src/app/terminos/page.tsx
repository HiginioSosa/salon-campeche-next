import type { Metadata } from 'next'
import { MainLayout, Section, SectionHeader, Card, CardContent } from '@/components'
import { businessInfo } from '@/lib/brand'

export const metadata: Metadata = {
  title: `Términos y Condiciones - ${businessInfo.name}`,
  description: `Términos y condiciones de contratación de ${businessInfo.name}: reservación, anticipo, depósito en garantía, cancelaciones, horarios, aforo y responsabilidades.`,
  alternates: { canonical: '/terminos' },
  openGraph: {
    title: `Términos y Condiciones - ${businessInfo.name}`,
    description: 'Condiciones de uso del sitio y de contratación de Salón Campeche.',
    url: '/terminos',
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
    title: '1. Objeto y aceptación',
    intro: `Los presentes Términos y Condiciones regulan el uso de este sitio web y la contratación de los servicios de renta de salón y servicios complementarios que ofrece ${businessInfo.name} (en adelante «el Salón»), ubicado en ${businessInfo.contact.address.full}. Al utilizar el sitio o contratar nuestros servicios, el usuario o cliente (en adelante «el Cliente») acepta de forma expresa estos Términos y Condiciones.`,
  },
  {
    title: '2. Definiciones',
    items: [
      '«Evento»: la celebración para la cual el Cliente contrata el salón y/o los servicios complementarios.',
      '«Servicios complementarios»: mobiliario, decoración, DJ, meseros, vajilla, entretenimiento y demás servicios adicionales a la renta del espacio.',
      '«Anticipo»: pago inicial requerido para reservar la fecha del Evento.',
      '«Depósito en garantía»: cantidad reembolsable destinada a cubrir posibles daños al inmueble, mobiliario o equipo.',
    ],
  },
  {
    title: '3. Reservación y confirmación de fecha',
    intro:
      'La disponibilidad mostrada en el sitio es informativa y no constituye una reservación. Una fecha se considera reservada únicamente cuando: (i) el Salón confirma por escrito su disponibilidad, y (ii) el Cliente cubre el Anticipo correspondiente. Hasta que ambas condiciones se cumplan, la fecha puede ser contratada por otro cliente.',
  },
  {
    title: '4. Cotizaciones y precios',
    intro:
      'Las cotizaciones generadas en este sitio son estimaciones informativas basadas en los servicios seleccionados. Los precios están expresados en pesos mexicanos (MXN), pueden no incluir impuestos y están sujetos a disponibilidad, a confirmación y a cambios sin previo aviso. Una cotización tiene una vigencia de [número] días naturales a partir de su emisión y no constituye un contrato ni obliga a ninguna de las partes hasta su formalización.',
  },
  {
    title: '5. Anticipo y forma de pago',
    intro:
      'Para apartar la fecha del Evento se requiere un Anticipo equivalente al 50% del total contratado. El 50% restante deberá liquidarse a más tardar un día antes de la fecha del Evento. Las formas de pago aceptadas son [efectivo / transferencia / otras], según se acuerde al momento de la contratación. No se permitirá el acceso al Evento si existe saldo pendiente de liquidación.',
  },
  {
    title: '6. Depósito en garantía',
    intro:
      'El Salón podrá solicitar un Depósito en garantía por la cantidad de [monto del depósito en garantía, p. ej. $X,XXX MXN], reembolsable dentro de los [número] días posteriores al Evento, previa verificación de que las instalaciones, el mobiliario y el equipo se devuelven en las mismas condiciones en que fueron entregados. En caso de daños, faltantes o limpieza extraordinaria, el costo correspondiente se descontará de dicho depósito, sin perjuicio de reclamar cantidades adicionales cuando el daño supere el monto depositado.',
  },
  {
    title: '7. Cancelaciones y reprogramaciones',
    intro:
      'Las cancelaciones deberán notificarse por escrito. La política de reembolso del Anticipo, sujeta a definición del Salón, es la siguiente:',
    items: [
      'Cancelación con más de [número] días de anticipación: se reembolsa el [porcentaje]% del Anticipo.',
      'Cancelación entre [número] y [número] días de anticipación: se reembolsa el [porcentaje]% del Anticipo.',
      'Cancelación con menos de [número] días de anticipación: el Anticipo no es reembolsable.',
    ],
    outro:
      'La reprogramación de la fecha estará sujeta a disponibilidad y deberá solicitarse con al menos [número] días de anticipación; podrá generar ajustes en el precio conforme a la nueva fecha.',
  },
  {
    title: '8. Horarios del Evento y horas extra',
    intro:
      'Los Eventos podrán desarrollarse hasta las 2:00 AM del día siguiente. Cada hora adicional tendrá un costo de $250 MXN y deberá autorizarse por el Salón. El horario de acceso para montaje, decoración o preparación se acordará al momento de la contratación y forma parte del tiempo contratado, salvo pacto en contrario.',
  },
  {
    title: '9. Capacidad y aforo',
    intro: `La capacidad máxima del salón es de ${businessInfo.capacity.firstFloor} personas en el primer piso y de ${businessInfo.capacity.bothFloors} personas utilizando ambos niveles. Por seguridad, el Cliente se obliga a respetar el aforo máximo autorizado; el exceso de invitados podrá ser motivo de negativa de acceso o de suspensión del Evento, sin responsabilidad para el Salón.`,
  },
  {
    title: '10. Alimentos, bebidas y proveedores externos',
    intro:
      'El Cliente podrá contratar los servicios de alimentos y bebidas del Salón o, cuando así se acuerde, ingresar proveedores externos. Los proveedores externos deberán respetar los horarios, las reglas de acceso y las normas de seguridad e higiene del Salón. El Salón no se hace responsable por la calidad, el servicio ni las consecuencias derivadas de proveedores contratados directamente por el Cliente. La venta y el consumo de bebidas alcohólicas se sujetan a la legislación aplicable; queda prohibido su suministro a menores de edad.',
  },
  {
    title: '11. Conducta, seguridad y obligaciones del Cliente',
    intro:
      'El Cliente es responsable de la conducta de sus invitados y se obliga a:',
    items: [
      'Hacer un uso adecuado y responsable de las instalaciones, mobiliario y equipo.',
      'No realizar actividades ilícitas ni permitir el ingreso de armas o sustancias prohibidas.',
      'Respetar los niveles de ruido y las disposiciones aplicables al finalizar el horario permitido.',
      'Cubrir los daños ocasionados por él o por sus invitados al inmueble, mobiliario o a terceros.',
    ],
    outro:
      'El Salón se reserva el derecho de suspender el Evento en caso de riesgo a la seguridad de las personas o de las instalaciones, o por incumplimiento grave de estas condiciones, sin responsabilidad ni obligación de reembolso.',
  },
  {
    title: '12. Responsabilidad del Salón y limitación',
    intro:
      'El Salón proporcionará las instalaciones y los servicios contratados en condiciones adecuadas de uso. El Salón no será responsable por: (i) objetos personales perdidos, olvidados o robados durante el Evento; (ii) accidentes derivados del uso indebido de las instalaciones por parte de los invitados; ni (iii) incumplimientos de proveedores contratados directamente por el Cliente. La información publicada en el sitio puede contener imprecisiones o estar sujeta a actualización; prevalecerá lo pactado por escrito en el contrato.',
  },
  {
    title: '13. Caso fortuito y fuerza mayor',
    intro:
      'Ninguna de las partes será responsable por el incumplimiento derivado de caso fortuito o fuerza mayor (fenómenos naturales, disposiciones de autoridad, contingencias sanitarias, entre otros). En tales casos, las partes buscarán de buena fe reprogramar el Evento en una fecha disponible.',
  },
  {
    title: '14. Uso del sitio web y del cotizador',
    intro:
      'El cotizador y la información de disponibilidad de este sitio tienen carácter meramente informativo y no vinculante. El Cliente reconoce que los resultados son estimaciones y que la contratación definitiva se realiza de forma directa con el Salón.',
  },
  {
    title: '15. Propiedad intelectual',
    intro: `El contenido de este sitio (textos, imágenes, logotipos, marcas y diseño) es propiedad de ${businessInfo.name} o se utiliza con la debida autorización, y está protegido por la legislación aplicable. Queda prohibida su reproducción, distribución o uso con fines comerciales sin autorización previa y por escrito.`,
  },
  {
    title: '16. Protección de datos personales',
    intro:
      'El tratamiento de los datos personales que el Cliente proporcione se rige por nuestro Aviso de Privacidad, disponible en la sección correspondiente de este sitio.',
  },
  {
    title: '17. Modificaciones a los Términos',
    intro:
      'El Salón podrá modificar estos Términos y Condiciones en cualquier momento. La versión vigente será la publicada en esta página, indicando su fecha de última actualización.',
  },
  {
    title: '18. Legislación aplicable y jurisdicción',
    intro:
      'Estos Términos y Condiciones se rigen por las leyes aplicables en el Estado de México, México. Para la interpretación y cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes de dicha entidad, así como, en su caso, a la competencia de la Procuraduría Federal del Consumidor (PROFECO) para las relaciones de consumo.',
  },
  {
    title: '19. Contacto',
    intro: `Para cualquier duda sobre estos Términos y Condiciones, contáctanos en ${businessInfo.contact.email} o al teléfono ${businessInfo.contact.phone}.`,
  },
]

export default function TermsPage() {
  return (
    <MainLayout whatsAppMessage='¡Hola! Tengo una duda sobre sus términos y condiciones.'>
      <Section variant='gradient' size='lg'>
        <SectionHeader
          as='h1'
          subtitle='Información Legal'
          title='Términos y Condiciones'
          description={`Última actualización: ${lastUpdated}`}
        />
      </Section>

      <Section variant='default' size='xl'>
        <div className='max-w-3xl mx-auto space-y-8 font-raleway text-gray-300 leading-relaxed'>
          <Card variant='outlined' padding='md'>
            <CardContent>
              <p className='text-gray-400 text-sm'>
                <strong className='text-accent-3'>Nota (plantilla):</strong> este
                documento es un modelo con las cláusulas habituales para la renta
                de un salón de eventos. Los campos entre corchetes [ ] requieren
                tu definición (montos, plazos y porcentajes) y te recomendamos
                validarlo con un profesional legal antes de su publicación
                definitiva.
              </p>
            </CardContent>
          </Card>

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
