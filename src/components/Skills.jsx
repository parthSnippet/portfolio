import { motion } from 'framer-motion'
import { portfolioData as fallbackData } from '../data/portfolioData'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills({ portfolioData: data }) {
  const portfolioData = data || fallbackData
  return (
    <motion.section 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-16"
    >
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
            className="rounded-2xl border border-indigo-200/80 bg-white/90 p-5 shadow-xl shadow-indigo-100/50 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-2xl dark:shadow-purple-500/20"
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
    </motion.section>
  )
}
