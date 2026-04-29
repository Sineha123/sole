// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '0 48px',
      textAlign: 'center',
      gap: 20,
    }}>
      <div style={{ fontSize: 80, marginBottom: 8 }}>👟</div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--red)' }}>
        ERROR 404
      </p>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(56px, 8vw, 96px)',
        letterSpacing: 4,
        lineHeight: 0.9,
      }}>
        PAGE NOT<br />FOUND
      </h1>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 16,
        color: 'var(--text-secondary)',
        maxWidth: 400,
        lineHeight: 1.7,
      }}>
        Looks like this sole went missing. Let's get you back to the collection.
      </p>
      <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
        <Link to="/" className="btn-primary"><span>GO HOME →</span></Link>
        <Link to="/products" className="btn-ghost">SHOP KICKS</Link>
      </div>
    </main>
  )
}
