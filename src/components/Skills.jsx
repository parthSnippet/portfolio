import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'
import { portfolioData } from '../data/portfolioData'

export default function Skills() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="mb-16"
    >
      <h2 className="mb-6 inline-flex items-center gap-2 text-2xl font-semibold">
        <Code2 size={20} /> Skills
      </h2>
      <div className="flex flex-wrap gap-3">
        {portfolioData.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, y: -3 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
            className="cursor-default rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.section>
  )
}
