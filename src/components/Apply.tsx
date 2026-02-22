export default function Apply() {
  return (
    <section
      id="apply"
      className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16"
      style={{ padding: '120px 0' }}
    >
      {/* Left - Sticky title */}
      <div>
        <h2
          className="text-dark md:sticky md:top-[100px]"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          &bull; APPLICATION
        </h2>
      </div>

      {/* Right - Paper sheet */}
      <div>
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(26,26,26,0.12)',
            boxShadow: 'none',
            padding: 'clamp(40px, 5vw, 60px) clamp(30px, 4vw, 50px)',
            width: '100%',
            transform: 'rotate(-0.5deg)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(0deg) translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(-0.5deg)'
          }}
        >
          {/* Title in classic serif */}
          <h3
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.5vw, 36px)',
              fontWeight: 400,
              marginBottom: '8px',
              color: '#1a1a1a',
            }}
          >
            Verci Fellowship Program
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              opacity: 1,
              marginBottom: '36px',
            }}
          >
            Cohort 1 &nbsp;&bull;&nbsp; March – September 2026
          </p>

          {/* Intro paragraphs */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.3vw, 18px)',
              lineHeight: 1.6,
              marginBottom: '16px',
              color: 'rgba(26,26,26,0.8)',
            }}
          >
            We're looking for 20 students building things on campus or in their communities.
          </p>
          <p
            style={{
              fontSize: 'clamp(16px, 1.3vw, 18px)',
              lineHeight: 1.6,
              marginBottom: '40px',
              color: 'rgba(26,26,26,0.8)',
            }}
          >
            Rolling admissions. The earlier you apply, the better.
          </p>

          {/* Requirements header */}
          <h4
            style={{
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            What we'll ask for
          </h4>

          {/* Requirements list */}
          <ul
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(26,26,26,0.65)',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li style={{ marginBottom: '4px' }}>What you're building and why</li>
            <li style={{ marginBottom: '4px' }}>Why you want to join</li>
            <li style={{ marginBottom: '4px' }}>Link to your work</li>
            <li style={{ marginBottom: '4px' }}>Name, email, school</li>
          </ul>

          {/* Apply button */}
          <div style={{ marginTop: '44px' }}>
            <a
              href="#"
              style={{
                display: 'block',
                padding: '18px 36px',
                border: '1px solid #1a1a1a',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                color: '#1a1a1a',
                textDecoration: 'none',
                textAlign: 'center',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a'
                e.currentTarget.style.color = '#fdfbf1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#1a1a1a'
              }}
            >
              Apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
