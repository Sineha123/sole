// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiInstagram, FiTwitter } from 'react-icons/fi'
import { FaWhatsapp, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer style={{
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '80px 48px 40px',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 64,
      }} className="footer-grid">
        {/* Column 1 — Brand */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            letterSpacing: 6,
            marginBottom: 12,
            color: 'var(--text-primary)',
          }}>
            SOLE
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--red)', display: 'inline-block',
              marginLeft: 3, marginBottom: 24,
            }} />
          </div>
          <p style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            lineHeight: 1.7,
            marginBottom: 32,
            maxWidth: 260,
          }}>
            Premium thrift. Rare finds. Real stories. Every pair verified, every sole saved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { Icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
              { Icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
              { Icon: FaWhatsapp, href: 'https://wa.me/923001234567', label: 'WhatsApp' },
              { Icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--red)'
                  e.currentTarget.style.color = 'var(--red)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              letterSpacing: 3,
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}>SHOP</h3>
            {[
              { to: '/products', label: 'All Products' },
              { to: '/drops', label: 'Latest Drops' },
              { to: '/favorites', label: 'My Favorites' },
              { to: '/cart', label: 'Cart' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  marginBottom: 12,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              letterSpacing: 3,
              color: 'var(--text-muted)',
              marginBottom: 20,
            }}>INFO</h3>
            {[
              { to: '/about', label: 'About SOLE' },
              { to: '/vouchers', label: 'Vouchers & Deals' },
              { to: '/contact', label: 'Contact Us' },
              { to: '/messages', label: 'Messages' },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  marginBottom: 12,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 — Newsletter */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            letterSpacing: 3,
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}>EARLY DROPS</h3>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 14,
            marginBottom: 24,
          }}>
            Get first access to new arrivals and rare finds.
          </p>
          {submitted ? (
            <p style={{ color: 'var(--success)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              ✓ You're on the list!
            </p>
          ) : (
            <form onSubmit={handleNewsletter}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email for early drops..."
                required
                style={{
                  width: '100%',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  padding: '14px 16px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  outline: 'none',
                  marginBottom: 12,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>SUBSCRIBE →</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1400,
        margin: '60px auto 0',
        paddingTop: 24,
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          © 2024 SOLE — Thrift with Purpose
        </p>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
          Made in Karachi ♥
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          footer { padding: 48px 20px 32px !important; }
        }
      `}</style>
    </footer>
  )
}
