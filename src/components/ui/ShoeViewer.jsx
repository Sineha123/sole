// src/components/ui/ShoeViewer.jsx
import { useState, useEffect, useRef } from 'react'

export default function ShoeViewer({ modelId, height = '400px', style = {} }) {
  const [load, setLoad] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLoad(true)
      },
      { rootMargin: '200px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        height,
        background: '#0a0a0a',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {load ? (
        <iframe
          title={`Sneaker 3D model ${modelId}`}
          frameBorder="0"
          allowFullScreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={`https://sketchfab.com/models/${modelId}/embed?autospin=1&autostart=1&ui_theme=dark&ui_controls=0&ui_watermark=0&ui_infos=0&ui_stop=0`}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}>
          <div className="skeleton-pulse" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid var(--red)',
              borderTopColor: 'transparent',
              animation: 'spin-slow 1s linear infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              letterSpacing: 3,
              color: 'var(--text-muted)',
            }}>LOADING 3D</span>
          </div>
        </div>
      )}
    </div>
  )
}
