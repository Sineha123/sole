// src/pages/OrderConfirmation.jsx
import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrderStore } from '../store/orderStore'
import Footer from '../components/layout/Footer'
import confetti from 'canvas-confetti'

const STATUS_STEPS = [
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
]

export default function OrderConfirmation() {
  const { orderId } = useParams()
  const orders = useOrderStore(s => s.orders)
  const order = orders.find(o => o.id === orderId)
  const confettiRef = useRef(false)

  useEffect(() => {
    if (confettiRef.current) return
    confettiRef.current = true

    // Fire confetti
    const duration = 3 * 1000
    const end = Date.now() + duration
    const colors = ['#CC0000', '#FF1A1A', '#C9A84C', '#F0EDE8']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const currentStatusIdx = STATUS_STEPS.findIndex(s => s.key === (order?.status || 'confirmed'))

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        <div style={{
          maxWidth: 760,
          margin: '0 auto',
          padding: '80px 48px',
          textAlign: 'center',
        }}>
          {/* Success icon */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.1)',
            border: '2px solid var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: 36,
          }}>
            ✓
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 64,
            letterSpacing: 4,
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}>
            ORDER PLACED!
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            color: 'var(--red)',
            letterSpacing: 3,
            marginBottom: 8,
          }}>
            #{orderId}
          </p>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'var(--text-secondary)',
            marginBottom: 48,
            lineHeight: 1.7,
          }}>
            We'll confirm via WhatsApp within 1 hour. Thank you for shopping at SOLE.
          </p>

          {/* Status tracker */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '32px 40px',
            marginBottom: 40,
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 3, marginBottom: 32 }}>
              ORDER STATUS
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {STATUS_STEPS.map((step, i) => (
                <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: i <= currentStatusIdx ? 'var(--red)' : 'var(--surface-2)',
                      border: `2px solid ${i <= currentStatusIdx ? 'var(--red)' : 'var(--border)'}`,
                      transition: 'all 0.3s ease',
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: 2,
                      color: i <= currentStatusIdx ? 'var(--text-primary)' : 'var(--text-muted)',
                      whiteSpace: 'nowrap',
                    }}>
                      {step.label}
                    </span>
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div style={{
                      width: 80,
                      height: 2,
                      background: i < currentStatusIdx ? 'var(--red)' : 'var(--border)',
                      margin: '0 8px',
                      marginBottom: 24,
                      transition: 'background 0.5s ease',
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order items */}
          {order?.items && (
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 24,
              marginBottom: 40,
              textAlign: 'left',
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 3, marginBottom: 20 }}>ITEMS</h2>
              {order.items.map(item => (
                <div key={`${item.product.id}-${item.size}`} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500 }}>{item.product.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                      US {item.size} × {item.quantity}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14 }}>
                    PKR {(item.product.price_pkr * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              {order.shipping && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 4 }}>
                    SHIPPING TO
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>
                    {order.shipping.fullName}, {order.shipping.address1}, {order.shipping.city}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn-primary"><span>CONTINUE SHOPPING</span></Link>
            <Link to="/contact" className="btn-ghost">CONTACT US</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
