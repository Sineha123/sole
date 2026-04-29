// src/components/ui/CartDrawer.jsx
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { FiX, FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'
import { useCartStore } from '../../store/cartStore'

export default function CartDrawer() {
  const isOpen = useCartStore(s => s.isOpen)
  const items = useCartStore(s => s.items)
  const closeCart = useCartStore(s => s.closeCart)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)
  const getTotal = useCartStore(s => s.getTotal)
  const drawerRef = useRef(null)
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!drawerRef.current) return
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(drawerRef.current,
        { x: '100%' },
        { x: 0, duration: 0.45, ease: 'power3.out' }
      )
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(drawerRef.current, { x: '100%', duration: 0.35, ease: 'power3.in' })
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 })
    }
  }, [isOpen])

  const total = getTotal()
  const DELIVERY = 300

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 2000,
          opacity: 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: 440,
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          zIndex: 2001,
          transform: 'translateX(100%)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <FiShoppingBag size={20} color="var(--red)" />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              letterSpacing: 3,
            }}>CART ({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 28px' }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
              gap: 16,
            }}>
              <FiShoppingBag size={48} color="var(--text-muted)" />
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                Your cart is empty.<br />Start exploring kicks.
              </p>
              <Link to="/products" onClick={closeCart} className="btn-primary">
                <span>SHOP NOW</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}`}>
                  <div style={{ padding: '20px 0', display: 'flex', gap: 16 }}>
                    {/* Thumbnail placeholder */}
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                    }}>
                      👟
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        letterSpacing: 2,
                        marginBottom: 2,
                      }}>
                        [{item.product.brand.toUpperCase()}]
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: 14,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}>
                        {item.product.name}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        marginBottom: 12,
                      }}>
                        Size: US {item.size} | {item.product.condition}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Qty controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)', borderRadius: 6 }}>
                          <button
                            onClick={() => {
                              if (item.quantity === 1) removeItem(item.product.id, item.size)
                              else updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }}
                            style={{ background: 'none', border: 'none', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
                          >
                            <FiMinus size={12} />
                          </button>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, width: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15 }}>
                            PKR {(item.product.price_pkr * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {i < items.length - 1 && (
                    <div style={{ height: 1, background: 'var(--border)' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 28px 28px',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Subtotal</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>PKR {total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', fontSize: 14 }}>Delivery</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}>PKR {DELIVERY.toLocaleString()}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 20,
              paddingTop: 12,
              borderTop: '1px solid var(--border)',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 2 }}>TOTAL</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--text-primary)' }}>
                PKR {(total + DELIVERY).toLocaleString()}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary"
              style={{ display: 'flex', width: '100%', justifyContent: 'center', textDecoration: 'none' }}
            >
              <span>CHECKOUT →</span>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
