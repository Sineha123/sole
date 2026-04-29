// src/pages/Checkout.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheck } from 'react-icons/fi'
import Footer from '../components/layout/Footer'
import { useCartStore } from '../store/cartStore'
import { useOrderStore } from '../store/orderStore'

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta']
const PAYMENT_METHODS = ['Cash on Delivery', 'EasyPaisa', 'JazzCash', 'Bank Transfer']
const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard (3-5 days)', price: 300 },
  { id: 'express', label: 'Express (1-2 days)', price: 600 },
  { id: 'sameday', label: 'Same Day (Karachi)', price: 800 },
]

export default function Checkout() {
  const navigate = useNavigate()
  const items = useCartStore(s => s.items)
  const getTotal = useCartStore(s => s.getTotal)
  const clearCart = useCartStore(s => s.clearCart)
  const placeOrder = useOrderStore(s => s.placeOrder)

  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: 'Karachi',
    province: 'Sindh',
    postalCode: '',
    delivery: 'standard',
  })
  const [payment, setPayment] = useState({
    method: 'Cash on Delivery',
    accountNumber: '',
  })

  const selectedDelivery = DELIVERY_OPTIONS.find(o => o.id === shipping.delivery)
  const subtotal = getTotal()
  const total = subtotal + (selectedDelivery?.price || 300)

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    const orderId = placeOrder({
      items,
      shipping,
      payment,
      subtotal,
      delivery: selectedDelivery?.price,
      total,
    })
    clearCart()
    navigate(`/order/${orderId}`)
  }

  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 56 }}>
      {[
        { n: 1, label: 'SHIPPING' },
        { n: 2, label: 'PAYMENT' },
        { n: 3, label: 'CONFIRM' },
      ].map(({ n, label }, i) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: step >= n ? 'var(--red)' : 'var(--surface-2)',
              border: `1px solid ${step >= n ? 'var(--red)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: step >= n ? 'white' : 'var(--text-muted)',
              transition: 'all 0.3s ease',
            }}>
              {step > n ? <FiCheck size={14} /> : n}
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: 2,
              color: step >= n ? 'var(--text-primary)' : 'var(--text-muted)',
            }}>
              {label}
            </span>
          </div>
          {i < 2 && (
            <div style={{
              width: 80,
              height: 1,
              background: step > n ? 'var(--red)' : 'var(--border)',
              margin: '0 8px',
              marginBottom: 20,
              transition: 'background 0.3s ease',
            }} />
          )}
        </div>
      ))}
    </div>
  )

  const OrderSummary = () => (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 24,
      position: 'sticky',
      top: 88,
    }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 3, marginBottom: 20 }}>
        ORDER SUMMARY
      </h3>
      {items.map(item => (
        <div key={`${item.product.id}-${item.size}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
            {item.product.name} × {item.quantity}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>
            PKR {(item.product.price_pkr * item.quantity).toLocaleString()}
          </span>
        </div>
      ))}
      <div style={{ height: 1, background: 'var(--border)', margin: '12px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Delivery</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>PKR {selectedDelivery?.price?.toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 2 }}>TOTAL</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 20 }}>PKR {total.toLocaleString()}</span>
      </div>
    </div>
  )

  const inputStyle = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '12px 14px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: 2,
    color: 'var(--text-muted)',
    marginBottom: 6,
    display: 'block',
  }

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 48px 80px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, letterSpacing: 4, marginBottom: 48, textAlign: 'center' }}>
            CHECKOUT
          </h1>
          <StepIndicator />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }} className="checkout-grid">
            <div>
              {/* Step 1 — Shipping */}
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 3, marginBottom: 8 }}>
                    DELIVER TO
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>FULL NAME</label>
                      <input required value={shipping.fullName} onChange={e => setShipping(p => ({ ...p, fullName: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>PHONE</label>
                      <input required value={shipping.phone} onChange={e => setShipping(p => ({ ...p, phone: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input required type="email" value={shipping.email} onChange={e => setShipping(p => ({ ...p, email: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>

                  <div>
                    <label style={labelStyle}>ADDRESS LINE 1</label>
                    <input required value={shipping.address1} onChange={e => setShipping(p => ({ ...p, address1: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>

                  <div>
                    <label style={labelStyle}>ADDRESS LINE 2 (OPTIONAL)</label>
                    <input value={shipping.address2} onChange={e => setShipping(p => ({ ...p, address2: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>CITY</label>
                      <select value={shipping.city} onChange={e => setShipping(p => ({ ...p, city: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                        {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>PROVINCE</label>
                      <input value={shipping.province} onChange={e => setShipping(p => ({ ...p, province: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                    <div>
                      <label style={labelStyle}>POSTAL CODE</label>
                      <input value={shipping.postalCode} onChange={e => setShipping(p => ({ ...p, postalCode: e.target.value }))} style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--red)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'var(--border)' }} />

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>DELIVERY METHOD</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {DELIVERY_OPTIONS.map(opt => (
                        <label key={opt.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: 16,
                          border: `1px solid ${shipping.delivery === opt.id ? 'var(--red)' : 'var(--border)'}`,
                          borderRadius: 8,
                          background: shipping.delivery === opt.id ? 'rgba(204,0,0,0.05)' : 'var(--surface)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}>
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.id}
                            checked={shipping.delivery === opt.id}
                            onChange={() => setShipping(p => ({ ...p, delivery: opt.id }))}
                            style={{ accentColor: 'var(--red)' }}
                          />
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, flex: 1 }}>{opt.label}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>PKR {opt.price.toLocaleString()}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                    <span>CONTINUE TO PAYMENT →</span>
                  </button>
                </form>
              )}

              {/* Step 2 — Payment */}
              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 3, marginBottom: 8 }}>PAYMENT METHOD</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {PAYMENT_METHODS.map(method => (
                      <label key={method} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: 16,
                        border: `1px solid ${payment.method === method ? 'var(--red)' : 'var(--border)'}`,
                        borderRadius: 8,
                        background: payment.method === method ? 'rgba(204,0,0,0.05)' : 'var(--surface)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}>
                        <input
                          type="radio"
                          name="payment"
                          checked={payment.method === method}
                          onChange={() => setPayment(p => ({ ...p, method }))}
                          style={{ accentColor: 'var(--red)' }}
                        />
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>{method}</span>
                      </label>
                    ))}
                  </div>

                  {(payment.method === 'EasyPaisa' || payment.method === 'JazzCash') && (
                    <div>
                      <label style={labelStyle}>ACCOUNT / MOBILE NUMBER</label>
                      <input
                        value={payment.accountNumber}
                        onChange={e => setPayment(p => ({ ...p, accountNumber: e.target.value }))}
                        placeholder="03XX XXXXXXX"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--red)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <button type="button" onClick={() => setStep(1)} className="btn-ghost">← BACK</button>
                    <button type="submit" className="btn-primary"><span>CONFIRM ORDER →</span></button>
                  </div>
                </form>
              )}
            </div>

            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
