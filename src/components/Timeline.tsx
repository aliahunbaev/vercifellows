import { useEffect, useRef, useState, useCallback } from 'react'

const phases = [
  {
    month: 'MARCH – APRIL',
    title: 'ONBOARDING',
    desc: "Virtual workshops, mentor matching, breakout groups. You'll meet the cohort and start building together online.",
  },
  {
    month: 'MAY – JUNE',
    title: 'NYC TRIP + CATSKILLS RETREAT',
    desc: "Spend a weekend meeting everyone, visiting startups, and going deep on what you're working on.",
  },
  {
    month: 'JULY – AUGUST',
    title: 'BUILDING',
    desc: 'Keep building with support from your mentor. Host events at your school with your budget. Ship milestones.',
  },
  {
    month: 'SEPTEMBER',
    title: 'SHOWCASE AT VERCI',
    desc: 'Present what you built to investors, operators, and the community. Celebrate what you made.',
  },
]

export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const trackBgRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleScroll = useCallback(() => {
    if (!timelineRef.current || !lineRef.current || !dotRef.current || !trackBgRef.current) return
    const container = timelineRef.current
    const rect = container.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Calculate where the last phase starts (the endpoint for the line)
    const lastPhase = phaseRefs.current[phaseRefs.current.length - 1]
    const trackEnd = lastPhase
      ? lastPhase.offsetTop + 4
      : rect.height

    // Also clamp the background track to the same endpoint
    trackBgRef.current.style.height = `${trackEnd}px`

    const sectionCenter = windowHeight * 0.5
    const scrolled = sectionCenter - rect.top
    const scrollRange = rect.height
    const p = Math.max(0, Math.min(1, scrolled / scrollRange))

    // Single value drives both line height and dot position
    const y = Math.min(p * rect.height, trackEnd)
    lineRef.current.style.height = `${y}px`
    dotRef.current.style.transform = `translateY(${y}px)`

    // Determine active phase
    let newActive = -1
    for (let i = 0; i < phaseRefs.current.length; i++) {
      const el = phaseRefs.current[i]
      if (!el) continue
      const phaseRect = el.getBoundingClientRect()
      if (phaseRect.top < windowHeight * 0.6) {
        newActive = i
      }
    }
    setActiveIndex(newActive)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section
      id="timeline"
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
          &bull; 6 MONTHS, STRUCTURED
        </h2>
      </div>

      {/* Right - Timeline */}
      <div ref={timelineRef} style={{ position: 'relative', paddingLeft: '40px' }}>
        {/* Background track (faded) */}
        <div
          ref={trackBgRef}
          style={{
            position: 'absolute',
            left: '8.5px',
            top: '0',
            width: '2px',
            backgroundColor: 'rgba(26,26,26,0.1)',
          }}
        />

        {/* Filled line (grows with scroll, same value as dot) */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            left: '8.5px',
            top: '0',
            width: '2px',
            height: '0px',
            backgroundColor: '#1a1a1a',
          }}
        />

        {/* Moving square marker */}
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            left: '5.5px',
            top: '0',
            width: '8px',
            height: '8px',
            backgroundColor: '#1a1a1a',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        />

        {phases.map((phase, i) => {
          const isActive = i <= activeIndex
          return (
            <div
              key={phase.month}
              ref={(el) => { phaseRefs.current[i] = el }}
              style={{
                position: 'relative',
                paddingBottom: i < phases.length - 1 ? 'clamp(100px, 12vw, 160px)' : '0',
              }}
            >
              {/* Phase content */}
              <div
                style={{
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  opacity: isActive ? 1 : 0.2,
                  transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                }}
              >
                {/* Month label */}
                <span
                  style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    opacity: 0.6,
                    marginBottom: '8px',
                  }}
                >
                  {phase.month}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 'clamp(20px, 2.5vw, 24px)',
                    fontWeight: 500,
                    marginBottom: '12px',
                  }}
                >
                  {phase.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 'clamp(16px, 1.3vw, 18px)',
                    lineHeight: 1.6,
                    maxWidth: '500px',
                    color: 'rgba(26,26,26,0.7)',
                  }}
                >
                  {phase.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
