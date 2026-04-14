# DAMAZING — Especificação Técnica: Nova Landing Page
> Documento para geração de código por IA  
> Stack: React + TypeScript + Node.js + npm + GSAP  
> Prazo: 10 de Abril de 2025

---

## 1. Stack e Dependências

```bash
# Inicializar projeto
npm create vite@latest damazing-landing -- --template react-ts
cd damazing-landing

# Dependências de produção
npm install gsap @gsap/react react-router-dom lucide-react

# Dependências de desenvolvimento
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

### Versões mínimas
| Pacote | Versão |
|--------|--------|
| React | ^18.3 |
| TypeScript | ^5.5 |
| GSAP | ^3.12 |
| Vite | ^5.4 |
| Tailwind CSS | ^3.4 |
| Node.js | ^20 |

---

## 2. Estrutura de Pastas

```
damazing-landing/
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── assets/
│   │   ├── logo.svg
│   │   └── images/
│   │       ├── hero-mockup.png        # screenshot do produto
│   │       ├── demo-upload.png
│   │       ├── demo-preview.png
│   │       └── demo-share.png
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── SecuritySection.tsx
│   │   │   ├── CompareSection.tsx
│   │   │   └── CtaSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── FeatureCard.tsx
│   │       └── AnimatedCounter.tsx
│   ├── hooks/
│   │   ├── useGsapReveal.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   └── gsap.config.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 3. Design System / Tokens

### Paleta de Cores
```typescript
// tailwind.config.ts
const colors = {
  brand: {
    50:  '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  dark: {
    900: '#0a0a0f',
    800: '#111118',
    700: '#1a1a27',
    600: '#2a2a3d',
  }
}
```

### Tipografia
- **Fonte Principal:** `Inter` (Google Fonts)
- **Fonte Display (Headlines):** `Syne` (bold, 700–800) — transmite disrupção
- Importar via `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

### Variáveis CSS globais (`src/styles/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-purple: #7c3aed;
  --brand-light: #a855f7;
  --brand-glow: rgba(124, 58, 237, 0.4);
  --surface: #111118;
  --surface-2: #1a1a27;
  --border: rgba(255, 255, 255, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0f;
  color: #f9fafb;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Glow utilitário */
.glow-purple {
  box-shadow: 0 0 60px var(--brand-glow), 0 0 120px rgba(124, 58, 237, 0.15);
}

.text-gradient {
  background: linear-gradient(135deg, #a855f7, #7c3aed, #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.border-gradient {
  border: 1px solid transparent;
  background: linear-gradient(var(--surface-2), var(--surface-2)) padding-box,
              linear-gradient(135deg, rgba(168,85,247,0.4), rgba(124,58,237,0.1)) border-box;
}
```

---

## 4. Configuração do GSAP (`src/lib/gsap.config.ts`)

```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'  // requer GSAP Club — usar fallback se não disponível

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)

// Configurações globais
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
  start: 'top 85%',
})

export { gsap, ScrollTrigger }
```

---

## 5. Hook Reutilizável de Animação (`src/hooks/useGsapReveal.ts`)

```typescript
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.config'

interface RevealOptions {
  direction?: 'up' | 'down' | 'left' | 'right'
  stagger?: number
  delay?: number
  duration?: number
}

export function useGsapReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)
  const { direction = 'up', stagger = 0.1, delay = 0, duration = 0.8 } = options

  const fromVars: gsap.TweenVars = {
    opacity: 0,
    y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
    x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
  }

  useEffect(() => {
    if (!ref.current) return
    const children = ref.current.children.length > 0
      ? Array.from(ref.current.children)
      : [ref.current]

    const ctx = gsap.context(() => {
      gsap.fromTo(children, fromVars, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger,
        scrollTrigger: { trigger: ref.current },
      })
    })

    return () => ctx.revert()
  }, [])

  return ref
}
```

---

## 6. Componentes UI Base

### `src/components/ui/Button.tsx`
```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary: `
    bg-gradient-to-r from-brand-700 to-brand-500
    text-white font-semibold
    hover:from-brand-600 hover:to-brand-400
    shadow-lg hover:shadow-brand-700/40
    transition-all duration-300 hover:scale-[1.02]
    active:scale-[0.98]
  `,
  ghost: `
    text-brand-300 hover:text-white
    hover:bg-white/5 transition-all duration-200
  `,
  outline: `
    border border-brand-500/40 text-brand-300
    hover:border-brand-400 hover:text-white hover:bg-brand-900/30
    transition-all duration-200
  `
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(variants[variant], sizes[size], 'cursor-pointer', className)} {...props}>
      {children}
    </button>
  )
}
```

### `src/components/ui/Badge.tsx`
```typescript
interface BadgeProps {
  children: React.ReactNode
  glow?: boolean
}

