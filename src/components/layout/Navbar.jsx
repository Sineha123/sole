// src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { FiSearch, FiShoppingBag, FiHeart, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const cartCount = useCartStore(s => s.getCount())
  const justAdded = useCartStore(s => s.justAdded)
  const openCart = useCartStore(s => s.openCart)
  const favCount = useFavoritesStore(s => s.getCount())
  const cartIconRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', update)
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Cart pulse animation
  useEffect(() => {
    if (justAdded && cartIconRef.current) {
      cartIconRef.current.classList.add('cart-pulse')
      const t = setTimeout(() => cartIconRef.current?.classList.remove('cart-pulse'), 600)
      return () => clearTimeout(t)
    }
  }, [justAdded])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
      gsap.from('.mobile-link', {
        y: 30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      })
    }
  }, [mobileOpen])

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const links = [
    { to: '/products', label: 'SHOP' },
    { to: '/drops', label: 'DROPS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/vouchers', label: 'VOUCHERS' },
  ]

  const isActive = (to) => location.pathname === to

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 48px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Left — Links */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hidden-mobile">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                letterSpacing: 3,
                color: isActive(link.to) ? 'var(--red)' : (scrolled ? '#fff' : 'var(--text-secondary)'),
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (!isActive(link.to)) e.target.style.color = scrolled ? '#ccc' : 'var(--text-primary)' }}
              onMouseLeave={e => { if (!isActive(link.to)) e.target.style.color = scrolled ? '#fff' : 'var(--text-secondary)' }}
            >
              {link.label}
              {isActive(link.to) && (
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: 'var(--red)',
                  borderRadius: 2,
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Center — Logo */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            letterSpacing: 6,
            color: scrolled ? '#fff' : 'var(--text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          SOLE
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--red)',
            marginLeft: 3,
            marginBottom: 16,
            display: 'inline-block',
          }} />
        </Link>

        {/* Right — Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="hidden-mobile">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(s => !s)}
            style={{ background: 'none', border: 'none', color: scrolled ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', padding: 4 }}
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>

          {/* Favorites */}
          <Link to="/favorites" style={{ position: 'relative', color: scrolled ? '#fff' : 'var(--text-secondary)', textDecoration: 'none' }}>
            <FiHeart size={20} />
            {favCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'var(--gold)',
                color: 'black',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>{favCount}</span>
            )}
          </Link>

          {/* Cart */}
          <button
            ref={cartIconRef}
            onClick={openCart}
            style={{
              background: 'none',
              border: 'none',
              color: scrolled ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              position: 'relative',
              padding: 4,
              borderRadius: '50%',
            }}
            aria-label="Cart"
            id="cart-icon"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -8,
                right: -8,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'var(--red)',
                color: 'white',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>{cartCount}</span>
            )}
          </button>

          {/* Login */}
          <Link to="/login" style={{ color: scrolled ? '#fff' : 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: 2, fontWeight: 500 }}>
            LOGIN
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(s => !s)}
          style={{
            background: 'none',
            border: 'none',
            color: scrolled ? '#fff' : 'var(--text-primary)',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div style={{
          position: 'fixed',
          top: 72,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(5,5,5,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '24px 48px',
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 16, alignItems: 'center', maxWidth: 600, margin: '0 auto' }}>
            <FiSearch size={20} color="var(--text-muted)" />
            <input
              ref={searchRef}
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search kicks, brands, colorways..."
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                padding: '8px 0',
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>
              <span>GO</span>
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            background: 'var(--void)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          {[
            { to: '/', label: 'HOME' },
            { to: '/products', label: 'SHOP' },
            { to: '/drops', label: 'DROPS' },
            { to: '/favorites', label: 'FAVORITES' },
            { to: '/cart', label: 'CART' },
            { to: '/about', label: 'ABOUT' },
            { to: '/vouchers', label: 'VOUCHERS' },
            { to: '/contact', label: 'CONTACT' },
            { to: '/login', label: 'LOGIN' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-link"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 48,
                letterSpacing: 6,
                color: isActive(link.to) ? 'var(--red)' : 'var(--text-primary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--red)'}
              onMouseLeave={e => e.target.style.color = isActive(link.to) ? 'var(--red)' : 'var(--text-primary)'}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Inline mobile styles */}
      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}
