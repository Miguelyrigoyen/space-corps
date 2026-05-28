import type { ConfigState } from './TierConfigurator'

const PRESERVATION_TYPES = [
  {
    id: 'cremation-capsule',
    label: 'Memorial Capsule',
    desc: 'A small portion of cremated remains (up to 1g) sealed in a precision-engraved aerospace-grade capsule.',
    price: '$8,000',
    best: 'Best for Earth Orbit',
  },
  {
    id: 'ashes-scatter',
    label: 'Full Cremation Release',
    desc: 'Complete cremated remains (up to 2kg) released at the designated trajectory point.',
    price: '$35,000',
    best: 'Best for Heliocentric / Lunar',
  },
  {
    id: 'vitrification',
    label: 'Cryogenic Vitrification',
    desc: 'Full-body vitrification using medical-grade cryoprotectants, housed in a custom aerospace cryogenic pod.',
    price: '$750,000',
    best: 'Best for Deep Space',
  },
  {
    id: 'whole-body',
    label: 'Whole Body Interment',
    desc: 'Complete preservation via multiple complementary methods. Bespoke mission designed around your requirements.',
    price: '$10M+',
    best: 'Private Mission Only',
  },
]

interface Props {
  config: ConfigState
  update: (p: Partial<ConfigState>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepPreservation({ config, update, onNext, onBack }: Props) {
  return (
    <div>
      <h2
        className="text-2xl font-light text-star mb-2"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Preservation Method
      </h2>
      <p className="text-star/40 text-sm mb-8">
        How would you like the remains prepared and integrated into the mission payload?
      </p>

      <div className="space-y-4 mb-8">
        {PRESERVATION_TYPES.map(p => (
          <button
            key={p.id}
            onClick={() => update({ preservationType: p.id as ConfigState['preservationType'] })}
            className={`w-full text-left p-5 transition-all duration-300 border ${
              config.preservationType === p.id
                ? 'border-gold bg-gold/5 shadow-gold'
                : 'border-star/10 hover:border-gold/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-star font-medium text-sm mb-1">{p.label}</p>
                <p className="text-star/40 text-xs leading-relaxed mb-2">{p.desc}</p>
                <p className="text-gold/60 text-xs">{p.best}</p>
              </div>
              <div className="text-right shrink-0">
                <span
                  className="text-xl font-light gold-text"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {p.price}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-ghost flex-1">Back</button>
        <button
          onClick={onNext}
          disabled={!config.preservationType}
          className="btn-gold flex-1 disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
