import { FileText, Sparkles, Tags, UploadCloud, Wand2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const tabs = [
  { label: 'Tags obrigatórias', icon: Tags },
  { label: 'IA renomeia', icon: Wand2 },
  { label: 'Coleção pronta', icon: UploadCloud },
]

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useGsapReveal<HTMLElement>({ stagger: 0.12 })
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(progressRef.current,
        { width: '0%' },
        { width: '100%', duration: 2.5, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.2 }
      )
    }, progressRef)
    return () => ctx.revert()
  }, [activeTab])

  const switchTab = (newTab: number) => {
    if (newTab === activeTab || !contentRef.current) return
    const tl = gsap.timeline()
    tl.to(contentRef.current, { opacity: 0, y: 15, scale: 0.98, duration: 0.25, ease: 'power2.in' })
      .call(() => setActiveTab(newTab))
      .to(contentRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
  }

  return (
    <section id="solucao" ref={sectionRef} className="bg-dark-800 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-semibold uppercase tracking-[0.3em] text-cyan-400">Tagueamento + IA</p>
        <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">Antes do upload, a bagunça já começa a acabar.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
          O sistema pede tags antes de subir os arquivos, sugere organização por IA e transforma IMG001 em um nome que alguém consegue encontrar depois.
        </p>

        <div id="diferenciais" className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.label}
                type="button"
                className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeTab === index
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-400/50 hover:text-white hover:bg-cyan-500/10'
                }`}
                onClick={() => switchTab(index)}
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
        </div>

        <div ref={contentRef} className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-dark-900/80 backdrop-blur p-6 text-left shadow-2xl shadow-black/30">
          {activeTab === 0 && (
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <h3 className="font-display text-3xl font-bold text-white">Tag antes do upload. Sem gambiarra depois.</h3>
                <p className="mt-4 leading-7 text-zinc-300">
                  A DAMazing trava o fluxo certo: campanha, produto, modelo, canal e validade entram antes dos arquivos. O time não precisa adivinhar onde guardar nada.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
                  <Tags size={16} />
                  Obrigatório antes de subir
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/20 p-5">
                {['Coleção: Shooting Inverno', 'Categoria: Vestidos', 'Modelo: Helena', 'Uso: e-commerce + paid social'].map((tag, idx) => (
                  <div key={tag} className={`mb-3 rounded-lg border border-white/10 bg-dark-800 px-4 py-3 text-sm font-medium last:mb-0 transition-all ${idx === 0 ? 'border-cyan-400/50 bg-cyan-500/10 text-cyan-200' : 'text-zinc-300'}`}>
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-dark-800 p-5">
                <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Antes</p>
                {['IMG001.jpg', 'DSC_8472.jpg', 'final_final_3.png'].map((file) => (
                  <p key={file} className="mt-4 rounded-lg bg-dark-900 px-4 py-3 font-mono text-sm text-zinc-400 border border-white/5">{file}</p>
                ))}
              </div>
              <div className="rounded-xl border border-cyan-400/30 bg-cyan-950/20 p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 uppercase tracking-wider">
                  <Sparkles size={16} /> Depois
                </p>
                {['vestido-midi-verde-modelo-helena.jpg', 'bolsa-couro-caramelo-close.jpg', 'lookbook-inverno-capa-social.png'].map((file) => (
                  <p key={file} className="mt-4 rounded-lg bg-dark-900 px-4 py-3 font-mono text-sm text-cyan-100 border border-cyan-400/20">{file}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="rounded-xl border border-dashed border-cyan-500/40 bg-cyan-950/10 p-10 text-center">
              <FileText className="mx-auto text-cyan-400" size={48} />
              <h3 className="mt-5 font-display text-2xl font-bold text-white">150 fotos entram. Uma coleção pesquisável sai.</h3>
              <p className="mt-3 text-zinc-400">Upload em massa, tags sugeridas pela IA e coleções prontas para equipe, cliente e campanha.</p>
              <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
                <div ref={progressRef} className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400" />
              </div>
              <p className="mt-3 text-xs text-zinc-500">Processando arquivos...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

