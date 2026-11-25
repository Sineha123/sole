// src/components/layout/Cursor.jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yTo = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })
    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.1 })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.1 })

    let isOverChatbot = false

    const move = (e) => {
      xTo(e.clientX - 30)
      yTo(e.clientY - 30)
      xDot(e.clientX - 5)
      yDot(e.clientY - 5)

      const overChatbot = !!(e.target && e.target.closest && e.target.closest('.chatbot-scope'))
      if (overChatbot !== isOverChatbot) {
        isOverChatbot = overChatbot
        if (isOverChatbot) {
          gsap.to([ring.current, dot.current], { opacity: 0, duration: 0.15, overwrite: 'auto' })
        } else {
          gsap.to([ring.current, dot.current], { opacity: 1, duration: 0.15, overwrite: 'auto' })
        }
      }
    }

    const enterProduct = () => {
      gsap.to(ring.current, { scale: 1.8, backgroundColor: 'var(--red)', duration: 0.3, opacity: 0.9 })
      gsap.to(label.current, { opacity: 1, duration: 0.2 })
      gsap.to(dot.current, { scale: 0, duration: 0.2 })
    }
    const leaveProduct = () => {
      gsap.to(ring.current, { scale: 1, backgroundColor: 'transparent', duration: 0.3, opacity: 1 })
      gsap.to(label.current, { opacity: 0, duration: 0.2 })
      gsap.to(dot.current, { scale: 1, duration: 0.2 })
    }

    const enterButton = () => {
      gsap.to(ring.current, { scale: 1.4, backgroundColor: 'var(--red)', duration: 0.3, opacity: 0.7 })
      gsap.to(dot.current, { scale: 0, duration: 0.2 })
    }
    const leaveButton = () => {
      gsap.to(ring.current, { scale: 1, backgroundColor: 'transparent', duration: 0.3, opacity: 1 })
      gsap.to(dot.current, { scale: 1, duration: 0.2 })
    }

    const onMouseDown = () => {
      gsap.to(ring.current, { scale: 0.8, duration: 0.1 })
    }
    const onMouseUp = () => {
      gsap.to(ring.current, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const attachListeners = () => {
      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseenter', enterProduct)
        el.addEventListener('mouseleave', leaveProduct)
      })
      document.querySelectorAll('button, a, [data-cursor="btn"]').forEach(el => {
        if (el.closest('.chatbot-scope')) return
        el.addEventListener('mouseenter', enterButton)
        el.addEventListener('mouseleave', leaveButton)
      })
    }

    // Initial attach + re-attach after DOM mutations
    attachListeners()
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Ring */}
      <div
        ref={ring}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
        }}
      >
        <span
          ref={label}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            letterSpacing: 2,
            opacity: 0,
            color: 'white',
            userSelect: 'none',
          }}
        >
          VIEW
        </span>
      </div>

      {/* Dot */}
      <div
        ref={dot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'var(--red)',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
    </>
  )
}
