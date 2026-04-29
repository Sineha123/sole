// src/components/ui/Badge.jsx

export default function Badge({ type }) {
  const configs = {
    DS: { label: 'DEADSTOCK', bg: 'var(--gold)', color: '#000' },
    VNDS: { label: 'NEAR DS', bg: 'rgba(34,197,94,0.15)', color: 'var(--success)', border: '1px solid rgba(34,197,94,0.3)' },
    Used: { label: 'USED', bg: 'var(--surface-3)', color: 'var(--text-secondary)' },
    RARE: { label: '⭑ RARE', bg: 'var(--gold)', color: '#000' },
    'LOW STOCK': { label: '⚠ LOW STOCK', bg: 'rgba(245,158,11,0.15)', color: 'var(--warning)', border: '1px solid rgba(245,158,11,0.3)' },
    'SOLD OUT': { label: 'SOLD OUT', bg: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)' },
  }

  const config = configs[type] || { label: type, bg: 'var(--surface-3)', color: 'var(--text-secondary)' }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 8px',
      borderRadius: 3,
      background: config.bg,
      color: config.color,
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 1.5,
      border: config.border || 'none',
      whiteSpace: 'nowrap',
    }}>
      {config.label}
    </span>
  )
}
