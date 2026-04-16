import { useEffect, useState } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return { dark, toggle: () => setDark((v) => !v) }
}
