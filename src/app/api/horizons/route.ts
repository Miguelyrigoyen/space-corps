import { NextRequest, NextResponse } from 'next/server'
import { getTrajectory, generateSyntheticOrbit } from '@/lib/horizons'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const targetId = searchParams.get('target')
  const start = searchParams.get('start') || new Date().toISOString().split('T')[0]
  const stop = searchParams.get('stop') || new Date(Date.now() + 365 * 24 * 3600000).toISOString().split('T')[0]
  const step = searchParams.get('step') || '7d'

  // Synthetic orbit params (fallback)
  const a = parseFloat(searchParams.get('a') || '1.5')
  const ec = parseFloat(searchParams.get('e') || '0.1')
  const inc = parseFloat(searchParams.get('inc') || '5')

  try {
    if (targetId) {
      const points = await getTrajectory(targetId, start, stop, step)
      return NextResponse.json({ points, source: 'horizons' })
    } else {
      const points = generateSyntheticOrbit({ semiMajorAxis: a, eccentricity: ec, inclination: inc })
      return NextResponse.json({ points, source: 'synthetic' })
    }
  } catch (err: unknown) {
    // Fallback to synthetic on API error
    const points = generateSyntheticOrbit({ semiMajorAxis: a, eccentricity: ec, inclination: inc })
    return NextResponse.json({ points, source: 'synthetic-fallback' })
  }
}
