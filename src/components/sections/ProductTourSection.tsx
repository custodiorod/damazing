import { ArrowRight, Check, Search, Share2, Upload, BarChart3, Eye, Users, FolderOpen, Tag, CalendarClock, Shield, Zap, Clock } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const steps = [
  {
    id: 1,
    title: 'Upload Inteligente',
    description: 'Arraste arquivos e adicione tags antes de finalizar. Organização acontece no upload.',
    icon: Upload,
    color: 'from-cyan-500 to-blue-500',
    duration: '5 min',
  },
  {
    id: 2,
    title: 'Busca Instantânea',
    description: 'Encontre qualquer arquivo em segundos. Filtros por campanha, modelo, canal e mais.',
    icon: Search,
    color: 'from-purple-500 to-pink-500',
    duration: '30 seg',
  },
  {
    id: 3,
    title: 'Compartilhamento Seguro',
    description: 'Gere links com senha, controle de validade e permissões por cliente.',
    icon: Share2,
    color: 'from-green-500 to-emerald-500',
    duration: '1 clique',
  },
  {
    id: 4,
    title: 'Analytics Completo',
    description: 'Veja o que está sendo usado, downloads e métricas por campanha.',
    icon: BarChart3,
    color: 'from-orange-500 to-red-500',
    duration: 'Tempo real',
  },
]

export default function ProductTourSection() {
  const sectionRef = useGsapReveal<HTMLElement>()
  const [activeStep, setActiveStep] = useState(0)
  const mockupRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação dos passos
      gsap.fromTo(stepsRef.current?.children ?? [],
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            once: true
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!mockupRef.current) return

    const ctx = gsap.context(() => {
      // Transição suave entre mockups
      gsap.fromTo(mockupRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
      )
    }, mockupRef)

    return () => ctx.revert()
  }, [activeStep])

  return (
    <section ref={sectionRef} className="relative bg-dark-900 px-4 py-24 sm:px-6 lg:px-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Product Tour
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
            Veja o <span className="text-cyan-300">DAMazing em ação</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
            Uma interface intuitiva que torna organização de arquivos simples e rápida
          </p>
        </div>

        {/* Steps Timeline */}
        <div ref={stepsRef} className="mt-16 flex flex-wrap justify-center gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = activeStep === index
            const isPast = activeStep > index

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(index)}
                className={`
                  group relative flex items-center gap-3 rounded-xl border px-5 py-3 transition-all duration-300
                  ${isActive ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20 scale-105' : 'border-white/10 bg-white/5 hover:border-cyan-500/30'}
                  ${isPast ? 'opacity-60' : 'opacity-100'}
                `}
              >
                <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                  <Icon className="text-white" size={24} />
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-white/20 animate-ping" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{step.title}</p>
                  <p className="text-xs text-zinc-400">{step.duration}</p>
                </div>
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
                )}
              </button>
            )
          })}
        </div>

        {/* Mockup Display */}
        <div className="mt-12">
          <div ref={mockupRef} className="relative mx-auto max-w-5xl">
            {/* Glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-dark-800/80 backdrop-blur-xl shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-dark-900/60 px-4 py-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-300/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-4 flex-1 rounded-md bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400">
                  damazing.com.br/dashboard
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Users size={14} />
                  <span>Equipe Atlas</span>
                </div>
              </div>

              {/* Mockup Content */}
              <div className="min-h-[500px] p-6">
                {activeStep === 0 && (
                  <UploadMockup />
                )}
                {activeStep === 1 && (
                  <SearchMockup />
                )}
                {activeStep === 2 && (
                  <ShareMockup />
                )}
                {activeStep === 3 && (
                  <AnalyticsMockup />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Zap, text: 'Setup em 5 minutos' },
            { icon: Shield, text: 'Segurança enterprise' },
            { icon: Clock, text: 'Economia 20-25%' },
            { icon: FolderOpen, text: 'Organização automática' },
          ].map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-500/30 hover:bg-white/10">
                <Icon className="text-cyan-400" size={24} />
                <p className="text-center text-sm font-medium text-zinc-300">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Upload Mockup Component
