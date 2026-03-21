import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vidit Dugar — Portfolio'
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
          justifyContent: 'center',
          padding: '0 96px',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '80px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,131,42,0.07) 0%, transparent 70%)',
          }}
        />

        {/* Gold rule */}
        <div style={{ display: 'flex', marginBottom: '48px' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#C4832A' }} />
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '700',
            color: '#F2EAE0',
            lineHeight: '1.0',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}
        >
          Vidit Dugar
        </div>

        {/* Portfolio label */}
        <div
          style={{
            fontSize: '22px',
            color: '#C4832A',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '56px',
          }}
        >
          Portfolio
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', marginBottom: '40px' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#F2EAE0', opacity: 0.1 }} />
        </div>

        {/* Three pillars */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {['Investments', 'Operations', 'Content'].map((label) => (
            <span
              key={label}
              style={{
                color: '#F2EAE0',
                opacity: 0.4,
                fontSize: '14px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Companies — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '96px',
            display: 'flex',
            gap: '28px',
          }}
        >
          {['Nomura', 'Bombay Shaving Company', 'Orly'].map((co) => (
            <span
              key={co}
              style={{
                color: '#F2EAE0',
                opacity: 0.25,
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {co}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
