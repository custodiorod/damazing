import { Clock, Copy, ShieldAlert, Users } from 'lucide-react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { Badge } from '../ui/Badge'
import { FeatureCard } from '../ui/FeatureCard'

const features = [
  {
    icon: <Clock size={24} />,
    title: 'Perda de Tempo na Busca',
    description: 'Horas desperdiçadas procurando aquele arquivo certo em pastas e subpastas intermináveis.',
  },
  {
    icon: <Copy size={24} />,
    title: 'Arquivos Duplicados',
    description: 'Múltiplas versões do mesmo arquivo espalhadas por diferentes ferramentas e pastas.',
  },
  {
    icon: <ShieldAlert size={24} />,
    title: 'Risco de Perda de Ativos',
    description: 'Arquivos importantes que se perdem entre ferramentas de captação e processos internos.',
  },
  {
    icon: <Users size={24} />,
    title: 'Dificuldade de Colaboração',
    description: 'Times desalinhados, compartilhamento caótico e sem controle de quem acessa o que.',
  },
]

export default function SecuritySection() {
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.16 })

  return (
    <section id="problema" ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(6,182,212,0.18),transparent_38%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <Badge>O Problema</Badge>
          <h2 className="mt-5 font-display text-4xl font-bold text-white sm:text-5xl">Muito mais do que armazenamento —<br />é gestão inteligente de mídias</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">Pastas e mais pastas perdidas num drive comum — mude hoje para o DAMazing</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
