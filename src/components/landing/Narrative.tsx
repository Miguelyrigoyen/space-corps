export default function Narrative() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="divider-gold mb-20" />

        <p className="section-label mb-8 text-center">Our Mission</p>

        <h2
          className="text-4xl md:text-5xl font-light text-center mb-16 leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="text-star">The universe is 13.8 billion years old.</span>
          <br />
          <span className="gold-text italic">Your story doesn't end here.</span>
        </h2>

        <div className="space-y-8 text-star/60 text-lg font-light leading-relaxed">
          <p>
            For millennia, humanity has looked to the heavens and seen something greater than itself.
            We buried our greatest leaders beneath pyramids aligned with stars. We named constellations
            after our heroes. We reached for the moon because something in us has always known —
            the sky is not a ceiling. It is a door.
          </p>
          <p>
            Space Corps was founded on a singular conviction: that the most profound final act
            a human being can make is to become part of the cosmos itself. Not metaphorically.
            <em className="text-gold"> Literally.</em>
          </p>
          <p>
            We work with certified launch providers to place the remains of your loved ones
            aboard spacecraft bound for Earth orbit, lunar trajectory, heliocentric orbit,
            or the outer reaches of the solar system. Every mission is tracked in real time.
            Every memorial is preserved online, forever.
          </p>
        </div>

        <div className="divider-gold mt-20 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: 'Orbital Precision',
              text: 'Every trajectory is calculated using JPL ephemeris data. Your memorial page displays real-time position in the solar system.',
            },
            {
              label: 'Certified Partners',
              text: 'We coordinate with licensed launch providers. Your remains travel alongside legitimate scientific and commercial payloads.',
            },
            {
              label: 'Living Memorial',
              text: 'A public memorial page, customized with biography and photos, remains online permanently. A link to share. A place to return to.',
            },
          ].map(({ label, text }) => (
            <div key={label} className="glass-panel p-6">
              <p className="section-label mb-3">{label}</p>
              <p className="text-star/50 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
