// src/components/sections/HeroSequence.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSequence() {
  const containerRef = useRef(null)
  const shoeRef = useRef(null)
  const heroTextRef = useRef(null)
  const sec2TextRef = useRef(null)

  // Sneaker Image
  const sneakerImg = "https://png.pngtree.com/png-clipart/20240830/original/pngtree-3d-red-color-sneaker-is-on-transparent-background-png-image_15880525.png"

  useGSAP(() => {
    // Floating animation (yoyo)
    gsap.to(shoeRef.current, {
      y: -15,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    // Drop shadow animation to match float
    gsap.to('.shoe-shadow', {
      scale: 0.8,
      opacity: 0.3,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    // Scroll animation from Hero to Section 2
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      }
    })

    // We have a 200vh container. The shoe is fixed or absolute.
    // If absolute, it starts at top: 50vh, and we move it to top: 150vh, while translating X and scaling.
    tl.to(shoeRef.current, {
      top: '150vh', // Move to center of second section
      x: '20vw', // Move slightly to the right (like Image 3)
      scale: 1.2, // Make it "half big form"
      rotation: -10, // Slight tilt
      ease: 'power1.inOut',
    }, 0)

    // Parallax text effects
    tl.to(heroTextRef.current, {
      y: -150,
      opacity: 0,
      ease: 'power1.in',
    }, 0)

    tl.from(sec2TextRef.current, {
      y: 100,
      opacity: 0,
      ease: 'power1.out',
    }, 0)

  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', backgroundColor: 'var(--void)' }}>
      
      {/* 
        THE SHOE
        Absolutely positioned relative to the whole 200vh sequence container 
      */}
      <div 
        ref={shoeRef} 
        style={{
          position: 'absolute',
          top: '50vh',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          width: '50vw',
          maxWidth: '800px',
          pointerEvents: 'none',
        }}
      >
        <motion.img 
          layoutId="hero-shoe"
          src={sneakerImg} 
          alt="Featured Sneaker"
          style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0px 20px 30px rgba(0,0,0,0.3))' }}
        />
        <div className="shoe-shadow" style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '20px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
          zIndex: -1,
        }} />
      </div>

      {/* ====================================================
          SECTION 1: HERO
          Split: White left, Red right
      ==================================================== */}
      <section style={{
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(to right, var(--void) 50%, var(--red) 50%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Huge background text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 20vw, 300px)',
            color: 'var(--surface-3)',
            mixBlendMode: 'overlay', // This makes it look cool across the split
            lineHeight: 0.8,
            letterSpacing: 8,
            margin: 0,
          }}>
            SOLE
          </h1>
        </div>

        {/* Content */}
        <div ref={heroTextRef} style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
        }}>
          {/* Left Text (White side -> Black text) */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: 4,
              color: 'var(--red)',
              marginBottom: 16,
              fontWeight: 700,
            }}>
              NEW ARRIVAL
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 6vw, 96px)',
              color: 'var(--black)',
              lineHeight: 0.95,
              letterSpacing: 2,
              marginBottom: 24,
            }}>
              AIR JORDAN 1<br />BRED TOE
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: 360,
              marginBottom: 40,
            }}>
              The iconic silhouette returns with a premium finish. Experience the perfect blend of retro style and modern comfort.
            </p>
            <Link to="/products" className="btn-primary" style={{ pointerEvents: 'auto' }}>
              <span>SHOP NOW →</span>
            </Link>
          </div>

          {/* Right Text (Red side -> White text) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' }}>
            <div style={{ color: 'white' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>PKR 45,000</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, opacity: 0.8 }}>Limited Stock Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: DETAILS (Image 3 style)
          Split: White left, Black right
      ==================================================== */}
      <section style={{
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(to right, var(--void) 40%, var(--black) 40%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div ref={sec2TextRef} style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: '40% 60%',
        }}>
          {/* Left Text (White side -> Black text) */}
          <div style={{ paddingRight: 40 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(80px, 8vw, 140px)',
              color: 'var(--black)',
              lineHeight: 0.85,
              letterSpacing: 2,
              marginBottom: 32,
            }}>
              AIR JORDAN<br />NIKE<br />BRED
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: 40,
            }}>
              The New Air Jordan 1 Bred Toe combines the exaggerated tongue and classic elements. It features premium leather upper for a soft ride that feels as impossible as it looks.
            </p>
            <Link to="/products/shoe-001" className="btn-ghost" style={{ 
              borderColor: 'var(--black)', 
              color: 'var(--black)',
              pointerEvents: 'auto' 
            }}>
              VIEW DETAILS
            </Link>
          </div>
          
          {/* Right side is where the shoe will land, spanning the black area */}
          <div style={{ position: 'relative' }}>
             {/* We can add play button or other elements here like Image 3 */}
             <div style={{
               position: 'absolute',
               top: '50%',
               left: '30%',
               transform: 'translate(-50%, -50%)',
               width: 80,
               height: 80,
               borderRadius: '50%',
               background: 'rgba(255,255,255,0.2)',
               backdropFilter: 'blur(10px)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: 'pointer',
               zIndex: 20,
               border: '1px solid rgba(255,255,255,0.4)',
               pointerEvents: 'auto',
             }}>
               <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: 6 }} />
             </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section { background: var(--void) !important; }
          .hero-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
