// src/components/sections/StatsSection.jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 1200, suffix: '+', label: 'VERIFIED PAIRS', sub: 'All authenticated' },
  { prefix: 'PKR ', value: 500, suffix: '–15K', label: 'PRICE RANGE', sub: 'Something for everyone' },
  { value: 48, suffix: 'hr', label: 'DELIVERY', sub: 'Karachi same-day available' },
  { value: 4.9, suffix: '★', label: 'CUSTOMER RATING', sub: 'Based on 400+ orders' },
]

export default function StatsSection() {
  const sectionRef = useRef(null)
  const counterRefs = useRef([])

  useGSAP(() => {
    stats.forEach((stat, i) => {
      const el = counterRefs.current[i]
      if (!el) return

      gsap.from({ val: 0 }, {
        val: stat.value,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: function () {
          const val = this.targets()[0].val
          const formatted = stat.value % 1 !== 0
            ? val.toFixed(1)
            : Math.round(val).toLocaleString()
          el.textContent = (stat.prefix || '') + formatted + stat.suffix
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    })

    gsap.from('.stat-item', {
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 48px',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: 4,
          color: 'var(--text-muted)',
          marginBottom: 48,
          textAlign: 'center',
        }}>
          BY THE NUMBERS
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 48,
        }} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item" style={{ textAlign: 'center' }}>
              <div
                ref={el => counterRefs.current[i] = el}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 5vw, 72px)',
                  color: 'var(--red)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.prefix || ''}{stat.value}{stat.suffix}
              </div>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                letterSpacing: 3,
                color: 'var(--text-secondary)',
                marginBottom: 4,
              }}>
                {stat.label}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                color: 'var(--text-muted)',
              }}>
                {stat.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
