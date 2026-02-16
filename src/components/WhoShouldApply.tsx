import Section from './Section'

export default function WhoShouldApply() {
  return (
    <Section id="eligibility" title="You're a builder" bgColor="#e1f5e0">
      <div className="space-y-4 md:space-y-6">
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          You don't wait for permission to start things. You've launched a project, built a product, organized an event, or started a community — and you're looking for the right people and resources to go further.
        </p>
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          You're curious and self-directed. You read widely, learn quickly, and care deeply about craft. Whether you're technical or not, you approach problems like an engineer: break them down, prototype, iterate.
        </p>
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          You want to be around other people who are building. Not just networking — actually making things together, challenging each other's ideas, and pushing toward outcomes.
        </p>
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          You're a college student (undergraduate or graduate) at any accredited institution. You can commit to a 6-month program with monthly touchpoints and a summer intensive.
        </p>

        <div className="mt-8 md:mt-10">
          <h3 className="font-medium text-lg md:text-[22px]" style={{ letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Eligibility
          </h3>
          <div className="space-y-2">
            {[
              'Currently enrolled at an accredited college or university',
              'Have launched or are actively building a project, startup, or initiative',
              'Available for the full 6-month program (March–September 2025)',
              'Based in the United States',
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 text-base md:text-[18px]" style={{ opacity: 0.4 }}>•</span>
                <span className="text-base md:text-[18px]" style={{ lineHeight: '1.6' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
