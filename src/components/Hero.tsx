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
    <section
      className="hero-section dark-section"
      style={{
        backgroundColor: '#1a1a1a',
        color: '#fdfbf1',
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <div
        className="max-w-[1400px] mx-auto px-6 md:px-10"
        style={{
          paddingTop: '120px',
          paddingBottom: '160px',
        }}
      >
        {/* Wordmark SVG */}
        <div style={{ marginBottom: '32px' }}>
          <img
            src="/wordmark.svg"
            alt="V Fellowship"
            style={{
              width: '100%',
              maxWidth: '460px',
              height: 'auto',
              filter: 'invert(1)',
            }}
          />
        </div>

        {/* SVG filter for text edge texture */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <defs>
            <filter id="textTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Typing headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '48px',
            color: '#fdfbf1',
            filter: 'url(#textTexture)',
          }}
        >
          For students building{' '}
          <span style={{ position: 'relative', display: 'inline-block', verticalAlign: 'bottom' }}>
            <span style={{ visibility: 'hidden' }}>{longestSuffix}</span>
            <span style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
              {suffix}
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.75em',
                  backgroundColor: '#fdfbf1',
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

        {/* Apply CTA — right-aligned, fixed size */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="#apply"
            className="hero-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '360px',
              height: '100px',
              fontSize: '36px',
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#fdfbf1',
              textDecoration: 'none',
              border: '1px solid #fdfbf1',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fdfbf1'
              e.currentTarget.style.color = '#1a1a1a'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#fdfbf1'
            }}
          >
            Apply now
          </a>
        </div>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @media (max-width: 767px) {
          .hero-cta {
            width: 100% !important;
          }
        }
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.04;
          pointer-events: none;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }
      `}</style>
    </section>
  )
}
