'use client'

import { useRouter } from 'next/navigation'
import { Building } from '@/app/data/buildings'

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0,0,0'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

export default function AgentPage({ building }: { building: Building }) {
  const router = useRouter()

  const statusColor =
    building.status === 'Online'
      ? '#00ff88'
      : building.status === 'Busy'
      ? '#ffaa00'
      : '#ff4444'

  const rgb = hexToRgb(building.color)

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes scanIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderPulse {
          0%, 100% { box-shadow: 0 0 20px ${building.glowColor}, 0 0 60px ${building.glowColor.replace('0.4)', '0.15)')}; }
          50% { box-shadow: 0 0 30px ${building.glowColor}, 0 0 80px ${building.glowColor.replace('0.4)', '0.25)')}; }
        }
        .agent-card {
          animation: scanIn 0.4s ease-out forwards, borderPulse 3s ease-in-out infinite;
        }
        .agent-card::before,
        .agent-card::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border-color: ${building.color};
          border-style: solid;
        }
        .agent-card::before {
          top: -2px;
          left: -2px;
          border-width: 2px 0 0 2px;
        }
        .agent-card::after {
          bottom: -2px;
          right: -2px;
          border-width: 0 2px 2px 0;
        }
      `}</style>
      <div
        style={{
          width: '100vw',
          minHeight: '100vh',
          background: '#050510',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(${rgb}, 0.04) 39px,
              rgba(${rgb}, 0.04) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(${rgb}, 0.04) 39px,
              rgba(${rgb}, 0.04) 40px
            )
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          fontFamily: "'Courier New', 'Lucida Console', monospace",
          overflowY: 'auto',
        }}
      >
        <div
          className="agent-card"
          style={{
            position: 'relative',
            maxWidth: '700px',
            width: '100%',
            padding: '40px',
            background: 'rgba(5, 5, 20, 0.9)',
            border: `1px solid ${building.color}`,
            borderRadius: '4px',
          }}
        >
          {/* Back button */}
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: building.color,
              fontFamily: "'Courier New', monospace",
              fontSize: '12px',
              letterSpacing: '0.1em',
              textShadow: `0 0 8px ${building.color}`,
              padding: '0',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            ← RETURN TO MAP
          </button>

          {/* Top divider */}
          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${building.color}, transparent)`,
              marginBottom: '28px',
              boxShadow: `0 0 8px ${building.color}`,
            }}
          />

          {/* Agent Name */}
          <h1
            style={{
              fontSize: '32px',
              color: building.color,
              textShadow: `0 0 10px ${building.color}, 0 0 30px ${building.color}`,
              letterSpacing: '0.1em',
              marginBottom: '12px',
              fontFamily: "'Courier New', monospace",
              fontWeight: 'bold',
            }}
          >
            {building.name}
          </h1>

          {/* Role Badge */}
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              color: building.color,
              border: `1px solid ${building.color}`,
              borderRadius: '3px',
              padding: '4px 10px',
              marginBottom: '24px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              boxShadow: `0 0 8px ${building.glowColor}`,
            }}
          >
            {building.role}
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '14px',
              color: '#b0bedd',
              lineHeight: '1.8',
              marginBottom: '32px',
              letterSpacing: '0.03em',
            }}
          >
            {building.description}
          </p>

          {/* Status section */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '28px',
              padding: '12px 16px',
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid rgba(${hexToRgb(statusColor)}, 0.3)`,
              borderRadius: '3px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: statusColor,
                boxShadow: `0 0 8px ${statusColor}, 0 0 16px ${statusColor}`,
                display: 'inline-block',
                animation: 'pulse 1.5s ease-in-out infinite',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '12px',
                color: statusColor,
                letterSpacing: '0.15em',
                fontFamily: "'Courier New', monospace",
              }}
            >
              STATUS: {building.status.toUpperCase()}
            </span>
          </div>

          {/* Bottom decorative line */}
          <div
            style={{
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${building.color}, transparent)`,
              boxShadow: `0 0 8px ${building.color}`,
            }}
          />

          {/* Bottom corner decorations via extra divs */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2px',
              left: '-2px',
              width: '20px',
              height: '20px',
              borderLeft: `2px solid ${building.color}`,
              borderBottom: `2px solid ${building.color}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '20px',
              height: '20px',
              borderRight: `2px solid ${building.color}`,
              borderTop: `2px solid ${building.color}`,
            }}
          />
        </div>
      </div>
    </>
  )
}
