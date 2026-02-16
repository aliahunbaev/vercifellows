import { useState, useEffect, useRef, useCallback } from 'react'

const images = [
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80',
  'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=600&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
]

const suffixes = ['the future', 'community', 'software', 'something new', 'each other', 'what matters', 'together']

const TYPING_SPEED = 45
const ERASING_SPEED = 30
const PAUSE_AFTER_ERASE = 300
const AUTO_ADVANCE_MS = 6000
const GAP = 12
const TRANSITION_MS = 700

function useWordCycler(index: number) {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'paused' | 'erasing' | 'erasedPause'>('typing')
  const targetWord = suffixes[index % suffixes.length]
  const prevIndexRef = useRef(index)

  useEffect(() => {
    if (prevIndexRef.current !== index) {
      prevIndexRef.current = index
      setPhase('erasing')
    }
  }, [index])

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

    if (phase === 'paused') return

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
        setPhase('typing')
      }, PAUSE_AFTER_ERASE)
      return () => clearTimeout(timeout)
    }
  }, [phase, displayed, targetWord])

  return displayed
}

function useLayout() {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  let centerVw: number
  let side1Vw: number
  let side2Vw: number
  const visibleSide = vw >= 1024 ? 2 : 1

  if (vw >= 1024) {
    // Desktop: 5-card layout, all comfortably visible
    centerVw = 27
    side1Vw = 20
    side2Vw = 18
  } else if (vw >= 640) {
    // Tablet: 3 cards, side cards are big (almost center size), ~half cut off at edges
    centerVw = 42
    side1Vw = 36
    side2Vw = 0
  } else {
    // Mobile: 3 cards, side cards are big but mostly off-screen (small sliver visible)
    centerVw = 60
    side1Vw = 45
    side2Vw = 0
  }

  return { vw, visibleSide, centerVw, side1Vw, side2Vw }
}

