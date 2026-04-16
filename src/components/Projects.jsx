import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Projects() {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-semibold">Featured Projects</h2>
      <motion.div
        className="grid gap-5 md:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {portfolioData.projects.map((project) => (
          <motion.article
            key={project.title}
            variants={card}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/75 p-6 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-2 ring-sky-400/50 transition-opacity duration-300 group-hover:opacity-100" />

            <h3 className="mb-3 text-xl font-semibold">{project.title}</h3>
            <p className="mb-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {project.description}
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-sky-500/10 px-2 py-1 text-xs font-semibold text-sky-500"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-flex items-center gap-1 text-sm font-semibold text-sky-500 transition-all group-hover:gap-2"
              target="_blank"
              rel="noreferrer"
            >
              View project <ArrowUpRight size={15} />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
