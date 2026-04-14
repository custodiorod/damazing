import { IntegrationsSlider } from '../ui/integrations-slider'
import { useGsapReveal } from '../../hooks/useGsapReveal'

export default function IntegrationsSection() {
  const sectionRef = useGsapReveal<HTMLElement>()

  return (
    <section ref={sectionRef} className="bg-dark-800 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Integrações
        </p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
          Conecta com as ferramentas que você já usa
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
          Sem precisar mudar seu fluxo de trabalho. DAMazing se integra com as principais ferramentas do mercado.
        </p>

        <div className="mt-16">
          <IntegrationsSlider />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span><strong className="text-white">+50</strong> integrações disponíveis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>API aberta para customizações</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Webhooks para automações</span>
          </div>
        </div>
      </div>
    </section>
  )
}
