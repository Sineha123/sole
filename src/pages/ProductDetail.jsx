// src/pages/ProductDetail.jsx
import { useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FiHeart, FiChevronLeft, FiTruck, FiShield } from 'react-icons/fi'
import ShoeViewer from '../components/ui/ShoeViewer'
import Badge from '../components/ui/Badge'
import ProductCard from '../components/ui/ProductCard'
import Footer from '../components/layout/Footer'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useFavoritesStore } from '../store/favoritesStore'
import { useToast } from '../components/ui/Toast'

gsap.registerPlugin(ScrollTrigger)

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)
  const [selectedSize, setSelectedSize] = useState(null)
  const [addedState, setAddedState] = useState(false)
  const [heartPop, setHeartPop] = useState(false)

  const addItem = useCartStore(s => s.addItem)
  const openCart = useCartStore(s => s.openCart)
  const toggleFav = useFavoritesStore(s => s.toggle)
  const isFav = useFavoritesStore(s => s.isFavorited(id))
  const toast = useToast()

  useGSAP(() => {
    gsap.from('.detail-info > *', {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.2,
    })
  }, [id])

  if (!product) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', flexDirection: 'column', gap: 16 }}>
        <span style={{ fontSize: 64 }}>👟</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: 3 }}>PAIR NOT FOUND</h2>
        <Link to="/products" className="btn-primary"><span>BACK TO SHOP</span></Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0)
  const selectedSizeStock = selectedSize ? (product.stock[selectedSize] ?? 0) : null

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast('Please select a size first', 'info')
      return
    }
    if (selectedSizeStock === 0) {
      toast('This size is out of stock', 'error')
      return
    }
    addItem(product, selectedSize)
    setAddedState(true)
    toast('Added to cart ✓', 'success')
    openCart()
    setTimeout(() => setAddedState(false), 1500)
  }

  const handleFavorite = () => {
    toggleFav(product.id)
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 400)
    if (!isFav) toast('Saved to favorites ♡', 'favorite')
  }

  const conditionBar = (score) => (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{
          width: 20,
          height: 4,
          borderRadius: 2,
          background: i < score ? 'var(--red)' : 'var(--surface-3)',
        }} />
      ))}
    </div>
  )

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        {/* Back button */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 48px 0' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              padding: 0,
            }}
          >
            <FiChevronLeft size={18} />
            Back to Shop
          </button>
        </div>

        {/* Hero split */}
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '32px 48px 64px',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 64,
          alignItems: 'start',
        }} className="detail-grid">
          {/* Left — 3D Viewer */}
          <div style={{ position: 'sticky', top: 88 }}>
            <motion.div layoutId={id === 'shoe-001' ? 'hero-shoe' : undefined}>
              <ShoeViewer
                modelId={product.sketchfabModelId}
                height="80vh"
                style={{
                  border: '1px solid rgba(204,0,0,0.15)',
                  boxShadow: '0 0 80px rgba(204,0,0,0.1)',
                  borderRadius: 20,
                }}
              />
            </motion.div>
          </div>

          {/* Right — Info */}
          <div className="detail-info" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Brand */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: 3,
              color: 'var(--text-muted)',
            }}>
              [{product.brand.toUpperCase()}] — {product.sku}
            </span>

            {/* Name */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              letterSpacing: 3,
              lineHeight: 0.95,
              color: 'var(--text-primary)',
            }}>
              {product.name}
            </h1>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {product.isRare && <Badge type="RARE" />}
              <Badge type={product.condition} />
            </div>

            {/* Condition bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)' }}>CONDITION</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)' }}>{product.conditionScore}/10</span>
              </div>
              {conditionBar(product.conditionScore)}
            </div>

            {/* Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              padding: '16px',
              background: 'var(--surface)',
              borderRadius: 8,
              border: '1px solid var(--border)',
            }}>
              {[
                { label: 'COLORWAY', value: product.colorway },
                { label: 'YEAR', value: product.year },
                { label: 'CATEGORY', value: product.category },
                { label: 'GENDER', value: product.gender === 'M' ? 'Men' : product.gender === 'W' ? 'Women' : 'GS' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Size selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--text-muted)' }}>
                  SELECT SIZE (US)
                </span>
                {selectedSize && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: selectedSizeStock === 0 ? 'var(--danger)' : 'var(--success)' }}>
                    {selectedSizeStock === 0 ? 'Out of stock' : `${selectedSizeStock} in stock`}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {product.size_us.map(sz => {
                  const inStock = (product.stock[sz] ?? 0) > 0
                  const isSelected = selectedSize === sz
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      disabled={!inStock}
                      style={{
                        padding: '10px 16px',
                        border: `1px solid ${isSelected ? 'var(--red)' : inStock ? 'var(--border)' : 'var(--border)'}`,
                        borderRadius: 6,
                        background: isSelected ? 'rgba(204,0,0,0.1)' : 'var(--surface)',
                        color: isSelected ? 'var(--red)' : inStock ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        cursor: inStock ? 'pointer' : 'not-allowed',
                        opacity: inStock ? 1 : 0.4,
                        textDecoration: inStock ? 'none' : 'line-through',
                        transition: 'all 0.2s',
                      }}
                    >
                      {sz}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 36, fontWeight: 700 }}>
                PKR {product.price_pkr.toLocaleString()}
              </span>
              {product.originalPrice_pkr > product.price_pkr && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  PKR {product.originalPrice_pkr.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock warning */}
            {totalStock > 0 && totalStock <= 3 && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', letterSpacing: 1 }}>
                ⚠ Only {totalStock} pairs left
              </p>
            )}

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  background: addedState ? 'var(--success)' : 'var(--red)',
                  transition: 'background 0.3s ease',
                }}
              >
                <span>
                  {addedState ? 'ADDED TO CART ✓' : totalStock === 0 ? 'SOLD OUT' : 'ADD TO CART'}
                </span>
              </button>
              <button
                onClick={handleFavorite}
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  borderColor: isFav ? 'rgba(204,0,0,0.3)' : 'var(--border-hover)',
                  color: isFav ? 'var(--red)' : 'var(--text-primary)',
                  animation: heartPop ? 'heart-pop 0.35s' : 'none',
                }}
              >
                <FiHeart size={16} style={{ fill: isFav ? 'var(--red)' : 'none' }} />
                {isFav ? 'SAVED TO FAVORITES' : '♡ ADD TO FAVORITES'}
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)' }} />

            {/* Description */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: 3, marginBottom: 10 }}>DESCRIPTION</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {product.description}
              </p>
            </div>

            {/* Condition details */}
            <div style={{ padding: 16, background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: 3, marginBottom: 10, color: 'var(--text-secondary)' }}>
                CONDITION DETAILS
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 0, listStyle: 'none' }}>
                <li style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
                  • Soles: {product.conditionScore}/10 &nbsp;|&nbsp; Upper: {product.conditionScore}/10 &nbsp;|&nbsp; Box: No box
                </li>
              </ul>
            </div>

            {/* Shipping */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FiTruck size={16} color="var(--text-muted)" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
                  {product.shipping}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FiShield size={16} color="var(--text-muted)" />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
                  No returns on used items. All pairs verified before shipping.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px 80px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 40,
              letterSpacing: 3,
              marginBottom: 32,
              paddingTop: 40,
              borderTop: '1px solid var(--border)',
            }}>
              YOU MIGHT ALSO LIKE
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} size="sm" />)}
            </div>
          </div>
        )}
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; padding: 24px 20px 48px !important; }
          .detail-grid > div:first-child { position: static !important; }
        }
      `}</style>
    </>
  )
}
