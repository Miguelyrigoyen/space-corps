'use client'
import Link from 'next/link'
import { TIERS } from '@/lib/tiers'

export default function PricingTiers() {
  return (
    <section id="tiers" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="section-label text-center mb-4">Interment Programs</p>
        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Choose Your <span className="gold-text">Trajectory</span>
        </h2>
        <p className="text-star/40 text-center text-sm mb-16 max-w-xl mx-auto">
          Each program includes a dedicated memorial page, real-time orbital tracking, and a $500 fully refundable placement deposit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative flex flex-col glass-panel gold-border-hover p-8 transition-all duration-500 ${
                tier.badge ? 'ring-1 ring-gold/30' : ''
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="btn-gold text-[10px] px-4 py-1">{tier.badge}</span>
                </div>
              )}

              <div className="mb-6">
                <p className="section-label mb-2">Tier {String(i + 1).padStart(2, '0')}</p>
                <h3
                  className="text-2xl font-light text-star mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {tier.name}
                </h3>
                <p className="text-star/40 text-xs">{tier.tagline}</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-light gold-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {tier.priceDisplay}
                </div>
                <p className="text-star/30 text-xs mt-1">+ $500 refundable deposit</p>
              </div>

              <div className="divider-gold mb-6" />

              <div className="flex-1 space-y-3 mb-8">
                <p className="text-star/60 text-sm leading-relaxed">{tier.description}</p>
                <ul className="space-y-2 mt-4">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-star/50">
                      <span className="text-gold mt-0.5">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/configure?tier=${tier.id}`}
                className="btn-ghost text-center text-xs w-full"
              >
                Reserve This Tier
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-star/30 text-xs mt-10 tracking-wide">
          All programs include a dedicated memorial page, live trajectory tracking, and family notification upon launch.
        </p>
      </div>
    </section>
  )
}
