const photos = [
  { src: '/images/optimized/verci1.webp', rotate: -2, ratio: '4/3', alt: 'Verci community gathering' },
  { src: '/images/optimized/verci2.webp', rotate: 2.5, ratio: '1/1', alt: 'Verci workshop session' },
  { src: '/images/optimized/v5.webp', rotate: -1.5, ratio: '3/2', alt: 'Verci fellows event' },
  { src: '/images/optimized/verci3.webp', rotate: 1, ratio: '1/1', alt: 'Verci fellows working' },
  { src: '/images/optimized/v6.webp', rotate: -3, ratio: '4/3', alt: 'Verci community' },
  { src: '/images/optimized/verci4.webp', rotate: 2, ratio: '3/2', alt: 'Verci fellows collaborating' },
  { src: '/images/optimized/v7.webp', rotate: -1, ratio: '1/1', alt: 'Verci event' },
  { src: '/images/optimized/v8.webp', rotate: 3, ratio: '4/3', alt: 'Verci team' },
]

const CARD_HEIGHT = 260

function PhotoCard({ photo }: { photo: (typeof photos)[number] }) {
  return (
    <div
      className="photo-card"
      style={{
        transform: `rotate(${photo.rotate}deg)`,
        padding: '8px 8px 12px 8px',
        flexShrink: 0,
        height: `${CARD_HEIGHT}px`,
        position: 'relative',
        zIndex: 1,
        backgroundColor: '#f5f2ea',
        backgroundImage: 'url(/images/paper-gray.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '1px solid rgba(26,26,26,0.06)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          height: '100%',
          aspectRatio: photo.ratio,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default function PhotoStrip() {
  return (
    <div
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: `-${CARD_HEIGHT / 2}px`,
        zIndex: 2,
        overflowX: 'clip',
        overflowY: 'visible',
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
    >
      <div
        className="photo-scroll-track"
        style={{
          display: 'flex',
          marginLeft: '-16px',
          width: 'max-content',
        }}
      >
        {/* Original set */}
        {photos.map((photo, i) => (
          <div key={`a-${i}`} style={{ marginLeft: '-12px' }}>
            <PhotoCard photo={photo} />
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {photos.map((photo, i) => (
          <div key={`b-${i}`} style={{ marginLeft: '-12px' }}>
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      <style>{`
        .photo-scroll-track {
          animation: photoScroll 45s linear infinite;
        }
        .photo-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes photoScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
