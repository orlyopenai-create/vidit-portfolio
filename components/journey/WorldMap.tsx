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

// Ordered waypoints for the plane circuit
const WAYPOINTS: Array<[number, number]> = [
  [88.3639, 22.5726],  // Kolkata
  [72.8777, 19.076],   // Mumbai
  [-0.1278, 51.5074],  // London
  [77.209,  28.6139],  // Delhi
  [88.3639, 22.5726],  // Kolkata (loop back)
]

// Duration (ms) per leg — shorter for short legs, longer for Mumbai→London
const LEG_DURATIONS = [2200, 3800, 3200, 2000]

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
  const [planePos, setPlanePos] = useState<[number, number] | null>(null)
  const [planeAngle, setPlaneAngle] = useState(0)

  // Plane circuit animation — starts after flight lines finish drawing (~5s)
  useEffect(() => {
    let cancelled = false

    function sleep(ms: number) {
      return new Promise<void>(resolve => setTimeout(resolve, ms))
    }

    function lerp(
      from: [number, number],
      to: [number, number],
      duration: number,
    ) {
      // Face direction of travel (flip latitude for screen-space y)
      const dx = to[0] - from[0]
      const dy = -(to[1] - from[1])
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)
      setPlaneAngle(angle)

      return new Promise<void>(resolve => {
        const start = performance.now()
        function step() {
          if (cancelled) { resolve(); return }
          const raw = Math.min((performance.now() - start) / duration, 1)
          // Ease in-out cubic
          const t = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2
          setPlanePos([
            from[0] + (to[0] - from[0]) * t,
            from[1] + (to[1] - from[1]) * t,
          ])
          if (raw < 1) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
    }

    async function fly() {
      await sleep(5200) // wait for all flight lines to draw
      setPlanePos(WAYPOINTS[0])
      while (!cancelled) {
        for (let i = 0; i < WAYPOINTS.length - 1; i++) {
          await lerp(WAYPOINTS[i], WAYPOINTS[i + 1], LEG_DURATIONS[i])
          await sleep(350)
        }
      }
    }

    fly()
    return () => { cancelled = true }
  }, [])

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
      {/* Map — constrained height on mobile */}
      <div
        className="overflow-hidden max-h-[200px] md:max-h-none"
        style={{ aspectRatio: '800/600' }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 520, center: [48, 30] }}
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

          {/* Flight path lines — drawn sequentially */}
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

          {/* City markers */}
          {journeyCities.map((city, i) => (
            <Marker
              key={city.id}
              coordinates={city.coordinates}
              onClick={(e) => handleMarkerClick(city, e as unknown as React.MouseEvent)}
            >
              {/* Pulse ring */}
              <m.circle
                r={10}
                fill={isKolkata(city) ? '#C4832A' : '#8A7D6F'}
                fillOpacity={0}
                stroke={isKolkata(city) ? '#C4832A' : '#8A7D6F'}
                strokeWidth={1.5}
                animate={{ scale: [1, 2.0, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
              />
              {/* Dot */}
              <m.circle
                r={isKolkata(city) ? 6 : 5}
                fill={isKolkata(city) ? '#C4832A' : (activeCity?.id === city.id ? '#F2EAE0' : '#8A7D6F')}
                stroke="#0D0B09"
                strokeWidth={1.5}
                style={{ cursor: 'pointer' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                whileHover={{ scale: 1.5 }}
              />
              {/* Label */}
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

          {/* Animated plane */}
          {planePos && (
            <Marker coordinates={planePos}>
              <g
                transform={`rotate(${planeAngle})`}
                style={{ pointerEvents: 'none' }}
              >
                {/* Soft glow behind plane */}
                <circle r={7} fill="#C4832A" opacity={0.12} />
                {/* Plane body — points right at 0° */}
                <path
                  d="M7,0 L-2,-3 L0,0 L-2,3 Z"
                  fill="#C4832A"
                  opacity={0.95}
                />
                {/* Wings */}
                <path
                  d="M2,0 L-1,-5 L-2,-1 L-2,1 L-1,5 Z"
                  fill="#C4832A"
                  opacity={0.85}
                />
                {/* Tail fin */}
                <path
                  d="M-2,-1 L-5,-3.5 L-4,-1 M-2,1 L-5,3.5 L-4,1"
                  stroke="#C4832A"
                  strokeWidth={1}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.85}
                />
              </g>
            </Marker>
          )}
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
                <p className="font-body text-xs text-foreground/50 mb-2">
                  {activeCity.role.split(' · ').slice(1).join(' · ')}
                </p>
              )}
              <p className="font-body text-xs text-foreground/55 leading-relaxed mt-1">
                {activeCity.description}
              </p>
              {activeCity.id === 'kolkata' && (
                <p className="font-display italic text-xs text-accent leading-relaxed mt-2">
                  &ldquo;Home. Third-generation. Returning with new eyes.&rdquo;
                </p>
              )}
            </div>
            {/* Arrow */}
            <div
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
