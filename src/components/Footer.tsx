export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1f1f1f', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '60px 0', color: '#fff' }} className="md:py-20">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          {/* Left: branding + contact */}
          <div>
            <div className="flex items-baseline gap-0 mb-6">
              <span className="font-bold text-lg md:text-[22px]" style={{ letterSpacing: '-0.06em', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#fff' }}>
                VERCI
              </span>
            </div>
            <p className="text-base md:text-[18px] mb-6 md:mb-8" style={{ lineHeight: '1.6', color: '#fff' }}>
              <a href="mailto:fellows@verci.com" className="transition-opacity hover:opacity-60" style={{ color: '#fff' }}>
                fellows@verci.com
              </a>
            </p>
            <p className="text-sm md:text-base" style={{ opacity: 0.5, color: '#fff' }}>
              &copy; {new Date().getFullYear()} Verci. All rights reserved.
            </p>
          </div>

          {/* Right: social links */}
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="transition-opacity hover:opacity-60 text-sm md:text-base" style={{ color: '#fff' }}>
              Twitter
            </a>
            <a href="#" className="transition-opacity hover:opacity-60 text-sm md:text-base" style={{ color: '#fff' }}>
              LinkedIn
            </a>
            <a href="#" className="transition-opacity hover:opacity-60 text-sm md:text-base" style={{ color: '#fff' }}>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
