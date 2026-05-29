export const metadata = { title: 'Privacy Policy — Space Corps' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-4">Legal</p>
        <h1 className="text-4xl font-light text-star mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Privacy Policy
        </h1>
        <p className="text-star/30 text-xs mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-star/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Information We Collect</h2>
            <p>When you make a reservation or join our waitlist, we collect your name, email address, phone number (optional), and payment information processed securely through Stripe. We also collect the name of the person being honored on the memorial page.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">How We Use Your Information</h2>
            <p>We use your information to process reservations, communicate mission updates, maintain your memorial page, and comply with applicable laws. We do not sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Payment Security</h2>
            <p>All payment processing is handled by Stripe. Space Corps does not store your credit card details. Stripe is PCI-DSS compliant. Your deposit is held in a dedicated escrow account and is fully refundable at any time prior to mission manifest assignment.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Memorial Pages</h2>
            <p>Memorial pages are public by default and may be indexed by search engines. The name provided for the memorial page will be visible to the public. You may request that a memorial page be made private or removed by contacting us.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Data Retention</h2>
            <p>We retain your personal information for as long as your account is active or as needed to provide services. Mission records are maintained permanently as part of the mission archive.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Contact</h2>
            <p>For privacy inquiries, contact us at <a href="mailto:miguelandresyrigoyen@gmail.com" className="text-gold hover:underline">miguelandresyrigoyen@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
