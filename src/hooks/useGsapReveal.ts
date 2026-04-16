import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.config'

interface RevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: number
  delay?: number
  duration?: number
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const { direction = 'up', stagger = 0.1, delay = 0, duration = 0.8 } = options

  useEffect(() => {
    if (!ref.current) return

    const children = ref.current.children.length > 0 ? Array.from(ref.current.children) : [ref.current]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
          x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            once: true,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [delay, direction, duration, stagger])

  return ref
}
