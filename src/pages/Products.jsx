// src/pages/Products.jsx
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import Footer from '../components/layout/Footer'
import { products as allProducts } from '../data/products'
import { nextDropDate } from '../data/stockData'
import { FiSliders, FiGrid, FiList, FiX } from 'react-icons/fi'

const BRANDS = ['Nike', 'Adidas', 'Reebok', 'Jordan', 'New Balance', 'Puma', 'Converse', 'Vans']
const SIZES = [7, 8, 9, 10, 11, 12]
const CONDITIONS = ['DS', 'VNDS', 'Used']
const COLORS = ['Black', 'White', 'Red', 'Blue', 'Green', 'Grey', 'Multi']
const GENDERS = ['M', 'W', 'GS']

function Countdown({ targetDate }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) { setTime({ h: 0, m: 0, s: 0 }); return }
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const pad = n => String(n).padStart(2, '0')

  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      {[
        { v: time.h, l: 'hr' },
        { v: time.m, l: 'min' },
        { v: time.s, l: 'sec' },
      ].map(({ v, l }, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            color: 'var(--red)',
            fontWeight: 700,
            lineHeight: 1,
            animation: l === 'sec' ? 'count-pulse 1s ease infinite' : 'none',
          }}>
            {pad(v)}
          </div>
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            letterSpacing: 3,
            color: 'var(--text-muted)',
            marginTop: 4,
          }}>
            {l}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Products({ mode }) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const isDropsMode = mode === 'drops'

  const [filters, setFilters] = useState({
    brands: [],
    sizes: [],
    conditions: [],
    minPrice: 0,
    maxPrice: 50000,
    colors: [],
    genders: [],
    inStockOnly: false,
    sortBy: 'newest',
  })
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)

  const toggleFilter = (key, val) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(val)
        ? prev[key].filter(v => v !== val)
        : [...prev[key], val],
    }))
    setVisibleCount(12)
  }

  const activeFilterChips = [
    ...filters.brands.map(b => ({ key: 'brands', val: b, label: b })),
    ...filters.sizes.map(s => ({ key: 'sizes', val: s, label: `US ${s}` })),
    ...filters.conditions.map(c => ({ key: 'conditions', val: c, label: c })),
    ...filters.colors.map(c => ({ key: 'colors', val: c, label: c })),
    ...filters.genders.map(g => ({ key: 'genders', val: g, label: g === 'M' ? 'Men' : g === 'W' ? 'Women' : 'GS' })),
    ...(filters.inStockOnly ? [{ key: 'inStockOnly', val: true, label: 'In Stock Only' }] : []),
  ]

  const filteredProducts = useMemo(() => {
    let result = allProducts

    if (query) {
      const q = query.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.colorway.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }

    if (filters.brands.length > 0) result = result.filter(p => filters.brands.includes(p.brand))
    if (filters.conditions.length > 0) result = result.filter(p => filters.conditions.includes(p.condition))
    if (filters.colors.length > 0) result = result.filter(p => filters.colors.some(c => p.colorway.toLowerCase().includes(c.toLowerCase())))
    if (filters.genders.length > 0) result = result.filter(p => filters.genders.includes(p.gender))

    if (filters.sizes.length > 0) {
      result = result.filter(p =>
        filters.sizes.some(sz => p.size_us.includes(sz) && (p.stock[sz] ?? 0) > 0)
      )
    }

    result = result.filter(p => p.price_pkr >= filters.minPrice && p.price_pkr <= filters.maxPrice)

    if (filters.inStockOnly) {
      result = result.filter(p => Object.values(p.stock).reduce((a, b) => a + b, 0) > 0)
    }

    // Sort
    if (filters.sortBy === 'newest') result = [...result].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
    else if (filters.sortBy === 'price-asc') result = [...result].sort((a, b) => a.price_pkr - b.price_pkr)
    else if (filters.sortBy === 'price-desc') result = [...result].sort((a, b) => b.price_pkr - a.price_pkr)

    return result
  }, [filters, query])

  const Sidebar = () => (
    <div style={{
      width: 280,
      flexShrink: 0,
      position: 'sticky',
      top: 88,
      height: 'fit-content',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: 3 }}>FILTERS</h2>
        <button
          onClick={() => setFilters({ brands: [], sizes: [], conditions: [], minPrice: 0, maxPrice: 50000, colors: [], genders: [], inStockOnly: false, sortBy: filters.sortBy })}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-mono)' }}
        >
          CLEAR ALL
        </button>
      </div>

      {/* Brand */}
      <FilterSection title="BRAND">
        {BRANDS.map(b => (
          <FilterCheck key={b} label={b} checked={filters.brands.includes(b)} onChange={() => toggleFilter('brands', b)} />
        ))}
      </FilterSection>

      {/* Condition */}
      <FilterSection title="CONDITION">
        {CONDITIONS.map(c => (
          <FilterCheck key={c} label={c} checked={filters.conditions.includes(c)} onChange={() => toggleFilter('conditions', c)} />
        ))}
      </FilterSection>

      {/* Size */}
      <FilterSection title="SIZE (US)">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SIZES.map(sz => (
            <button
              key={sz}
              onClick={() => toggleFilter('sizes', sz)}
              style={{
                padding: '6px 12px',
                border: `1px solid ${filters.sizes.includes(sz) ? 'var(--red)' : 'var(--border)'}`,
                borderRadius: 4,
                background: filters.sizes.includes(sz) ? 'rgba(204,0,0,0.1)' : 'none',
                color: filters.sizes.includes(sz) ? 'var(--red)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {sz}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* In stock only */}
      <FilterSection title="STOCK">
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
            style={{ accentColor: 'var(--red)', width: 14, height: 14 }}
          />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)' }}>
            In Stock Only
          </span>
        </label>
      </FilterSection>
    </div>
  )

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        {/* Drops countdown */}
        {isDropsMode && (
          <div style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            padding: '48px 48px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              letterSpacing: 4,
              color: 'var(--text-muted)',
              marginBottom: 16,
            }}>
              NEXT DROP IN
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Countdown targetDate={nextDropDate} />
            </div>
          </div>
        )}

        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 48px' }}>
          {/* Page title */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 6vw, 80px)',
            letterSpacing: 4,
            marginBottom: 8,
          }}>
            {isDropsMode ? 'LATEST DROPS' : query ? `"${query}"` : 'ALL KICKS'}
          </h1>

          {/* Active filter chips */}
          {activeFilterChips.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {activeFilterChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (chip.key === 'inStockOnly') setFilters(prev => ({ ...prev, inStockOnly: false }))
                    else toggleFilter(chip.key, chip.val)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 10px',
                    background: 'rgba(204,0,0,0.1)',
                    border: '1px solid rgba(204,0,0,0.3)',
                    borderRadius: 20,
                    color: 'var(--red)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {chip.label} <FiX size={10} />
                </button>
              ))}
            </div>
          )}

          {/* Sort & view controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 32,
            paddingBottom: 16,
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
              {filteredProducts.length} RESULTS
            </span>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <select
                value={filters.sortBy}
                onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 6,
                  padding: '8px 12px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="newest">NEWEST</option>
                <option value="price-asc">PRICE: LOW → HIGH</option>
                <option value="price-desc">PRICE: HIGH → LOW</option>
              </select>
              <button
                onClick={() => setViewMode('grid')}
                style={{ background: 'none', border: 'none', color: viewMode === 'grid' ? 'var(--red)' : 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{ background: 'none', border: 'none', color: viewMode === 'list' ? 'var(--red)' : 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
              >
                <FiList size={18} />
              </button>
              <button
                onClick={() => setSidebarOpen(s => !s)}
                style={{ display: 'none', background: 'none', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px 10px' }}
                className="filter-toggle-btn"
              >
                <FiSliders size={16} />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
            {/* Sidebar */}
            <div className="sidebar-wrapper">
              <Sidebar />
            </div>

            {/* Grid */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {filteredProducts.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 400,
                  gap: 16,
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ fontSize: 64 }}>👟</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: 3 }}>
                    NO KICKS FOUND
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
                    gap: 24,
                    marginBottom: 40,
                  }}>
                    {filteredProducts.slice(0, visibleCount).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {visibleCount < filteredProducts.length && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button
                        onClick={() => setVisibleCount(n => n + 12)}
                        className="btn-ghost"
                      >
                        LOAD MORE ({filteredProducts.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .sidebar-wrapper { display: none; }
          .filter-toggle-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function FilterSection({ title, children }) {
  return (
    <div>
      <h3 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: 3,
        color: 'var(--text-muted)',
        marginBottom: 12,
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </div>
  )
}

function FilterCheck({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: 'var(--red)', width: 14, height: 14 }}
      />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: checked ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
        {label}
      </span>
    </label>
  )
}
