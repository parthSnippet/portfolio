import { motion } from 'framer-motion'
import { MoonStar, SunMedium } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Navbar({ dark, toggle }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-center justify-between gap-4"
    >
      <span className="whitespace-nowrap rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-500">
        {portfolioData.role}
      </span>

      <button
        onClick={toggle}
        className="flex shrink-0 items-center gap-2 rounded-full border border-slate-300/80 bg-white/60 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900/60"
      >
        {dark ? <SunMedium size={16} /> : <MoonStar size={16} />}
        <span className="hidden sm:inline">{dark ? 'Light mode' : 'Dark mode'}</span>
      </button>
    </motion.header>
  )
}
