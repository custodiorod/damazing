import type { ReactNode } from 'react'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="border-gradient group rounded-lg p-6 transition-shadow duration-300 hover:glow-purple">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-700/20 text-brand-200 ring-1 ring-brand-500/30">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-light text-white">{title}</h3>
      <p className="mt-4 text-base leading-7 text-zinc-300">{description}</p>
    </article>
  )
}

