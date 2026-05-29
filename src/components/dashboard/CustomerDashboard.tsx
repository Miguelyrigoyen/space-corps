'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import type { Reservation } from '@/types'
import Link from 'next/link'

const STATUS_LABELS: Record<string, { label: string; color: string; desc: string }> = {
  deposit_paid:       { label: 'Deposit Received', color: 'text-blue-400', desc: 'Your deposit has been received. Our team will contact you within 48 hours.' },
  processing:         { label: 'In Review', color: 'text-yellow-400', desc: 'We\'re reviewing your configuration and preparing your mission brief.' },
  manifest_assigned:  { label: 'Mission Assigned', color: 'text-gold', desc: 'You have been assigned to a mission manifest. Launch details to follow.' },
  awaiting_launch:    { label: 'Awaiting Launch', color: 'text-orange-400', desc: 'Your remains have been received and integrated into the payload. Launch is imminent.' },
  launched:           { label: 'Launched', color: 'text-green-400', desc: 'Launched. Your loved one is now in transit to their destination.' },
  in_transit:         { label: 'In Transit', color: 'text-purple-400', desc: 'Traveling through space. Track their position on the memorial page.' },
}

export default function CustomerDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ email?: string; id: string } | null>(null)
  const searchParams = useSearchParams()
  const justPaid = searchParams.get('status') === 'success'
  const supabase = createBrowserClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        const suffix = justPaid ? '?status=success' : ''
        window.location.href = `/login${suffix}`
        return
      }
      setUser({ email: user.email, id: user.id })

      const { data } = await supabase
        .from('reservations')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false })

      setReservations(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gold animate-pulse-slow tracking-widest text-sm">Loading your journey...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {justPaid && (
          <div className="mb-8 glass-panel border border-gold/30 bg-gold/5 px-6 py-5">
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-1">Reservation Confirmed</p>
            <p className="text-star/60 text-sm leading-relaxed">
              Your deposit has been received. Your reservation is secured. We will be in touch within 48 hours to begin your mission planning.
            </p>
          </div>
        )}

        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="section-label mb-2">Customer Portal</p>
            <h1
              className="text-4xl font-light text-star"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Your <span className="gold-text">Journey</span>
            </h1>
            {user?.email && (
              <p className="text-star/40 text-sm mt-2">{user.email}</p>
            )}
          </div>
          <button onClick={handleSignOut} className="btn-ghost text-xs px-5 py-2">
            Sign Out
          </button>
        </div>

        {reservations.length === 0 ? (
          <div className="glass-panel gold-border p-16 text-center">
            <p className="text-star/40 text-lg mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              No reservations yet.
            </p>
            <p className="text-star/30 text-sm mb-8">
              Begin your journey by selecting a program below.
            </p>
            <Link href="/configure" className="btn-gold">
              Configure Your Journey
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {reservations.map(r => {
              const statusInfo = STATUS_LABELS[r.status] ?? { label: r.status, color: 'text-star/50', desc: '' }
              return (
                <div key={r.id} className="glass-panel gold-border p-8">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
                    <div>
                      <h2
                        className="text-2xl font-light text-star mb-1"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {r.memorial_name}
                      </h2>
                      <div className="flex flex-wrap gap-3 text-xs text-star/40 tracking-widest uppercase mt-2">
                        <span>{r.tier_id?.replace('-', ' ')}</span>
                        <span>·</span>
                        <span>{r.destination?.replace('-', ' ')}</span>
                        <span>·</span>
                        <span>{r.preservation_type?.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-sm font-semibold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <p className="text-star/30 text-xs mt-1">
                        Reserved {new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="divider-gold mb-6" />

                  <p className="text-star/50 text-sm mb-6 leading-relaxed">{statusInfo.desc}</p>

                  {/* Status timeline */}
                  <div className="flex items-center gap-0 mb-6 overflow-x-auto">
                    {Object.entries(STATUS_LABELS).map(([key, val], i, arr) => {
                      const statuses = Object.keys(STATUS_LABELS)
                      const currentIdx = statuses.indexOf(r.status)
                      const isComplete = i <= currentIdx
                      const isCurrent = key === r.status
                      return (
                        <div key={key} className="flex items-center shrink-0">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-2 h-2 rounded-full transition-all ${
                                isComplete ? 'bg-gold' : 'bg-star/20'
                              } ${isCurrent ? 'ring-2 ring-gold/30 ring-offset-2 ring-offset-cosmos' : ''}`}
                            />
                            <span className={`text-[9px] mt-1 tracking-wide whitespace-nowrap ${isComplete ? 'text-gold/60' : 'text-star/20'}`}>
                              {val.label}
                            </span>
                          </div>
                          {i < arr.length - 1 && (
                            <div className={`w-10 h-px mx-1 ${isComplete && i < currentIdx ? 'bg-gold' : 'bg-star/10'}`} />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex gap-3">
                    {r.mission_id && (
                      <Link href={`/memorial/${r.id}`} className="btn-gold text-xs px-5 py-2">
                        View Memorial
                      </Link>
                    )}
                    <Link href="/configure" className="btn-ghost text-xs px-5 py-2">
                      Add Another
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
