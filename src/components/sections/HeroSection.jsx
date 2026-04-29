// src/components/sections/HeroSection.jsx
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronRight, FiPlay } from 'react-icons/fi'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef(null)
  const shoeRef = useRef(null)

  // References for animating section texts
  const heroTextRef = useRef(null)
  const sec2TextRef = useRef(null)
  const sec3TextRef = useRef(null)
  const tagsRef = useRef(null)

  // Images
  const mainShoe = "https://static.vecteezy.com/system/resources/previews/046/407/740/non_2x/unique-and-aesthetically-colorful-premium-red-and-black-running-sports-shoes-sneakers-isolated-on-a-transparent-background-free-png.png"
  const card1Shoe = "https://m.media-amazon.com/images/I/71wppyEzK1L._AC_SY395_.jpg"
  const card2Shoe = "https://static.vecteezy.com/system/resources/previews/044/314/012/non_2x/blue-men-s-sneaker-isolated-on-transparent-background-png.png"
  const card3Shoe = "https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-3d-image-of-stylish-shoes-for-joging-on-transparent-background-png-image_13029576.png"

  useGSAP(() => {
    // 1. Continuous Floating animation for the shoe (independent of scroll)
    gsap.to(shoeRef.current, {
      y: -15,
      duration: 2.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    })

    // 2. Scroll Sequence Timeline - Increased to 400vh for slower transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5, // Increased scrub value to slow down animation feel
      }
    })

    // --- TRANSITION: SECTION 1 -> SECTION 2 ---
    // Shoe moves to the right edge (half visible), scales up
    tl.to('.hero-main-shoe', {
      top: '150vh', // Center of Section 2
      left: '90%',  // Pushed far to the right (only front half visible)
      scale: 1.6,
      rotation: 15,
      ease: 'power2.inOut',
    }, 0)

    // Fade out Hero Text, Fade in Section 2 Text
    tl.to(heroTextRef.current, { y: -100, opacity: 0, ease: 'power2.in' }, 0)
    tl.from(sec2TextRef.current, { x: -100, opacity: 0, ease: 'power2.out' }, 0)


    // --- TRANSITION: SECTION 2 -> SECTION 3 ---
    // Shoe moves to the left, scales down (but bigger than before)
    tl.to('.hero-main-shoe', {
      top: '250vh', // Center of Section 3
      left: '35%',  // Positioned on the left side
      scale: 1.2,   // Kept bigger as requested
      rotation: -5,
      ease: 'power2.inOut',
    }, 1) // Start at time 1

    // Fade out Section 2 Text, Fade in Section 3 Text & Tags
    tl.to(sec2TextRef.current, { x: 100, opacity: 0, ease: 'power2.in' }, 1)
    tl.from(sec3TextRef.current, { y: 50, opacity: 0, ease: 'power2.out' }, 1)
    
    // Stagger in the callout tags
    tl.from('.callout-tag', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, 1.2)

  }, [])

  return (
    // Total sequence is 300vh tall to remove gaps between sections
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '300vh', backgroundColor: '#F9F9F9' }}>
      
      {/* ====================================================
          THE ANIMATED SHOE
          Absolutely positioned, controlled by GSAP scroll
      ==================================================== */}
      <div 
        className="hero-main-shoe"
        style={{
          position: 'absolute',
          top: '55vh', // Moved down slightly more
          left: '50%', // Centered
          transform: 'translate(-50%, -50%) scale(1.1)', // Scaled up slightly more 
          zIndex: 50,
          width: '50vw',
          maxWidth: '800px',
          pointerEvents: 'none',
        }}
      >
        <div ref={shoeRef} style={{ position: 'relative' }}>
          <motion.img 
            layoutId="hero-shoe"
            src={mainShoe} 
            alt="Red and Black Running Shoe"
            style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.25))' }}
          />
        </div>
      </div>

      {/* ====================================================
          SECTION 1: HERO (0vh - 100vh)
          Red/White split background, left text, cards BELOW shoe
      ==================================================== */}
      <section style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, overflow: 'hidden', background: 'linear-gradient(to right, white 50%, var(--red) 50%)' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(200px, 30vw, 450px)', color: 'rgba(0,0,0,0.1)', mixBlendMode: 'overlay', lineHeight: 0.8, letterSpacing: 10, margin: 0 }}>SOLE</h1>
        </div>

        <div ref={heroTextRef} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1600px', margin: '0 auto', height: '100%', display: 'flex', justifyContent: 'space-between', padding: '100px 48px 24px' }}>
          
          {/* Left Title */}
          <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(50px, 12vw, 120px)', color: 'var(--black)', lineHeight: 0.9, letterSpacing: 2, marginBottom: 40 }}>
              <span style={{ display: 'block' }}>WEAR</span>
              <span style={{ display: 'block' }}>YOUR</span>
              <span style={{ display: 'block' }}>SOLE</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 500, marginBottom: 24 }}>
              FIND YOUR SHOES FROM OUR<br/>TRENDY COLLECTIONS
            </p>
            <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: 'var(--black)', color: 'white', padding: '12px 16px 12px 24px', borderRadius: '50px', fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: 2, textDecoration: 'none' }}>
              EXPLORE MORE
              <span style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiChevronRight size={18} /></span>
            </Link>
          </div>

          {/* Right Half: 3 Floating Cards (single row, aligned right, bottom) */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 24, zIndex: 20, paddingBottom: '0px', marginTop: 'auto' }}>
            {/* Card 1 */}
            <div className="hero-card" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '12px 20px 12px 12px', display: 'flex', alignItems: 'center', gap: 16, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div style={{ width: 60, height: 60, borderRadius: '12px', background: '#F5F5F5', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={card1Shoe} alt="Comfort" style={{ width: '120%', height: '120%', objectFit: 'cover' }} />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--black)', lineHeight: 1.2, letterSpacing: 1, maxWidth: 80 }}>COMFORT IN<br/>EVERY STEP</p>
            </div>
            {/* Card 2 */}
            <div className="hero-card" style={{ width: 140, height: 84, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', position: 'relative', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, padding: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, color: 'rgba(0,0,0,0.05)', lineHeight: 1, letterSpacing: 2, textAlign: 'center', zIndex: 0 }}>
                <span>SOLE</span><span>SOLE</span><span>SOLE</span>
              </div>
              <img src={card2Shoe} alt="Blue Sneaker" style={{ width: '120%', transform: 'rotate(-10deg)', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.1))' }} />
            </div>
            {/* Card 3 */}
            <div className="hero-card" style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16, overflow: 'hidden' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--black)', margin: '0 0 4px 0', lineHeight: 1 }}>PORT</h3>
                <div style={{ display: 'flex', gap: 4 }}>
                  <span style={{ background: '#F5F5F5', padding: '2px 8px', borderRadius: '10px', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, color: '#333' }}>+ COMFORT</span>
                </div>
              </div>
              <img src={card3Shoe} alt="Sport Shoe" style={{ width: '80px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))', transform: 'rotate(-5deg)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2: BOLD TEXT
      ==================================================== */}
      <section style={{ height: '100vh', width: '100%', position: 'absolute', top: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
        <div ref={sec2TextRef} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', padding: '0 48px' }}>
          
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 12vw, 150px)',
              color: 'var(--black)',
              lineHeight: 0.9,
              letterSpacing: 2,
            }}>
              EXPERIENCE UNMATCHED COMFORT AND <span style={{ color: 'var(--red)' }}>PREMIUM</span> STYLE.
            </h2>
          </div>

        </div>
      </section>

      {/* ====================================================
          SECTION 3: FEATURES
      ==================================================== */}
      <section style={{ height: '100vh', width: '100%', position: 'absolute', top: '200vh', overflow: 'hidden', background: '#F9F9F9' }}>
        
        {/* Huge SOLE background text resembling a swoosh */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-10deg)', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(300px, 40vw, 600px)', color: 'rgba(0,0,0,0.02)', lineHeight: 0.8, letterSpacing: 0, margin: 0, fontStyle: 'italic' }}>SOLE</h1>
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1400px', margin: '0 auto', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 48px' }}>
          
          {/* Feature Callouts (Positioned absolutely around the shoe area on the left) */}
          <div ref={tagsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div className="callout-tag" style={{ position: 'absolute', top: '20%', left: '20%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Eco-friendly dyes</div>
            <div className="callout-tag" style={{ position: 'absolute', top: '15%', left: '35%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Slip-resistant soles</div>
            <div className="callout-tag" style={{ position: 'absolute', top: '25%', left: '50%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Lightweight design</div>
            
            <div className="callout-tag" style={{ position: 'absolute', top: '45%', left: '55%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Sustainable Material</div>
            <div className="callout-tag" style={{ position: 'absolute', top: '65%', left: '60%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Shock absorption</div>
            <div className="callout-tag" style={{ position: 'absolute', top: '80%', left: '55%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Durable stitching</div>
            <div className="callout-tag" style={{ position: 'absolute', top: '90%', left: '45%', background: 'white', padding: '8px 16px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 500 }}>• Quick-dry lining</div>
          </div>

          {/* Right Side Text */}
          <div ref={sec3TextRef} style={{ maxWidth: '500px', textAlign: 'right' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(50px, 10vw, 130px)',
              color: 'var(--black)',
              lineHeight: 0.9,
              letterSpacing: 2,
            }}>
              Quality<br/>that speaks.
            </h2>
            <Link to="/products" className="btn-primary" style={{ pointerEvents: 'auto', marginTop: 32 }}>
              <span>VIEW COLLECTION →</span>
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-main-shoe { width: 90vw !important; }
          .hero-card { display: none !important; }
          .callout-tag { display: none !important; }
        }
        @media (max-width: 768px) {
          .hero-main-shoe { top: 60vh !important; width: 100vw !important; }
        }
      `}</style>
    </div>
  )
}
