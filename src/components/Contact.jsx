import { motion } from 'framer-motion'
import { Mail, MapPin } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="rounded-3xl border border-slate-200/70 bg-white/70 p-8 shadow-xl shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20"
    >
      <h2 className="mb-6 bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-2xl font-semibold text-transparent">
        Get in Touch
      </h2>
      <div className="mb-3 inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
        <MapPin size={16} /> {portfolioData.location}
      </div>
      <a
        href={`mailto:${portfolioData.email}`}
        className="mb-6 flex items-center gap-2 text-slate-600 transition hover:text-sky-500 dark:text-slate-300"
      >
        <Mail size={16} /> {portfolioData.email}
      </a>
      <div className="flex gap-4 text-sm font-semibold">
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={portfolioData.social.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-sky-500/10 px-4 py-2 text-sky-500 transition hover:bg-sky-500/20"
        >
          GitHub
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href={portfolioData.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-fuchsia-500/10 px-4 py-2 text-fuchsia-500 transition hover:bg-fuchsia-500/20"
        >
          LinkedIn
        </motion.a>
      </div>
    </motion.section>
  )
}
