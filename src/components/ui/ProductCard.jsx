// src/components/ui/ProductCard.jsx
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { FiHeart } from 'react-icons/fi'
import ShoeViewer from './ShoeViewer'
import Badge from './Badge'
import { useCartStore } from '../../store/cartStore'
import { useFavoritesStore } from '../../store/favoritesStore'
import { useToast } from './Toast'

export default function ProductCard({ product, size = 'md' }) {
  const card = useRef(null)
  const [addedState, setAddedState] = useState(false)
  const [heartPop, setHeartPop] = useState(false)

  const addItem = useCartStore(s => s.addItem)
  const openCart = useCartStore(s => s.openCart)
  const toggleFav = useFavoritesStore(s => s.toggle)
  const isFav = useFavoritesStore(s => s.isFavorited(product.id))
  const toast = useToast()

  const isSmall = size === 'sm'
  const viewerHeight = isSmall ? '220px' : '280px'

  // Total stock
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0)
  const firstAvailableSize = Object.entries(product.stock).find(([, qty]) => qty > 0)?.[0]
  const isSoldOut = totalStock === 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (isSoldOut || !firstAvailableSize) return
    addItem(product, parseFloat(firstAvailableSize))
    setAddedState(true)
    toast('Added to cart ✓', 'success')
    openCart()
    setTimeout(() => setAddedState(false), 1500)
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    toggleFav(product.id)
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 400)
    if (!isFav) {
      toast('Saved to favorites ♡', 'favorite')
    }
  }

  const onMouseEnter = () => {
    gsap.to(card.current, { y: -8, duration: 0.3, ease: 'power2.out' })
  }
  const onMouseLeave = () => {
    gsap.to(card.current, { y: 0, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <Link
      to={`/products/${product.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
      data-cursor="view"
    >
      <div
        ref={card}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="product-card"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'border-color 0.3s ease',
          cursor: 'none',
        }}
        onMouseOver={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
        onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        {/* 3D Viewer */}
        <div style={{ position: 'relative' }}>
          <ShoeViewer modelId={product.sketchfabModelId} height={viewerHeight} />
          {/* Badges overlay */}
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}>
            {product.isRare && <Badge type="RARE" />}
            {product.isDeadstock && <Badge type="DS" />}
            {!product.isDeadstock && <Badge type={product.condition} />}
            {totalStock > 0 && totalStock <= 3 && !isSoldOut && <Badge type="LOW STOCK" />}
            {isSoldOut && <Badge type="SOLD OUT" />}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 16px 12px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 4,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: 2,
            }}>
              [{product.brand.toUpperCase()}]
            </span>
            {product.isRare && (
              <span style={{ color: 'var(--gold)', fontSize: 14 }}>👑</span>
            )}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: isSmall ? 15 : 17,
            color: 'var(--text-primary)',
            marginBottom: 6,
            lineHeight: 1.3,
          }}>
            {product.name}
          </h3>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            marginBottom: 10,
          }}>
            US {product.size_us.join(' / ')}
          </p>

          {/* Price & Stock */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}>
                PKR {product.price_pkr.toLocaleString()}
              </span>
              {product.originalPrice_pkr > product.price_pkr && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginLeft: 8,
                  textDecoration: 'line-through',
                }}>
                  {product.originalPrice_pkr.toLocaleString()}
                </span>
              )}
            </div>
            {totalStock > 0 && totalStock <= 3 && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--red)',
                letterSpacing: 1,
              }}>
                Only {totalStock} left
              </span>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: addedState ? 'var(--success)' : isSoldOut ? 'var(--surface-3)' : 'var(--red)',
                border: 'none',
                borderRadius: 6,
                color: isSoldOut ? 'var(--text-muted)' : 'white',
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                letterSpacing: 2,
                cursor: isSoldOut ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s ease',
              }}
            >
              {isSoldOut ? 'SOLD OUT' : addedState ? 'ADDED ✓' : 'ADD TO CART'}
            </button>

            <button
              onClick={handleFavorite}
              style={{
                width: 42,
                height: 42,
                background: isFav ? 'rgba(204,0,0,0.1)' : 'var(--surface-2)',
                border: `1px solid ${isFav ? 'rgba(204,0,0,0.3)' : 'var(--border)'}`,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                animation: heartPop ? 'heart-pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
              }}
              aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiHeart
                size={16}
                style={{
                  color: isFav ? 'var(--red)' : 'var(--text-secondary)',
                  fill: isFav ? 'var(--red)' : 'none',
                  transition: 'all 0.2s',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
