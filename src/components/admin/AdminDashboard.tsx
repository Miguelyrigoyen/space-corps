'use client'
import { useEffect, useState } from 'react'
import type { Reservation } from '@/types'

const STATUSES = ['deposit_paid', 'processing', 'manifest_assigned', 'awaiting_launch', 'launched', 'in_transit']

const STATUS_COLORS: Record<string, string> = {
  deposit_paid: 'text-blue-400 bg-blue-400/10',
  processing: 'text-yellow-400 bg-yellow-400/10',
  manifest_assigned: 'text-gold bg-gold/10',
  awaiting_launch: 'text-orange-400 bg-orange-400/10',
  launched: 'text-green-400 bg-green-400/10',
  in_transit: 'text-purple-400 bg-purple-400/10',
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    const res = await fetch('/api/admin/reservations', {
      headers: { 'x-admin-secret': localStorage.getItem('admin-secret') ?? '' },
    })
    const data = await res.json()
    setReservations(data.reservations ?? [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await fetch('/api/admin/reservations', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': localStorage.getItem('admin-secret') ?? '',
      },
      body: JSON.stringify({ id, status }),
    })
    await fetchReservations()
    setUpdating(null)
  }

  const filtered = filter === 'all' ? reservations : reservations.filter(r => r.status === filter)

  const stats = {
    total: reservations.length,
    deposited: reservations.filter(r => r.deposit_paid).length,
    launched: reservations.filter(r => r.status === 'launched' || r.status === 'in_transit').length,
    revenue: reservations.filter(r => r.deposit_paid).length * 500,
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gold animate-pulse-slow tracking-widest text-sm">Loading mission control...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="section-label mb-2">Internal</p>
          <h1 className="text-4xl font-light text-star" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Mission <span className="gold-text">Control</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Reservations', value: stats.total },
            { label: 'Deposits Collected', value: stats.deposited },
            { label: 'In Space', value: stats.launched },
            { label: 'Deposit Revenue', value: `$${stats.revenue.toLocaleString()}` },
          ].map(s => (
            <div key={s.label} className="glass-panel gold-border p-6">
              <p className="text-3xl font-light gold-text" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {s.value}
              </p>
              <p className="text-star/40 text-xs mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['all', ...STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all ${
                filter === s
                  ? 'bg-gold text-void'
                  : 'border border-star/20 text-star/50 hover:border-gold/40 hover:text-star'
              }`}
            >
              {s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-panel gold-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-star/10">
                {['Memorial Name', 'Contact', 'Tier', 'Destination', 'Status', 'Deposit', 'Reserved', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-xs text-star/40 uppercase tracking-widest font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-star/30 text-sm">
                    No reservations found.
                  </td>
                </tr>
              ) : (
                filtered.map(r => (
                  <tr key={r.id} className="border-b border-star/5 hover:bg-gold/3 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-star font-medium">{r.memorial_name}</p>
                      <p className="text-star/30 text-xs">{r.full_name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-star/70 text-xs">{r.email}</p>
                      {r.phone && <p className="text-star/40 text-xs">{r.phone}</p>}
                    </td>
                    <td className="px-5 py-4 text-star/60 text-xs capitalize">
                      {r.tier_id?.replace(/-/g, ' ')}
                    </td>
                    <td className="px-5 py-4 text-star/60 text-xs capitalize">
                      {r.destination?.replace(/-/g, ' ')}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${STATUS_COLORS[r.status] ?? 'text-star/50'}`}>
                        {r.status?.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={r.deposit_paid ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                        {r.deposit_paid ? '✓ Paid' : '✗ Pending'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-star/40 text-xs">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        disabled={updating === r.id}
                        value={r.status}
                        onChange={e => updateStatus(r.id, e.target.value)}
                        className="bg-cosmos border border-star/20 text-star/70 text-xs px-2 py-1 focus:outline-none focus:border-gold disabled:opacity-50"
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
