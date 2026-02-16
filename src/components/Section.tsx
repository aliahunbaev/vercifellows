interface SectionProps {
  id?: string
  title: string
  bgColor: string
  children: React.ReactNode
}

export default function Section({ id, title, bgColor, children }: SectionProps) {
  return (
    <section id={id} style={{ backgroundColor: bgColor, padding: '80px 0' }} className="md:py-[160px]">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16">
        {/* Left column - sticky title */}
        <div className="w-full md:w-2/5 md:shrink-0">
          <h2
            className="md:sticky text-3xl md:text-[3rem]"
            style={{
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
              fontWeight: 400,
              top: '144px',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Right column - content */}
        <div className="w-full max-w-[350px] mx-auto md:max-w-none md:w-3/5 md:mx-0">
          {children}
        </div>
      </div>
    </section>
  )
}
