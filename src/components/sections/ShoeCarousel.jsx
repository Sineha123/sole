import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi'

const slides = [
  {
    id: 1,
    bgColor: '#FF6B00', // Orange
    textColor: '#FFFFFF',
    img: 'https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png',
    title: 'Wear your Style\nwith Comfort',
    sizes: ['09', '10', '11'],
  },
  {
    id: 2,
    bgColor: '#73C2FB', // Light Blue
    textColor: '#FFFFFF',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/036/625/143/small/ai-generated-sports-shoes-for-the-future-running-shoes-for-the-future-isolated-on-transparent-background-free-png.png',
    title: 'Step into the\nFuture of Run',
    sizes: ['08', '09', '10'],
  },
  {
    id: 3,
    bgColor: '#808080', // Grey
    textColor: '#FFFFFF',
    img: 'https://file.aiquickdraw.com/imgcompressed/img/compressed_44909a2e5cf110ed53a486ffe779c7a8.webp',
    title: 'Vibrant Colors\nMaximum Speed',
    sizes: ['10', '11', '12'],
  },
  {
    id: 4,
    bgColor: '#E53935', // Normal Red
    textColor: '#FFFFFF',
    img: 'https://icons.iconarchive.com/icons/mattrich/adidas/512/Adidas-Shoe-icon.png',
    title: 'Performance\nMeets Agility',
    sizes: ['07', '08', '09'],
  }
]

export default function ShoeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)

  // Auto-play interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext()
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(intervalId)
  }, [])

  const currentSlide = slides[currentIndex]

  return (
    <section className="carousel-padding" style={{ background: 'var(--surface)' }}>
      <motion.div 
        animate={{ backgroundColor: currentSlide.bgColor }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
        maxWidth: 1400,
        margin: '0 auto',
        height: '80vh',
        minHeight: 600,
        borderRadius: '40px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="carousel-inner-padding"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Background huge swoosh/circle detail */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height: '80%',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }} />

            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10, color: currentSlide.textColor }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: 2 }}>SOLE.</div>
            </div>

            {/* Main Content */}
            <div className="carousel-content" style={{ flex: 1, position: 'relative', zIndex: 10 }}>
              
              {/* Left Title */}
              <div style={{ flex: 1 }}>
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="carousel-title-h2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: currentSlide.textColor,
                    lineHeight: 1.1,
                    letterSpacing: 2,
                  }}
                >
                  {currentSlide.title}
                </motion.h2>
              </div>

              {/* Center Huge Shoe */}
              <div className="carousel-shoe-wrapper" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
                <motion.img
                  key={`img-${currentSlide.id}`}
                  initial={{ x: 300, opacity: 0, rotate: 15 }}
                  animate={{ scale: 1.2, x: 0, opacity: 1, rotate: -5 }}
                  exit={{ x: -300, opacity: 0, rotate: -25 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                  src={currentSlide.img}
                  alt="Shoe"
                  style={{
                    width: '100%',
                    filter: 'drop-shadow(0 40px 40px rgba(0,0,0,0.3))',
                  }}
                />
              </div>

              {/* Right Side Info (Sizes) */}
              <div className="carousel-sizes" style={{ flex: 1, display: 'flex', zIndex: 10 }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {currentSlide.sizes.map((size, idx) => (
                    <motion.div
                      key={size}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + (idx * 0.1) }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        border: `1px solid ${idx === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: currentSlide.textColor,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {size}
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="carousel-bottom" style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10, color: currentSlide.textColor }}>
              
              <div className="carousel-bottom-desc" style={{ fontFamily: 'var(--font-body)', fontSize: 12, opacity: 0.8, lineHeight: 1.6 }}>
                Discover our premium collection. Each pair represents the perfect blend of innovation and classic design aesthetics.
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                {/* Arrows */}
                <div style={{ display: 'flex', gap: 16 }}>
                  <div onClick={handlePrev} style={{ cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%' }}>
                    <FiChevronLeft />
                  </div>
                  <div onClick={handleNext} style={{ cursor: 'pointer', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '50%' }}>
                    <FiChevronRight />
                  </div>
                </div>

                {/* Buy Now */}
                <button style={{
                  padding: '16px 32px',
                  background: 'white',
                  color: currentSlide.bgColor,
                  border: 'none',
                  borderRadius: '30px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  letterSpacing: 2,
                  cursor: 'pointer',
                  fontWeight: 600,
                }}>
                  BUY NOW
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style>{`
        .carousel-padding { padding: 80px 48px; }
        .carousel-inner-padding { padding: 60px; }
        .carousel-content { display: flex; align-items: center; }
        .carousel-shoe-wrapper { width: 50%; }
        .carousel-title-h2 { font-size: clamp(60px, 6vw, 90px); white-space: pre-line; }
        .carousel-bottom { flex-direction: row; align-items: flex-end; }
        .carousel-bottom-desc { max-width: 300px; text-align: left; }
        .carousel-sizes { justify-content: flex-end; }

        @media (max-width: 768px) {
          .carousel-padding { padding: 40px 16px; }
          .carousel-inner-padding { padding: 30px 20px; }
          .carousel-content { flex-direction: column; justify-content: flex-start; text-align: center; }
          .carousel-shoe-wrapper { width: 90% !important; top: 60% !important; }
          .carousel-title-h2 { font-size: clamp(40px, 10vw, 60px) !important; white-space: normal !important; margin-bottom: 20px; }
          .carousel-bottom { flex-direction: column-reverse !important; align-items: center !important; gap: 24px; }
          .carousel-bottom-desc { max-width: 100% !important; text-align: center !important; }
          .carousel-sizes { justify-content: center !important; margin-top: 16px; display: none !important;} 
        }
      `}</style>
    </section>
  )
}
