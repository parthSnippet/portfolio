import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { portfolioData } from '../data/portfolioData'

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
      <motion.h1
        variants={item}
        className="mb-4 bg-gradient-to-r from-sky-400 via-fuchsia-400 to-pink-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl"
      >
        {portfolioData.name}
      </motion.h1>

      <motion.p variants={item} className="mb-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
        {portfolioData.tagline}
      </motion.p>

      <motion.p variants={item} className="mb-8 max-w-3xl leading-7 text-slate-500 dark:text-slate-400">
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
    </motion.section>
  )
}
