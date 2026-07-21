import { motion } from 'framer-motion'
import { portfolioData as fallbackData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Skills({ portfolioData: data }) {
  const portfolioData = data || fallbackData
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-20"
    >
      {/* Section Header */}
      <div className="mb-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-4xl font-bold bg-gradient-to-r from-sky-500 to-fuchsia-500 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400"
        >
          Technologies I work with
        </motion.p>
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {portfolioData.skills.map((group, index) => (
          <motion.div
            key={group.category}
            variants={card}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300 dark:border-slate-800/50 dark:bg-slate-900/80 dark:hover:shadow-fuchsia-500/20"
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500 via-fuchsia-500 to-sky-500 opacity-20 blur-xl" />
            </div>

            <div className="relative p-6">
              {/* Icon & Category */}
              <div className="mb-5 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-fuchsia-500/20 text-2xl backdrop-blur-sm border border-sky-500/30"
                >
                  {group.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {group.category}
                  </h3>
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500" />
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.15, y: -2 }}
                    className="rounded-lg bg-gradient-to-r from-sky-500/10 to-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 border border-sky-500/20 backdrop-blur-sm cursor-default shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-sky-500/10 to-fuchsia-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
