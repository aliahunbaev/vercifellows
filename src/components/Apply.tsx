export default function Apply() {
  return (
    <section id="apply" style={{ backgroundColor: '#1f1f1f', padding: '80px 0', color: '#fff' }} className="md:py-[160px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left column - sticky title */}
        <div className="w-full md:w-2/5 md:shrink-0">
          <h2
            className="md:sticky text-3xl md:text-[3rem]"
            style={{
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
              fontWeight: 400,
              top: '184px',
              color: '#fff',
            }}
          >
            Applications opening soon
          </h2>
        </div>

        {/* Right column - content */}
        <div className="w-full max-w-[350px] mx-auto md:max-w-none md:w-3/5 md:mx-0">
          <div className="space-y-4 md:space-y-6">
            <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65', color: '#fff' }}>
              We review applications on a rolling basis. The earlier you apply, the better your chances — we fill spots as we find the right people.
            </p>
            <p className="text-base md:text-[20px]" style={{ lineHeight: '1.65', color: '#fff' }}>
              The application is designed to be straightforward. We want to know what you're building, why it matters to you, and what you'd bring to the fellowship.
            </p>

            <div className="mt-8 md:mt-10">
              <h3 className="font-medium text-lg md:text-[22px]" style={{ letterSpacing: '-0.03em', marginBottom: '16px', color: '#fff' }}>
                What you'll need
              </h3>
              <div className="space-y-2">
                {[
                  "A brief description of what you're building and why",
                  'A link to your project, portfolio, or relevant work',
                  'Your resume or LinkedIn profile',
                  'A short response to one essay question',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="shrink-0 text-base md:text-[18px]" style={{ opacity: 0.5, color: '#fff' }}>•</span>
                    <span className="text-base md:text-[18px]" style={{ lineHeight: '1.6', color: '#fff' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-8 md:mt-10">
              <a
                href="#"
                className="inline-block bg-cta text-white transition-opacity hover:opacity-90 text-base md:text-[20px] px-8 md:px-11 py-3 md:py-4"
                style={{
                  borderRadius: '16px',
                }}
              >
                Start Application
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
