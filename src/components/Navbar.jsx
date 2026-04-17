import { motion, AnimatePresence } from 'framer-motion'
import { MoonStar, SunMedium } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Navbar({ dark, toggle, portfolioData: data }) {
  const portfolioData = data || portfolioData
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

      {/* Theme Toggle */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.88 }}
        className={`relative flex h-12 w-24 shrink-0 cursor-pointer items-center rounded-full border p-1 shadow-lg transition-colors duration-500 ${
          dark
            ? 'border-slate-700 bg-slate-900 shadow-slate-900/50'
            : 'border-amber-200 bg-amber-50 shadow-amber-200/50'
        }`}
      >
        {/* Track stars (dark) */}
        <AnimatePresence>
          {dark && (
            <motion.div
              key="stars"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden rounded-full"
            >
              {[
                { top: '20%', left: '20%', size: 1.5, delay: 0 },
                { top: '55%', left: '30%', size: 1, delay: 0.1 },
                { top: '30%', left: '50%', size: 1.5, delay: 0.2 },
                { top: '65%', left: '55%', size: 1, delay: 0.15 },
                { top: '20%', left: '70%', size: 1, delay: 0.05 },
              ].map((star, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5 + i * 0.3, repeat: Infinity, delay: star.delay }}
                  style={{
                    position: 'absolute',
                    top: star.top,
                    left: star.left,
                    width: star.size,
                    height: star.size,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Track sun rays (light) */}
        <AnimatePresence>
          {!dark && (
            <motion.div
              key="rays"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden rounded-full"
            >
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 20,
                    height: 1.5,
                    borderRadius: 2,
                    backgroundColor: '#f59e0b',
                    transformOrigin: '0 50%',
                    transform: `rotate(${i * 60}deg) translateX(6px)`,
                    marginTop: -0.75,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sliding knob */}
        <motion.div
          layout
          animate={{
            x: dark ? 0 : 48,
            rotate: dark ? 0 : 360,
            backgroundColor: dark ? '#1e293b' : '#fbbf24',
            boxShadow: dark
              ? '0 0 10px 3px rgba(139,92,246,0.6), 0 0 20px 6px rgba(139,92,246,0.2)'
              : '0 0 10px 3px rgba(251,191,36,0.7), 0 0 20px 6px rgba(251,191,36,0.3)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border"
          style={{
            borderColor: dark ? 'rgba(139,92,246,0.4)' : 'rgba(251,191,36,0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {dark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <MoonStar size={16} className="text-violet-300" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <SunMedium size={16} className="text-amber-900" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </motion.header>
  )
}
