'use client'
import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { journeyCities, type JourneyCity } from '@/lib/data/journey'

const GEO_URL = '/world-110m.json'

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

  return (
    <div
      className="map-container relative w-full"
      onClick={() => setActiveCity(null)}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 400, center: [42, 30] }}
        style={{ width: '100%', height: 'auto' }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: '#DDD4C6', stroke: '#C8B89A', strokeWidth: 0.4, outline: 'none' },
                    hover:   { fill: '#DDD4C6', stroke: '#C8B89A', strokeWidth: 0.4, outline: 'none' },
                    pressed: { fill: '#DDD4C6', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {journeyCities.map((city, i) => (
            <Marker
              key={city.id}
              coordinates={city.coordinates}
              onClick={(e) => handleMarkerClick(city, e as unknown as React.MouseEvent)}
            >
              {/* Pulse ring */}
              <m.circle
                r={10}
                fill="#A6701A"
                fillOpacity={0}
                stroke="#A6701A"
                strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 2.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: 'easeOut',
                }}
              />
              {/* Dot */}
              <m.circle
                r={5}
                fill={activeCity?.id === city.id ? '#A6701A' : '#C4975A'}
                stroke="#F5EFE6"
                strokeWidth={1.5}
                style={{ cursor: 'pointer' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                whileHover={{ scale: 1.4 }}
              />
              {/* City label */}
              <m.text
                textAnchor="middle"
                y={-11}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '7px',
                  fill: '#241E18',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.12 }}
              >
                {city.name}
              </m.text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      <AnimatePresence>
        {activeCity && (
          <m.div
            key={activeCity.id}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute z-10 pointer-events-none"
            style={{
              left: Math.min(tooltipPos.x, window.innerWidth > 600 ? tooltipPos.x : tooltipPos.x - 20),
              top: tooltipPos.y - 12,
              transform: 'translate(-50%, -100%)',
              maxWidth: '240px',
            }}
          >
            <div className="bg-surface border border-muted/20 rounded-lg px-4 py-3 shadow-md">
              <p className="font-mono text-xs text-accent mb-0.5">{activeCity.period}</p>
              <p className="font-display text-sm font-bold text-foreground leading-snug mb-1">
                {activeCity.name}
              </p>
              <p className="font-body text-xs text-foreground/70 mb-1.5">{activeCity.role}</p>
              <p className="font-body text-xs text-foreground/60 leading-relaxed">
                {activeCity.description}
              </p>
            </div>
            {/* Arrow */}
            <div className="mx-auto w-0 h-0" style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #EDE4D8',
              width: 0,
              marginLeft: '50%',
              transform: 'translateX(-50%)',
            }} />
          </m.div>
        )}
      </AnimatePresence>

      {/* Mobile: tap hint */}
      <p className="text-center font-body text-xs text-foreground/40 mt-2 md:hidden">
        Tap a city to explore
      </p>
      <p className="text-center font-body text-xs text-foreground/40 mt-2 hidden md:block">
        Click a city to explore
      </p>
    </div>
  )
}
