const universities = [
  'Harvard',
  'Berkeley',
  'U of Michigan',
  'Onus',
  'Yale',
  'U of Waterloo',
  'Caltech',
  'Stanford',
  'Carnegie Mellon',
]

export default function UniversityLogos() {
  return (
    <div
      className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
      style={{
        margin: '80px 0',
        padding: '40px 0',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
    >
      {universities.map((name) => (
        <span
          key={name}
          style={{
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            opacity: 0.35,
            textTransform: 'uppercase',
          }}
        >
          {name}
        </span>
      ))}
    </div>
  )
}
