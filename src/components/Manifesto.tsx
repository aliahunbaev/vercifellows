import { useEffect, useRef, useState, useCallback } from 'react'

const manifestoText =
  'IT SEEMS LIKE SCHOOL IS OBSOLETE. WE NO LONGER NEED DEGREES TO DO GREAT WORK, AND NOW WHAT IS NEEDED IS COMMUNITY, RESOURCES, AND INSPIRATION. NONE OF WHICH REQUIRE BEING IN DEBT TO A UNIVERSITY. SO WE WANT YOU ALL TO CONNECT AND DO IT WHETHER YOU\'RE IN SCHOOL, TAKING TIME OFF, OR A DROPOUT. TAKE OUR MONEY. MEET EACH OTHER. BUILD COOL THINGS. TELL THE WORLD ABOUT IT.'

const words = manifestoText.split(' ')

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Start revealing when section enters viewport, finish when it leaves
    // We use a large padding so the effect spans a longer scroll distance
    const sectionTop = rect.top
    const sectionHeight = rect.height

    // Start when top of section hits 50% of viewport, end when it hits 25% (75% up)
    const startPoint = windowHeight * 0.4
    const endPoint = windowHeight * 0.7

    const scrollRange = (startPoint - endPoint) + sectionHeight
    const scrolled = startPoint - sectionTop

    const rawProgress = scrolled / scrollRange
    setProgress(Math.max(0, Math.min(1, rawProgress)))
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const activeWordCount = Math.floor(progress * words.length)

  return (
    <section
      ref={containerRef}
      style={{
        margin: '80px 0',
        padding: '100px 0',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        minHeight: '80vh',
      }}
    >
      <div>
        {/* Word-by-word reveal */}
        <div
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
          }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{
                opacity: i < activeWordCount ? 1 : 0.12,
                transition: 'opacity 0.15s ease',
                display: 'inline',
              }}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
