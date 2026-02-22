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
  return (
    <>
      <Navigation />
      <main className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Hero />
        <PhotoStrip />
        <Manifesto />
        <ConnectingAmbitious />
        <WhatYouGet />
        <TimelineSection />
        <Eligibility />
        <Apply />
      </main>
      <Footer />
    </>
  )
}
