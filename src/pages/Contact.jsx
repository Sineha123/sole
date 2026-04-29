// src/pages/Contact.jsx
import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiInstagram } from 'react-icons/fi'
import Footer from '../components/layout/Footer'
import { useToast } from '../components/ui/Toast'

const SUBJECTS = ['General Inquiry', 'Order Issue', 'Sell To Us', 'Partnership', 'Other']

export default function Contact() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // simulated delay
    setLoading(false)
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' })
    toast("Message received! We'll reply within 24hrs ✓", 'success')
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--surface-2)',
    border: '1px solid var(--border)',
    borderRadius: 6,
    padding: '14px 16px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <>
      <main style={{ paddingTop: 72, minHeight: '100vh' }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="contact-grid">
          {/* Left */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 4, color: 'var(--red)', marginBottom: 8 }}>
              GET IN TOUCH
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 7vw, 96px)',
              letterSpacing: 4,
              lineHeight: 0.9,
              marginBottom: 40,
            }}>
              LET'S<br />TALK
              <span style={{ color: 'var(--red)' }}>.</span>
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { Icon: FiMapPin, label: 'Karachi, Pakistan' },
                { Icon: FiPhone, label: '+92 300 123 4567 (WhatsApp)' },
                { Icon: FiMail, label: 'hello@solekarachi.pk' },
                { Icon: FiInstagram, label: '@solekarachi' },
              ].map(({ Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color="var(--red)" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>NAME</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>EMAIL</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--red)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>SUBJECT</label>
              <select
                value={form.subject}
                onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                style={{ ...inputStyle, cursor: 'pointer' }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              >
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>MESSAGE</label>
              <textarea
                required
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', minHeight: 150 }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: loading ? 0.7 : 1,
              }}
            >
              <span>{loading ? 'SENDING...' : 'SEND MESSAGE →'}</span>
            </button>
          </form>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 800px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  )
}
