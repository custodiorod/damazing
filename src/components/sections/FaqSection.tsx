import { ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'
import { useGsapReveal } from '../../hooks/useGsapReveal'

const faqs = [
  ['A DAMazing substitui Bynder ou AEM?', 'Para operações que precisam de DAM leve, sim. A proposta é entregar organização, busca e controle sem implantação enterprise.'],
  ['Por que tags antes do upload?', 'Porque deixar para organizar depois é o caminho mais curto para virar pasta bagunçada de novo.'],
  ['A IA renomeia arquivos automaticamente?', 'Sim. A DAMazing pode transformar nomes como IMG001 em nomes descritivos baseados no conteúdo e nas tags.'],
  ['Como funciona validade de licença?', 'Você define a data de expiração do uso da imagem. No vencimento, o sistema sinaliza e bloqueia automaticamente.'],
  ['Fotógrafos freelancers fazem sentido como público?', 'Sim. O plano Starter foi pensado para quem entrega muitos arquivos e precisa reduzir retrabalho com cliente.'],
  ['Posso comprar mais armazenamento sem trocar de plano?', 'Sim. Add-ons de armazenamento e créditos de IA entram como flexibilidade sem upgrade obrigatório.'],
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const answersRef = useRef<Array<HTMLDivElement | null>>([])
  const ref = useGsapReveal<HTMLElement>({ stagger: 0.08 })

  const toggleFaq = (index: number) => {
    const answer = answersRef.current[index]
    if (!answer) return
    const isOpen = openIndex === index
    gsap.to(answer, {
      height: isOpen ? 0 : answer.scrollHeight,
      opacity: isOpen ? 0 : 1,
      duration: 0.35,
      ease: 'power2.inOut',
    })
    setOpenIndex(isOpen ? null : index)
  }

  return (
    <section id="faq" ref={ref} className="bg-dark-800 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-4xl font-bold text-white sm:text-5xl">Perguntas frequentes</h2>
        <div className="mt-10 space-y-3">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="rounded-lg border border-white/10 bg-dark-900">
              <button type="button" className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-white" onClick={() => toggleFaq(index)}>
                {question}
                <ChevronDown className={`shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} size={20} />
              </button>
              <div
                ref={(node) => {
                  answersRef.current[index] = node
                }}
                className="overflow-hidden px-5 text-zinc-300"
                style={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
              >
                <p className="pb-5 leading-7">{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
