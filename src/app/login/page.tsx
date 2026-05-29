'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const justPaid = searchParams.get('status') === 'success'
  const supabase = createBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="glass-panel gold-border p-10 w-full max-w-md text-center">
        {justPaid && (
          <div className="mb-6 px-4 py-4 border border-gold/30 bg-gold/5 text-left">
            <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">Payment Received</p>
            <p className="text-star/60 text-xs leading-relaxed">Your deposit is confirmed. Sign in with the same email you used at checkout to view your reservation.</p>
          </div>
        )}
        <p className="section-label mb-4">Customer Portal</p>
        <h1
          className="text-3xl font-light text-star mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Sign In
        </h1>

        {sent ? (
          <div className="mt-8">
            <p className="text-gold text-4xl mb-4">✦</p>
            <p className="text-star/70 text-sm leading-relaxed">
              A magic link has been sent to <span className="text-gold">{email}</span>.
              <br />Click it to access your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="section-label block mb-2 text-left">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                placeholder="your@email.com"
              />
              <p className="text-star/30 text-xs mt-2 text-left">
                We'll send a magic link — no password needed.
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}

        <div className="mt-8 divider-gold" />
        <p className="text-star/30 text-xs mt-6">
          New here?{' '}
          <Link href="/configure" className="text-gold hover:underline">
            Begin your reservation
          </Link>
        </p>
      </div>
    </div>
  )
}
