import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap.config'
import { ArrowRight, X, Check } from 'lucide-react'

// Componentes de Logo
const GoogleDriveLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.3 78" className="h-12 w-12">
    <path fill="#0066da" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3L27.5 53H0c0 1.55.4 3.1 1.2 4.5z"/>
    <path fill="#00ac47" d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44A9.06 9.06 0 0 0 0 53h27.5z"/>
    <path fill="#ea4335" d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75L86.1 57.5c.8-1.4 1.2-2.95 1.2-4.5H59.798l5.852 11.5z"/>
    <path fill="#00832d" d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2z"/>
    <path fill="#2684fc" d="M59.8 53H27.5L13.75 76.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"/>
    <path fill="#ffba00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25 59.8 53h27.45c0-1.55-.4-3.1-1.2-4.5z"/>
  </svg>
)

const AdobeLogo = () => (
  <svg width="48" height="42" viewBox="0 0 91 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-11 w-11">
    <g clipPath="url(#clip0_906_1839)">
      <path d="M56.9686 0H90.4318V80L56.9686 0Z" fill="#EB1000"/>
      <path d="M33.4632 0H0V80L33.4632 0Z" fill="#EB1000"/>
      <path d="M45.1821 29.4668L66.5199 80.0002H52.5657L46.1982 63.9461H30.6182L45.1821 29.4668Z" fill="#EB1000"/>
    </g>
    <defs>
      <clipPath id="clip0_906_1839">
        <rect width="90.4318" height="80" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

// Logos reais dos concorrentes
const BynderLogo = () => (
  <img
    src="https://cdn.worldvectorlogo.com/logos/bynder.svg"
    alt="Bynder"
    className="h-12 w-12 object-contain"
  />
)

const BrandfolderLogo = () => (
  <img
    src="https://w7.pngwing.com/pngs/499/754/png-transparent-brandfolder-hd-logo-thumbnail.png"
    alt="Brandfolder"
    className="h-12 w-12 object-contain"
  />
)

const CantoLogo = () => (
  <img
    src="https://comparecamp.com/media/uploads/2019/08/Canto-logo.png"
    alt="Canto"
    className="h-16 w-16 object-contain"
  />
)

const DamazingLogo = () => (
  <div className="flex flex-col items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-16 w-16 text-cyan-400 animate-glow-pulse" style={{filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.5))'}}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"></path>
    </svg>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-bold text-white">DAM</span>
      <span className="text-2xl font-light text-cyan-400">azing</span>
    </div>
  </div>
)

const oldTools = [
  { name: 'Google Drive', Logo: GoogleDriveLogo },
  { name: 'Adobe AEM', Logo: AdobeLogo },
  { name: 'Bynder', Logo: BynderLogo },
  { name: 'Brandfolder', Logo: BrandfolderLogo },
  { name: 'Canto', Logo: CantoLogo },
]

export default function ToolsReplacementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const oldToolsRef = useRef<HTMLDivElement>(null)
  const newToolRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título
      gsap.fromTo('[data-title]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      // Subtítulo
      gsap.fromTo('[data-subtitle]',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      )

      // Ferramentas antigas entram
      gsap.fromTo(oldToolsRef.current?.children ?? [],
        { x: -60, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.6, ease: 'back.out(1.5)', delay: 0.4 }
      )

      // Seta central
      gsap.fromTo(arrowRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 1.2 }
      )

      // Logo DAMazing entra com destaque
      gsap.fromTo(newToolRef.current,
        { scale: 0, rotation: -20 },
        { scale: 1, rotation: 0, duration: 1, ease: 'elastic.out(1, 0.6)', delay: 1.5 }
      )

      // Animação contínua da seta
      gsap.to(arrowRef.current, {
        x: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
      })

      // Glow pulsante no logo DAMazing
      gsap.to(newToolRef.current, {
        boxShadow: '0 0 60px rgba(6,182,212,0.8)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      })

      // Animação de fade out nas ferramentas antigas
      setTimeout(() => {
        setAnimating(true)
        gsap.to(oldToolsRef.current?.children ?? [], {
          opacity: 0.3,
          scale: 0.9,
          filter: 'grayscale(100%)',
          duration: 1,
          stagger: 0.1,
          ease: 'power2.inOut',
        })
      }, 3500)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark-900 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 data-title className="font-display text-4xl font-bold text-white sm:text-5xl">
          Substitua todas essas ferramentas
        </h2>
        <p data-subtitle className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
          Chega de abra abertas. Chega de Drive bagunçado. Tudo em um lugar só.
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-6">
          {/* Ferramentas antigas */}
          <div ref={oldToolsRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {oldTools.map(({ name, Logo }) => (
              <div
                key={name}
                className="group relative flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
              >
                <div className="transition-transform group-hover:scale-110">
                  <Logo />
                </div>
                <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300">{name}</p>
                <X className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100" size={12} />
              </div>
            ))}
          </div>

          {/* Seta de substituição */}
          <div ref={arrowRef} className="hidden lg:flex">
            <div className="rounded-full bg-cyan-500/20 p-4">
              <ArrowRight className="text-cyan-400" size={32} />
            </div>
          </div>

          <div ref={arrowRef} className="flex lg:hidden">
            <div className="rounded-full bg-cyan-500/20 p-3">
              <ArrowRight className="text-cyan-400 rotate-90" size={28} />
            </div>
          </div>

          {/* Nova ferramenta - DAMazing */}
          <div ref={newToolRef} className="relative">
            <div className="flex flex-col items-center gap-3">
              <div className="transition-transform hover:scale-110">
                <DamazingLogo />
              </div>
              <p className="text-lg font-semibold text-cyan-300">DAMazing</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
                <Check className="h-4 w-4" /> Tudo em um só lugar
              </div>
            </div>

            {/* Partículas de destaque */}
            <div className="absolute -inset-4 -z-10 animate-pulse rounded-full bg-cyan-500/20 blur-2xl" />
          </div>
        </div>

        {/* Texto de chamada */}
        <div className="mt-12 text-zinc-400">
          <p className="text-sm">
            Mais de <span className="font-semibold text-white">300 agências</span> já saíram das pastas sem nome
          </p>
        </div>
      </div>
    </section>
  )
}
