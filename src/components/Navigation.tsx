export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-border/30" style={{ height: '64px' }}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-0">
          <span
            className="font-bold text-lg md:text-[22px]"
            style={{ letterSpacing: '-0.06em', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            VERCI
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="#about"
            className="transition-opacity hover:opacity-60 text-sm md:text-base"
          >
            About
          </a>
          <a
            href="#timeline"
            className="transition-opacity hover:opacity-60 text-sm md:text-base"
          >
            Timeline
          </a>
          <a
            href="#eligibility"
            className="transition-opacity hover:opacity-60 text-sm md:text-base"
          >
            Eligibility
          </a>
          <a
            href="#apply"
            className="bg-cta text-white transition-opacity hover:opacity-90 text-sm md:text-base px-4 md:px-5 py-1.5"
            style={{
              borderRadius: '14px',
            }}
          >
            Apply
          </a>
        </div>
      </div>
    </nav>
  )
}
