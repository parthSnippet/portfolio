import { useMemo, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaReact } from 'react-icons/fa'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Resume from './components/Resume'
import CustomCursor from './components/CustomCursor'
import ScrollEffects from './components/ScrollEffects'
import { fetchPortfolioData } from './services/api'
import { portfolioData as fallbackData } from './data/portfolioData'

const orbs = [
  { className: 'left-[-6rem] top-10 h-72 w-72 bg-fuchsia-500/20', lightClass: 'bg-purple-300/30', x: [0, 20, -10, 0], y: [0, -15, 15, 0], duration: 14 },
  { className: 'right-[-6rem] top-60 h-80 w-80 bg-cyan-500/20', lightClass: 'bg-blue-300/30', x: [0, -15, 15, 0], y: [0, 20, -10, 0], duration: 16 },
  { className: 'left-1/2 bottom-20 h-64 w-64 bg-sky-500/10', lightClass: 'bg-indigo-300/25', x: [0, 10, -10, 0], y: [0, -10, 10, 0], duration: 18 },
]

export default function App() {
  const { dark, toggle } = useTheme()
  const [portfolioData, setPortfolioData] = useState(fallbackData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPortfolioData()
      if (data) setPortfolioData(data)
      setLoading(false)
    }
    loadData()
  }, [])

  const themeClass = useMemo(
    () => (dark ? 'bg-slate-950 text-slate-100' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-900'),
    [dark],
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  return (
    <main className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${themeClass}`} style={{ cursor: 'none' }}>
      <ScrollEffects />
      <CustomCursor dark={dark} />

      {/* Floating React icon across entire page */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: 1,
          y: [0, -30, 0],
          rotate: [0, 360],
        }}
        transition={{
          opacity: { duration: 4, repeat: Infinity },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.6 }
        }}
        whileHover={{ 
          scale: 3, 
          opacity: 1,
          rotate: 0,
          transition: { duration: 0.4 }
        }}
        className="fixed left-8 top-1/3 z-30 hidden lg:block"
      >
        <FaReact className="text-cyan-400 text-6xl drop-shadow-2xl" />
      </motion.div>

      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{ x: orb.x, y: orb.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: 'linear' }}
          className={`pointer-events-none absolute rounded-full blur-3xl ${dark ? orb.className : orb.lightClass}`}
        />
      ))}

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-12">
        <Navbar dark={dark} toggle={toggle} portfolioData={portfolioData} />
        <Hero portfolioData={portfolioData} />
        <Skills portfolioData={portfolioData} />
        <Projects portfolioData={portfolioData} />
        <Resume portfolioData={portfolioData} />
        <Contact portfolioData={portfolioData} />
      </div>
    </main>
  )
}
