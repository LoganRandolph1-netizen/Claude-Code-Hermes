'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { buildings, Building } from '@/app/data/buildings'

interface TooltipState {
  buildingId: string | null
}

function BuildingOverlay({
  building,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  building: Building
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
    onMouseEnter()
  }
  const handleMouseLeave = () => {
    setHovered(false)
    onMouseLeave()
  }

  const insetGlow = building.glowColor.replace('0.4)', '0.12)')

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        left: building.region.left,
        top: building.region.top,
        width: building.region.width,
        height: building.region.height,
        cursor: 'pointer',
        background: hovered ? `rgba(${hexToRgb(building.color)}, 0.05)` : 'transparent',
        outline: hovered ? `2px solid ${building.color}` : 'none',
        boxShadow: hovered
          ? `0 0 20px ${building.glowColor}, inset 0 0 30px ${insetGlow}`
          : 'none',
        transition: 'all 0.15s ease',
        zIndex: 10,
        borderRadius: '2px',
      }}
    />
  )
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0,0,0'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

function Tooltip({ building }: { building: Building }) {
  // Parse region percentages to compute positioning
  const regionLeft = parseFloat(building.region.left)
  const regionTop = parseFloat(building.region.top)
  const regionWidth = parseFloat(building.region.width)
  const regionHeight = parseFloat(building.region.height)

  // Center tooltip horizontally on the region
  const tooltipWidth = 220
  // We'll use percentage-based left centering
  const centerLeft = regionLeft + regionWidth / 2

  // Clamp so tooltip doesn't overflow at edges (5% margin)
  // Convert percentage to approximate pixel centering via calc
  const tooltipLeft = `clamp(5%, calc(${centerLeft}% - ${tooltipWidth / 2}px), calc(100% - ${tooltipWidth + 10}px))`

  let tooltipTop: string
  if (building.tooltipDir === 'down') {
    tooltipTop = `calc(${regionTop + regionHeight}% + 8px)`
  } else {
    // 'up' — position above the region; we estimate tooltip height ~130px
    tooltipTop = `calc(${regionTop}% - 138px)`
  }

  const statusColor =
    building.status === 'Online'
      ? '#00ff88'
      : building.status === 'Busy'
      ? '#ffaa00'
      : '#ff4444'

  return (
    <div
      style={{
        position: 'absolute',
        left: tooltipLeft,
        top: tooltipTop,
        width: `${tooltipWidth}px`,
        background: 'rgba(5, 5, 20, 0.92)',
        border: `1px solid ${building.color}`,
        boxShadow: `0 0 16px ${building.glowColor}, 0 0 40px ${building.glowColor.replace('0.4)', '0.15)')}`,
        borderRadius: '4px',
        padding: '12px 16px',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      {/* Agent Name */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: building.color,
          textShadow: `0 0 8px ${building.color}, 0 0 20px ${building.color}`,
          marginBottom: '6px',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.05em',
        }}
      >
        {building.name}
      </div>

      {/* Role Badge */}
      <div
        style={{
          display: 'inline-block',
          fontSize: '10px',
          color: building.color,
          border: `1px solid ${building.color}`,
          borderRadius: '3px',
          padding: '2px 6px',
          marginBottom: '8px',
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {building.role}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '11px',
          color: '#9aabcc',
          lineHeight: '1.5',
          marginBottom: '8px',
          fontFamily: "'Courier New', monospace",
        }}
      >
        {building.description}
      </div>

      {/* Status */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          color: statusColor,
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.08em',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: statusColor,
            boxShadow: `0 0 6px ${statusColor}`,
            display: 'inline-block',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        {building.status.toUpperCase()}
      </div>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [imgError, setImgError] = useState(false)

  const hoveredBuilding = buildings.find((b) => b.id === hoveredId) ?? null

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.8; }
          94% { opacity: 1; }
          96% { opacity: 0.85; }
          97% { opacity: 1; }
        }
      `}</style>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#050510',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Map Wrapper — maintains 1408:784 aspect ratio */}
        <div
          style={{
            position: 'relative',
            width: 'min(100vw, calc(100vh * 1408 / 784))',
            height: 'min(100vh, calc(100vw * 784 / 1408))',
          }}
        >
          {/* Header overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: '10px',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                letterSpacing: '0.2em',
                color: '#00d4ff',
                textShadow: '0 0 8px #00d4ff, 0 0 20px #00d4ff',
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                animation: 'flicker 8s ease-in-out infinite',
              }}
            >
              AGENTHUSIAST HQ — OPERATING SYSTEM
            </div>
            <div
              style={{
                fontSize: '9px',
                letterSpacing: '0.3em',
                color: 'rgba(0, 212, 255, 0.5)',
                fontFamily: "'Courier New', monospace",
                marginTop: '3px',
              }}
            >
              SELECT A DISTRICT
            </div>
          </div>

          {/* Map image or fallback */}
          {imgError ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#0a0a1a',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,212,255,0.2)',
                gap: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  color: '#00d4ff',
                  fontFamily: "'Courier New', monospace",
                  textShadow: '0 0 8px #00d4ff',
                  letterSpacing: '0.1em',
                }}
              >
                [ MAP DATA UNAVAILABLE ]
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(0,212,255,0.5)',
                  fontFamily: "'Courier New', monospace",
                  letterSpacing: '0.08em',
                }}
              >
                Place Main-Screen-Map.jpg in /public
              </div>
            </div>
          ) : (
            <img
              src="/Main-Screen-Map.jpg"
              alt="Agenthusiast HQ Map"
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                userSelect: 'none',
                draggable: false,
              } as React.CSSProperties}
            />
          )}

          {/* Building overlays */}
          {buildings.map((building) => (
            <BuildingOverlay
              key={building.id}
              building={building}
              onMouseEnter={() => setHoveredId(building.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => router.push(building.route)}
            />
          ))}

          {/* Active tooltip rendered as sibling (not inside overlay) */}
          {hoveredBuilding && <Tooltip building={hoveredBuilding} />}
        </div>
      </div>
    </>
  )
}
