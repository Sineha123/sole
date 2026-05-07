import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/layout/Footer'
import ShoeCarousel from '../components/sections/ShoeCarousel'

gsap.registerPlugin(ScrollTrigger)

function AboutIcon({ type, size = 28 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (type) {
    case 'leaf':
      return (
        <svg {...shared}>
          <path d="M6 13c5.5 0 9-3 12-8 1 7-1.5 13-8 13-2.5 0-4-1.5-4-5Z" />
          <path d="M7 17c1.5-3 4-5.5 8-7.5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...shared}>
          <path d="M12 3 5.5 5.5v5.7c0 4.2 2.7 8 6.5 9.8 3.8-1.8 6.5-5.6 6.5-9.8V5.5L12 3Z" />
          <path d="m9.5 12 1.7 1.7 3.8-4.2" />
        </svg>
      )
    case 'users':
      return (
        <svg {...shared}>
          <path d="M16 21v-1.5A3.5 3.5 0 0 0 12.5 16H8a4 4 0 0 0-4 4V21" />
          <circle cx="10" cy="9" r="3" />
          <path d="M18 8.5a2.5 2.5 0 0 1 0 5" />
          <path d="M20 21v-1a3.5 3.5 0 0 0-2.5-3.35" />
        </svg>
      )
    case 'check':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.5 2.3 2.3 4.7-5.3" />
        </svg>
      )
    case 'award':
      return (
        <svg {...shared}>
          <circle cx="12" cy="8.5" r="4.5" />
          <path d="M9.5 13 8 21l4-2.4L16 21l-1.5-8" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3 2" />
        </svg>
      )
    case 'network':
      return (
        <svg {...shared}>
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 11 16 7" />
          <path d="M8 13 16 17" />
        </svg>
      )
    default:
      return null
  }
}

const visionMission = [
  {
    icon: 'leaf',
    title: 'Sustainable Fashion',
    subtitle: 'Vision',
    desc: "Rescuing premium sneakers from landfills while promoting circular fashion in Pakistan's growing sneaker culture. Every pair saved reduces waste and preserves heritage.",
  },
  {
    icon: 'shield',
    title: '100% Authentic',
    subtitle: 'Mission',
    desc: 'In-house authentication for every pair. Industry-leading verification process ensures genuine sneakers without fakes or counterfeits.',
  },
  {
    icon: 'users',
    title: 'Community First',
    subtitle: 'Core Value',
    desc: "Connecting Karachi sneakerheads with global drops. Local roots supporting Pakistan's streetwear culture with international reach.",
  },
]

const whatWeDeliver = [
  { stat: '500+', label: 'Pairs Verified', icon: 'check' },
  { stat: '98.7%', label: 'Authenticity Rate', icon: 'award' },
  { stat: '24h', label: 'Average Turnaround', icon: 'clock' },
  { stat: '50+', label: 'Trusted Sources', icon: 'network' },
]

const timeline = [
  { year: '2023', title: 'Founded', desc: "SOLE launched as Pakistan's first curated pre-owned sneaker platform." },
  { year: '2024', title: '100 Pairs', desc: 'Verified and listed first collection of rare sneakers for Karachi market.' },
  { year: '2024', title: 'Expansion', desc: "Launched local drops and sneaker events for Pakistan's streetwear scene." },
  { year: '2025', title: 'Nationwide', desc: 'Expanding authentication centers across major Pakistani cities.' },
]

const standoutPoints = [
  'Detailed condition grading',
  'Drop-aware market pricing',
  'Collector-focused presentation',
]

const experienceBlocks = [
  { label: 'Authentication', value: 'Multi-step checks with expert review before any pair goes live.' },
  { label: 'Conditioning', value: 'Cleaning, photography, and listing polish that elevate every release.' },
  { label: 'Community', value: 'A sneaker platform shaped around local culture, not generic resale flow.' },
]

