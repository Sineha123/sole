// src/components/ui/ChatBotWidget.jsx
// Curated Brand Assistant for SOLE (Enlarged, Highly Readable, Instant Response)
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiMinimize2, FiMaximize2, FiRotateCcw } from 'react-icons/fi'
import { BsChatDotsFill } from 'react-icons/bs'
import { queryKnowledgeBase, stripEmojis } from '../../data/soleKnowledgeEngine'

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello! Welcome to **SOLE** — *Walk Your Story*.\n\nI am your official brand assistant, ready to help with shoes, sizing, orders, delivery, and current voucher offers. How can I help you today?",
  sources: [{ title: 'Section 1: Brand Overview', category: 'Official Store Guide' }],
  suggestions: [
    'Available vouchers & discounts',
    'Urban Runner prices & colors',
    'Delivery time & shipping rates',
    '7-day Return & Exchange policy',
    'Sizing & fit guide',
    'Store locations in Pakistan'
  ]
}

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen, messages, loading, isExpanded])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Direct Store Guide Query Resolution (Instant & Curated)
  const handleSend = (queryOverride) => {
    const text = (queryOverride || input).trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const updatedHistory = [...messages, userMessage]
    setMessages(updatedHistory)
    setInput('')
    setLoading(true)

    // Natural brief thinking delay (250ms) for pleasant UI feedback
    setTimeout(() => {
      const result = queryKnowledgeBase(text)
      setMessages([
        ...updatedHistory,
        {
          role: 'assistant',
          content: stripEmojis(result.reply),
          sources: result.sources || [],
          suggestions: (result.suggestions || []).map(s => stripEmojis(s))
        }
      ])
      setLoading(false)
    }, 280)
  }

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE])
    setInput('')
  }

  // Enhanced Markdown & Table Formatter with Enlarged Readable Typography
  const renderFormatted = (text) => {
    if (!text) return null
    const cleanedText = stripEmojis(text)

    // Check for markdown table
    if (cleanedText.includes('|') && cleanedText.includes('---')) {
      const lines = cleanedText.split('\n')
      const tableLines = []
      const regularLinesBefore = []
      const regularLinesAfter = []
      let inTable = false

      lines.forEach(l => {
        if (l.trim().startsWith('|')) {
          inTable = true
          tableLines.push(l)
        } else if (inTable) {
          regularLinesAfter.push(l)
        } else {
          regularLinesBefore.push(l)
        }
      })

      if (tableLines.length >= 3) {
        const headerRow = tableLines[0].split('|').map(c => c.trim()).filter(Boolean)
        const dataRows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter(Boolean))

        return (
          <>
            {regularLinesBefore.length > 0 && renderSimpleLines(regularLinesBefore.join('\n'))}
            <div style={{ overflowX: 'auto', margin: '14px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.08)' }}>
                    {headerRow.map((h, i) => (
                      <th key={i} style={{ padding: '8px 12px', color: '#ff9494', fontWeight: 700 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={{ padding: '8px 12px', color: '#e5e5ea' }}>
                          <span dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {regularLinesAfter.length > 0 && renderSimpleLines(regularLinesAfter.join('\n'))}
          </>
        )
      }
    }

    return renderSimpleLines(cleanedText)
  }

  const formatInline = (str) => {
    if (!str) return ''
    let parsed = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>')
    parsed = parsed.replace(/`([^`]+)`/g, '<code style="background:rgba(204,0,0,0.25);color:#ff9494;padding:3px 7px;border-radius:5px;font-size:14px;font-weight:600;">$1</code>')
    // Clickable links for email and WhatsApp
    parsed = parsed.replace(/support@soleofficial\.pk/g, '<a href="mailto:support@soleofficial.pk" style="color:#ff9494;text-decoration:underline;" target="_blank">support@soleofficial.pk</a>')
    parsed = parsed.replace(/\+92\s*300\s*SOLE\s*PK(\s*\([0-9\s]+\))?/gi, '<a href="https://wa.me/92300765375" style="color:#22c55e;text-decoration:underline;font-weight:600;" target="_blank">+92 300 SOLE PK (WhatsApp)</a>')
    // Markdown links [label](url)
    parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#ff9494;text-decoration:underline;" target="_blank">$1</a>')
    return parsed
  }

  const renderSimpleLines = (raw) => {
    return raw
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <span key={idx} style={{ display: 'block', minHeight: 10, marginBottom: 4 }} />
        }

        // Heading 4
        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={idx}
              style={{ fontSize: 19, fontWeight: 700, color: '#fff', margin: '12px 0 6px', letterSpacing: 0.3 }}
              dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(4).trim()) }}
            />
          )
        }

        // List item: matches '*', '-', '•' with any indentation
        const isBullet = /^[\*\-•]\s+/.test(trimmed)
        const content = isBullet ? trimmed.replace(/^[\*\-•]\s+/, '') : trimmed
        const parsed = formatInline(content)

        if (isBullet) {
          return (
            <li
              key={idx}
              style={{ marginLeft: 22, marginBottom: 7, fontSize: 16.5, lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: parsed }}
            />
          )
        }

        return (
          <span
            key={idx}
            style={{ display: 'block', minHeight: line === '' ? 12 : undefined, marginBottom: 6, lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: parsed }}
          />
        )
      })
  }

  return (
    <>
      {/* FLOATING BOT BUTTON (Bottom-Right Corner - EXTRA LARGE & BOLD) */}
      <div
        className="chatbot-scope"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 99999,
          pointerEvents: 'auto'
        }}
      >
        <motion.button
          className="chatbot-scope"
          onClick={() => setIsOpen(prev => !prev)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'relative',
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #e60000 0%, #990000 100%)',
            color: '#ffffff',
            border: '3px solid rgba(255, 255, 255, 0.35)',
            boxShadow: '0 12px 40px rgba(204, 0, 0, 0.65), 0 0 30px rgba(204, 0, 0, 0.45)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            padding: 0
          }}
          aria-label="Toggle SOLE Brand Chatbot"
        >
          {/* Pulsing Glow Ring */}
          <span
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: '2.5px solid #CC0000',
              opacity: 0.85,
              animation: 'ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Green Online Status Dot (Enlarged) */}
          <span
            style={{
              position: 'absolute',
              top: 3,
              right: 3,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: '#22c55e',
              border: '3.5px solid #121214',
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.85)'
            }}
          />

          {/* Chat Bubble Icon / Close Icon */}
          {isOpen ? (
            <FiX size={36} color="#fff" />
          ) : (
            <BsChatDotsFill
              size={36}
              color="#ffffff"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
            />
          )}
        </motion.button>
      </div>

      {/* CHATBOT POPUP WINDOW (Bottom-Right Corner - EXTRA LARGE & SPACIOUS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-scope"
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 124,
              right: 28,
              zIndex: 99999,
              width: isExpanded ? 800 : 560,
              maxWidth: 'calc(100vw - 36px)',
              height: isExpanded ? 'calc(100vh - 150px)' : 760,
              maxHeight: 'calc(100vh - 145px)',
              background: '#121214',
              borderRadius: 24,
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(204, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'var(--font-body, -apple-system, sans-serif)',
              color: '#f5f5f7',
              transition: 'width 0.25s ease, height 0.25s ease'
            }}
          >
            {/* Header (Extra Large) */}
            <div
              style={{
                padding: '20px 24px',
                background: '#1a1a1f',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #CC0000, #800000)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 26,
                    fontFamily: 'var(--font-display, sans-serif)',
                    letterSpacing: 1.5,
                    boxShadow: '0 4px 14px rgba(204,0,0,0.5)'
                  }}
                >
                  S
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ color: '#fff', fontSize: 18.5, fontWeight: 700, letterSpacing: 0.3 }}>
                      SOLE AI Assistant
                    </span>
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        background: '#22c55e',
                        boxShadow: '0 0 8px #22c55e'
                      }}
                    />
                  </div>
                  <span style={{ color: '#a0a0a8', fontSize: 14 }}>
                    Official Store Assistant (Instant)
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {/* Reset Chat Button */}
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a0a0a8',
                    cursor: 'pointer',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 8,
                    transition: 'color 0.15s, background 0.15s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#a0a0a8'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <FiRotateCcw size={19} />
                </button>

                {/* Expand / Minimize Window Size Toggle */}
                <button
                  onClick={() => setIsExpanded(prev => !prev)}
                  title={isExpanded ? 'Restore window size' : 'Expand window'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a0a0a8',
                    cursor: 'pointer',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 8,
                    transition: 'color 0.15s, background 0.15s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#a0a0a8'
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {isExpanded ? <FiMinimize2 size={19} /> : <FiMaximize2 size={19} />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#a0a0a8',
                    cursor: 'pointer',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 8,
                    transition: 'color 0.15s, background 0.15s'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#fff'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#a0a0a8'
                    e.currentTarget.style.background = 'transparent'
                  }}
                  aria-label="Close chat"
                >
                  <FiX size={22} />
                </button>
              </div>
            </div>

            {/* Chat Messages Body (Spacious & Highly Readable) */}
            <div
              style={{
                flex: 1,
                padding: 24,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                background: '#121214'
              }}
            >
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%'
                  }}
                >
                  <div
                    style={{
                      padding: '16px 22px',
                      borderRadius: 18,
                      fontSize: 16.5,
                      lineHeight: 1.65,
                      wordBreak: 'break-word',
                      background: m.role === 'user' ? '#CC0000' : '#222227',
                      color: m.role === 'user' ? '#ffffff' : '#f0f0f3',
                      border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.09)',
                      borderBottomRightRadius: m.role === 'user' ? 4 : 18,
                      borderBottomLeftRadius: m.role === 'assistant' ? 4 : 18,
                      boxShadow: m.role === 'user' ? '0 4px 12px rgba(204,0,0,0.4)' : '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {renderFormatted(m.content)}

                    {/* Sources Badge */}
                    {m.sources && m.sources.length > 0 && (
                      <div
                        style={{
                          marginTop: 12,
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6
                        }}
                      >
                        {m.sources.map((src, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: 12.5,
                              padding: '4px 11px',
                              borderRadius: 12,
                              background: 'rgba(255,255,255,0.1)',
                              color: '#c0c0c8',
                              border: '1px solid rgba(255,255,255,0.08)'
                            }}
                          >
                            {src.title}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Contextual Follow-Up Suggestions for this Answer */}
                  {m.role === 'assistant' && m.suggestions && m.suggestions.length > 0 && idx === messages.length - 1 && (
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginTop: 10
                      }}
                    >
                      {m.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSend(sug)}
                          style={{
                            background: 'rgba(204, 0, 0, 0.1)',
                            border: '1px solid rgba(204, 0, 0, 0.3)',
                            color: '#ff9c9c',
                            padding: '10px 18px',
                            borderRadius: 22,
                            fontSize: 14.5,
                            fontWeight: 500,
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(204, 0, 0, 0.25)'
                            e.currentTarget.style.color = '#ffffff'
                            e.currentTarget.style.borderColor = '#CC0000'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(204, 0, 0, 0.1)'
                            e.currentTarget.style.color = '#ff9c9c'
                            e.currentTarget.style.borderColor = 'rgba(204, 0, 0, 0.3)'
                          }}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing / Loading Indicator */}
              {loading && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    background: '#222227',
                    border: '1px solid rgba(255,255,255,0.09)',
                    padding: '12px 18px',
                    borderRadius: 16,
                    fontSize: 15,
                    color: '#bbb',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#CC0000',
                      animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
                    }}
                  />
                  <span>Retrieving details from SOLE store directory...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer (Extra Large) */}
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSend()
              }}
              style={{
                padding: '18px 22px',
                background: '#1a1a1f',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about shoes, sizes, delivery, returns..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: '#242429',
                  border: '1.5px solid rgba(255,255,255,0.14)',
                  borderRadius: 28,
                  padding: '14px 22px',
                  color: '#fff',
                  fontSize: 16,
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: '#CC0000',
                  border: 'none',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !input.trim() ? 0.35 : 1,
                  transition: 'opacity 0.2s, transform 0.15s',
                  boxShadow: '0 3px 10px rgba(204,0,0,0.35)'
                }}
                aria-label="Send message"
              >
                <FiSend size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
