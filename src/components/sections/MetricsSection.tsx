import { Zap, FolderOpen, Rocket, CheckCircle, Target } from 'lucide-react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { AnimatedCounter } from '../ui/AnimatedCounter'

const metrics = [
  {
    value: '2h',
    label: 'tempo reduzido para',
    newValue: '30s',
    newLabel: 'por busca',
    icon: <Zap className="h-12 w-12 text-cyan-400" />,
    description: 'De horas procurando no Drive para segundos com busca inteligente'
  },
  {
    value: '0',
    label: 'arquivos perdidos',
    newValue: '100%',
    newLabel: 'organizados',
    icon: <FolderOpen className="h-12 w-12 text-cyan-400" />,
    description: 'Tagueamento obrigatório antes do upload elimina bagunça'
  },
  {
    value: '3x',
    label: 'mais rápido que',
    newValue: 'Drive',
    newLabel: 'enterprise',
    icon: <Rocket className="h-12 w-12 text-cyan-400" />,
    description: 'Simplicidade de usar sem curva de aprendizado'
  },
]

export default function MetricsSection() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.15 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-b from-dark-900 to-dark-800 px-4 py-24 sm:px-6 lg:px-8">
      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Resultados reais
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Economize tempo. <span className="text-cyan-300">Elimine o caos.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Veja como o DAMazing transforma o dia a dia de agências, marcas e e-commerces
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-6">{metric.icon}</div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-red-400 line-through decoration-2 decoration-red-400/50">
                  {metric.value}
                </span>
                <span className="text-2xl text-zinc-400">{metric.label}</span>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="text-3xl font-bold text-cyan-400">
                  {metric.newValue}
                </span>
                <span className="text-lg text-cyan-300">{metric.newLabel}</span>
              </div>

              <p className="mt-6 text-sm leading-6 text-zinc-400">
                {metric.description}
              </p>

              {/* Highlight on hover */}
              <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-16 rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Zero onboarding</p>
                <p className="text-sm text-zinc-400">Comece a usar em 5 minutos</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">20-25% mais rápido</p>
                <p className="text-sm text-zinc-400">Que encontrar arquivos no Drive</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                <Target className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Foco em agilidade e resultado</p>
                <p className="text-sm text-zinc-400">Criado para agências e e-commerce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
