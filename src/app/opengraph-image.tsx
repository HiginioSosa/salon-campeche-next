import { ImageResponse } from 'next/og'
import { businessInfo } from '@/lib/brand'

// Imagen Open Graph generada dinámicamente (compartir en redes / WhatsApp).
// Aplica a la ruta raíz y es heredada por las rutas hijas que no definan la suya.
export const alt = `${businessInfo.name} - ${businessInfo.slogan}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(236,132,47,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(207,123,117,0.16), transparent 55%)',
          color: '#f2b98d',
          fontFamily: 'sans-serif',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 40,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#ec842f',
            marginBottom: 24,
          }}
        >
          Salón de Fiestas
        </div>
        <div
          style={{
            fontSize: 128,
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#f2b98d',
          }}
        >
          {businessInfo.name}
        </div>
        <div style={{ fontSize: 52, marginTop: 24, color: '#de8052' }}>
          {businessInfo.slogan}
        </div>
        <div style={{ fontSize: 34, marginTop: 40, color: '#a3a3a3' }}>
          {`${businessInfo.contact.address.city}, ${businessInfo.contact.address.state} · Hasta ${businessInfo.capacity.bothFloors} personas`}
        </div>
      </div>
    ),
    { ...size }
  )
}
