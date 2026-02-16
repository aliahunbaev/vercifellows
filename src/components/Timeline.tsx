import Section from './Section'

const phases = [
  {
    date: 'March – April',
    title: 'Kickoff & Onboarding',
    description: 'Meet your cohort, get paired with a mentor, and set your goals for the fellowship. Weekly group calls and 1:1 sessions establish the foundation.',
  },
  {
    date: 'May – June',
    title: 'NYC Trip & Deep Dives',
    description: 'Fly to New York for an immersive weekend. Meet founders, visit startups, and workshop your projects with the full cohort and guest mentors.',
  },
  {
    date: 'July – August',
    title: 'Building & Shipping',
    description: 'The core building phase. Fellows focus on shipping real milestones with support from mentors and peers. Monthly workshops cover fundraising, growth, and product.',
  },
  {
    date: 'September',
    title: 'Showcase & Demo Day',
    description: "Present your work to a curated audience of investors, operators, and community members. Celebrate six months of building and launch into what's next.",
  },
]

export default function TimelineSection() {
  return (
    <Section id="timeline" title="6 months, structured" bgColor="#e8d4ff">
      <div className="space-y-8 md:space-y-10">
        {phases.map((phase, i) => (
          <div key={i}>
            <p className="text-sm md:text-[18px]" style={{ opacity: 0.5, marginBottom: '4px' }}>
              {phase.date}
            </p>
            <h3 className="font-medium text-xl md:text-[24px]" style={{ lineHeight: '1.3', marginBottom: '8px', letterSpacing: '-0.03em' }}>
              {phase.title}
            </h3>
            <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
              {phase.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
