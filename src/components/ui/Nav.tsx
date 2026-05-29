'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel py-4' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-xl tracking-[0.3em] uppercase text-gold font-light"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Space Corps
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-star/60">
          <Link href="/#tiers" className="hover:text-gold transition-colors">Programs</Link>
          <Link href="/configure" className="hover:text-gold transition-colors">Configure</Link>
          <Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link>
          <Link href="/dashboard" className="hover:text-gold transition-colors">My Journey</Link>
          <Link href="/configure" className="btn-gold text-xs px-6 py-2.5">
            Reserve
          </Link>
        </div>
      </div>
    </nav>
  )
}
