import { useState } from 'react'

const benefits = [
  {
    num: 1,
    title: 'INDIVIDUAL MENTORSHIP',
    desc: "Matched to someone in your space who can actually help. Your mentor has built what you're building — they'll push you, connect you, and keep you honest when you're stuck or moving too slow.",
    tag: 'Ongoing · 1:1 or small group',
  },
  {
    num: 2,
    title: 'MASTERMIND GROUPS',
    desc: 'A small group of fellows who meet every week with someone from the Verci team. You set a goal at the start, and these are the people who make sure you actually hit it. Not a check-in — a working session.',
    tag: 'Weekly · 4–5 fellows',
  },
  {
    num: 3,
    title: 'OFFICE HOURS + WORKSHOPS',
    desc: 'Founders, operators, and investors giving real time. Come with something specific — a problem, a draft, a decision you\'re stuck on. No panels, no keynotes. You get the hour because you did the work.',
    tag: 'Ongoing · Bring work',
  },
  {
    num: 4,
    title: 'CATSKILLS RETREAT',
    desc: "Everyone in one house for a weekend. Go deep on what you're working on, meet the people you've been talking to on Slack, and leave with relationships that outlast the program.",
    tag: 'November · Housing covered',
  },
  {
    num: 5,
    title: 'SPACE + EVENT SUPPORT',
    desc: "Host something in your community — a hackathon, a dinner, a demo night. We'll fund it, and if it's bigger than $100, pitch us. If you're in New York or LA, you can use the Verci space to do it.",
    tag: 'NYC + LA · Up to $100, more if you pitch it',
  },
  {
    num: 6,
    title: 'SLACK WITH THE COHORT',
    desc: 'Twenty other people building. Ask questions, share wins, stay accountable. The group chat becomes the thing you check when you\'re stuck at midnight and need someone who gets it.',
    tag: 'Always on · 20 builders',
  },
  {
    num: 7,
    title: 'BUILDING IN PUBLIC',
    desc: 'Most people building interesting things are invisible. We run workshops on LinkedIn and Twitter, put you in accountability groups, and help you turn a semester of work into something people actually see.',
    tag: 'Ongoing · Workshops + accountability',
  },
  {
    num: 8,
    title: 'OPPORTUNITY MATCHING',
    desc: "We'll connect you to companies in the network if you want to intern, freelance, or join full-time. Early-stage startups and growth companies actively looking for people like you.",
    tag: 'Optional · Warm intros',
  },
]

export default function WhatYouGet() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (i: number) => {
    setActiveIndex(activeIndex === i ? -1 : i)
  }

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16"
      style={{
        padding: '120px 0',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '1px',
          backgroundColor: 'rgba(0,0,0,0.1)',
        }}
      />
      {/* Left - Sticky title */}
      <div>
        <h2
          className="text-dark text-textured md:sticky md:top-[100px]"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          &bull; WHAT'S INCLUDED
        </h2>
      </div>

      {/* Right - Benefits list */}
      <div>
        {benefits.map((item, i) => {
          const isActive = activeIndex === i
          return (
            <div
              key={item.num}
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.08)',
              }}
            >
              {/* Clickable title row */}
              <button
                type="button"
                onClick={() => handleClick(i)}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '16px',
                  width: '100%',
                  padding: '32px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'opacity 0.3s ease',
                  opacity: isActive ? 1 : 0.4,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = '0.7'
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.opacity = '0.4'
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontWeight: 500,
                    opacity: 0.4,
                    minWidth: '28px',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(item.num).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(18px, 2vw, 24px)',
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </span>
              </button>

              {/* Expanded content */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isActive ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.4s ease',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ paddingBottom: '32px', marginLeft: '44px' }}>
                    <p
                      style={{
                        fontSize: 'clamp(16px, 1.4vw, 19px)',
                        fontWeight: 400,
                        lineHeight: 1.7,
                        color: 'rgba(26,26,26,0.7)',
                        maxWidth: '520px',
                      }}
                    >
                      {item.desc}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '16px',
                        fontSize: '13px',
                        fontWeight: 500,
                        letterSpacing: '0.04em',
                        opacity: 0.4,
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