export function Badge({ children, glow = false }: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
      bg-brand-900/60 text-brand-300 border border-brand-700/40
      ${glow ? 'shadow-[0_0_20px_rgba(124,58,237,0.3)]' : ''}
    `}>
      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
      {children}
    </span>
  )
}
```

---

## 7. Seções — Implementação Detalhada

---

### 7.1 Navbar (`src/components/layout/Navbar.tsx`)

**Comportamento:**
- Fundo transparente no topo, muda para `bg-dark-900/90 backdrop-blur-md` ao rolar 80px
- Logo à esquerda (`DAMAZING` em Syne bold + gradiente)
- Links centrais: `Produto`, `Segurança`, `Preços`, `Blog`
- CTA duplo à direita: botão ghost `Entrar` + botão primary `Testar grátis`

**Animação GSAP:**
```typescript
// Entrada do navbar ao carregar
gsap.fromTo(navRef.current,
  { y: -100, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
)
```

---

### 7.2 Hero Section (`src/components/sections/HeroSection.tsx`)

**Layout:** Full viewport height, fundo escuro com partículas ou mesh gradient animado

**Conteúdo:**
```
[Badge] Novo: Gerenciamento de mídia profissional

[H1]
Pare de perder arquivo
em pasta sem nome.

[Subtítulo]
Organize, gerencie e compartilhe sua mídia de forma profissional.
Feito para agências e e-commerces que levam conteúdo a sério.

[CTA Principal] → Testar grátis por 7 dias   [CTA Secundário link] → Falar com especialista

[Prova social] 
★★★★★  "Já usam mais de 300 agências brasileiras"

[Hero Visual]
Mockup do produto com gradiente/glow embaixo
```

**Animações GSAP — sequência de entrada:**
```typescript
useEffect(() => {
  const tl = gsap.timeline({ delay: 0.3 })

  // 1. Badge desliza de cima
  tl.fromTo(badgeRef.current,
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 }
  )

  // 2. Headline palavra por palavra (split por linha)
  tl.fromTo(headlineRef.current.querySelectorAll('.word'),
    { y: 80, opacity: 0, rotateX: -40 },
    { y: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 0.7 },
    '-=0.2'
  )

  // 3. Subtítulo
  tl.fromTo(subtitleRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 },
    '-=0.3'
  )

  // 4. CTAs
  tl.fromTo(ctaRef.current.children,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
    '-=0.2'
  )

  // 5. Mockup com scale
  tl.fromTo(mockupRef.current,
    { y: 80, opacity: 0, scale: 0.92 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
    '-=0.4'
  )

  // 6. Parallax contínuo no mockup
  gsap.to(mockupRef.current, {
    y: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    }
  })
}, [])
```

**Background animado:**
```typescript
// Mesh gradient girando lentamente
gsap.to(meshRef.current, {
  rotation: 360,
  duration: 40,
  repeat: -1,
  ease: 'none',
})

// Partículas flutuantes (criar via JS puro, 20 partículas)
// Cada partícula: width 2-4px, opacity 0.3-0.7, animação y independente
```

---

### 7.3 Demo Section (`src/components/sections/DemoSection.tsx`)

**Layout:** Fundo levemente mais claro (`bg-dark-800`), tabs horizontais

**Conteúdo:**
```
[Título] Veja como é simples
[Subtítulo] Sem curva de aprendizado. Upload, organize e compartilhe em minutos.

[Tabs]
📁 Upload   👁️ Preview   🔗 Compartilhar

[Área de conteúdo — muda conforme tab ativa]
  Tab 1 — Upload:
    Visual de drag & drop com barra de progresso animada
    "Arraste seus arquivos ou clique para fazer upload"
    Suporte: PNG, JPG, MP4, PDF, AI, PSD e mais

  Tab 2 — Preview:
    Grid de thumbnails (fotos + ícone de vídeo)
    Preview automático sem download

  Tab 3 — Compartilhar:
    Input com link gerado automaticamente
    Toggle: "Acesso com senha" / "Link público"
    "Compartilhe com clientes de forma profissional"
```

**Animações GSAP:**
```typescript
// Tab content — transição suave ao trocar de aba
const switchTab = (newTab: number) => {
  const tl = gsap.timeline()
  tl.to(contentRef.current, { opacity: 0, y: 10, duration: 0.2 })
    .call(() => setActiveTab(newTab))
    .to(contentRef.current, { opacity: 1, y: 0, duration: 0.3 })
}

// Barra de progresso animada (Tab Upload)
gsap.fromTo(progressRef.current,
  { width: '0%' },
  { width: '100%', duration: 2, ease: 'power1.inOut', repeat: -1, repeatDelay: 1 }
)

// Entrada da seção com ScrollTrigger
gsap.fromTo(sectionRef.current.children, ...)
```

---

### 7.4 Security Section (`src/components/sections/SecuritySection.tsx`)

**Layout:** Fundo com gradiente sutil roxo, 3 cards lado a lado

**Conteúdo:**
```
[Badge] Infraestrutura Enterprise

[Título]
Seus arquivos.
Protegidos de verdade.

[3 Cards]
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🔒 Backup      │  │  🛡️ Proteção    │  │  ⚡ Uptime      │
│  Automático     │  │  de Dados       │  │  99.9%          │
│                 │  │                 │  │                 │
│ Seus arquivos   │  │ Criptografia    │  │ Infraestrutura  │
│ salvos em 3     │  │ AES-256 em      │  │ global com      │
│ locais distintos│  │ trânsito e      │  │ redundância     │
│ automaticamente │  │ em repouso      │  │ automática      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Cards:** `border-gradient` + hover eleva com `glow-purple`

**Animações GSAP:**
```typescript
// Cards entram em stagger com ScrollTrigger
gsap.fromTo(cardsRef.current.children,
  { y: 60, opacity: 0, scale: 0.95 },
  {
    y: 0, opacity: 1, scale: 1,
    stagger: 0.15, duration: 0.7,
    scrollTrigger: { trigger: cardsRef.current }
  }
)

// Hover no card — tween direto (não CSS)
card.addEventListener('mouseenter', () => {
  gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' })
})
card.addEventListener('mouseleave', () => {
  gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
})
```

---

### 7.5 Compare Section (`src/components/sections/CompareSection.tsx`)

**Layout:** Tabela comparativa + linha "Damazing" em destaque

**Conteúdo:**
```
[Título] Substitua essas ferramentas

[Subtítulo] Chega de abas abertas. Tudo em um lugar só.

[Tabela]
Funcionalidade          | Google Drive | Vimeo | WeTransfer | ★ Damazing
------------------------|:---:|:---:|:---:|:---:
Organização profissional|  ✗  |  ✗  |  ✗  |  ✓
Preview automático      |  ~  |  ✓  |  ✗  |  ✓
Compartilhar com senha  |  ~  |  ✓  |  ✓  |  ✓
Branding personalizado  |  ✗  |  ✗  |  ✗  |  ✓
Permissões por cliente  |  ✗  |  ✗  |  ✗  |  ✓
Backup automático       |  ~  |  ✓  |  ✗  |  ✓
Gestão de equipe        |  ~  |  ~  |  ✗  |  ✓
Preço justo para agência|  ~  |  ✗  |  ✗  |  ✓

Legenda: ✓ Sim   ✗ Não   ~ Parcial
```

**Coluna Damazing:** fundo `brand-900/40`, borda `brand-500/50`, cor roxo, destaque visual

**Animações GSAP:**
```typescript
// Linhas da tabela entram em stagger
gsap.fromTo(rowsRef.current,
  { x: -40, opacity: 0 },
  { x: 0, opacity: 1, stagger: 0.07, duration: 0.5, scrollTrigger: { ... } }
)

// Coluna Damazing pulsa glow ao entrar
gsap.fromTo(damazingColRef.current,
  { boxShadow: '0 0 0px rgba(124,58,237,0)' },
  { boxShadow: '0 0 40px rgba(124,58,237,0.3)', duration: 1, scrollTrigger: { ... } }
)
```

---

### 7.6 CTA Final Section (`src/components/sections/CtaSection.tsx`)

**Layout:** Full-width, fundo com mesh gradient roxo intenso

**Conteúdo:**
```
[Título grande]
Pronto para organizar
sua mídia de uma vez?

[Subtítulo]
Mais de 300 agências já saíram das pastas sem nome.

[CTA Duplo]
[Botão grande] Testar grátis por 7 dias — sem cartão
[Link]         ou  Falar com um especialista →

[Micro-copy]
✓ Setup em menos de 5 minutos   ✓ Cancele quando quiser   ✓ Suporte incluso
```

**Animações GSAP:**
```typescript
// Título com scale dramático
gsap.fromTo(titleRef.current,
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)', scrollTrigger: { ... } }
)

