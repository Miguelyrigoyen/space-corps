'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    setTimeout(() => el.classList.add('opacity-100', 'translate-y-0'), 100)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)',
        }}
      />

      <div
        ref={textRef}
        className="relative z-10 opacity-0 translate-y-8 transition-all duration-1000 ease-out max-w-4xl"
      >
        <p className="section-label mb-8">Memorial Spaceflight · Est. 2024</p>

        <h1
          className="text-6xl md:text-8xl font-light leading-tight mb-8"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="text-star">Beyond Death.</span>
          <br />
          <span className="gold-text">Beyond Earth.</span>
        </h1>

        <p className="text-star/60 text-lg md:text-xl font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          For those who refused to be ordinary in life, we offer an extraordinary passage into eternity.
          Space Corps delivers the remains of the extraordinary to the cosmos.
        </p>

        <p className="text-star/40 text-sm mb-12 tracking-wide">
          Partnering with leading launch providers. 100% of deposits refundable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/configure" className="btn-gold">
            Begin Your Journey
          </Link>
          <Link href="/#tiers" className="btn-ghost">
            View Programs
          </Link>
        </div>

        <div className="mt-20 flex items-center justify-center gap-12 text-star/30 text-xs tracking-widest uppercase">
          <div className="flex flex-col items-center gap-1">
            <span className="text-gold text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>4</span>
            <span>Tiers</span>
          </div>
          <div className="divider-gold w-px h-8 bg-gold/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-gold text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>∞</span>
            <span>Trajectories</span>
          </div>
          <div className="divider-gold w-px h-8 bg-gold/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-gold text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>$500</span>
            <span>Refundable Deposit</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-star/20 text-xs tracking-widest">
        <span className="uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
      </div>
    </section>
  )
}
