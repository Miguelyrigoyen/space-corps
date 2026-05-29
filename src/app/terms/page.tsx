export const metadata = { title: 'Terms of Service — Space Corps' }

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-4">Legal</p>
        <h1 className="text-4xl font-light text-star mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Terms of Service
        </h1>
        <p className="text-star/30 text-xs mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-star/60 text-sm leading-relaxed">
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Nature of Service</h2>
            <p>Space Corps provides orbital memorial preservation services. We do not provide medical treatment, guarantee revival or resuscitation, or make representations about the scientific possibility of future recovery of biological material. Our services are memorial and archival in nature.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Deposit and Refund Policy</h2>
            <p>The $500 waitlist deposit is fully refundable at any time prior to mission manifest assignment, for any reason, with no penalty. Full mission deposits are subject to the refund schedule outlined in your individual mission contract. All deposits are held in a dedicated escrow account separate from operating funds.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Scientific Disclosure</h2>
            <p>Cryopreservation is not a proven method of enabling revival with current technology. Revival may never be possible. Space Corps makes no representation, warranty, or guarantee regarding the possibility, timeline, or likelihood of revival of any preserved biological material. Members acknowledge this uncertainty and proceed with full understanding that Space Corps provides preservation services only.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Mission Risk</h2>
            <p>Space missions carry inherent risk including launch failure, spacecraft malfunction, and orbital decay. In the event of mission failure, Space Corps will provide a full refund of all mission fees paid. Space Corps maintains launch liability insurance as required by applicable law.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Jurisdiction</h2>
            <p>These terms are governed by the laws of the State of Florida. Any dispute arising from these terms shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association.</p>
          </section>
          <section>
            <h2 className="text-gold text-xs tracking-widest uppercase mb-3">Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:miguelandresyrigoyen@gmail.com" className="text-gold hover:underline">miguelandresyrigoyen@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
