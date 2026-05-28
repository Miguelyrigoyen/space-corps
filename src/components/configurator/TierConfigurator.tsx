'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TIERS } from '@/lib/tiers'
import type { TierId, Destination, PreservationType } from '@/types'
import StepDestination from './StepDestination'
import StepPreservation from './StepPreservation'
import StepPrice from './StepPrice'
import StepWaitlist from './StepWaitlist'

export interface ConfigState {
  tierId: TierId | null
  destination: Destination | null
  preservationType: PreservationType | null
  firstName: string
  lastName: string
  email: string
  phone: string
  memorialName: string
}

const STEPS = ['Destination', 'Preservation', 'Investment', 'Reserve']

export default function TierConfigurator() {
  const searchParams = useSearchParams()
  const initialTier = searchParams.get('tier') as TierId | null

  const [step, setStep] = useState(0)
  const [config, setConfig] = useState<ConfigState>({
    tierId: initialTier,
    destination: null,
    preservationType: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    memorialName: '',
  })

  const update = (partial: Partial<ConfigState>) =>
    setConfig(prev => ({ ...prev, ...partial }))

  const next = () => setStep(s => Math.min(s + 1, 3))
  const back = () => setStep(s => Math.max(s - 1, 0))

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Reservation Process</p>
          <h1
            className="text-4xl font-light text-star"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Configure Your <span className="gold-text">Journey</span>
          </h1>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-0 mb-16">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    i < step
                      ? 'bg-gold text-void'
                      : i === step
                      ? 'border border-gold text-gold'
                      : 'border border-star/20 text-star/30'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span
                  className={`text-[10px] mt-1 tracking-widest uppercase ${
                    i === step ? 'text-gold' : 'text-star/30'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-px mx-2 transition-all duration-500 ${
                    i < step ? 'bg-gold' : 'bg-star/10'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="glass-panel gold-border p-8 md:p-12">
          {step === 0 && <StepDestination config={config} update={update} onNext={next} />}
          {step === 1 && <StepPreservation config={config} update={update} onNext={next} onBack={back} />}
          {step === 2 && <StepPrice config={config} onNext={next} onBack={back} />}
          {step === 3 && <StepWaitlist config={config} update={update} onBack={back} />}
        </div>
      </div>
    </div>
  )
}
