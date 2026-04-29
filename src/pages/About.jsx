// src/pages/About.jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/layout/Footer'
import ShoeCarousel from '../components/sections/ShoeCarousel'

gsap.registerPlugin(ScrollTrigger)

const mission = [
  { icon: '🌱', title: 'SUSTAINABLE', desc: "Every sole saved is one less in landfill. Thrift is the most eco-conscious choice in sneaker culture." },
  { icon: '💎', title: 'AUTHENTIC', desc: "Every pair is verified in-house. Every story is real. We don't sell fakes — ever." },
  { icon: '🤝', title: 'COMMUNITY', desc: "Born in Karachi, built for Karachi. We believe access to rare kicks shouldn't be limited by geography." },
]

const steps = [
  { label: 'SOURCED', desc: 'Found through trusted networks' },
  { label: 'VERIFIED', desc: 'Authenticated by our team' },
  { label: 'CLEANED', desc: 'Professionally restored' },
  { label: 'LISTED', desc: 'Priced fairly and sold' },
]

export default function About() {
  useGSAP(() => {
    gsap.from('.mission-card', {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mission-grid', start: 'top 80%', toggleActions: 'play none none reverse' },
    })

    gsap.from('.process-step', {
      x: -30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.process-row', start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, [])

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        {/* Hero Carousel */}
        <ShoeCarousel />

        {/* Mission */}
        <section style={{ padding: '80px 48px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 48,
              letterSpacing: 4,
              marginBottom: 48,
              textAlign: 'center',
            }}>
              OUR MISSION
            </h2>
            <div className="mission-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 32,
            }}>
              {mission.map(({ icon, title, desc }) => (
                <div key={title} className="mission-card" style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: 32,
                  transition: 'border-color 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(204,0,0,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    letterSpacing: 3,
                    marginBottom: 12,
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            .mission-grid { grid-template-columns: repeat(3, 1fr) !important; }
            @media (max-width: 800px) {
              .mission-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>

        {/* Process */}
        <section style={{ padding: '80px 48px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, letterSpacing: 4, marginBottom: 48, textAlign: 'center' }}>
              THE PROCESS
            </h2>
            <div className="process-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
              {steps.map((step, i) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                  <div className="process-step" style={{ flex: 1, textAlign: 'center', padding: '0 16px' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 16,
                      fontWeight: 700,
                    }}>
                      {i + 1}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: 3, marginBottom: 8 }}>
                      {step.label}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)' }}>
                      {step.desc}
                    </p>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 60,
                      height: 2,
                      background: 'var(--border)',
                      flexShrink: 0,
                      marginTop: 24,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section style={{
          padding: '80px 48px',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'var(--surface-2)',
              border: '2px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: 40,
            }}>
              👤
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 3, marginBottom: 4 }}>
              THE FOUNDER
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 3, color: 'var(--red)', marginBottom: 20 }}>
              KARACHI, PAKISTAN
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              fontStyle: 'italic',
            }}>
              "I started SOLE because I was tired of overpaying for fakes and missing out on rare pairs.
              Every shoe has a story — I want to help that story find its next chapter."
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
