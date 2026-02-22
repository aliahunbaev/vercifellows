import { useState } from 'react'

const requirements = [
  {
    text: 'DEEP INTEREST IN TECHNOLOGY AND DEMONSTRATION OF EXCEPTIONAL ABILITY.',
    rotate: -3,
  },
  {
    text: 'ABILITY TO ENGAGE AND CLEARLY COMMUNICATE WITH A RANGE OF STAKEHOLDERS. HIGH DEGREE OF EMOTIONAL INTELLIGENCE.',
    rotate: 1.5,
  },
  {
    text: 'CURRENT COLLEGE FRESHMAN, SOPHOMORE, OR JUNIOR WITH US WORK AUTHORIZATION.',
    rotate: -1,
  },
  {
    text: 'DEMONSTRATES RESPECT FOR OTHERS. ETHICAL AND HONEST. EARNS TRUST AND MAINTAINS CONFIDENCE. DOES WHAT IS RIGHT, NOT WHAT IS POLITICALLY EXPEDIENT.',
    rotate: 2,
  },
  {
    text: 'MUST BE CREATIVE AND CURIOUS.',
    rotate: -2.5,
  },
]

export default function Eligibility({ isDark }: { isDark: boolean }) {
  const [checked, setChecked] = useState<boolean[]>(new Array(requirements.length).fill(false))

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const allChecked = checked.every(Boolean)

  return (
    <section
      id="eligibility"
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16"
      style={{
        padding: '120px 0',
        position: 'relative',
      }}
    >
      {/* Left - Sticky title */}
      <div>
        <h2
          className="text-textured md:sticky md:top-[100px]"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: isDark ? '#fdfbf1' : '#1a1a1a',
            transition: 'color 0.3s ease',
          }}
        >
          &bull; ELIGIBILITY
        </h2>
      </div>

      {/* Right - Scattered artsy checkboxes */}
      <div style={{ position: 'relative' }}>
        <div className="flex flex-col gap-10 md:gap-14">
          {requirements.map((req, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className="text-left flex items-start gap-5 cursor-pointer"
              style={{
                transform: `rotate(${req.rotate}deg)`,
                padding: '0',
                background: 'transparent',
                border: 'none',
              }}
              aria-label={`Requirement: ${req.text}`}
            >
              {/* Checkbox — adapts to dark mode */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  border: `1.5px solid ${isDark ? '#fdfbf1' : '#1a1a1a'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '2px',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {checked[i] && (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M4 14L11 21L24 6"
                      stroke={isDark ? '#fdfbf1' : '#1a1a1a'}
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </svg>
                )}
              </div>

              {/* Text — fades when checked */}
              <span
                style={{
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  lineHeight: 1.5,
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  maxWidth: '500px',
                  color: isDark ? '#fdfbf1' : '#1a1a1a',
                  opacity: checked[i] ? 0.3 : 1,
                  transition: 'opacity 0.15s ease, color 0.3s ease',
                }}
              >
                {req.text}
              </span>
            </button>
          ))}
        </div>

        {/* Completion message — always in flow, visibility toggles */}
        <p
          className={allChecked ? 'eligibility-reveal' : ''}
          style={{
            textAlign: 'center',
            fontFamily: '"EB Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 400,
            color: isDark ? '#fdfbf1' : '#1a1a1a',
            marginTop: '56px',
            transition: 'color 0.3s ease',
            opacity: allChecked ? 1 : 0,
            pointerEvents: allChecked ? 'auto' : 'none',
          }}
        >
          You're perfect!
        </p>

        <style>{`
          .eligibility-reveal {
            animation: eligibilityFadeIn 0.6s ease both;
          }
          @keyframes eligibilityFadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  )
}
