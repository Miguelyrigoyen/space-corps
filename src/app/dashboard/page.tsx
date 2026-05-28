import { Suspense } from 'react'
import CustomerDashboard from '@/components/dashboard/CustomerDashboard'

export const metadata = { title: 'My Journey — Space Corps' }

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gold animate-pulse-slow tracking-widest text-sm">Loading...</div>
      </div>
    }>
      <CustomerDashboard />
    </Suspense>
  )
}
