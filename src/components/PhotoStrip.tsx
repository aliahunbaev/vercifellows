import { useRef, useCallback } from 'react'

const photos = [
  { src: '/images/optimized/verci1.webp', rotate: -2, alt: 'Verci community gathering' },
  { src: '/images/optimized/verci2.webp', rotate: 3, alt: 'Verci workshop session' },
  { src: '/images/optimized/v5.webp', rotate: -1.5, alt: 'Verci fellows event' },
  { src: '/images/optimized/verci3.webp', rotate: 2, alt: 'Verci fellows working' },
]

export default function PhotoStrip() {
  const dragState = useRef<{
    el: HTMLDivElement | null
    startX: number
    startY: number
    origX: number
    origY: number
  } | null>(null)

  const offsets = useRef<{ x: number; y: number }[]>(photos.map(() => ({ x: 0, y: 0 })))

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>, i: number) => {
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)
    dragState.current = {
      el,
      startX: e.clientX,
      startY: e.clientY,
      origX: offsets.current[i].x,
      origY: offsets.current[i].y,
    }
    el.style.zIndex = '10'
    el.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>, i: number) => {
    if (!dragState.current || dragState.current.el !== e.currentTarget) return
    const dx = e.clientX - dragState.current.startX
    const dy = e.clientY - dragState.current.startY
    const newX = dragState.current.origX + dx
    const newY = dragState.current.origY + dy
    offsets.current[i] = { x: newX, y: newY }
    const rotate = photos[i].rotate
    e.currentTarget.style.transform = `translate(${newX}px, ${newY}px) rotate(${rotate}deg)`
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return
    const el = dragState.current.el
    if (el) {
      el.style.zIndex = ''
      el.style.cursor = 'grab'
    }
    dragState.current = null
  }, [])

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-1.5"
      style={{
        marginTop: '60px',
        width: '100vw',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {photos.map((photo, i) => (
        <div
          key={i}
          style={{
            transform: `rotate(${photo.rotate}deg)`,
            padding: '8px 8px 10px 8px',
            backgroundColor: '#ffffff',
            border: '1px solid rgba(26,26,26,0.1)',
            cursor: 'grab',
            touchAction: 'none',
            userSelect: 'none',
          }}
          onPointerDown={(e) => onPointerDown(e, i)}
          onPointerMove={(e) => onPointerMove(e, i)}
          onPointerUp={onPointerUp}
        >
          <div style={{ aspectRatio: '3/4', overflow: 'hidden', pointerEvents: 'none' }}>
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
