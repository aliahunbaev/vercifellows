import { useState, useEffect } from 'react'

const suffixes = ['the future', 'community', 'software', 'something new', 'each other', 'what matters', 'together']

const longestSuffix = suffixes.reduce((a, b) => (a.length > b.length ? a : b), '')

const TYPING_SPEED = 50
const ERASING_SPEED = 30
const PAUSE_AFTER_TYPE = 2000
const PAUSE_AFTER_ERASE = 400

function useTypingEffect() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'paused' | 'erasing' | 'erasedPause'>('typing')

  const targetWord = suffixes[wordIndex]

  useEffect(() => {
    if (phase === 'typing') {
      if (displayed.length < targetWord.length) {
        const timeout = setTimeout(() => {
          setDisplayed(targetWord.slice(0, displayed.length + 1))
        }, TYPING_SPEED)
        return () => clearTimeout(timeout)
      } else {
        setPhase('paused')
      }
    }

    if (phase === 'paused') {
      const timeout = setTimeout(() => setPhase('erasing'), PAUSE_AFTER_TYPE)
      return () => clearTimeout(timeout)
    }

    if (phase === 'erasing') {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, ERASING_SPEED)
        return () => clearTimeout(timeout)
      } else {
        setPhase('erasedPause')
      }
    }

    if (phase === 'erasedPause') {
      const timeout = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % suffixes.length)
        setPhase('typing')
      }, PAUSE_AFTER_ERASE)
      return () => clearTimeout(timeout)
    }
  }, [phase, displayed, targetWord])

  return displayed
}

export default function Hero() {
  const suffix = useTypingEffect()

  return (
    <section style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      {/* Wordmark SVG */}
      <div style={{ marginBottom: '24px' }}>
        <img
          src="/wordmark.svg"
          alt="V Fellowship"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
          }}
        />
      </div>

      {/* Typing headline */}
      <h1
        className="text-dark"
        style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: '48px',
        }}
      >
        For students building{' '}
        <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'bottom' }}>
          {/* Invisible longest word to reserve width/height */}
          <span style={{ visibility: 'hidden' }}>{longestSuffix}</span>
          {/* Visible typed text overlaid on top */}
          <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
            {suffix}
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.75em',
                backgroundColor: '#1a1a1a',
                marginLeft: '2px',
                verticalAlign: 'baseline',
                position: 'relative',
                top: '0.05em',
                animation: 'cursorBlink 1.2s ease-in-out infinite',
              }}
            />
          </span>
        </span>
      </h1>

      {/* Subtext + Apply CTA row */}
      <div
        className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-0"
      >
        {/* Left — descriptor (60%) */}
        <div
          className="md:basis-[60%]"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            className="uppercase"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: '.04em',
              color: 'rgba(26,26,26,0.3)',
              margin: 0,
              textAlign: 'right',
              paddingRight: 'clamp(20px, 3vw, 48px)',
            }}
          >
            The Verci Fellowship connects ambitious college students with mentors, funding, and a community of makers.
          </p>
        </div>

        {/* Right — Apply CTA (40%) */}
        <a
          href="#apply"
          className="hero-cta md:basis-[40%]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1a1a1a',
            textDecoration: 'none',
            border: '1px solid #1a1a1a',
            padding: '0.3em 0.4em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a1a1a'
            e.currentTarget.style.color = '#fdfbf1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#1a1a1a'
          }}
        >
          Apply now
        </a>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 767px) {
          .hero-cta {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
