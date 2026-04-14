import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'
import { cn } from '../../lib/utils'

const links = [
  { label: 'O Problema', href: '#problema' },
  { label: 'Solucao', href: '#solucao' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Planos', href: '#planos' },
  { label: 'Agencias', href: '#agencias' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 80)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
  }, [])

  // Animação do menu mobile
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return

    const ctx = gsap.context(() => {
      if (open) {
        gsap.fromTo(menu,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.fromTo(menu.children,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, delay: 0.1 }
        )
      } else {
        gsap.to(menu, { height: 0, opacity: 0, duration: 0.2, ease: 'power2.in' })
      }
    }, mobileMenuRef)

    return () => ctx.revert()
  }, [open])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled ? 'border-white/10 bg-dark-900/90 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#topo">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="mailto:contato@cenouradigital.com.br" size="sm">
            Solicitar Demo
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div ref={mobileMenuRef} className="border-t border-white/10 bg-dark-900/95 px-4 pb-5 pt-3 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between rounded-lg px-3 py-2">
              <span className="text-sm font-medium text-zinc-400">Tema</span>
              <ThemeToggle />
            </div>
            <Button href="mailto:contato@cenouradigital.com.br" className="mt-1 w-full" onClick={() => setOpen(false)}>
              Solicitar Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

