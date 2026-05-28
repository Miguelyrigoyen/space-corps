export type TierId = 'memorial-capsule' | 'solar-flare' | 'vitrified-legacy' | 'whole-body'

export interface Tier {
  id: TierId
  name: string
  price: number
  priceDisplay: string
  tagline: string
  description: string
  features: string[]
  destination: string
  preservation: string
  color: string
  badge?: string
}

export type Destination = 'earth-orbit' | 'lunar' | 'heliocentric' | 'deep-space'
export type PreservationType = 'cremation-capsule' | 'ashes-scatter' | 'vitrification' | 'whole-body'

export type ReservationStatus =
  | 'deposit_paid'
  | 'processing'
  | 'manifest_assigned'
  | 'awaiting_launch'
  | 'launched'
  | 'in_transit'

export interface Reservation {
  id: string
  user_id: string
  tier_id: TierId
  destination: Destination
  preservation_type: PreservationType
  status: ReservationStatus
  mission_id: string | null
  stripe_session_id: string | null
  deposit_paid: boolean
  full_name: string
  email: string
  phone: string | null
  memorial_name: string
  memorial_bio: string | null
  memorial_photo_url: string | null
  launch_date: string | null
  trajectory_id: string | null
  created_at: string
  updated_at: string
}

export interface Mission {
  id: string
  name: string
  launch_date: string
  destination: Destination
  vehicle: string
  status: 'planning' | 'confirmed' | 'launched' | 'completed'
  horizons_target_id: string | null
  reservations?: Reservation[]
}

export interface TrajectoryPoint {
  jd: number
  date: string
  x: number
  y: number
  z: number
  ra: string
  dec: string
  distance: number
}
