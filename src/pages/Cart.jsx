// src/pages/Cart.jsx
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FiMinus, FiPlus, FiTrash2, FiTag, FiArrowLeft } from 'react-icons/fi'
import Footer from '../components/layout/Footer'
import { useCartStore } from '../store/cartStore'

const VALID_PROMO = { SOLE10: 0.10, KICKS20: 0.20 }

export default function Cart() {
  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const getTotal = useCartStore(s => s.getTotal)
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const subtotal = getTotal()
  const DELIVERY = subtotal > 0 ? 300 : 0
  const discount = appliedPromo ? Math.round(subtotal * VALID_PROMO[appliedPromo]) : 0
  const total = subtotal + DELIVERY - discount

  const applyPromo = () => {
    if (VALID_PROMO[promo.toUpperCase()]) {
      setAppliedPromo(promo.toUpperCase())
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
    }
  }

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '80vh', maxWidth: 1400, margin: '0 auto', padding: '96px 48px 80px' }}>
        <Link
          to="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 14,
            marginBottom: 32,
          }}
        >
          <FiArrowLeft size={16} />
          Continue Shopping
        </Link>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, letterSpacing: 4, marginBottom: 48 }}>
          YOUR CART
        </h1>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, letterSpacing: 3, marginBottom: 16 }}>
              CART IS EMPTY
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Add some kicks to get started</p>
            <Link to="/products" className="btn-primary"><span>SHOP NOW →</span></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'start' }} className="cart-grid">
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}`}>
                  <div style={{ padding: '28px 0', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      flexShrink: 0,
                    }}>
                      👟
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: 2, marginBottom: 2 }}>
                        [{item.product.brand.toUpperCase()}]
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
                        {item.product.name}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                        Size: US {item.size} | {item.product.condition}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 8 }}>
                          <button
                            onClick={() => {
                              if (item.quantity === 1) removeItem(item.product.id, item.size)
                              else updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }}
                            style={{ background: 'none', border: 'none', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
                          ><FiMinus size={14} /></button>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, width: 28, textAlign: 'center' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
                          ><FiPlus size={14} /></button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13 }}
                        >
                          <FiTrash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                      PKR {(item.product.price_pkr * item.quantity).toLocaleString()}
                    </div>
                  </div>
                  {i < items.length - 1 && <div style={{ height: 1, background: 'var(--border)' }} />}
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: 28,
              position: 'sticky',
              top: 88,
            }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: 3, marginBottom: 24 }}>
                ORDER SUMMARY
              </h2>

              {/* Promo */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    placeholder="Promo code..."
                    style={{
                      flex: 1,
                      background: 'var(--surface-2)',
                      border: `1px solid ${promoError ? 'var(--danger)' : 'var(--border)'}`,
                      borderRadius: 6,
                      padding: '10px 12px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                    onBlur={e => e.target.style.borderColor = promoError ? 'var(--danger)' : 'var(--border)'}
                  />
                  <button onClick={applyPromo} style={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '10px 14px',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    letterSpacing: 2,
                  }}>
                    <FiTag size={14} />
                  </button>
                </div>
                {promoError && <p style={{ color: 'var(--danger)', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-mono)' }}>{promoError}</p>}
                {appliedPromo && <p style={{ color: 'var(--success)', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-mono)' }}>✓ {appliedPromo} applied</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>PKR {subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Delivery</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>PKR {DELIVERY.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--success)', fontSize: 14 }}>Discount</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--success)' }}>-PKR {discount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid var(--border)', marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 2 }}>TOTAL</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 22 }}>PKR {total.toLocaleString()}</span>
              </div>

              <Link to="/checkout" className="btn-primary" style={{ display: 'flex', width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                <span>CHECKOUT →</span>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <style>{`
        @media (max-width: 900px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
