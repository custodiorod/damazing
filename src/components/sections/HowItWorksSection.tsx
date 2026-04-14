import { ArrowRight, Check } from 'lucide-react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { Button } from '../ui/Button'

function VideoPanel({ src }: { src: string }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30" style={{ backgroundColor: '#020B14' }}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="block w-full"
        style={{ margin: 0, padding: 0, display: 'block' }}
      />
    </div>
  )
}

const steps = [
  {
    number: '01',
    title: 'O fim da bagunça nos seus arquivos digitais',
    description:
      'Tenha uma visão completa do seu acervo desde o primeiro acesso. O dashboard da DAMazing mostra armazenamento, assets recentes e o estado da sua biblioteca em segundos.',
    features: [
      'Visão geral do acervo em tempo real',
      'Gráfico de armazenamento por tipo de arquivo',
      'Acesso rápido aos assets mais recentes',
    ],
    video: '/videos/clip-01-hook.mp4',
    reverse: false,
  },
  {
    number: '02',
    title: 'Organização personalizada com tags de marca, cor e estilo',
    description:
      'Crie seus próprios tipos de tag e estruture o acervo do jeito que faz sentido para o seu negócio. Cor, estilo, coleção, modelo — cada tag vira um filtro poderoso na busca.',
    features: [
      'Tipos de tag personalizados por projeto',
      'Tags de marca, cor, estilo e muito mais',
      'Estrutura que se adapta ao seu fluxo criativo',
    ],
    video: '/videos/clip-02-categorias.mp4',
    reverse: true,
  },
  {
    number: '03',
    title: 'Upload rápido e centralizado de todos os seus ativos',
    description:
      'Conecte seu Drive local e selecione os arquivos diretamente. A DAMazing importa tudo de uma vez, sem copiar manualmente pasta por pasta.',
    features: [
      'Importação direta do Drive local',
      'Upload em massa com seleção múltipla',
      'Todos os formatos aceitos: JPG, PNG, MP4, PDF e mais',
    ],
    video: '/videos/clip-03-drive.mp4',
    reverse: false,
  },
  {
    number: '04',
    title: 'O poder da IA automatizando o trabalho chato de tagueamento',
    description:
      'Com um clique, a Demi — IA da DAMazing — analisa suas imagens e sugere tags automaticamente. Chega de digitar nome por nome; ela reconhece produto, cor e contexto sozinha.',
    features: [
      'Sugestão automática de tags por IA',
      'Reconhecimento visual de produto, cor e estilo',
      'Revisão e aprovação rápida das sugestões',
    ],
    video: '/videos/clip-04-ia-demi.mp4',
    reverse: true,
  },
  {
    number: '05',
    title: 'Controle total sobre créditos de IA e armazenamento',
    description:
      'Acompanhe seus créditos de IA utilizados e o espaço disponível em tempo real. Transparência total para você escalar sem surpresas na conta.',
    features: [
      'Painel de créditos de IA consumidos',
      'Armazenamento disponível em destaque',
      'Planejamento de uso sem surpresas',
    ],
    video: '/videos/clip-05-cta.mp4',
    reverse: false,
  },
]

export default function HowItWorksSection() {
  const sectionRef = useGsapReveal<HTMLElement>({ stagger: 0.1 })

  return (
    <section id="como-funciona" ref={sectionRef} className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">Como Funciona</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Do upload ao compartilhamento,<br className="hidden sm:block" /> em poucos cliques.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Veja a DAMazing em ação e entenda como ela transforma a bagunça de arquivos em um acervo organizado, pesquisável e pronto para usar.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-20 space-y-24">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`grid items-center gap-12 ${step.reverse ? 'lg:grid-cols-2 lg:[&>*:first-child]:order-2' : 'lg:grid-cols-2'}`}
            >
              {/* Text */}
              <div>
                <span className="font-display text-7xl font-light text-cyan-400/20 leading-none">{step.number}</span>
                <h3 className="mt-2 font-display text-3xl font-bold text-white">{step.title}</h3>
                <p className="mt-4 leading-7 text-zinc-300">{step.description}</p>
                <ul className="mt-6 space-y-3">
                  {step.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-zinc-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                        <Check size={12} className="text-cyan-400" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video */}
              <div>
                <VideoPanel src={step.video} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Button href="#planos" size="lg">
            Começar agora <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  )
}
