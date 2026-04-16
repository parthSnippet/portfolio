import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills() {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-2xl font-semibold">Skills</h2>
      <motion.div
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {portfolioData.skills.map((group) => (
          <motion.div
            key={group.category}
            variants={card}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="rounded-2xl border border-slate-200/70 bg-white/75 p-5 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl">{group.icon}</span>
              <span className={`bg-gradient-to-r ${group.color} bg-clip-text text-sm font-bold text-transparent`}>
                {group.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className={`rounded-full ${group.bg} ${group.text} px-3 py-1 text-xs font-semibold`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
