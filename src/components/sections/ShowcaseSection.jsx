// src/components/sections/ShowcaseSection.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const details = [
  { label: 'BRAND', value: 'REEBOK' },
  { label: 'MODEL', value: 'Pump Omni Zone-2' },
  { label: 'CONDITION', value: 'DEADSTOCK' },
  { label: 'SIZE', value: 'US 10' },
  { label: 'COLORWAY', value: 'Black / Red / White' },
  { label: 'YEAR', value: '2022' },
]

export default function ShowcaseSection() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useGSAP(() => {
    // Details stagger in
    gsap.from('.showcase-detail', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })

    // Center line draws in
    gsap.fromTo(lineRef.current,
      { height: 0 },
      {
        height: '100%',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Shoe slides in from right
    gsap.from('.showcase-viewer', {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '90vh',
        background: 'var(--void)',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Left — 3D Viewer */}
      <div
        className="showcase-viewer"
        style={{
          flex: '0 0 60%',
          position: 'relative',
          padding: '60px 48px 60px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Red glow */}
        <div style={{
          position: 'absolute',
          left: '30%',
          top: '20%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(204,0,0,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          width: '100%',
          height: '75vh',
          maxHeight: 640,
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid rgba(204,0,0,0.2)',
          boxShadow: '0 0 120px rgba(204,0,0,0.15), 0 0 60px rgba(204,0,0,0.06)',
          position: 'relative',
          zIndex: 1,
        }}>
          <iframe
            title="Reebok Pump 3D Showcase"
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/673cd259e24a4266b2bfa56d2704313f/embed?autospin=1&autostart=1&ui_theme=dark&ui_controls=0&ui_watermark=0&ui_infos=0"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </div>
      </div>

      {/* Center divider line */}
      <div style={{ position: 'relative', width: 1, flexShrink: 0 }}>
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1,
            height: 0,
            background: 'linear-gradient(to bottom, transparent, var(--red), transparent)',
          }}
        />
      </div>

      {/* Right — Details */}
      <div style={{
        flex: '0 0 40%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 80px 60px 60px',
      }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 4,
          color: 'var(--red)',
          marginBottom: 8,
        }}>
          FEATURED PAIR
        </p>
        <h2 className="showcase-detail" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 48,
          letterSpacing: 3,
          color: 'var(--text-primary)',
          marginBottom: 40,
          lineHeight: 1,
        }}>
          PUMP OMNI<br />ZONE-2
        </h2>

        <div style={{ borderTop: '1px solid var(--border)', marginBottom: 32 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {details.map(({ label, value }) => (
            <div key={label} className="showcase-detail" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: 3,
                color: 'var(--text-muted)',
              }}>
                {label}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', margin: '32px 0' }} />

        <div className="showcase-detail" style={{ marginBottom: 28 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 36,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}>
            PKR 12,500
          </span>
        </div>

        <Link to="/products/shoe-001" className="btn-primary showcase-detail" style={{ alignSelf: 'flex-start' }}>
          <span>VIEW DETAILS →</span>
        </Link>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .showcase-viewer { flex: 0 0 100% !important; padding: 40px 20px !important; }
          section > div:nth-child(2) { display: none; }
          section > div:nth-child(3) { padding: 40px 20px !important; flex: 0 0 100% !important; }
          section { flex-direction: column !important; min-height: auto !important; }
        }
      `}</style>
    </section>
  )
}
