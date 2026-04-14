import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-700 to-brand-500 text-white font-semibold hover:from-brand-600 hover:to-brand-400 shadow-lg hover:shadow-brand-700/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
  ghost: 'text-brand-200 hover:text-white hover:bg-white/5 transition-all duration-200',
  outline:
    'border border-brand-500/40 text-brand-200 hover:border-brand-400 hover:text-white hover:bg-brand-900/30 transition-all duration-200',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-lg',
  lg: 'px-7 py-4 text-base sm:text-lg rounded-lg',
}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  return (
    <a ref={ref} className={cn('inline-flex items-center justify-center gap-2 whitespace-nowrap', variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  )
})
