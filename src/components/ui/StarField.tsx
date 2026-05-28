'use client'
import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        alpha: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.alpha += s.speed
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 244, 255, ${s.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #1a1a3e 0%, #08080f 60%)' }}
    />
  )
}
