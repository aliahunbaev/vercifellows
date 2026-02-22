import { useState } from 'react'

const benefits = [
  {
    num: 1,
    title: 'FOUNDERS WORKSHOPS',
    desc: 'Monthly sessions with founders and investors who\'ve actually built things. Real conversations about what works, what doesn\'t, and what they wish they\'d known. No panels — just honest back-and-forth.',
    tag: 'Monthly · March–September',
  },
  {
    num: 2,
    title: 'INDIVIDUAL MENTORSHIP',
    desc: 'Matched to someone in your space who can actually help. Your mentor has built what you\'re building — they\'ll push you, connect you, and keep you honest when you\'re stuck or moving too slow.',
    tag: 'Ongoing · 1:1 pairing',
  },
  {
    num: 3,
    title: 'NYC TRIP + CATSKILLS RETREAT',
    desc: 'Meet everyone in person. We cover flights and housing. Spend a weekend visiting startups, going deep on what you\'re working on, and building the relationships that make this program work.',
    tag: 'May · All expenses covered',
  },
  {
    num: 4,
    title: 'FUNDING ACCESS',
    desc: 'Intros to grants, angel investors, and API credits from companies building developer tools. If you need capital to keep going, we\'ll help you find it and make the connection.',
    tag: 'On request · Warm intros',
  },
  {
    num: 5,
    title: '$500 EVENT BUDGET',
    desc: 'Host something at your school. A hackathon, a dinner, a demo night — whatever makes sense for your community. We give you the budget and help you figure out the format.',
    tag: '$500 · Use it your way',
  },
  {
    num: 6,
    title: 'SLACK WITH THE COHORT',
    desc: 'Twenty other people building. Ask questions, share wins, stay accountable. The group chat becomes the thing you check when you\'re stuck at midnight and need someone who gets it.',
    tag: 'Always on · 20 builders',
  },
  {
    num: 7,
    title: 'STARTUP MATCHING',
    desc: 'We\'ll connect you with companies if you want to intern or join full-time. Our network includes early-stage startups and growth companies actively looking for people like you.',
    tag: 'Optional · Warm intros',
  },
  {
    num: 8,
    title: 'FINAL SHOWCASE AT VERCI',
    desc: 'Demo what you built to investors, operators, and the NYC tech community. This is your moment — present your work, get feedback from people who matter, and celebrate what you made.',
    tag: 'September · NYC',
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
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* Left - Sticky title */}
      <div>
        <h2
          className="text-dark md:sticky md:top-[100px]"
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
