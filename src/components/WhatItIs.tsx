import Section from './Section'

export default function WhatItIs() {
  return (
    <Section id="about" title="A 6-month fellowship for college builders" bgColor="#d4e7ff">
      <div className="space-y-4 md:space-y-6">
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          The Verci Fellowship is a highly selective program designed for college students who are actively building — whether that's a startup, open-source project, research initiative, or creative venture.
        </p>
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          Over six months, fellows receive structured mentorship, access to a network of founders and operators, and the resources needed to take their projects to the next level.
        </p>
        <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65' }}>
          This isn't a lecture series or a passive accelerator. It's a hands-on fellowship built around doing — shipping code, meeting users, and iterating fast alongside peers who think the same way.
        </p>
        <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border/20">
          <div className="flex flex-wrap gap-6 md:gap-8 text-sm md:text-base opacity-60">
            <span>20 Fellows</span>
            <span>6 Months</span>
            <span>March–September 2026</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
