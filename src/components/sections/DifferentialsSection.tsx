import { BarChart3, CalendarClock, MessageSquareText, PackagePlus, Rocket } from 'lucide-react'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const differentials = [
  {
    icon: CalendarClock,
    title: 'Licença com validade',
    description: 'Foto com contrato de 6 meses? A DAMazing avisa, expira e bloqueia o uso automaticamente no vencimento.',
  },
  {
    icon: BarChart3,
    title: 'Analytics de assets',
    description: 'Veja arquivos nunca usados, downloads por asset e frequência de uso por campanha, cliente ou coleção.',
  },
  {
    icon: PackagePlus,
    title: 'Add-ons sem upgrade',
    description: 'Precisa de mais créditos de IA ou armazenamento por um shooting maior? Compre o extra sem subir de plano.',
  },
  {
    icon: Rocket,
    title: 'Zero onboarding',
    description: 'Sem implantação enterprise, sem reunião de negociação e sem semanas para começar. Entrou, organizou.',
  },
  {
    icon: MessageSquareText,
    title: 'Tom humano',
    description: 'Mensagens de erro com humor e clareza. O produto ajuda sem falar como manual técnico.',
  },
]

export default function DifferentialsSection() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.1 })

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(6,182,212,0.16),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-semibold uppercase tracking-[0.3em] text-brand-300">Diferenciais</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Não é só guardar arquivo. É impedir que ele vire problema.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            DAM enterprise costuma ser pesado. A DAMazing foca no que Agências, Marcas, E-commerces e fotógrafos precisam no dia da campanha.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {differentials.map((item) => {
            const Icon = item.icon
            return (
              <article key={item.title} className="rounded-lg border border-white/10 bg-dark-800 p-6 transition hover:-translate-y-1 hover:border-brand-400/50">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/15 text-brand-200">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
