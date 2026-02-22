import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '60px',
        backgroundColor: scrolled ? 'rgba(253, 251, 241, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">
        <a
          href="#"
          className="text-dark"
          style={{
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.1em',
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
              className="text-dark/50 hover:text-dark transition-colors duration-300"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
