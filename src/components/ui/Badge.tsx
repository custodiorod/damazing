import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: ReactNode
  glow?: boolean
}

export function Badge({ children, glow = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-brand-700/40 bg-brand-900/60 px-4 py-1.5 text-sm font-medium text-brand-200',
        glow && 'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
      {children}
    </span>
  )
}
