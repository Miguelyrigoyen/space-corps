'use client'
import { useState } from 'react'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const [secret, setSecret] = useState('')
  const [authed, setAuthed] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('admin-secret', secret)
    setAuthed(true)
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass-panel gold-border p-10 w-full max-w-sm text-center">
          <p className="section-label mb-4">Restricted Access</p>
          <h1 className="text-2xl font-light text-star mb-8" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Mission Control
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={secret}
              onChange={e => setSecret(e.target.value)}
              placeholder="Admin secret"
              className="w-full bg-void border border-star/20 text-star px-4 py-3 text-sm focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold w-full">Enter</button>
          </form>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
