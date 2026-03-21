import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vidit Dugar — Builder. Investor. Storyteller.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          backgroundColor: '#0D0B09',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Gold top rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C4832A' }} />
          <span style={{ color: '#C4832A', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Georgia, serif' }}>
            Portfolio
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: '700',
              color: '#F2EAE0',
              lineHeight: '1.0',
              letterSpacing: '-0.02em',
              fontFamily: 'Georgia, serif',
            }}
          >
            Vidit Dugar
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#F2EAE0',
              opacity: 0.5,
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.01em',
            }}
          >
            Builder. Investor. Storyteller.
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Nomura London', 'Bombay Shaving Company', 'The Bridge'].map((item) => (
              <span
                key={item}
                style={{
                  color: '#F2EAE0',
                  opacity: 0.3,
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {item}
              </span>
            ))}
          </div>
          <span style={{ color: '#C4832A', fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Kolkata · London · Delhi
          </span>
        </div>

        {/* Subtle gold ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '200px',
            right: '0px',
            width: '500px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,131,42,0.08) 0%, transparent 70%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
