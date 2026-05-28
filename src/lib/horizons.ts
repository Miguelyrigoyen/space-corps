import type { TrajectoryPoint } from '@/types'

const HORIZONS_BASE = 'https://ssd.jpl.nasa.gov/api/horizons.api'

export async function getTrajectory(
  targetId: string,
  startDate: string,
  stopDate: string,
  stepSize = '1d'
): Promise<TrajectoryPoint[]> {
  const params = new URLSearchParams({
    format: 'json',
    COMMAND: `'${targetId}'`,
    OBJ_DATA: 'NO',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'VECTORS',
    CENTER: "'500@10'", // Sun center
    START_TIME: `'${startDate}'`,
    STOP_TIME: `'${stopDate}'`,
    STEP_SIZE: `'${stepSize}'`,
    VEC_TABLE: '2',
    REF_PLANE: 'ECLIPTIC',
    REF_SYSTEM: 'J2000',
    VECT_CORR: 'NONE',
    VEC_LABELS: 'YES',
    CSV_FORMAT: 'YES',
  })

  const res = await fetch(`${HORIZONS_BASE}?${params}`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`JPL Horizons API error: ${res.status}`)

  const json = await res.json()
  const result = json.result as string

  return parseHorizonsCSV(result)
}

function parseHorizonsCSV(raw: string): TrajectoryPoint[] {
  const points: TrajectoryPoint[] = []
  const lines = raw.split('\n')
  let inData = false

  for (const line of lines) {
    if (line.startsWith('$$SOE')) { inData = true; continue }
    if (line.startsWith('$$EOE')) break
    if (!inData || !line.trim()) continue

    const cols = line.split(',').map(s => s.trim())
    if (cols.length < 7) continue

    try {
      points.push({
        jd: parseFloat(cols[0]),
        date: cols[1],
        x: parseFloat(cols[2]),  // AU
        y: parseFloat(cols[3]),
        z: parseFloat(cols[4]),
        ra: '',
        dec: '',
        distance: Math.sqrt(
          Math.pow(parseFloat(cols[2]), 2) +
          Math.pow(parseFloat(cols[3]), 2) +
          Math.pow(parseFloat(cols[4]), 2)
        ),
      })
    } catch { /* skip malformed lines */ }
  }

  return points
}

// Fallback: synthetic orbit for missions without a Horizons target ID
export function generateSyntheticOrbit(params: {
  semiMajorAxis: number  // AU
  eccentricity: number
  inclination: number    // degrees
  numPoints?: number
}): TrajectoryPoint[] {
  const { semiMajorAxis: a, eccentricity: e, inclination, numPoints = 360 } = params
  const inc = (inclination * Math.PI) / 180
  const points: TrajectoryPoint[] = []
  const now = Date.now()

  for (let i = 0; i < numPoints; i++) {
    const M = (2 * Math.PI * i) / numPoints
    const E = solveKepler(M, e)
    const trueAnomaly = 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    )
    const r = a * (1 - e * Math.cos(E))
    const x = r * Math.cos(trueAnomaly)
    const y = r * Math.sin(trueAnomaly) * Math.cos(inc)
    const z = r * Math.sin(trueAnomaly) * Math.sin(inc)
    const ms = now + i * 24 * 3600 * 1000
    points.push({
      jd: 2451545.0 + i,
      date: new Date(ms).toISOString().split('T')[0],
      x, y, z,
      ra: '',
      dec: '',
      distance: r,
    })
  }
  return points
}

function solveKepler(M: number, e: number, tol = 1e-8): number {
  let E = M
  for (let i = 0; i < 100; i++) {
    const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E))
    E += dE
    if (Math.abs(dE) < tol) break
  }
  return E
}
