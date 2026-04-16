import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

// Nomes de clientes fictícios para demonstração
const clients = [
  { name: 'Agência Zóio', logo: 'AZ' },
  { name: 'FA Studio', logo: 'FA' },
  { name: 'Atlas Fashion', logo: 'AF' },
  { name: 'Marca Fit', logo: 'MF' },
  { name: 'Studio 42', logo: 'S42' },
  { name: 'Lumina Look', logo: 'LL' },
  { name: 'Click Models', logo: 'CM' },
  { name: 'Vogue Commerce', logo: 'VC' },
]

export default function ClientsSection() {
  const sectionRef = useGsapReveal<HTMLElement>()
  const logosRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logos entram com fade in sutil
      gsap.fromTo(logosRef.current?.children ?? [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 0.6,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: logosRef.current,
            start: 'top 85%',
            once: true
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-white/5 bg-dark-900/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Usado por mais de 300 agências e e-commerces
        </p>

        <div ref={logosRef} className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-sm font-bold text-zinc-400 ring-1 ring-white/10 transition-opacity hover:opacity-100"
            >
              {client.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
