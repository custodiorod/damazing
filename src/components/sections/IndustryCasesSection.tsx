import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { Shirt, ShoppingBag, Camera } from 'lucide-react'

const industries = [
  {
    icon: Shirt,
    title: 'Moda Feminina',
    cases: [
      'Coleção de 150 fotos organizada em 5 minutos',
      'Controle de validade de licença por look',
      'Compartilhe com equipe de marketing em 1 clique'
    ],
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce de Moda',
    cases: [
      'Integração com Shopify e Vtex',
      'Upload em massa para campanhas sazonais',
      'Busca por produto, coleção ou modelo'
    ],
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: Camera,
    title: 'Agências & Fotógrafos',
    cases: [
      'Entrega organizada para o cliente',
      'Workflow aprovação → download automático',
      'Zero IMG001 perdido no Drive'
    ],
    color: 'from-violet-500/20 to-purple-500/20'
  }
]

export default function IndustryCasesSection() {
  const sectionRef = useGsapReveal<HTMLElement>({ stagger: 0.2 })
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entram com scale
      gsap.fromTo(cardsRef.current?.children ?? [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-dark-900 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Cases por Indústria
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Criado para <span className="text-cyan-300">moda, e-commerce e agências</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Cada setor tem necessidades específicas. DAMazing resolve os problemas reais do dia a dia.
          </p>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-3">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${industry.color} opacity-0 transition-opacity group-hover:opacity-100`} />

                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 ring-1 ring-cyan-500/30">
                    <Icon className="text-cyan-400" size={32} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    {industry.title}
                  </h3>

                  <ul className="mt-6 space-y-4">
                    {industry.cases.map((caseItem, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                          <svg className="h-3 w-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm leading-6 text-zinc-300">
                          {caseItem}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Callout bar */}
        <div className="mt-16 rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/30 to-blue-950/30 p-8 text-center">
          <p className="font-display text-2xl font-light text-white">
            Seu negócio é moda, e-commerce ou agência?
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-300">
            O DAMazing foi criado especificamente para resolver os problemas que você enfrenta todos os dias.
          </p>
        </div>
      </div>
    </section>
  )
}
