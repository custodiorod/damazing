import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import DemoSection from './components/sections/DemoSection'
import SecuritySection from './components/sections/SecuritySection'
import CompareSection from './components/sections/CompareSection'
import CtaSection from './components/sections/CtaSection'
import FaqSection from './components/sections/FaqSection'
import DifferentialsSection from './components/sections/DifferentialsSection'
import ToolsReplacementSection from './components/sections/ToolsReplacementSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ClientsSection from './components/sections/ClientsSection'
import IntegrationsSection from './components/sections/IntegrationsSection'
import MetricsSection from './components/sections/MetricsSection'
import IndustryCasesSection from './components/sections/IndustryCasesSection'
import ProductTourSection from './components/sections/ProductTourSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import { gsap } from './lib/gsap.config'

export default function App() {
  useEffect(() => {
    const listeners: Array<() => void> = []

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler = (event: MouseEvent) => {
        const href = anchor.getAttribute('href')
        if (!href || href === '#') return
        const target = document.querySelector(href)
        if (!target) return
        event.preventDefault()
        gsap.to(window, { duration: 1, scrollTo: target, ease: 'power3.inOut' })
      }

      anchor.addEventListener('click', handler)
      listeners.push(() => anchor.removeEventListener('click', handler))
    })

    return () => listeners.forEach((remove) => remove())
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden bg-dark-900">
      <Navbar />
      <HeroSection />
      <ClientsSection />
      <MetricsSection />
      <SecuritySection />
      <HowItWorksSection />
      <DemoSection />
      <ProductTourSection />
      <DifferentialsSection />
      <IndustryCasesSection />
      <ToolsReplacementSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <CompareSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