const styles = {
  section: {
    position: 'relative',
    padding: '128px 0',
  },
  softSection: {
    position: 'relative',
    padding: '128px 0',
    background: 'rgba(248,248,248,0.72)',
  },
  container: {
    width: 'min(1200px, calc(100% - 48px))',
    margin: '0 auto',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    maxWidth: 980,
    margin: '0 auto',
    padding: '0 32px',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(72px, 11vw, 144px)',
    lineHeight: 0.9,
    letterSpacing: 8,
    textTransform: 'uppercase',
    color: '#111',
    marginBottom: 18,
    textShadow: '0 16px 32px rgba(255,255,255,0.22)',
  },
  heroLine: {
    width: 160,
    maxWidth: '36vw',
    height: 4,
    margin: '0 auto 28px',
    borderRadius: 999,
    background: 'linear-gradient(90deg, rgba(17,17,17,0) 0%, rgba(17,17,17,0.96) 48%, rgba(17,17,17,0.8) 100%)',
    boxShadow: '0 0 18px rgba(17,17,17,0.18)',
  },
  heroSubtitle: {
    maxWidth: 760,
    margin: '0 auto 42px',
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(20px, 2.5vw, 30px)',
    lineHeight: 1.65,
    color: '#111',
    textShadow: '0 10px 24px rgba(255,255,255,0.18)',
  },
  centeredHeader: {
    textAlign: 'center',
    marginBottom: 96,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 18px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'rgba(255,255,255,0.6)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(48px, 7vw, 88px)',
    lineHeight: 0.95,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'var(--text-primary)',
    margin: '24px 0 20px',
  },
  subtitle: {
    maxWidth: 760,
    margin: '0 auto',
    fontFamily: 'var(--font-body)',
    fontSize: 20,
    lineHeight: 1.8,
    color: 'var(--text-secondary)',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 28,
  },
  card: {
    position: 'relative',
    padding: 36,
    borderRadius: 32,
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,248,248,0.85) 100%)',
    boxShadow: '0 24px 50px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  iconHalo: {
    width: 108,
    height: 108,
    margin: '0 auto 32px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    border: '1px solid rgba(204,0,0,0.16)',
    background: 'rgba(204,0,0,0.04)',
  },
  iconTile: {
    width: 78,
    height: 78,
    borderRadius: 24,
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
    background: 'linear-gradient(135deg, var(--red) 0%, var(--red-bright) 55%, var(--gold) 100%)',
    boxShadow: '0 20px 40px rgba(204,0,0,0.18)',
  },
  cardLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: 'var(--red)',
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 42,
    lineHeight: 1,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  cardText: {
    fontFamily: 'var(--font-body)',
    fontSize: 18,
    lineHeight: 1.8,
    color: 'var(--text-secondary)',
  },
  statCard: {
    position: 'relative',
    padding: 32,
    borderRadius: 30,
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,248,248,0.88) 100%)',
    boxShadow: '0 20px 45px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: 58,
    lineHeight: 1,
    letterSpacing: 2,
    color: 'var(--red)',
    marginBottom: 12,
  },
  statLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  },
  timelineWrap: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
    gap: 48,
    alignItems: 'start',
  },
  timelineRail: {
    position: 'relative',
    paddingLeft: 36,
  },
  timelineLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(180deg, var(--red) 0%, var(--gold) 65%, rgba(201,168,76,0) 100%)',
  },
  timelineCard: {
    position: 'relative',
    padding: '28px 28px 28px 32px',
    borderRadius: 28,
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'rgba(255,255,255,0.9)',
    boxShadow: '0 18px 40px rgba(0,0,0,0.05)',
  },
  timelineDot: {
    position: 'absolute',
    left: -49,
    top: 30,
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    background: '#fff',
    border: '1px solid rgba(204,0,0,0.25)',
    boxShadow: '0 0 24px rgba(204,0,0,0.16)',
  },
  timelineInnerDot: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: 'var(--red)',
  },
  featureShell: {
    position: 'relative',
    overflow: 'hidden',
    padding: 48,
    borderRadius: 40,
    border: '1px solid rgba(0,0,0,0.08)',
    background: 'linear-gradient(135deg, #141414 0%, #1d1d1d 35%, #0f0f0f 100%)',
    color: '#fff',
    boxShadow: '0 28px 60px rgba(0,0,0,0.16)',
  },
  featureGrid: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.08fr) minmax(0, 0.92fr)',
    gap: 32,
    alignItems: 'center',
  },
  chipGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    marginTop: 32,
  },
  chip: {
    padding: '16px 18px',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.06)',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.76)',
  },
  stack: {
    display: 'grid',
    gap: 16,
  },
  infoCard: {
    padding: 24,
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.05)',
  },
}

