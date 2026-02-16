import Section from './Section'

const benefits = [
  'Monthly workshops with founders and operators',
  '1:1 mentorship from industry leaders',
  'NYC trip + weekend retreat',
  'Introductions to funding sources',
  '$500 stipend for hosting events',
  'Private Slack community of fellows',
  'Startup matching and placement support',
  'Final showcase and demo day',
]

export default function WhatsIncluded() {
  return (
    <Section title="What's included" bgColor="#fff8dc">
      <div className="space-y-3 md:space-y-4">
        {benefits.map((benefit, i) => (
          <div key={i} className="flex items-start gap-3 md:gap-4">
            <span className="shrink-0 text-lg md:text-[20px]" style={{ marginTop: '2px' }}>✓</span>
            <span className="text-base md:text-[20px]" style={{ lineHeight: '1.6' }}>
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}
