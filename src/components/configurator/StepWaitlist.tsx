'use client'
import { useState } from 'react'
import type { ConfigState } from './TierConfigurator'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  config: ConfigState
  update: (p: Partial<ConfigState>) => void
  onBack: () => void
}

export default function StepWaitlist({ config, update, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tierId: config.tierId,
          destination: config.destination,
          preservationType: config.preservationType,
          firstName: config.firstName,
          lastName: config.lastName,
          email: config.email,
          phone: config.phone,
          memorialName: config.memorialName,
        }),
      })

      const { sessionId, error: apiError } = await res.json()
      if (apiError) throw new Error(apiError)

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      await stripe.redirectToCheckout({ sessionId })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <h2
        className="text-2xl font-light text-star mb-2"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        Secure Your Reservation
      </h2>
      <p className="text-star/40 text-sm mb-8">
        Complete this form and pay the $500 refundable deposit to join the waitlist.
        We'll be in touch within 48 hours to begin the planning process.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="section-label block mb-2">First Name</label>
            <input
              type="text"
              required
              value={config.firstName}
              onChange={e => update({ firstName: e.target.value })}
              className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label className="section-label block mb-2">Last Name</label>
            <input
              type="text"
              required
              value={config.lastName}
              onChange={e => update({ lastName: e.target.value })}
              className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div>
          <label className="section-label block mb-2">Email Address</label>
          <input
            type="email"
            required
            value={config.email}
            onChange={e => update({ email: e.target.value })}
            className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="section-label block mb-2">Phone (optional)</label>
          <input
            type="tel"
            value={config.phone}
            onChange={e => update({ phone: e.target.value })}
            className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label className="section-label block mb-2">Name for Memorial Page</label>
          <input
            type="text"
            required
            value={config.memorialName}
            onChange={e => update({ memorialName: e.target.value })}
            className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            placeholder="Full name of the person being honored"
          />
          <p className="text-star/30 text-xs mt-1">
            This name will appear on the public memorial page.
          </p>
        </div>

        {error && (
          <div className="p-4 border border-red-500/30 bg-red-500/5 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="pt-2 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Redirecting to Checkout...' : 'Pay $500 Deposit — Secure My Place'}
          </button>
          <button type="button" onClick={onBack} className="btn-ghost w-full">
            Back
          </button>
        </div>

        <p className="text-star/25 text-xs text-center leading-relaxed">
          By continuing, you agree to our Terms of Service. Your deposit is fully refundable
          at any time prior to mission manifest assignment. Secure checkout powered by Stripe.
        </p>
      </form>
    </div>
  )
}
