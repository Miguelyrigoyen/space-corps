'use client'
import { useState } from 'react'

const FAQS = [
  {
    category: 'The Mission',
    items: [
      {
        q: 'What exactly is Space Corps?',
        a: 'Space Corps is an orbital cryogenic preservation platform. We place vitrified biological remains aboard a small autonomous spacecraft and deploy it into permanent heliocentric orbit. The spacecraft uses solar power and an active cryocooler to maintain cryogenic temperatures indefinitely — with no organizational dependency, no liquid nitrogen resupply, and no jurisdiction.',
      },
      {
        q: 'How is this different from a memorial ashes service like Celestis?',
        a: 'Celestis and similar companies launch cremated ashes as a symbolic memorial. Space Corps is fundamentally different — we preserve biological structure at cryogenic temperatures using vitrification, the same process used by Alcor Life Extension Foundation. The goal is long-duration biological preservation, not symbolic commemoration.',
      },
      {
        q: 'Is this actually possible with current technology?',
        a: 'The core components are real aerospace hardware in use today. Pulse tube cryocoolers fly on operational satellites. Deployable solar arrays are standard. Multi-layer insulation and sunshields are used on the James Webb Space Telescope. The spacecraft architecture is an integration of proven systems, not an invention of new ones.',
      },
    ],
  },
  {
    category: 'The Science',
    items: [
      {
        q: 'What is vitrification?',
        a: 'Vitrification is the process of replacing blood with a cryoprotectant solution (such as M22, used by Alcor) and rapidly cooling tissue to approximately -130 degrees C. At this temperature, tissue transitions into a glass-like amorphous solid rather than freezing. Ice crystal formation — which destroys cells — is avoided entirely. The physical structure of the brain, including all synaptic connections and protein configurations, is preserved intact.',
      },
      {
        q: 'Why is space better than ground storage for cryogenic preservation?',
        a: 'Deep space naturally equilibrates to approximately 2.7 Kelvin (-270 degrees C), colder than liquid nitrogen. With proper shielding, a spacecraft in heliocentric orbit can maintain cryogenic temperatures using minimal active cooling — far more thermally stable than any Earth-based facility. More importantly, space requires no ongoing organizational support, no LN2 resupply, and is subject to no government jurisdiction.',
      },
      {
        q: 'Will the person actually be brought back someday?',
        a: 'We make no promises about revival. Space Corps provides long-duration biological preservation — the structure is kept intact for whatever future technology may or may not make possible. Scientists including Ralph Merkle and Ken Hayworth have argued that if the neural structure is preserved, the information defining identity is preserved. Whether and when revival technology will exist is genuinely unknown.',
      },
    ],
  },
  {
    category: 'The Process',
    items: [
      {
        q: 'How does the preservation process work?',
        a: 'Space Corps partners with licensed cryonics providers for the preservation phase. When a member passes, a trained team performs field stabilization, perfusion with cryoprotectant, and vitrification. The vitrified remains are then transferred to a Space Corps mission dewar. Space Corps handles all launch coordination, payload integration, FAA licensing, and orbital deployment.',
      },
      {
        q: 'What is the difference between neuro and whole body preservation?',
        a: 'Neuro preservation preserves the brain only, which is considered the seat of identity and memory. Whole body preservation maintains the entire body. Neuro is scientifically considered the stronger option because it minimizes thermal mass and is far easier to preserve with high structural integrity. Both options are available through Space Corps.',
      },
      {
        q: 'When will the first mission launch?',
        a: 'Space Corps is currently in the design and prototype phase. We are targeting a first orbital mission within 4 years, subject to funding, regulatory approval, and spacecraft development milestones. Waitlist members will be contacted as mission timelines are confirmed.',
      },
    ],
  },
  {
    category: 'Payment and Contracts',
    items: [
      {
        q: 'How does payment work?',
        a: 'Space Corps uses a life insurance funding model. Members take out a life insurance policy and name Space Corps as beneficiary for the mission amount. Monthly premiums typically range from $200 to $600 depending on age and tier. Space Corps receives payment only at the time of service — no large upfront sum is required.',
      },
      {
        q: 'What does the $500 deposit cover?',
        a: 'The $500 deposit is a fully refundable waitlist reservation. It secures your place in our enrollment queue and allows us to keep you updated on mission timelines. It is not a payment for preservation services. Full mission contracts are executed separately.',
      },
      {
        q: 'What happens if Space Corps ceases operations before my mission?',
        a: 'All reservation deposits are held in a dedicated escrow account, not in operating funds. In the event Space Corps cannot fulfill a mission, deposits are returned in full. Full mission contracts include specific provisions for this scenario including refund terms and alternative provider referrals.',
      },
      {
        q: 'Can I cancel?',
        a: 'Yes. Waitlist deposits are fully refundable at any time, for any reason, with no questions asked. Full mission contracts include a detailed cancellation policy with specific refund terms at each stage of the process.',
      },
    ],
  },
  {
    category: 'Legal and Safety',
    items: [
      {
        q: 'Is this legal?',
        a: 'Yes. The Outer Space Treaty (1967) permits private commercial spacecraft in orbit. The FAA licenses commercial space launches. Cryopreservation is legal in the United States and is practiced by organizations including Alcor Life Extension Foundation. Space Corps will obtain all required FAA payload approvals and operates in full compliance with applicable law.',
      },
      {
        q: 'What jurisdiction applies to the spacecraft?',
        a: 'Under Article VIII of the Outer Space Treaty, the launching state (the United States) retains jurisdiction over the spacecraft. However, the spacecraft operates above all national airspace and cannot be reached by court orders, government mandates, or regulatory changes that would affect ground-based storage. This is the key legal advantage of orbital preservation.',
      },
      {
        q: 'What if the spacecraft malfunctions?',
        a: 'The spacecraft is designed with redundant thermal management systems, emergency shutdown logic, and a thermal control computer that monitors all systems autonomously. In the event of a critical failure, the thermal environment of heliocentric orbit and the passive insulation systems provide significant additional protection. All mission contracts include clear provisions for system failure scenarios.',
      },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="section-label mb-4 text-center">Knowledge Base</p>
        <h1
          className="text-4xl md:text-5xl font-light text-star text-center mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Frequently Asked <span className="gold-text">Questions</span>
        </h1>
        <p className="text-star/40 text-center text-sm mb-14 max-w-xl mx-auto leading-relaxed">
          Everything you need to understand what Space Corps is, how it works, and what it means for you and the people you love.
        </p>

        <div className="space-y-12">
          {FAQS.map(section => (
            <div key={section.category}>
              <h2
                className="text-xs tracking-[0.3em] uppercase text-gold mb-5"
              >
                {section.category}
              </h2>
              <div className="space-y-2">
                {section.items.map(item => {
                  const id = item.q
                  const isOpen = open === id
                  return (
                    <div
                      key={id}
                      className="glass-panel border border-star/10 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpen(isOpen ? null : id)}
                        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                      >
                        <span className="text-star font-light text-base leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          {item.q}
                        </span>
                        <span className={`text-gold text-xl shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="divider-gold mb-4" />
                          <p className="text-star/60 text-sm leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass-panel gold-border p-10 text-center">
          <p className="section-label mb-3">Still have questions?</p>
          <h3
            className="text-2xl font-light text-star mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            We would love to hear from you.
          </h3>
          <p className="text-star/40 text-sm mb-6">
            Reach out directly and we will respond within 48 hours.
          </p>
          <a
            href="mailto:miguelandresyrigoyen@gmail.com"
            className="btn-gold"
          >
            Contact Space Corps
          </a>
        </div>
      </div>
    </div>
  )
}
