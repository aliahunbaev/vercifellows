export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1a1a1a',
        color: '#fdfbf1',
        padding: '80px 0 40px',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Wordmark */}
        <div style={{ marginBottom: '60px' }}>
          <img
            src="/wordmark.svg"
            alt="V Fellowship"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              opacity: 0.12,
              filter: 'invert(1)',
            }}
          />
        </div>

        {/* Main row */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span style={{ opacity: 0.35, marginBottom: '4px' }}>CONTACT</span>
            <a
              href="mailto:fellows@verci.com"
              style={{
                color: '#fdfbf1',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.4' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              FELLOWS@VERCI.COM
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span style={{ opacity: 0.35, marginBottom: '4px' }}>FOLLOW</span>
            {['TWITTER', 'LINKEDIN', 'INSTAGRAM'].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  color: '#fdfbf1',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.4' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                {social}
              </a>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <span style={{ opacity: 0.35, marginBottom: '4px' }}>PROGRAM</span>
            <span>COHORT 1</span>
            <span>MARCH – SEPTEMBER 2026</span>
            <span>NEW YORK CITY</span>
          </div>
        </div>

        {/* Bottom */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'rgba(253,251,241,0.25)',
            marginTop: '60px',
          }}
        >
          &copy; 2026 VERCI. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
