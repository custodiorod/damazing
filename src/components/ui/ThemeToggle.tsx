import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Ativar modo escuro' : 'Ativar modo claro'}
      className="relative inline-flex h-9 w-16 items-center rounded-full border border-white/10 bg-white/5 px-1 focus:outline-none"
      style={{
        backgroundColor: isLight ? '#e0f2fe' : 'rgba(255,255,255,0.06)',
        borderColor: isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.10)',
      }}
    >
      {/* Thumb deslizante */}
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full shadow-md"
        style={{
          transform: isLight ? 'translateX(28px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
          backgroundColor: isLight ? '#0ea5e9' : '#1e3a5f',
        }}
      >
        {isLight
          ? <Sun size={14} className="text-white" />
          : <Moon size={14} className="text-cyan-300" />
        }
      </span>
    </button>
  )
}
