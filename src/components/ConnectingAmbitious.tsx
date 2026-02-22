import { useEffect, useRef, useCallback } from 'react'

export default function ConnectingAmbitious() {
  const imgRef = useRef<HTMLImageElement>(null)

  const handleScroll = useCallback(() => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Fade in as image enters viewport
    const start = windowHeight * 0.9
    const end = windowHeight * 0.4
    const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)))
    imgRef.current.style.opacity = String(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <section
      id="about"
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
          &bull; CONNECTING THE AMBITIOUS
        </h2>
      </div>

      {/* Right - Content */}
      <div>
        <p
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          We bring together 20 students building startups, projects, and communities.
        </p>
        <p
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          You get matched with mentors in your field, attend monthly workshops with founders and investors, and join a tight-knit group of other builders—online and in New York.
        </p>
        <p
          style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            lineHeight: 1.6,
            marginBottom: '40px',
          }}
        >
          By the end, you'll have shipped something real, made connections that matter, and learned from people who've been where you're going.
        </p>

        {/* Stats */}
        <p
          style={{
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            opacity: 0.4,
            marginBottom: '48px',
            textTransform: 'uppercase',
          }}
        >
          20 Fellows &nbsp;|&nbsp; 6 Months &nbsp;|&nbsp; March – September 2026
        </p>

        {/* Founder vector illustration — horizontal, fades in on scroll */}
        <img
          ref={imgRef}
          src="/founders.svg"
          alt="Founders gathering illustration"
          style={{
            width: '100%',
            maxWidth: '100%',
            height: 'auto',
            opacity: 0,
            willChange: 'opacity',
          }}
        />
      </div>
    </section>
  )
}
