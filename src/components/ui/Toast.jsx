// src/components/ui/Toast.jsx
import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { FiCheck, FiHeart, FiX, FiInfo } from 'react-icons/fi'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const icons = {
    success: <FiCheck size={16} />,
    favorite: <FiHeart size={16} />,
    info: <FiInfo size={16} />,
    error: <FiX size={16} />,
  }

  const colors = {
    success: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', color: '#22C55E' },
    favorite: { bg: 'rgba(201,168,76,0.15)', border: 'rgba(201,168,76,0.3)', color: 'var(--gold)' },
    info: { bg: 'var(--surface-2)', border: 'var(--border)', color: 'var(--text-secondary)' },
    error: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', color: 'var(--danger)' },
  }

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{
        position: 'fixed',
        top: 88,
        right: 24,
        zIndex: 99000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        {toasts.map(toast => {
          const c = colors[toast.type] || colors.info
          return (
            <div
              key={toast.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: c.bg,
                border: `1px solid ${c.border}`,
                backdropFilter: 'blur(20px)',
                borderRadius: 8,
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                minWidth: 240,
                animation: 'toast-in 0.3s ease-out forwards',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{ color: c.color }}>{icons[toast.type]}</span>
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                <FiX size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
