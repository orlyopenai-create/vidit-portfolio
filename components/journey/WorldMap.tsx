'use client'
import { useState, useRef, useEffect } from 'react'
import { m, AnimatePresence, animate } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps'
import { journeyCities, type JourneyCity } from '@/lib/data/journey'

const GEO_URL = '/world-110m.json'

const JOURNEY_PAIRS: Array<[string, string]> = [
  ['kolkata', 'mumbai'],
  ['mumbai', 'london'],
  ['london', 'delhi'],
  ['delhi', 'kolkata'],
]

function AnimatedJourneyLine({
  from,
  to,
  delay,
}: {
  from: [number, number]
  to: [number, number]
  delay: number
}) {
  const gRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const g = gRef.current
    if (!g) return
    const path = g.querySelector('path')
    if (!path) return
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    g.setAttribute('opacity', '0')

    const t = setTimeout(() => {
      g.setAttribute('opacity', '1')
      const controls = animate(length, 0, {
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1],
        onUpdate(v) {
          path.style.strokeDashoffset = `${v}`
        },
      })
      return () => controls.stop()
    }, delay * 1000)

    return () => clearTimeout(t)
  }, [delay])

  return (
    <g ref={gRef}>
      <Line
        from={from}
        to={to}
        stroke="#C4832A"
        strokeWidth={0.9}
        strokeOpacity={0.55}
        fill="none"
      />
    </g>
  )
}

export function WorldMap() {
  const [activeCity, setActiveCity] = useState<JourneyCity | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  function handleMarkerClick(city: JourneyCity, e: React.MouseEvent) {
    e.stopPropagation()
    if (activeCity?.id === city.id) {
      setActiveCity(null)
      return
    }
    const rect = (e.currentTarget as HTMLElement)
      .closest('.map-container')
      ?.getBoundingClientRect()
    const x = e.clientX - (rect?.left ?? 0)
    const y = e.clientY - (rect?.top ?? 0)
    setTooltipPos({ x, y })
    setActiveCity(city)
  }

  const isKolkata = (city: JourneyCity) => city.id === 'kolkata'

  return (
    <div
      className="map-container relative w-full"
      onClick={() => setActiveCity(null)}
    >
      {/* Wrapper constrains height on mobile — SVG height:auto is unreliable on mobile browsers */}
      <div
        className="overflow-hidden max-h-[200px] md:max-h-none"
        style={{ aspectRatio: '800/600' }}
      >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 320, center: [42, 28] }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: '#2A2218', stroke: '#3D3026', strokeWidth: 0.4, outline: 'none' },
                  hover:   { fill: '#2A2218', stroke: '#3D3026', strokeWidth: 0.4, outline: 'none' },
                  pressed: { fill: '#2A2218', outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {/* Animated flight paths — drawn sequentially */}
        {JOURNEY_PAIRS.map(([fromId, toId], i) => {
          const fromCity = journeyCities.find((c) => c.id === fromId)!
          const toCity = journeyCities.find((c) => c.id === toId)!
          return (
            <AnimatedJourneyLine
              key={`${fromId}-${toId}`}
              from={fromCity.coordinates}
              to={toCity.coordinates}
              delay={0.5 + i * 1.0}
            />
          )
        })}

        {journeyCities.map((city, i) => (
          <Marker
            key={city.id}
            coordinates={city.coordinates}
            onClick={(e) => handleMarkerClick(city, e as unknown as React.MouseEvent)}
          >
            {/* Pulse ring — gold for Kolkata, muted for others */}
            <m.circle
              r={10}
              fill={isKolkata(city) ? '#C4832A' : '#8A7D6F'}
              fillOpacity={0}
              stroke={isKolkata(city) ? '#C4832A' : '#8A7D6F'}
              strokeWidth={1.5}
              animate={{
                scale: [1, 2.0, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeOut',
              }}
            />
            {/* Dot — gold for Kolkata, dark for others */}
            <m.circle
              r={isKolkata(city) ? 6 : 5}
              fill={isKolkata(city) ? '#C4832A' : (activeCity?.id === city.id ? '#F2EAE0' : '#8A7D6F')}
              stroke={isKolkata(city) ? '#0D0B09' : '#0D0B09'}
              strokeWidth={1.5}
              style={{ cursor: 'pointer' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
              whileHover={{ scale: 1.5 }}
            />
            {/* City label */}
            <m.text
              textAnchor="middle"
              y={-11}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '7px',
                fill: isKolkata(city) ? '#C4832A' : '#F2EAE0',
                fontWeight: isKolkata(city) ? 600 : 400,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.12 }}
            >
              {city.name}
            </m.text>
          </Marker>
        ))}
      </ComposableMap>
      </div>

      {/* Tooltip / popout card */}
      <AnimatePresence>
        {activeCity && (
          <m.div
            key={activeCity.id}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 pointer-events-none"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y - 12,
              transform: 'translate(-50%, -100%)',
              maxWidth: '220px',
            }}
          >
            <div className="bg-surface border border-foreground/15 rounded-xl px-4 py-4 shadow-lg">
              <p className="font-body text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-foreground/40 mb-1">
                {activeCity.name}
              </p>
              <div className="h-[1px] w-8 bg-accent mb-2" />
              <p className="font-mono text-xs text-foreground/60 mb-2">{activeCity.period}</p>
              <p className="font-body text-sm font-medium text-foreground leading-snug mb-1">
                {activeCity.role.split(' · ')[0]}
              </p>
              {activeCity.role.includes(' · ') && (
                <p className="font-body text-xs text-foreground/50 mb-2">{activeCity.role.split(' · ').slice(1).join(' · ')}</p>
              )}
              {activeCity.id === 'kolkata' && (
                <p className="font-display italic text-xs text-[#A6701A] leading-relaxed mt-2">
                  &ldquo;Home. Third-generation. Returning with new eyes.&rdquo;
                </p>
              )}
            </div>
            {/* Arrow */}
            <div
              className="mx-auto"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #161210',
                width: 0,
                marginLeft: '50%',
                transform: 'translateX(-50%)',
              }}
            />
          </m.div>
        )}
      </AnimatePresence>

      <p className="text-center font-body text-xs text-foreground/35 mt-3">
        <span className="md:hidden">Tap a city to explore</span>
        <span className="hidden md:inline">Click a city to explore</span>
      </p>
    </div>
  )
}
