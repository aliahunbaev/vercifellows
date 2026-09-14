export default function Footer() {
  return (
    <footer
      className="dark-section"
      style={{
        backgroundColor: '#1a1a1a',
        padding: 'clamp(60px, 8vw, 100px) 0',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <img
          src="/wordmark.svg"
          alt="V Fellowship"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            opacity: 0.12,
            filter: 'invert(1)',
          }}
        />
      </div>
    </footer>
  )
}
