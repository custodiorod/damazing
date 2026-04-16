import { useState } from 'react'
import { Check, Minus, X, MessageCircle } from 'lucide-react'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { Button } from '../ui/Button'

type Plan = {
  name: string
  priceMonthly: string
  priceAnnual: string
  priceAnnualTotal?: string
  audience?: string
  description: string
  features: string[]
  popular?: boolean
  enterprise?: boolean
  cta: string
  ctaHref: string
  ctaVariant: 'primary' | 'outline'
}

const plans: Plan[] = [
  {
    name: 'Starter',
    priceMonthly: 'R$ 297',
    priceAnnual: 'R$ 252',
    priceAnnualTotal: 'R$ 3.029/ano',
    description: 'Plano básico para equipes em início de operação digital.',
    features: [
      '1 TB de armazenamento',
      '500 créditos de IA',
      '100 coleções',
      '10 usuários',
      'Suporte para onboarding',
      'Consultoria estratégica',
    ],
    cta: 'Escolher plano pago',
    ctaHref: 'mailto:contato@cenouradigital.com.br',
    ctaVariant: 'outline',
  },
  {
    name: 'Professional',
    priceMonthly: 'R$ 997',
    priceAnnual: 'R$ 847',
    priceAnnualTotal: 'R$ 10.169/ano',
    description: 'Plano para PMEs com operação de marketing e conteúdo em crescimento.',
    features: [
      '4 TB de armazenamento',
      '2.000 créditos de IA',
      'Coleções ilimitadas',
      '50 usuários',
      'Suporte para onboarding',
      'Consultoria estratégica',
    ],
    popular: true,
    cta: 'Escolher plano pago',
    ctaHref: 'mailto:contato@cenouradigital.com.br',
    ctaVariant: 'primary',
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Valor sob consulta',
    priceAnnual: 'Valor sob consulta',
    description: 'Plano sob medida para operações enterprise com requisitos avançados.',
    features: [
      'Escopo e limites definidos sob medida',
      'Onboarding assistido pelo time de vendas',
      'Suporte consultivo dedicado',
      'Implantação guiada com plano personalizado',
    ],
    enterprise: true,
    cta: 'Falar com vendas (WhatsApp)',
    ctaHref: 'https://wa.me/5511999999999',
    ctaVariant: 'outline',
  },
]

const comparison = [
  ['Zero onboarding', 'yes', 'no', 'no', 'no', 'partial'],
  ['Preço de entrada em reais', 'yes', 'no', 'no', 'no', 'partial'],
  ['Tag antes do upload', 'yes', 'partial', 'partial', 'partial', 'partial'],
  ['Licença com bloqueio automático', 'yes', 'partial', 'partial', 'partial', 'yes'],
  ['Foco em Agências, Marcas, E-commerces.', 'yes', 'no', 'no', 'partial', 'no'],
]

function Mark({ value }: { value: string }) {
  if (value === 'yes') return <Check className="mx-auto text-emerald-300" size={18} />
  if (value === 'partial') return <Minus className="mx-auto text-yellow-300" size={18} />
  return <X className="mx-auto text-zinc-500" size={18} />
}

export default function CompareSection() {
  const ref = useGsapReveal<HTMLElement>({ direction: 'up', stagger: 0.12 })
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section id="planos" ref={ref} className="bg-dark-800 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-brand-300">Planos</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">DAM sem preço de software inacessível.</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-300">
            Escolha o plano ideal para o tamanho da sua operação.
          </p>
        </div>

        {/* Toggle Mensal / Anual */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-zinc-400'}`}>Mensal</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ${isAnnual ? 'bg-brand-500' : 'bg-zinc-600'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`}
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-zinc-400'}`}>
            Anual
            <span className="ml-2 inline-flex rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300">
              2 meses grátis
            </span>
          </span>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-lg border p-6 flex flex-col ${plan.popular ? 'border-brand-400 bg-brand-950/40 shadow-[0_0_40px_rgba(6,182,212,0.16)]' : 'border-white/10 bg-dark-900'}`}
            >
              {plan.popular && (
                <p className="mb-4 inline-flex rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-200">
                  Mais Popular
                </p>
              )}

              <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{plan.description}</p>

              {plan.enterprise ? (
                <p className="mt-6 font-display text-3xl font-bold text-white">Valor sob consulta</p>
              ) : (
                <>
                  <p className="mt-6 font-display text-4xl font-bold text-white">
                    {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                    <span className="font-sans text-base font-medium text-zinc-400">/mês</span>
                  </p>
                  {isAnnual && plan.priceAnnualTotal && (
                    <p className="mt-1 text-sm text-emerald-400 font-medium">{plan.priceAnnualTotal} · cobrado anualmente</p>
                  )}
                </>
              )}

              {plan.enterprise && (
                <p className="mt-2 text-sm text-zinc-400">Definimos o plano com você no WhatsApp comercial.</p>
              )}

              <ul className="mt-6 flex-1 space-y-3 text-sm text-zinc-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check className="mt-0.5 shrink-0 text-brand-300" size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={plan.ctaHref}
                variant={plan.ctaVariant}
                className="mt-7 w-full"
              >
                {plan.enterprise && <MessageCircle size={16} className="mr-2 inline" />}
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-16 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[880px] border-collapse bg-dark-900 text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-zinc-300">
                <th className="px-5 py-4 font-semibold">Comparativo</th>
                <th className="bg-brand-900/40 px-5 py-4 text-center font-semibold text-brand-100">DAMazing</th>
                <th className="px-5 py-4 text-center font-semibold">Bynder</th>
                <th className="px-5 py-4 text-center font-semibold">Brandfolder</th>
                <th className="px-5 py-4 text-center font-semibold">Canto</th>
                <th className="px-5 py-4 text-center font-semibold">Adobe AEM</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([label, dami, binder, brandfolder, canto, aem]) => (
                <tr key={label} className="border-b border-white/10 last:border-b-0">
                  <td className="px-5 py-4 font-medium text-white">{label}</td>
                  <td className="border-x border-brand-500/30 bg-brand-900/40 px-5 py-4 text-center"><Mark value={dami} /></td>
                  <td className="px-5 py-4 text-center"><Mark value={binder} /></td>
                  <td className="px-5 py-4 text-center"><Mark value={brandfolder} /></td>
                  <td className="px-5 py-4 text-center"><Mark value={canto} /></td>
                  <td className="px-5 py-4 text-center"><Mark value={aem} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center text-sm text-zinc-400">Legenda: completo, parcial ou ausente no posicionamento principal.</p>
      </div>
    </section>
  )
}
