import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap.config'
import { Button } from '../ui/Button'

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título com scale dramático
      gsap.fromTo(titleRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'back.out(1.3)',
          scrollTrigger: {
            trigger: titleRef.current,
            once: true
          }
        }
      )

      // Subtítulo
      gsap.fromTo(subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            once: true
          }
        }
      )

      // Features em cascade
      gsap.fromTo(featuresRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            once: true
          }
        }
      )

      // Botão com pulso suave
      gsap.to(buttonRef.current, {
        boxShadow: '0 0 50px rgba(6,182,212,0.6)',
        repeat: -1,
        yoyo: true,
        duration: 2.2,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="agencias" ref={sectionRef} className="relative overflow-hidden px-4 py-28 sm:px-6 lg:px-8">
      {/* Background com gradiente radial intenso */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.35),rgba(2,11,20,0.85)_60%,#020b14_100%)]" />

      {/* Glow effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 ref={titleRef} className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Moda, agência ou foto freelancer:
          <br />
          <span className="mt-4 block bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
            ache o asset certo antes do briefing virar incêndio.
          </span>
        </h2>

        <p ref={subtitleRef} className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-200">
          Sem implantação longa. Sem planilha de licença. Sem IMG001 perdido no Drive.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button ref={buttonRef} href="mailto:contato@cenouradigital.com.br" size="lg">
            Solicitar Demo <ArrowRight size={20} />
          </Button>
          <Button href="#faq" variant="ghost" size="lg">
            ou Falar com um especialista
          </Button>
        </div>

        <div ref={featuresRef} className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-zinc-200">
          {['Zero onboarding', 'Add-ons sem upgrade', 'Controle de licença incluso'].map((item) => (
            <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2.5 backdrop-blur-sm transition-colors hover:bg-cyan-500/10">
              <CheckCircle2 size={18} className="text-cyan-400" /> {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

