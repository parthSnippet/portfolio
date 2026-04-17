import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { SiTailwindcss, SiJavascript, SiMongodb } from 'react-icons/si'
import { portfolioData as fallbackData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const techIcons = [
  { Icon: SiJavascript, color: 'text-yellow-400', position: 'top-16 right-12', delay: 0.2 },
  { Icon: FaNodeJs, color: 'text-green-500', position: 'bottom-20 left-16', delay: 0.4 },
  { Icon: SiTailwindcss, color: 'text-sky-400', position: 'bottom-12 right-8', delay: 0.6 },
  { Icon: FaPython, color: 'text-blue-500', position: 'top-32 left-24', delay: 0.3 },
  { Icon: SiMongodb, color: 'text-emerald-500', position: 'top-24 right-24', delay: 0.5 },
]

export default function Hero({ portfolioData: data }) {
  const portfolioData = data || fallbackData
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative mb-16 overflow-hidden rounded-3xl border border-indigo-200/80 bg-white/90 p-6 shadow-2xl shadow-indigo-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 md:p-10"
    >
      {/* Floating tech icons */}
      {techIcons.map(({ Icon, color, position, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: 1,
            y: [0, -15, 0],
          }}
          transition={{
            opacity: { duration: 3, repeat: Infinity, delay },
            y: { duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay },
            scale: { duration: 0.5, delay: delay + 0.2 }
          }}
          whileHover={{ 
            scale: 2, 
            rotate: 360,
            opacity: 1,
            zIndex: 50,
            transition: { duration: 0.4 }
          }}
          className={`absolute ${position} hidden md:block`}
        >
          <Icon className={`${color} text-3xl drop-shadow-lg`} />
        </motion.div>
      ))}

      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

        {/* Text side */}
        <div className="relative z-10 flex-1 text-center md:text-left">
          <motion.h1
            variants={item}
            whileHover={{ 
              backgroundPosition: ['0% 50%', '100% 50%'],
              transition: { duration: 0.8, ease: 'easeInOut' }
            }}
            style={{ backgroundSize: '200% 200%' }}
            className="mb-3 cursor-default bg-gradient-to-r from-sky-400 via-fuchsia-400 to-pink-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-6xl">
            {portfolioData.name}
          </motion.h1>

          <motion.p variants={item} className="mb-3 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            {portfolioData.tagline}
          </motion.p>

          <motion.p variants={item} className="mb-6 leading-7 text-sm text-slate-500 dark:text-slate-400 sm:text-base">
            {portfolioData.about}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-3 md:justify-start">
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

      </div>
    </motion.section>
  )
}
