// src/hooks/useScrollReveal.js
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.from(el, {
          y: options.y ?? 50,
          opacity: 0,
          duration: options.duration ?? 1,
          ease: options.ease ?? 'power3.out',
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [selector])
}
