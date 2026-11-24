// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense } from 'react'

import Cursor from './components/layout/Cursor'
import Navbar from './components/layout/Navbar'
import CartDrawer from './components/ui/CartDrawer'
import ChatBotWidget from './components/ui/ChatBotWidget'
import { ToastProvider } from './components/ui/Toast'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// Pages
import Home from './pages/Home'
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Favorites = lazy(() => import('./pages/Favorites'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
}

function AppContent() {
  useSmoothScroll()
  const location = useLocation()

  return (
    <>
      <Cursor />
      <Navbar />
      <CartDrawer />
      <ChatBotWidget />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Suspense fallback={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
              flexDirection: 'column',
              gap: 16,
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '2px solid var(--red)',
                borderTopColor: 'transparent',
                animation: 'spin-slow 1s linear infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                letterSpacing: 4,
                color: 'var(--text-muted)',
              }}>
                LOADING...
              </span>
            </div>
          }>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/drops" element={<Products mode="drops" />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order/:orderId" element={<OrderConfirmation />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  )
}