export default function Hero() {
  const [rawIndex, setRawIndex] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dragStartRef = useRef<{ x: number; time: number } | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const { vw, visibleSide, centerVw, side1Vw, side2Vw } = useLayout()

  const totalSlides = images.length
  const suffixIndex = ((rawIndex % totalSlides) + totalSlides) % totalSlides
  const suffix = useWordCycler(suffixIndex)

  const advance = useCallback(() => {
    setTransitionEnabled(true)
    setRawIndex(prev => prev + 1)
  }, [])

  const goBack = useCallback(() => {
    setTransitionEnabled(true)
    setRawIndex(prev => prev - 1)
  }, [])

  useEffect(() => {
    autoTimerRef.current = setInterval(advance, AUTO_ADVANCE_MS)
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    }
  }, [advance])

  const resetAutoTimer = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current)
    autoTimerRef.current = setInterval(advance, AUTO_ADVANCE_MS)
  }, [advance])

  useEffect(() => {
    if (Math.abs(rawIndex) >= totalSlides) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(false)
        setRawIndex(prev => ((prev % totalSlides) + totalSlides) % totalSlides)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionEnabled(true)
          })
        })
      }, TRANSITION_MS + 50)
      return () => clearTimeout(timeout)
    }
  }, [rawIndex, totalSlides])

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, time: Date.now() }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return
    const dx = e.clientX - dragStartRef.current.x
    const dt = Date.now() - dragStartRef.current.time
    const velocity = Math.abs(dx) / dt

    if (Math.abs(dx) > 50 || velocity > 0.3) {
      if (dx < 0) advance()
      else goBack()
      resetAutoTimer()
    }
    dragStartRef.current = null
  }

  // Build strip
  const copies = 5
  const stripImages: string[] = []
  for (let c = 0; c < copies; c++) {
    for (let i = 0; i < totalSlides; i++) {
      stripImages.push(images[i])
    }
  }

  const middleCopy = Math.floor(copies / 2)
  const homeCenter = middleCopy * totalSlides
  const centerInStrip = homeCenter + rawIndex

  const getItemWidthVw = (stripIdx: number) => {
    const dist = Math.abs(stripIdx - centerInStrip)
    if (dist === 0) return centerVw
    if (dist === 1) return side1Vw
    if (dist === 2 && visibleSide >= 2) return side2Vw
    return visibleSide >= 2 ? side2Vw : side1Vw
  }

  let offsetVw = 0
  let offsetGaps = 0
  for (let i = 0; i < centerInStrip; i++) {
    offsetVw += getItemWidthVw(i)
    offsetGaps += GAP
  }
  offsetVw += getItemWidthVw(centerInStrip) / 2

  const translateX = `calc(50vw - ${offsetVw}vw - ${offsetGaps}px)`
  const heroHeightVw = centerVw * 4 / 3

  const isDesktop = vw >= 1024
  const isMobile = vw < 640

  // Card overlap: how much it pulls up into the images
  // Desktop: deep overlap (card sits centered over images)
  // Tablet: moderate overlap
  // Mobile: slight overlap (card mostly sits below)
  const overlapVw = isDesktop ? heroHeightVw * 0.42 : isMobile ? heroHeightVw * 0.08 : heroHeightVw * 0.2

  // Card width — always horizontally centered
  const cardWidth = isMobile ? 'calc(100% - 32px)' : isDesktop ? '45%' : '58%'
  const cardMaxWidth = isDesktop ? '620px' : '560px'

  // Button goes full-width below desktop
  const buttonFullWidth = !isDesktop

  return (
    <section className="bg-cream" style={{ paddingTop: '64px' }}>
      {/* Carousel images */}
      <div
        className="overflow-hidden"
        style={{ paddingTop: '48px' }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          ref={stripRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: `${GAP}px`,
            height: `${heroHeightVw}vw`,
            transform: `translateX(${translateX})`,
            transition: transitionEnabled ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          {stripImages.map((src, i) => {
            const w = getItemWidthVw(i)
            return (
              <div
                key={i}
                className="shrink-0 overflow-hidden"
                style={{
                  width: `${w}vw`,
                  aspectRatio: '3/4',
                  transition: transitionEnabled ? `width ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
                }}
              >
                <img
                  src={src}
                  alt="Fellowship community"
                  className="w-full h-full object-cover"
                  draggable={false}
                  style={{ pointerEvents: 'none' }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA card — normal flow, negative margin overlap, always centered */}
      <div
        className="relative z-10 mx-auto bg-white border border-[#bababa]"
        style={{
          marginTop: `-${overlapVw}vw`,
          width: cardWidth,
          maxWidth: cardMaxWidth,
          borderRadius: '20px',
          padding: isMobile
            ? '20px'
            : isDesktop
              ? 'clamp(18px, 1.8vw, 28px) clamp(22px, 2.2vw, 32px)'
              : '18px 22px',
        }}
      >
        <h1
          className="text-left"
          style={{
            fontSize: isMobile ? '30px' : isDesktop ? 'clamp(36px, 4.2vw, 72px)' : 'clamp(30px, 4vw, 48px)',
            letterSpacing: '-0.04em',
            lineHeight: '1.1',
            fontWeight: 400,
          }}
        >
          <span style={{ display: 'block' }}>For students building</span>
          <span style={{ display: 'block', minHeight: '1.1em' }}>
            {suffix}
            <span
              className="hero-cursor"
              style={{
                display: 'inline-block',
                width: '1.5px',
                height: '1em',
                backgroundColor: '#000',
                marginLeft: '5px',
                position: 'relative',
                top: '0.12em',
              }}
            />
          </span>
        </h1>
        <div
          style={{ marginTop: isMobile ? '12px' : 'clamp(12px, 1.2vw, 20px)' }}
        >
          <a
            href="#apply"
            className="bg-cta text-white transition-opacity hover:opacity-90 block text-center"
            style={{
              fontSize: buttonFullWidth ? '16px' : 'clamp(14px, 1.2vw, 18px)',
              borderRadius: '12px',
              padding: buttonFullWidth ? '14px 20px' : '10px 24px',
              width: buttonFullWidth ? '100%' : 'auto',
              display: buttonFullWidth ? 'block' : 'inline-block',
              float: buttonFullWidth ? undefined : 'right',
            }}
          >
            Apply Now
          </a>
          {!buttonFullWidth && <div style={{ clear: 'both' }} />}
        </div>
      </div>

      {/* Subheading — normal flow, clean spacing */}
      <p
        className="text-center mx-auto px-6"
        style={{
          fontSize: isMobile ? '14px' : isDesktop ? '24px' : '18px',
          letterSpacing: '-0.03em',
          lineHeight: '1.5',
          maxWidth: isMobile ? '85%' : isDesktop ? '720px' : '500px',
          marginTop: isMobile ? '24px' : isDesktop ? '48px' : '32px',
          paddingBottom: isMobile ? '48px' : isDesktop ? '80px' : '48px',
        }}
      >
        The Verci Fellowship connects ambitious college students with mentors, funding, and a community of makers.
      </p>

      <style>{`
        @keyframes cursorFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-cursor {
          animation: cursorFade 1.2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
