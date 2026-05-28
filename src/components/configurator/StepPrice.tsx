import type { ConfigState } from './TierConfigurator'
import { TIERS } from '@/lib/tiers'

const PRESERVATION_PRICES: Record<string, { label: string; price: number; display: string }> = {
  'cremation-capsule': { label: 'Memorial Capsule', price: 8000, display: '$8,000' },
  'ashes-scatter':     { label: 'Full Cremation Release', price: 35000, display: '$35,000' },
  'vitrification':     { label: 'Cryogenic Vitrification', price: 750000, display: '$750,000' },
  'whole-body':        { label: 'Whole Body Interment', price: 10000000, display: '$10,000,000+' },
}

const DESTINATION_FEES: Record<string, { label: string; fee: number; display: string }> = {
  'earth-orbit':   { label: 'Earth Orbit Launch', fee: 0, display: 'Included' },
  'lunar':         { label: 'Lunar Trajectory Supplement', fee: 5000, display: '+$5,000' },
  'heliocentric':  { label: 'Heliocentric Trajectory Supplement', fee: 15000, display: '+$15,000' },
  'deep-space':    { label: 'Deep Space Mission Supplement', fee: 50000, display: '+$50,000' },
}

interface Props {
  config: ConfigState
  onNext: () => void
  onBack: () => void
}

export default function StepPrice({ config, onNext, onBack }: Props) {
  const preservation = config.preservationType ? PRESERVATION_PRICES[config.preservationType] : null
  const destination = config.destination ? DESTINATION_FEES[config.destination] : null

  const basePrice = preservation?.price ?? 0
  const destinationFee = destination?.fee ?? 0
  const total = basePrice + destinationFee
  const deposit = 500

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div>
      <h2
        className="text-2xl font-light text-star mb-2"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Investment Summary
      </h2>
      <p className="text-star/40 text-sm mb-10">
        A $500 fully refundable deposit secures your place on the waitlist today.
        The balance is due upon mission assignment.
      </p>

      {/* Price breakdown */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center py-4 border-b border-star/10">
          <div>
            <p className="text-star text-sm">{preservation?.label}</p>
            <p className="text-star/30 text-xs">Base program price</p>
          </div>
          <span className="text-star text-sm">{preservation?.display}</span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-star/10">
          <div>
            <p className="text-star text-sm">{destination?.label}</p>
            <p className="text-star/30 text-xs">Trajectory supplement</p>
          </div>
          <span className={`text-sm ${destination?.fee === 0 ? 'text-gold/60' : 'text-star'}`}>
            {destination?.display}
          </span>
        </div>

        <div className="flex justify-between items-center py-4 border-b border-star/10">
          <div>
            <p className="text-star text-sm">Memorial Page & Tracking</p>
            <p className="text-star/30 text-xs">Permanent online memorial + live orbital tracker</p>
          </div>
          <span className="text-gold/60 text-sm">Included</span>
        </div>

        <div className="flex justify-between items-center py-6">
          <div>
            <p className="text-star font-semibold">Total Program Price</p>
          </div>
          <span
            className="text-3xl font-light gold-text"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {formatCurrency(total)}
            {config.preservationType === 'whole-body' ? '+' : ''}
          </span>
        </div>
      </div>

      {/* Deposit callout */}
      <div className="glass-panel p-6 mb-8 border border-gold/30 bg-gold/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gold font-semibold text-sm tracking-wide">Due Today</p>
            <p className="text-star/50 text-xs mt-1">
              Fully refundable at any time before mission manifest assignment
            </p>
          </div>
          <span
            className="text-4xl font-light text-gold"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            $500
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-ghost flex-1">Back</button>
        <button onClick={onNext} className="btn-gold flex-1">
          Reserve My Place
        </button>
      </div>
    </div>
  )
}
