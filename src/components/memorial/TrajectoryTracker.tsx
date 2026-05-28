'use client'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { TrajectoryPoint } from '@/types'

interface Props {
  trajectoryId?: string | null
  destination?: string
  memorialName: string
}

const PLANET_ORBITS = [
  { name: 'Mercury', a: 0.387, color: 0x9ca3af, size: 0.02 },
  { name: 'Venus',   a: 0.723, color: 0xe8c27a, size: 0.035 },
  { name: 'Earth',   a: 1.000, color: 0x3b82f6, size: 0.04 },
  { name: 'Mars',    a: 1.524, color: 0xef4444, size: 0.028 },
  { name: 'Jupiter', a: 5.203, color: 0xd97706, size: 0.12 },
]

export default function TrajectoryTracker({ trajectoryId, destination, memorialName }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [points, setPoints] = useState<TrajectoryPoint[]>([])
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number; z: number; distance: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrajectory = async () => {
      setLoading(true)
      try {
        // Map destination to orbital parameters for synthetic orbit
        const params: Record<string, string> = {}
        if (trajectoryId) params.target = trajectoryId

        switch (destination) {
          case 'earth-orbit':
            Object.assign(params, { a: '1.0', e: '0.01', inc: '28' })
            break
          case 'lunar':
            Object.assign(params, { a: '1.003', e: '0.05', inc: '23' })
            break
          case 'heliocentric':
            Object.assign(params, { a: '1.5', e: '0.2', inc: '5' })
            break
          case 'deep-space':
            Object.assign(params, { a: '3.5', e: '0.35', inc: '15' })
            break
          default:
            Object.assign(params, { a: '1.5', e: '0.1', inc: '5' })
        }

        const qs = new URLSearchParams(params)
        const res = await fetch(`/api/horizons?${qs}`)
        const data = await res.json()
        setPoints(data.points ?? [])
        if (data.points?.length) {
          const midpoint = data.points[Math.floor(data.points.length / 2)]
          setCurrentPos({ x: midpoint.x, y: midpoint.y, z: midpoint.z, distance: midpoint.distance })
        }
      } catch {
        // Use fallback visual only
      } finally {
        setLoading(false)
      }
    }
    fetchTrajectory()
  }, [trajectoryId, destination])

  useEffect(() => {
    if (!mountRef.current) return

    const w = mountRef.current.clientWidth
    const h = mountRef.current.clientHeight || 500

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100)
    camera.position.set(0, 6, 10)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Stars
    const starGeo = new THREE.BufferGeometry()
    const starVerts: number[] = []
    for (let i = 0; i < 3000; i++) {
      starVerts.push((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200)
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08 })))

    // Sun
    const sunGeo = new THREE.SphereGeometry(0.25, 32, 32)
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffd700 })
    const sun = new THREE.Mesh(sunGeo, sunMat)
    scene.add(sun)
    const sunGlow = new THREE.PointLight(0xffd700, 2, 20)
    scene.add(sunGlow)
    scene.add(new THREE.AmbientLight(0x222244, 1))

    const SCALE = 1.8 // AU to scene units

    // Planet orbits
    PLANET_ORBITS.forEach(p => {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 128; i++) {
        const a = (2 * Math.PI * i) / 128
        pts.push(new THREE.Vector3(Math.cos(a) * p.a * SCALE, 0, Math.sin(a) * p.a * SCALE))
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts)
      scene.add(new THREE.Line(orbitGeo, new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.4 })))

      const planet = new THREE.Mesh(
        new THREE.SphereGeometry(p.size, 16, 16),
        new THREE.MeshLambertMaterial({ color: p.color })
      )
      planet.position.set(p.a * SCALE, 0, 0)
      scene.add(planet)
    })

    // Mission trajectory
    if (points.length > 1) {
      const tPts = points.map(p => new THREE.Vector3(p.x * SCALE, p.z * SCALE * 0.2, p.y * SCALE))
      const tGeo = new THREE.BufferGeometry().setFromPoints(tPts)
      scene.add(new THREE.Line(tGeo, new THREE.LineBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.8 })))

      // Current position marker
      const mid = tPts[Math.floor(tPts.length / 2)]
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xc9a84c })
      )
      marker.position.copy(mid)
      scene.add(marker)

      // Pulsing ring around marker
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.06, 0.08, 32),
        new THREE.MeshBasicMaterial({ color: 0xc9a84c, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
      )
      ring.position.copy(mid)
      ring.rotation.x = -Math.PI / 2
      scene.add(ring)
    }

    // Mouse orbit controls (manual, no dep needed)
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let theta = 0.5
    let phi = 0.8
    let radius = 12

    const onMouseDown = (e: MouseEvent) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY } }
    const onMouseUp = () => { isDragging = false }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = (e.clientX - prevMouse.x) * 0.005
      const dy = (e.clientY - prevMouse.y) * 0.005
      theta -= dx
      phi = Math.max(0.1, Math.min(Math.PI / 2.2, phi - dy))
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    const onWheel = (e: WheelEvent) => { radius = Math.max(4, Math.min(25, radius + e.deltaY * 0.01)) }

    renderer.domElement.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('wheel', onWheel)

    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta)
      camera.position.y = radius * Math.cos(phi)
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta)
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      const w2 = mountRef.current.clientWidth
      camera.aspect = w2 / h
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [points])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="section-label">Live Trajectory Tracker</p>
        {loading && <span className="text-gold/50 text-xs animate-pulse">Computing orbit...</span>}
      </div>

      {currentPos && (
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Distance from Sun', value: `${currentPos.distance.toFixed(3)} AU` },
            { label: 'X Position', value: `${currentPos.x.toFixed(3)} AU` },
            { label: 'Y Position', value: `${currentPos.y.toFixed(3)} AU` },
          ].map(s => (
            <div key={s.label} className="glass-panel p-3">
              <p className="text-gold text-sm font-mono">{s.value}</p>
              <p className="text-star/30 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div
        ref={mountRef}
        className="w-full rounded-sm overflow-hidden"
        style={{ height: 500, background: 'radial-gradient(ellipse at 50% 50%, #0d0d2a 0%, #080810 100%)' }}
      />

      <p className="text-star/20 text-xs text-center">
        Drag to rotate · Scroll to zoom · Trajectory data via JPL Horizons API
      </p>
    </div>
  )
}