function UploadMockup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Upload de Arquivos</h3>
        <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2">
          <Tag className="text-cyan-400" size={16} />
          <span className="text-sm text-cyan-300">4 arquivos selecionados</span>
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div className="rounded-xl border-2 border-dashed border-cyan-500/30 bg-cyan-950/20 p-8 text-center transition-colors hover:border-cyan-500/50">
        <Upload className="mx-auto text-cyan-400" size={48} />
        <p className="mt-4 text-lg font-medium text-white">Arraste arquivos aqui</p>
        <p className="mt-2 text-sm text-zinc-400">ou clique para selecionar</p>
        <div className="mt-6 flex justify-center gap-3 text-xs text-zinc-500">
          <span className="rounded-full bg-white/5 px-3 py-1">JPG</span>
          <span className="rounded-full bg-white/5 px-3 py-1">PNG</span>
          <span className="rounded-full bg-white/5 px-3 py-1">MP4</span>
          <span className="rounded-full bg-white/5 px-3 py-1">PSD</span>
          <span className="rounded-full bg-white/5 px-3 py-1">AI</span>
        </div>
      </div>

      {/* Tags Form */}
      <div className="rounded-xl border border-white/10 bg-dark-900/60 p-5">
        <p className="mb-4 text-sm font-semibold text-zinc-300">Adicione tags antes de finalizar:</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400">Campanha *</label>
              <select className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                <option>Selecione...</option>
                <option selected>Verão 2025</option>
                <option>Outono</option>
                <option>Black Friday</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-400">Produto *</label>
              <input type="text" placeholder="Ex: Vestido Midi" className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-zinc-400">Modelo *</label>
              <select className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none">
                <option>Selecione...</option>
                <option selected>Helena</option>
                <option>Bruna</option>
                <option>Carlos</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-zinc-400">Canal de Uso</label>
              <div className="mt-1 flex gap-2">
                <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                  <input type="checkbox" defaultChecked className="rounded border-zinc-600" />
                  <span>E-commerce</span>
                </label>
                <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300">
                  <input type="checkbox" defaultChecked className="rounded border-zinc-600" />
                  <span>Social</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Search Mockup Component
