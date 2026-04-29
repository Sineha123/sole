// src/pages/Favorites.jsx
import { Link } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { useFavoritesStore } from '../store/favoritesStore'
import { products } from '../data/products'

export default function Favorites() {
  const ids = useFavoritesStore(s => s.ids)
  const favProducts = products.filter(p => ids.includes(p.id))

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '80vh' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 48px 80px' }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--text-muted)', marginBottom: 4 }}>
              YOUR
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, letterSpacing: 4 }}>
              COLLECTION
              {ids.length > 0 && (
                <span style={{ color: 'var(--red)', fontSize: 40, marginLeft: 16, letterSpacing: 2 }}>
                  ({ids.length})
                </span>
              )}
            </h1>
          </div>

          {favProducts.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 400,
              gap: 20,
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FiHeart size={32} color="var(--text-muted)" />
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 3, color: 'var(--text-secondary)' }}>
                COLLECTION IS EMPTY
              </h2>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)', textAlign: 'center' }}>
                Start exploring kicks and save your favorites
              </p>
              <Link to="/products" className="btn-primary"><span>SHOP NOW →</span></Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24,
            }}>
              {favProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
