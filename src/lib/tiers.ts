import type { Tier } from '@/types'

export const TIERS: Tier[] = [
  {
    id: 'memorial-capsule',
    name: 'Memorial Capsule',
    price: 8000,
    priceDisplay: '$8,000',
    tagline: 'Earth Orbit · Cremation Capsule',
    description:
      'A small, beautifully crafted capsule carrying a symbolic portion of cremated remains is integrated into a satellite payload and launched into Earth orbit — visible on clear nights, circling the planet indefinitely.',
    features: [
      'Up to 1g of cremated remains',
      'Custom engraved memorial capsule',
      'Earth orbit trajectory (200–500km)',
      'Live orbital tracker on memorial page',
      'Certificate of spaceflight',
      'Family notification at launch',
    ],
    destination: 'earth-orbit',
    preservation: 'cremation-capsule',
    color: '#4a90d9',
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    price: 35000,
    priceDisplay: '$35,000',
    tagline: 'Heliocentric Orbit · Ashes Scatter',
    description:
      'Full cremated remains are placed aboard a deep-space vehicle that releases them along a heliocentric orbit. Your loved one travels the inner solar system alongside Earth, forever in the light of our sun.',
    features: [
      'Full cremated remains (up to 2kg)',
      'Heliocentric orbital release',
      'Real-time solar system position tracker',
      'High-resolution mission patch',
      'Private memorial site with gallery',
      'Annual perihelion notification',
    ],
    destination: 'heliocentric',
    preservation: 'ashes-scatter',
    color: '#e8922a',
    badge: 'Most Popular',
  },
  {
    id: 'vitrified-legacy',
    name: 'Vitrified Legacy',
    price: 750000,
    priceDisplay: '$750,000',
    tagline: 'Deep Space · Cryogenic Vitrification',
    description:
      'Full-body cryogenic vitrification followed by permanent placement aboard a purpose-built deep space vessel. The most scientifically advanced interment available, designed for those who believe the future holds the possibility of revival.',
    features: [
      'Full-body cryogenic vitrification',
      'Custom aerospace-grade cryogenic pod',
      'Deep space trajectory (beyond Mars)',
      'Biometric identity archive',
      'Dedicated mission vessel with manifest',
      'Real-time position via JPL Horizons',
      'Legal estate documentation package',
    ],
    destination: 'deep-space',
    preservation: 'vitrification',
    color: '#7c5cbf',
  },
  {
    id: 'whole-body',
    name: 'Whole Body Interment',
    price: 10000000,
    priceDisplay: '$10M+',
    tagline: 'Custom Mission · Full Body Preservation',
    description:
      'A bespoke mission designed around you. Full-body preservation with a privately commissioned spacecraft, custom orbital parameters, and a dedicated mission team. The ultimate final expression of an extraordinary life.',
    features: [
      'Full-body preservation (multiple methods)',
      'Privately commissioned spacecraft',
      'Custom mission design and trajectory',
      'Dedicated mission control team',
      'Broadcast-quality launch event',
      'Permanent mission archive',
      'Family legacy foundation setup',
      'White-glove end-of-life planning',
    ],
    destination: 'deep-space',
    preservation: 'whole-body',
    color: '#c9a84c',
  },
]

export function getTierById(id: string): Tier | undefined {
  return TIERS.find(t => t.id === id)
}
