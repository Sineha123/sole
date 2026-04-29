// src/components/sections/HorizontalScroll.jsx
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import ShoeViewer from '../ui/ShoeViewer'
import Badge from '../ui/Badge'
import { products } from '../../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalScroll() {
  const sectionRef = useRef(null)
  const scrollTrack = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(1)

  const items = products.slice(0, 8)

  useGSAP(() => {
    const track = scrollTrack.current
    if (!track) return

    const totalWidth = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (items.length - 1)) + 1
            setCurrentIndex(idx)
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--void)',
      }}
    >
      {/* Counter */}
      <div style={{
        position: 'absolute',
        top: 32,
        right: 48,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-muted)',
      }}>
        <span style={{ color: 'var(--red)', fontSize: 22, fontWeight: 700 }}>
          {String(currentIndex).padStart(2, '0')}
        </span>
        <span>/</span>
        <span>{String(items.length).padStart(2, '0')}</span>
      </div>

      {/* Track */}
      <div
        ref={scrollTrack}
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          paddingLeft: 80,
          gap: 32,
          willChange: 'transform',
        }}
      >
        {/* Intro card */}
        <div style={{
          flexShrink: 0,
          width: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: 40,
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: 4,
            color: 'var(--red)',
            marginBottom: 16,
          }}>ALL KICKS</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 64,
            letterSpacing: 3,
            color: 'var(--text-primary)',
            lineHeight: 0.9,
            marginBottom: 24,
          }}>
            EVERY<br />PAIR HAS<br />A STORY
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: 1.7,
          }}>
            Scroll to explore our collection.<br />
            Each pair verified, cleaned, and graded.
          </p>
        </div>

        {/* Product cards */}
        {items.map((product) => {
          const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0)
          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{ textDecoration: 'none', flexShrink: 0 }}
            >
              <div
                data-cursor="view"
                style={{
                  width: 360,
                  height: '75vh',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(204,0,0,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ flex: 1 }}>
                  <ShoeViewer modelId={product.sketchfabModelId} height="100%" />
                </div>
                <div style={{ padding: '20px 20px 24px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2 }}>
                      [{product.brand.toUpperCase()}]
                    </span>
                    <Badge type={product.condition} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 18,
                    color: 'var(--text-primary)',
                    marginBottom: 4,
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18 }}>
                      PKR {product.price_pkr.toLocaleString()}
                    </span>
                    {product.isRare && <span style={{ color: 'var(--gold)' }}>👑 RARE</span>}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}

        {/* End spacer */}
        <div style={{ flexShrink: 0, width: 80 }} />
      </div>
    </section>
  )
}