function SearchMockup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Busca Inteligente</h3>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Eye size={16} />
          <span>247 arquivos</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por campanha, produto, modelo..."
          className="w-full rounded-xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['Todos', 'Verão 2025', 'Outono', 'Black Friday', 'E-commerce', 'Social'].map((filter) => (
          <button
            key={filter}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'Todos'
                ? 'bg-cyan-500 text-white'
                : 'border border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500/30 hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: 'lookbook-verao-001.jpg', tags: ['Verão 2025', 'Helena', 'E-commerce'], size: '2.4 MB' },
          { name: 'catalogo-vestidos.pdf', tags: ['Verão 2025', 'E-commerce'], size: '8.1 MB' },
          { name: 'shooting-atlas-045.jpg', tags: ['Verão 2025', 'Bruna', 'Social'], size: '3.7 MB' },
          { name: 'produto-destaque.png', tags: ['Black Friday', 'E-commerce'], size: '1.2 MB' },
          { name: 'social-insta-1.jpg', tags: ['Outono', 'Carlos', 'Social'], size: '4.5 MB' },
          { name: 'campanha-hero.jpg', tags: ['Verão 2025', 'E-commerce', 'Social'], size: '5.8 MB' },
        ].map((file, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl border border-white/10 bg-dark-900/60 p-3 transition-all hover:border-cyan-500/30 hover:bg-dark-900/80">
            <div className="flex aspect-square items-center justify-center rounded-lg bg-white/5">
              <FolderOpen className="text-zinc-500" size={32} />
            </div>
            <div className="mt-3 space-y-1">
              <p className="truncate text-sm font-medium text-white">{file.name}</p>
              <div className="flex flex-wrap gap-1">
                {file.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-zinc-500">{file.size}</p>
            </div>
            <button className="absolute right-2 top-2 rounded-lg bg-cyan-500 p-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Eye className="text-white" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Share Mockup Component
function ShareMockup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Compartilhamento</h3>
        <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-300">Link ativo</span>
      </div>

      {/* Link Generated */}
      <div className="rounded-xl border border-white/10 bg-dark-900/60 p-5">
        <p className="mb-3 text-sm font-medium text-zinc-300">Link gerado:</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-cyan-400">
            https://damazing.com.br/share/verao2025-atlas
          </code>
          <button className="rounded-lg bg-cyan-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-cyan-600">
            Copiar
          </button>
        </div>
      </div>

      {/* Share Options */}
      <div className="rounded-xl border border-white/10 bg-dark-900/60 p-5">
        <p className="mb-4 text-sm font-semibold text-zinc-300">Opções de compartilhamento:</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <Shield className="text-green-400" size={20} />
              <div>
                <p className="text-sm font-medium text-white">Proteger com senha</p>
                <p className="text-xs text-zinc-400">Exige senha para acessar</p>
              </div>
            </div>
            <label className="relative inline-flex h-6 w-11 cursor-pointer">
              <input type="checkbox" className="peer sr-only" />
              <span className="absolute inset-0 rounded-full border-2 border-zinc-600 transition-colors peer-checked:bg-cyan-500"></span>
              <span className="absolute left-0 top-0 h-5 w-5 rounded-full border-2 border-zinc-600 bg-white transition-transform peer-checked:translate-x-5"></span>
            </label>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-orange-400" size={20} />
              <div>
                <p className="text-sm font-medium text-white">Expiração automática</p>
                <p className="text-xs text-zinc-400">Link expira em 7 dias</p>
              </div>
            </div>
            <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              <option>7 dias</option>
              <option>30 dias</option>
              <option>Sem expiração</option>
            </select>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-center gap-3">
              <Users className="text-purple-400" size={20} />
              <div>
                <p className="text-sm font-medium text-white">Permissão de download</p>
                <p className="text-xs text-zinc-400">Quem pode baixar</p>
              </div>
            </div>
            <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
              <option>Qualquer pessoas com link</option>
              <option>Apenas approved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

// Analytics Mockup Component
function AnalyticsMockup() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Analytics</h3>
        <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
          <option>Últimos 30 dias</option>
          <option>Últimos 7 dias</option>
          <option>Últimos 90 dias</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Views', value: '12,847', change: '+23%', color: 'text-cyan-400' },
          { label: 'Downloads', value: '3,421', change: '+18%', color: 'text-green-400' },
          { label: 'Links Criados', value: '847', change: '+31%', color: 'text-purple-400' },
          { label: 'Arquivos', value: '2,415', change: '+12%', color: 'text-orange-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/10 bg-dark-900/60 p-4">
            <p className="text-xs text-zinc-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.color}`}>{stat.change} vs mês anterior</p>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="rounded-xl border border-white/10 bg-dark-900/60 p-5">
        <p className="mb-4 text-sm font-semibold text-zinc-300">Downloads por Campanha</p>
        <div className="space-y-3">
          {[
            { name: 'Verão 2025', value: 85, color: 'bg-cyan-500' },
            { name: 'Black Friday', value: 72, color: 'bg-orange-500' },
            { name: 'Outono', value: 64, color: 'bg-purple-500' },
            { name: 'Outubro', value: 45, color: 'bg-pink-500' },
          ].map((campaign) => (
            <div key={campaign.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-300">{campaign.name}</span>
                <span className="text-white font-medium">{campaign.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full ${campaign.color} transition-all duration-1000`} style={{ width: `${campaign.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-white/10 bg-dark-900/60 p-5">
        <p className="mb-4 text-sm font-semibold text-zinc-300">Atividade Recente</p>
        <div className="space-y-3">
          {[
            { action: 'Download', user: 'Carlos M.', file: 'lookbook-verao-015.jpg', time: '2 min atrás' },
            { action: 'Preview', user: 'Ana S.', file: 'catalogo-vestidos.pdf', time: '15 min atrás' },
            { action: 'Link criado', user: 'Equipe Atlas', file: 'Campanha Verão', time: '1 hora atrás' },
            { action: 'Upload', user: 'Helena R.', file: '12 arquivos', time: '3 horas atrás' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20">
                <Check className="text-cyan-400" size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white"><span className="font-medium">{activity.user}</span> {activity.action.toLowerCase()}</p>
                <p className="text-xs text-zinc-400">{activity.file}</p>
              </div>
              <span className="text-xs text-zinc-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
