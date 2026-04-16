import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('damazing-theme')
    return (saved === 'light' || saved === 'dark') ? saved : 'dark'
  })

  useEffect(() => {
    const body = document.body
    if (theme === 'light') {
      body.classList.add('light-mode')
      body.classList.remove('dark-mode')
    } else {
      body.classList.remove('light-mode')
      body.classList.add('dark-mode')
    }
    localStorage.setItem('damazing-theme', theme)
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggle }
}
