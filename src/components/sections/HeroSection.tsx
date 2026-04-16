import { ArrowRight, Box, FileImage, Folder, Search, Sparkles, HardDrive, Brain, Share2, CloudOff } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const motionItems = [
  {
    icon: HardDrive,
    title: 'Não é só armazenar',
    description: 'O G Drive guarda arquivos. A DAMazing organiza, classifica e torna cada asset encontrável em segundos — por campanha, produto, modelo ou canal.',
  },
  {
    icon: Brain,
    title: 'Gestão inteligente de mídias',
    description: 'Tags obrigatórias, renomeação por IA e controle de licença transformam uma pasta bagunçada num acervo vivo, pesquisável e auditável.',
  },
  {
    icon: Share2,
    title: 'Coleções prontas para compartilhar',
    description: 'Gere links de coleção por cliente, campanha ou equipe. Sem precisar mover arquivo, duplicar pasta ou mandar zip pelo WhatsApp.',
  },
  {
    icon: CloudOff,
    title: 'G Drive não foi feito para isso',
    description: 'Sem controle de versão de asset, sem expiração de licença, sem tag por campanha. A DAMazing preenche exatamente o que o Drive deixa em branco.',
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const mockupRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const motionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const words = headlineRef.current?.querySelectorAll('.word') ?? []
    const particles = particlesRef.current?.children ?? []

    const ctx = gsap.context(() => {
      gsap.fromTo(badgeRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo(words,
        { y: 60, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      gsap.fromTo(subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1 }
      )

      gsap.fromTo(ctaRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: 'power3.out', delay: 1.2 }
      )

      gsap.to(meshRef.current, {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'none',
      })

      gsap.fromTo(particles,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 0.5, stagger: 0.15, duration: 1, ease: 'power2.out', delay: 0.6 }
      )

      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: `+=${10 + Math.random() * 15}`,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        })
      })

      // Motion items abaixo do notebook
      if (motionRef.current) {
        gsap.fromTo(motionRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: motionRef.current,
              start: 'top 85%',
            }
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const particles = [
    { left: '6%', top: '18%', Icon: Folder },
    { left: '20%', top: '64%', Icon: FileImage },
    { left: '33%', top: '28%', Icon: Box },
    { left: '58%', top: '18%', Icon: Folder },
    { left: '76%', top: '40%', Icon: FileImage },
    { left: '90%', top: '68%', Icon: Box },
    { left: '12%', top: '45%', Icon: Search },
    { left: '45%', top: '75%', Icon: Sparkles },
    { left: '68%', top: '55%', Icon: FileImage },
    { left: '82%', top: '25%', Icon: Folder },
  ]

  return (
    <section id="topo" ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      {/* Mesh gradient animado */}
      <div ref={meshRef} className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25),rgba(2,11,20,0)_70%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_45%)]" />

      {/* Partículas flutuantes */}
      <div ref={particlesRef} className="pointer-events-none absolute inset-0">
        {particles.map(({ Icon, ...particle }, index) => (
          <div key={index} className="absolute transition-opacity duration-500 hover:opacity-80" style={particle}>
            <div className="rounded-full bg-cyan-400/10 p-3 backdrop-blur-sm">
              <Icon size={24} className="text-cyan-400/50" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-5xl text-center">
        <div>
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Logo className="scale-125" />
          </div>

          {/* Badge — primeiro botão */}
          <div ref={badgeRef} className="mb-6 flex justify-center">
            <Badge glow>DAM para Agências, Marcas e E-commerces</Badge>
          </div>

          {/* Headline principal */}
          <h1 ref={headlineRef} className="font-display text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            <span className="word mr-3 inline-block">Chega</span>
            <span className="word mr-3 inline-block">de</span>
            <span className="word mr-3 inline-block text-cyan-300">caçar</span>
            <span className="word mr-3 inline-block">arquivo</span>
            <span className="word mr-3 inline-block">na</span>
            <span className="word mr-3 inline-block">véspera</span>
            <span className="word mr-3 inline-block">da</span>
            <span className="word inline-block">campanha.</span>
          </h1>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="#solucao" size="lg">
              Ver a DAMazing organizando <ArrowRight size={20} />
            </Button>
            <Button href="#planos" variant="outline" size="lg">
              Planos a partir de R$297
            </Button>
          </div>

          {/* Features badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 transition-colors hover:bg-white/10">
              <Search size={18} className="text-cyan-400" />
              Encontre qualquer asset em segundos
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 transition-colors hover:bg-white/10">
              <Sparkles size={18} className="text-cyan-400" />
              Zero onboarding pesado
            </span>
          </div>
        </div>

        {/* Notebook / Mockup */}
        <div ref={mockupRef} className="relative mt-4">
          <img
            src="/hero-mockup.png"
            alt="DAMazing dashboard"
            className="relative mx-auto w-full max-w-5xl"
          />
        </div>

        {/* Bloco de Sobre — Bloco 1 */}
        <div ref={subtitleRef} className="mx-auto mt-8 max-w-2xl rounded-xl border border-cyan-500/20 bg-cyan-950/20 px-6 py-4 backdrop-blur-sm">
          <p className="text-lg leading-relaxed text-zinc-200">
            O Canva democratizou o design.{' '}
            <span className="font-semibold text-cyan-300">A DAMazing democratiza o DAM</span>{' '}
            para agências, marcas, e-commerces e fotógrafos freelancers.
          </p>
        </div>

        {/* Motion abaixo do Notebook */}
        <div ref={motionRef} className="mt-10 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
          {motionItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/[0.08]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/15">
                  <Icon size={20} className="text-cyan-400" />
                </div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
