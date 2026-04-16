import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

const orbs = [
  { className: 'left-[-6rem] top-10 h-72 w-72 bg-fuchsia-500/20', x: [0, 20, -10, 0], y: [0, -15, 15, 0], duration: 14 },
  { className: 'right-[-6rem] top-60 h-80 w-80 bg-cyan-500/20', x: [0, -15, 15, 0], y: [0, 20, -10, 0], duration: 16 },
  { className: 'left-1/2 bottom-20 h-64 w-64 bg-sky-500/10', x: [0, 10, -10, 0], y: [0, -10, 10, 0], duration: 18 },
]

export default function App() {
  const { dark, toggle } = useTheme()

  const themeClass = useMemo(
    () => (dark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'),
    [dark],
  )

  return (
    <main className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${themeClass}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'linear' }}
          className={`pointer-events-none absolute rounded-full blur-3xl ${orb.className}`}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-12">
        <Navbar dark={dark} toggle={toggle} />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