export default function About() {
  useGSAP(() => {
    gsap.from('.vm-card', {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.vision-section', start: 'top 80%' }
    })
  })

  return (
    <>
      <main style={{ paddingTop: 72 }}>
        {/* Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <ShoeCarousel />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40" />
          <motion.div
            style={styles.heroContent}
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <h1 style={styles.heroTitle}>
              About Sole
            </h1>
            <motion.div
              style={styles.heroLine}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            />
            <p style={styles.heroSubtitle}>
              Pakistan's premier destination for authenticated pre-owned luxury sneakers. Sustainable. Authentic. Community-driven.
            </p>
            <motion.div
              className="scroll-hint"
              aria-hidden="true"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ fontSize: 40, lineHeight: 1, color: '#111', textShadow: '0 10px 20px rgba(255,255,255,0.16)' }}
            >
              &darr;
            </motion.div>
          </motion.div>
        </section>

        <section className="vision-section" style={{ ...styles.section, background: 'linear-gradient(180deg, rgba(248,248,248,0.95) 0%, rgba(255,255,255,1) 100%)' }}>
          <div style={{ position: 'absolute', left: '-8%', top: 48, width: 320, height: 320, borderRadius: '50%', background: 'rgba(204,0,0,0.06)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', right: '-10%', bottom: 48, width: 360, height: 360, borderRadius: '50%', background: 'rgba(201,168,76,0.08)', filter: 'blur(90px)' }} />

          <div style={styles.container}>
            <motion.div
              style={styles.centeredHeader}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <div style={styles.eyebrow}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)' }} />
                Built for Pakistan&apos;s next sneaker era
              </div>
              <h2 style={styles.title}>Our Vision & Mission</h2>
              <p style={styles.subtitle}>
                SOLE blends authentication, curation, and culture so every pair carries story, trust, and long-term value.
              </p>
            </motion.div>

            <div style={styles.cardGrid}>
              {visionMission.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="vm-card"
                  style={styles.card}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.65, delay: i * 0.08 }}
                >
                  <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 3, background: 'linear-gradient(90deg, rgba(204,0,0,0) 0%, rgba(204,0,0,0.8) 50%, rgba(204,0,0,0) 100%)' }} />
                  <div style={styles.iconHalo}>
                    <div style={styles.iconTile}>
                      <AboutIcon type={item.icon} size={30} />
                    </div>
                  </div>
                  <div style={styles.cardLabel}>{item.subtitle}</div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <p style={styles.cardText}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <motion.div
              style={styles.centeredHeader}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
            >
              <h2 style={{ ...styles.title, fontSize: 'clamp(44px, 6vw, 76px)' }}>What We Deliver</h2>
              <p style={{ ...styles.subtitle, maxWidth: 700 }}>
                Premium sourcing with measurable trust, faster processing, and a stronger experience for collectors who care about authenticity.
              </p>
            </motion.div>

            <div style={styles.cardGrid}>
              {whatWeDeliver.map((item, i) => (
                <motion.div
                  key={item.label}
                  style={styles.statCard}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div style={{ ...styles.iconTile, width: 82, height: 82, margin: '0 auto 24px', borderRadius: 24 }}>
                    <AboutIcon type={item.icon} size={28} />
                  </div>
                  <div style={styles.statValue}>{item.stat}</div>
                  <div style={styles.statLabel}>{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section style={styles.softSection}>
          <div style={styles.container}>
            <div style={styles.timelineWrap}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7 }}
              >
                <div style={styles.eyebrow}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                  Our Journey
                </div>
                <h2 style={{ ...styles.title, fontSize: 'clamp(44px, 6vw, 74px)', marginTop: 24 }}>
                  From Curated Drop To National Movement
                </h2>
                <p style={{ ...styles.subtitle, margin: 0, maxWidth: 520, textAlign: 'left' }}>
                  We started with a simple promise: every pair should feel rare, verified, and worth talking about. That promise shaped every stage of our growth.
                </p>
              </motion.div>

              <div style={styles.timelineRail}>
                <div style={styles.timelineLine} />
                <div style={{ display: 'grid', gap: 20 }}>
                  {timeline.map((item, i) => (
                    <motion.div
                      key={`${item.year}-${item.title}`}
                      style={styles.timelineCard}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                    >
                      <div style={styles.timelineDot}>
                        <div style={styles.timelineInnerDot} />
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>
                        {item.year}
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 34, lineHeight: 1, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.container}>
            <motion.div
              style={styles.featureShell}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75 }}
            >
              <div style={{ position: 'absolute', right: -80, top: -80, width: 220, height: 220, borderRadius: '50%', background: 'rgba(204,0,0,0.18)', filter: 'blur(70px)' }} />
              <div style={{ position: 'absolute', left: -60, bottom: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(201,168,76,0.14)', filter: 'blur(60px)' }} />

              <div style={styles.featureGrid}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--red)', marginBottom: 18 }}>
                    Why Sole Stands Out
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6vw, 78px)', lineHeight: 0.95, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 22 }}>
                    Curated Like A Boutique, Verified Like A Vault
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 19, lineHeight: 1.85, color: 'rgba(255,255,255,0.76)', maxWidth: 640 }}>
                    Every sneaker passes through a tighter process, sharper curation lens, and more design-conscious presentation so buyers feel confidence before the pair even lands in hand.
                  </p>

                  <div style={styles.chipGrid}>
                    {standoutPoints.map((point) => (
                      <div key={point} style={styles.chip}>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.stack}>
                  {experienceBlocks.map((item, i) => (
                    <motion.div
                      key={item.label}
                      style={styles.infoCard}
                      initial={{ opacity: 0, x: 25 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>
                        {item.label}
                      </div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.75, color: '#fff' }}>
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
