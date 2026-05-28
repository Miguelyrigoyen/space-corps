import type { Metadata } from 'next'
import './globals.css'
import StarField from '@/components/ui/StarField'
import Nav from '@/components/ui/Nav'

export const metadata: Metadata = {
  title: 'Space Corps — Memorial Spaceflight',
  description: 'The most profound final journey humanity has ever offered. Send your loved ones beyond Earth, beyond time.',
  openGraph: {
    title: 'Space Corps — Memorial Spaceflight',
    description: 'Beyond Death. Beyond Earth.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StarField />
        <Nav />
        <main className="relative z-10">{children}</main>
        <footer className="relative z-10 border-t border-gold/10 py-12 mt-32">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-gold text-lg tracking-widest font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                SPACE CORPS
              </span>
            </div>
            <p className="text-star/30 text-xs tracking-widest">
              © {new Date().getFullYear()} Space Corps. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs tracking-widest text-star/40 uppercase">
              <a href="/privacy" className="hover:text-gold transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gold transition-colors">Terms</a>
              <a href="/faq" className="hover:text-gold transition-colors">FAQ</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