// Botão principal pulsa indefinidamente (sutil)
gsap.to(primaryBtnRef.current, {
  boxShadow: '0 0 40px rgba(124,58,237,0.6)',
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: 'sine.inOut',
})
```

---

## 8. FAQ Expandível

**Local:** Após o CTA final ou seção própria

**Estrutura de dados:**
```typescript
const faqs = [
  {
    q: "Preciso ter cartão de crédito para testar?",
    a: "Não. O teste gratuito de 7 dias não exige nenhum dado de pagamento."
  },
  {
    q: "Quais formatos de arquivo são suportados?",
    a: "Suportamos imagens (JPG, PNG, GIF, WEBP), vídeos (MP4, MOV, AVI), documentos (PDF, AI, PSD, DOCX) e muito mais."
  },
  {
    q: "Posso personalizar o link de compartilhamento com minha marca?",
    a: "Sim. Nos planos Business e Agency você pode usar seu próprio domínio e logo nos links compartilhados."
  },
  {
    q: "Como funciona o backup automático?",
    a: "Seus arquivos são replicados em 3 data centers distintos automaticamente. Sem configuração necessária."
  },
  {
    q: "Tem suporte para times e permissões por cliente?",
    a: "Sim. Você pode criar workspaces separados por cliente, definir quem vê o quê e controlar permissões de download."
  },
  {
    q: "Qual a diferença do plano para agências?",
    a: "O plano Agency inclui múltiplos workspaces, branding personalizado, relatórios de acesso e gerente de conta dedicado."
  },
]
```

**Animação GSAP (accordion):**
```typescript
const toggleFaq = (index: number) => {
  const answer = answersRef.current[index]
  const isOpen = openIndex === index

  gsap.to(answer, {
    height: isOpen ? 0 : answer.scrollHeight,
    opacity: isOpen ? 0 : 1,
    duration: 0.4,
    ease: 'power2.inOut',
  })

  setOpenIndex(isOpen ? null : index)
}
```

---

## 9. Footer (`src/components/layout/Footer.tsx`)

**Colunas:**
```
DAMAZING                 Produto         Empresa         Legal
[tagline]                Funcionalidades Sobre nós       Termos de uso
[ícones sociais]         Segurança       Blog            Privacidade
                         Preços          Contato         Cookies
                         API
