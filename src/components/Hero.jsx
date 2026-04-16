import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'
import heroImg from '../assets/12.png'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="mb-16 rounded-3xl border border-slate-200/60 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 md:p-10"
    >
      <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">

        {/* Text side */}
        <div className="flex-1">
          <motion.h1
            variants={item}
            className="mb-4 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-pink-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl"
          >
            {portfolioData.name}
          </motion.h1>

          <motion.p variants={item} className="mb-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {portfolioData.tagline}
          </motion.p>

          <motion.p variants={item} className="mb-8 max-w-xl leading-7 text-slate-500 dark:text-slate-400">
            {portfolioData.about}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-100 dark:text-slate-900"
            >
              <FaGithub size={16} /> GitHub
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700"
            >
              <FaLinkedin size={16} /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Image side */}
        <motion.div
          variants={item}
          className="relative flex shrink-0 items-center justify-center"
        >
          {/* Rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute h-64 w-64 rounded-full bg-gradient-to-tr from-sky-400 via-fuchsia-400 to-pink-400 p-[3px] md:h-72 md:w-72"
          >
            <div className="h-full w-full rounded-full bg-slate-50 dark:bg-slate-950" />
          </motion.div>

          {/* Outer glow pulse */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-64 w-64 rounded-full bg-fuchsia-500/30 blur-2xl md:h-72 md:w-72"
          />

          {/* Profile image */}
          <motion.img
            src={heroImg}
            alt={portfolioData.name}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative z-10 h-56 w-56 rounded-full object-cover shadow-2xl ring-4 ring-white/60 dark:ring-slate-800/60 md:h-64 md:w-64"
          />

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-slate-200/60 bg-white/90 px-4 py-1.5 text-xs font-semibold shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
          >
            ✨ {portfolioData.role}
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  )
}
