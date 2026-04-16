import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'

interface AnimatedCounterProps {
  value: number
  suffix?: string
}

export function AnimatedCounter({ value, suffix = '' }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const counter = { value: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => setDisplay(Math.round(counter.value)),
        scrollTrigger: {
          trigger: ref.current,
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
