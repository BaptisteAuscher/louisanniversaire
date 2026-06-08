import { useEffect, useMemo, useRef, useState } from 'react'

export const POMPON_COLORS = [
  '#ff6b8a',
  '#ff9a6c',
  '#ffd066',
  '#6ee7a0',
  '#5ecfff',
  '#9b87f5',
  '#f472d0',
  '#ff7b7b',
  '#4ade80',
  '#60a5fa',
  '#fbbf24',
  '#c084fc',
]

const POMPON_OVERLAP = 0.9

interface Pompon {
  x: number
  y: number
  size: number
  color: string
  rotation: number
  seed: number
}

interface Strand {
  angle: number
  innerR: number
  outerR: number
  width: number
  color: string
}

function seededRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

function shadeColor(hex: string, amount: number) {
  const normalized = hex.replace('#', '')
  const num = parseInt(normalized, 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount))
  return `rgb(${r}, ${g}, ${b})`
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function generateStrands(size: number, color: string, seed: number): Strand[] {
  const rand = seededRandom(seed)
  const count = Math.floor(52 + size * 2.2)

  const strands: Strand[] = Array.from({ length: count }, (_, index) => {
    const baseAngle = (index / count) * 360 + (rand() - 0.5) * 10
    const tint = rand() > 0.5 ? 32 : rand() > 0.22 ? -22 : 0

    return {
      angle: baseAngle,
      innerR: size * (0.02 + rand() * 0.05),
      outerR: size * (0.38 + rand() * 0.18),
      width: 0.55 + rand() * 0.75,
      color: tint === 0 ? color : shadeColor(color, tint),
    }
  })

  const fillCount = Math.floor(18 + size * 0.45)
  for (let i = 0; i < fillCount; i++) {
    const angle = rand() * 360
    const radius = size * (0.08 + rand() * 0.22)

    strands.push({
      angle,
      innerR: radius * 0.35,
      outerR: radius,
      width: 0.7 + rand() * 0.8,
      color: shadeColor(color, rand() > 0.5 ? 18 : -14),
    })
  }

  return strands
}

function pointOnPerimeter(
  distance: number,
  width: number,
  height: number,
  rotationJitter: number,
): { x: number; y: number; rotation: number } {
  const perimeter = 2 * (width + height)
  let d = ((distance % perimeter) + perimeter) % perimeter

  if (d <= width) {
    return { x: d, y: 0, rotation: rotationJitter }
  }

  d -= width
  if (d <= height) {
    return { x: width, y: d, rotation: 90 + rotationJitter }
  }

  d -= height
  if (d <= width) {
    return { x: width - d, y: height, rotation: 180 + rotationJitter }
  }

  d -= width
  return { x: 0, y: height - d, rotation: 270 + rotationJitter }
}

function generateBorderPompons(seed: number, width: number, height: number): Pompon[] {
  if (width <= 0 || height <= 0) return []

  const rand = seededRandom(seed)
  const pompons: Pompon[] = []
  const minDim = Math.min(width, height)
  const baseSize = clamp(minDim * 0.115, 14, 52)
  const perimeter = 2 * (width + height)

  let distance = rand() * baseSize * 0.25

  while (distance < perimeter) {
    const size = baseSize * (0.85 + rand() * 0.30)
    const rotationJitter = (rand() - 0.5) * 18
    const { x, y, rotation } = pointOnPerimeter(distance, width, height, rotationJitter)
    const color = POMPON_COLORS[Math.floor(rand() * POMPON_COLORS.length)]

    pompons.push({
      x: (x / width) * 100,
      y: (y / height) * 100,
      size,
      color,
      rotation,
      seed: Math.floor(rand() * 1_000_000),
    })

    distance += size * POMPON_OVERLAP
  }

  return pompons
}

function YarnPompon({ size, color, seed }: { size: number; color: string; seed: number }) {
  const strands = useMemo(() => generateStrands(size, color, seed), [size, color, seed])
  const center = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
      aria-hidden="true"
    >
      {strands.map((strand, index) => {
        const rad = (strand.angle * Math.PI) / 180
        const x1 = center + Math.cos(rad) * strand.innerR
        const y1 = center + Math.sin(rad) * strand.innerR
        const x2 = center + Math.cos(rad) * strand.outerR
        const y2 = center + Math.sin(rad) * strand.outerR

        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={strand.color}
            strokeWidth={strand.width}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx={center} cy={center} r={size * 0.2} fill={shadeColor(color, -8)} opacity={0.55} />
      <circle cx={center} cy={center} r={size * 0.12} fill={shadeColor(color, -18)} />
    </svg>
  )
}

interface PomponBorderProps {
  seed?: number
}

export function PomponBorder({ seed = 42 }: PomponBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setDimensions({ width, height })
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const pompons = useMemo(
    () => generateBorderPompons(seed, dimensions.width, dimensions.height),
    [seed, dimensions.width, dimensions.height],
  )

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      {pompons.map((pompon, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${pompon.x}%`,
            top: `${pompon.y}%`,
            transform: `translate(-50%, -50%) rotate(${pompon.rotation}deg)`,
          }}
        >
          <YarnPompon size={pompon.size} color={pompon.color} seed={pompon.seed} />
        </div>
      ))}
    </div>
  )
}
