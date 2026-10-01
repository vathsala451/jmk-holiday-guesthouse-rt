'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CloudFog, Hand } from 'lucide-react'
import { cn } from '@/lib/utils'

const BRUSH_RADIUS = 70

export function MistOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const [state, setState] = useState<'misty' | 'clearing' | 'cleared'>('misty')

  const paintMist = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { width, height } = canvas

    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, width, height)

    const base = ctx.createLinearGradient(0, 0, 0, height)
    base.addColorStop(0, 'rgba(240, 244, 241, 0.94)')
    base.addColorStop(1, 'rgba(232, 238, 234, 0.9)')
    ctx.fillStyle = base
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const r = (0.12 + Math.random() * 0.3) * Math.max(width, height)
      const blob = ctx.createRadialGradient(x, y, 0, x, y, r)
      blob.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
      blob.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = blob
      ctx.fillRect(0, 0, width, height)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      paintMist()
      setState('misty')
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [paintMist])

  const erase = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const scale = canvas.width / rect.width
    const x = (clientX - rect.left) * scale
    const y = (clientY - rect.top) * scale
    const radius = BRUSH_RADIUS * scale
    const from = lastPoint.current ?? { x, y }
    const distance = Math.hypot(x - from.x, y - from.y)
    const steps = Math.max(1, Math.ceil(distance / (radius / 4)))

    ctx.globalCompositeOperation = 'destination-out'
    for (let i = 1; i <= steps; i++) {
      const px = from.x + ((x - from.x) * i) / steps
      const py = from.y + ((y - from.y) * i) / steps
      const brush = ctx.createRadialGradient(px, py, 0, px, py, radius)
      brush.addColorStop(0, 'rgba(0, 0, 0, 0.5)')
      brush.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = brush
      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    lastPoint.current = { x, y }
    if (state === 'misty') setState('clearing')
  }

  const clearAll = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.style.transition = 'opacity 900ms ease'
    canvas.style.opacity = '0'
    setState('cleared')
  }

  const restore = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    paintMist()
    canvas.style.opacity = '1'
    setState('misty')
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 size-full cursor-crosshair touch-pan-y"
        onPointerMove={(e) => erase(e.clientX, e.clientY)}
        onPointerDown={(e) => {
          lastPoint.current = null
          erase(e.clientX, e.clientY)
        }}
        onPointerLeave={() => {
          lastPoint.current = null
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
        {state === 'cleared' ? (
          <button
            type="button"
            onClick={restore}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-card/85 px-4 py-2 text-sm font-medium text-moss shadow-sm backdrop-blur transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <CloudFog className="size-4" aria-hidden="true" />
            Bring back the mist
          </button>
        ) : (
          <button
            type="button"
            onClick={clearAll}
            className={cn(
              'pointer-events-auto inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-moss transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              state === 'clearing' ? 'bg-card/85 shadow-sm backdrop-blur hover:bg-card' : 'bg-transparent',
            )}
          >
            <Hand className="size-4" aria-hidden="true" />
            {state === 'clearing' ? 'Clear it all' : 'Swipe to clear the mist'}
          </button>
        )}
      </div>
    </>
  )
}
