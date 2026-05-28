import { Suspense } from 'react'
import TierConfigurator from '@/components/configurator/TierConfigurator'

export const metadata = {
  title: 'Configure Your Journey — Space Corps',
}

export default function ConfigurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gold animate-pulse-slow tracking-widest text-sm">Loading...</div>
      </div>
    }>
      <TierConfigurator />
    </Suspense>
  )
}
