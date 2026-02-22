import { useState, useEffect, useRef } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import PhotoStrip from './components/PhotoStrip'
import Manifesto from './components/Manifesto'
import ConnectingAmbitious from './components/ConnectingAmbitious'
import WhatYouGet from './components/WhatYouGet'
import TimelineSection from './components/Timeline'
import Eligibility from './components/Eligibility'
import Apply from './components/Apply'
import Footer from './components/Footer'

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      // Snap to dark when the trigger (between Eligibility & Apply) nears the bottom of viewport
      const dark = rect.top <= window.innerHeight * 0.8
      setIsDark(dark)
      // Set body bg directly and expose for Navigation
      document.body.style.backgroundColor = dark ? '#1a1a1a' : '#fdfbf1'
      document.documentElement.dataset.dark = dark ? '1' : ''
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Navigation isDark={isDark} />
      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Hero />
        <PhotoStrip />
        <Manifesto />
        <ConnectingAmbitious />
        <WhatYouGet />
        <TimelineSection />
        <Eligibility isDark={isDark} />
        {/* Invisible trigger marker between Eligibility and Apply */}
        <div ref={triggerRef} style={{ height: 0, overflow: 'hidden' }} />
        <Apply isDark={isDark} />
      </main>
      <Footer />
    </>
  )
}
