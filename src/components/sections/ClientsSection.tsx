import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

// Nomes de clientes fictícios para demonstração
const clients = [
  { name: 'Agência Zóio', logo: 'AZ' },
  { name: 'FA Studio', logo: 'FA' },
  { name: 'Atlas Fashion', logo: 'AF' },
  { name: 'Moda Fit', logo: 'MF' },
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
              className="flex flex-col items-center gap-2 transition-opacity hover:opacity-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-sm font-bold text-zinc-400 ring-1 ring-white/10">
                {client.logo}
              </div>
              <span className="text-xs text-zinc-600">{client.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Usado por <strong className="text-zinc-300">300+</strong> agências</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span><strong className="text-zinc-300">50.000+</strong> arquivos organizados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span><strong className="text-zinc-300">99.9%</strong> uptime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
