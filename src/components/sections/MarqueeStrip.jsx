// src/components/sections/MarqueeStrip.jsx

const items = ['SOLE', 'THRIFT ROYALTY', 'RARE KICKS', 'DEADSTOCK FINDS', 'EST. 2024', 'KARACHI BORN', 'VERIFIED PAIRS', 'PREMIUM THRIFT']

export default function MarqueeStrip() {
  const content = [...items, ...items] // double for seamless loop

  return (
    <div className="marquee-wrapper" style={{
      overflow: 'hidden',
      background: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
    }}>
      <div className="marquee-track" style={{ display: 'flex', gap: 0 }}>
        {content.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              letterSpacing: 4,
              color: 'var(--text-muted)',
              whiteSpace: 'nowrap',
              padding: '0 20px',
            }}>
              {item}
            </span>
            <span style={{
              color: 'var(--red)',
              fontSize: 12,
              flexShrink: 0,
            }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