```

---

## 10. SEO e Meta Tags (`index.html`)

```html
<title>Damazing — Gerencie sua mídia de forma profissional</title>
<meta name="description"
  content="Organize, gerencie e compartilhe fotos e vídeos com seus clientes e equipe. Feito para agências e e-commerces. Teste grátis por 7 dias." />

<!-- Open Graph -->
<meta property="og:title" content="Damazing — Gerencie sua mídia" />
<meta property="og:description" content="Pare de perder arquivo em pasta sem nome. Organize tudo em um lugar só." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://damazing.com.br" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Damazing — Gerencie sua mídia" />
<meta name="twitter:description" content="Pare de perder arquivo em pasta sem nome." />
<meta name="twitter:image" content="/og-image.png" />

<!-- Palavras-chave (suporte básico) -->
<meta name="keywords"
  content="gerenciamento de mídia, organizar arquivos agência, software gestão de mídia, compartilhar arquivos clientes" />
```

---

## 11. App.tsx — Composição Final

```typescript
import { useEffect } from 'react'
import { gsap } from './lib/gsap.config'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import DemoSection from './components/sections/DemoSection'
import SecuritySection from './components/sections/SecuritySection'
import CompareSection from './components/sections/CompareSection'
import CtaSection from './components/sections/CtaSection'
import FaqSection from './components/sections/FaqSection'

