import { Quote, Star } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const testimonials = [
  {
    quote: "A DAMazing transformou nossa organização. Antes, passávamos 2 horas por semana procurando arquivos no Drive. Agora, achamos tudo em 30 segundos.",
    author: "Marina Costa",
    role: "Diretora de Arte",
    company: "Agência Zóio",
    metrics: "2h → 30s por busca"
  },
  {
    quote: "Finalmente consigo compartilhar as fotos do shooting com o cliente sem enviar 47 arquivos no WhatsApp. Eles conseguem baixar o que precisam, quando precisam.",
    author: "Felipe Augusto",
    role: "Photographer & Director",
    company: "FA Studio",
    metrics: "Zero WhatsApp pesado"
  },
  {
    quote: "O tagging obrigatório antes do upload foi um game changer. Ninguém mais sobe 'IMG001_FINAL_v3.jpg'. A organização acontece sozinha.",
    author: "Juliana Mendes",
    role: "Gerente de Tráfego",
    company: "E-commerce de Moda",
    metrics: "100% dos arquivos nomeados corretamente"
  }
]

export default function TestimonialsSection() {
  const sectionRef = useGsapReveal<HTMLElement>({ stagger: 0.15 })
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entram em cascade
      gsap.fromTo(cardsRef.current?.children ?? [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.2,
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
    <section ref={sectionRef} className="relative bg-dark-900 px-4 py-24 sm:px-6 lg:px-8">
      {/* Background com gradiente sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Cases de sucesso
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            O que dizem quem <span className="text-cyan-300">saiu do caos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Mais de 300 agências e e-commerces já transformaram sua organização de arquivos
          </p>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Estrelas */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <div className="mt-6 relative">
                <Quote className="absolute -left-2 -top-2 h-8 w-8 text-cyan-500/20" size={32} />
                <p className="relative pl-6 leading-7 text-zinc-200">
                  {testimonial.quote}
                </p>
              </div>

              {/* Metrics badge */}
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                {testimonial.metrics}
              </div>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-lg font-bold text-white">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-zinc-400">{testimonial.role}</p>
                  <p className="text-xs text-cyan-400/80">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm"><strong className="text-white">300+</strong> agências ativas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm"><strong className="text-white">50.000+</strong> arquivos organizados</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm"><strong className="text-white">99.9%</strong> uptime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
