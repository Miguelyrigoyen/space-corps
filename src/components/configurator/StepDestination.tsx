import { TIERS } from '@/lib/tiers'
import type { ConfigState } from './TierConfigurator'
import type { TierId } from '@/types'

const DESTINATIONS = [
  {
    id: 'earth-orbit',
    label: 'Earth Orbit',
    sublabel: '200–500km altitude',
    desc: 'Visible on clear nights, circling the planet you called home.',
    icon: '🌍',
  },
  {
    id: 'lunar',
    label: 'Lunar Trajectory',
    sublabel: 'Moon vicinity',
    desc: 'Journey to the moon — humanity\'s first step beyond Earth.',
    icon: '🌕',
  },
  {
    id: 'heliocentric',
    label: 'Heliocentric Orbit',
    sublabel: 'Solar orbit',
    desc: 'Travel the inner solar system forever in the light of our sun.',
    icon: '☀️',
  },
  {
    id: 'deep-space',
    label: 'Deep Space',
    sublabel: 'Beyond Mars',
    desc: 'The final frontier — a trajectory into the outer solar system.',
    icon: '🌌',
  },
]

interface Props {
  config: ConfigState
  update: (p: Partial<ConfigState>) => void
  onNext: () => void
}

export default function StepDestination({ config, update, onNext }: Props) {
  return (
    <div>
      <h2
        className="text-2xl font-light text-star mb-2"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Select Your Destination
      </h2>
      <p className="text-star/40 text-sm mb-8">
        Where would you like your loved one's remains to travel?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {DESTINATIONS.map(d => (
          <button
            key={d.id}
            onClick={() => update({ destination: d.id as ConfigState['destination'] })}
            className={`text-left p-5 transition-all duration-300 border ${
              config.destination === d.id
                ? 'border-gold bg-gold/5 shadow-gold'
                : 'border-star/10 hover:border-gold/30'
            }`}
          >
            <div className="text-2xl mb-2">{d.icon}</div>
            <p className="text-star font-medium text-sm">{d.label}</p>
            <p className="text-gold text-xs mb-2">{d.sublabel}</p>
            <p className="text-star/40 text-xs leading-relaxed">{d.desc}</p>
          </button>
        ))}
      </div>

      {/* Pre-select tier if passed */}
      {config.tierId && (
        <div className="mb-8 p-4 border border-gold/20 bg-gold/5">
          <p className="text-xs text-star/50">
            Pre-selected:{' '}
            <span className="text-gold">
              {TIERS.find(t => t.id === config.tierId)?.name}
            </span>
          </p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!config.destination}
        className="btn-gold w-full disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Continue
      </button>
    </div>
  )
}