export default function App() {
  useEffect(() => {
    // Suavizar scroll em todos os links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href')!)
        if (target) gsap.to(window, { duration: 1, scrollTo: target, ease: 'power3.inOut' })
      })
    })
  }, [])

  return (
    <main className="min-h-screen bg-dark-900 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <DemoSection />
      <SecuritySection />
      <CompareSection />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  )
}
```

---

## 12. Responsividade

Todos os componentes devem ser **mobile-first** com Tailwind:

| Breakpoint | Largura | Comportamento |
|---|---|---|
| `default` | < 768px | 1 coluna, texto centralizado, CTA full-width |
| `md:` | 768px+ | 2 colunas onde aplicável |
| `lg:` | 1024px+ | Layout desktop completo |
| `xl:` | 1280px+ | Max-width container 1200px |

**Navbar mobile:** Hamburger menu com animação GSAP (drawer lateral ou dropdown).

---

## 13. Performance

- **Lazy loading** de imagens: `loading="lazy"` em todos os `<img>`
- **GSAP ScrollTrigger:** Usar `once: true` nas animações de entrada para não re-animar
- **Fontes:** `display=swap` no Google Fonts
- **Imagens:** Usar `.webp` sempre que possível
- **Bundle:** Configurar `vite.config.ts` com `manualChunks` para separar GSAP do bundle principal

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          react: ['react', 'react-dom'],
        }
      }
    }
  }
})
```

---

## 14. Análise de Concorrentes

### 14.1 Bynder (https://www.bynder.com/en/)

**Posicionamento:**
- Foco forte em AI-powered DAM
- Posicionamento enterprise
- Membro da MACH Alliance
- 145+ integrações disponíveis

**Pontos Fortes:**
- Design limpo com showcase extensivo do produto
- Testemunhos de clientes em destaque
- Ênfase em ecossistema de integrações
- Cases de uso por indústria (retail, CPG, tecnologia)
- Seção de recursos bem organizada

**O que podemos aplicar:**
- Destacar casos de uso por indústria (moda, e-commerce, agências)
- Mostrar logo de clientes/integrações
- Testemunhos com métricas concretas
- Posicionamento "AI-first" nas mensagens

### 14.2 Brandfolder (https://brandfolder.com/)

**Posicionamento:**
- "The world's most powerfully simple brand asset management"
- Foco em simplicidade e usabilidade
- Soluções específicas por indústria

**Pontos Fortes:**
- Branding roxo com gradientes marcantes
- Histórias de clientes prominently featured
- Smart CDN como diferencial técnico
- UI muito clean e minimalista
- Demonstração interativa do produto

**O que podemos aplicar:**
- Gradientes visuais marcantes (já usamos ciano)
- Stories de clientes com resultados tangíveis
- Destacar simplicidade vs concorrentes complexos
- Demo interativa no hero (mockup funcional)

### 14.3 Canto (https://www.canto.com/)

**Posicionamento:**
- "AI-powered DAM Platform"
- Content Intelligence
- Canto XI AI como feature principal

**Pontos Fortes:**
- Ênfase em eficiência (20-25% de tempo economizado)
- Recursos de IA em destaque
- Cases de uso específicos
- Interface clean e profissional

**O que podemos aplicar:**
- Métricas de eficiência em destaque
- Features de IA já estão implementadas (tagging, rename)
- Usar linguagem de "economia de tempo"
- Cases de uso por setor

### 14.4 Insights Aplicáveis ao DAMazing

**Diferenciais a Explorar:**
1. **Simplicidade vs Complexidade:** Brandfolder vende "simples", Bynder vende "enterprise". DAMazing pode ser "simples mas profissional"
2. **IA como Feature Principal:** Todos usam IA como diferencial — DAMazing já tem isso (tags, rename)
3. **Casos por Indústria:** Foco em moda/e-commerce/agências (nosso nicho)
4. **Integrações:** Destacar integrações com ferramentas que agências já usam
5. **Prova Social:** Logos de clientes, testemunhos com métricas

**Mensagens Sugeridas:**
- "O Canva democratizou o design. A Dami democratiza o DAM." (já usado)
- "20-25% mais rápido que encontrar arquivos no Drive" (métrica do Canto)
- "Simples o suficiente para fotógrafos, poderoso para agências" (posicionamento Brandfolder + Bynder)
- "Sem curva de aprendizado. Sem implantação longa." (vs Adobe AEM)

---

## 15. Checklist de Entrega

- [x] Todas as 5 seções implementadas e responsivas
- [x] Navbar com comportamento de scroll e menu mobile
- [x] Footer completo com links
- [x] Animações GSAP em todas as seções com ScrollTrigger
- [x] CTA duplo funcional (botões com `href` correto ou modal)
- [x] FAQ accordion animado
- [x] Tabela comparativa com coluna Damazing em destaque
- [x] Fontes Inter + Syne carregando corretamente
- [x] SEO meta tags no `index.html`
- [x] Build sem erros TypeScript (`npm run build`)
- [x] Seção de substituição de ferramentas com logos corretos (Bynder, não Binder)
- [ ] Lighthouse Score: Performance > 85, SEO > 95
