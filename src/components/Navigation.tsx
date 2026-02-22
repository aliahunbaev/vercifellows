import { useState, useEffect } from 'react'

export default function Navigation({ isDark: globalDark }: { isDark: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // If global dark mode is active, nav is always on dark
      if (globalDark) {
        setOnDark(true)
        return
      }

      // Otherwise check if the nav bar (at y=30, middle of 60px nav) overlaps a dark section
      const navY = window.scrollY + 30
      const darkSections = document.querySelectorAll('.dark-section')
      let isOnDark = false
      darkSections.forEach((section) => {
        const el = section as HTMLElement
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (navY >= top && navY <= bottom) {
          isOnDark = true
        }
      })
      setOnDark(isOnDark)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [globalDark])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const textColor = onDark ? '#fdfbf1' : '#1a1a1a'
  const textMuted = onDark ? 'rgba(253,251,241,0.5)' : 'rgba(26,26,26,0.5)'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '60px',
        backgroundColor: scrolled
          ? onDark
            ? 'rgba(26, 26, 26, 0.92)'
            : 'rgba(253, 251, 241, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? onDark
            ? '1px solid rgba(255,255,255,0.05)'
            : '1px solid rgba(0,0,0,0.05)'
          : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <a
          href="#"
          style={{
            fontFamily: '"PP Neue Montreal", "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: textColor,
            transition: 'color 0.3s ease',
          }}
        >
          VERCI
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', id: 'about' },
            { label: 'Timeline', id: 'timeline' },
            { label: 'Eligibility', id: 'eligibility' },
            { label: 'Apply', id: 'apply' },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollTo(e, link.id)}
              style={{
                fontFamily: '"PP Neue Montreal", "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: textMuted,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = textColor }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textMuted }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
