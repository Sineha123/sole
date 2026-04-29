// src/pages/Home.jsx
import { lazy, Suspense } from 'react'
import HeroSection from '../components/sections/HeroSection'
import MarqueeStrip from '../components/sections/MarqueeStrip'
import FeaturedSection from '../components/sections/FeaturedSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/layout/Footer'

const HorizontalScroll = lazy(() => import('../components/sections/HorizontalScroll'))
const StatsSection = lazy(() => import('../components/sections/StatsSection'))

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip />
      <FeaturedSection />
      <Suspense fallback={<div style={{ height: '100vh', background: 'var(--void)' }} />}>
        <HorizontalScroll />
      </Suspense>
      <Suspense fallback={<div style={{ height: 300, background: 'var(--surface)' }} />}>
        <StatsSection />
      </Suspense>
      <ContactSection />
      <Footer />
    </main>
  )
}
