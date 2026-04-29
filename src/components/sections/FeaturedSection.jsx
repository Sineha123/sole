// src/components/sections/FeaturedSection.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../ui/ProductCard'
import { getFeaturedProducts } from '../../data/products'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedSection() {
  const sectionRef = useRef(null)
  const featured = getFeaturedProducts().slice(0, 3)

  useGSAP(() => {
    gsap.from('.product-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '100px 48px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 56,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: 4,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            THIS WEEK'S
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 6vw, 80px)',
            letterSpacing: 4,
            color: 'var(--text-primary)',
            lineHeight: 0.9,
          }}>
            DROPS
          </h2>
        </div>
        <Link to="/drops" className="btn-ghost" style={{ fontSize: 13 }}>
          VIEW ALL →
        </Link>
      </div>

      {/* Grid */}
      <div className="featured-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
      }}>
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          section { padding: 60px 20px !important; }
        }
      `}</style>
    </section>
  )
}
