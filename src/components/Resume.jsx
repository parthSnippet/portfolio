import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Eye, FileText, X } from 'lucide-react'
import { portfolioData as fallbackData } from '../data/portfolioData'

export default function Resume({ portfolioData: data }) {
  const portfolioData = data || fallbackData
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mb-16"
      >
        {/* Card */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/80 bg-white/90 p-8 shadow-2xl shadow-purple-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-2xl dark:shadow-purple-500/30"
        >
          {/* Background gradient blob */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br from-sky-400/20 to-fuchsia-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-to-tr from-fuchsia-400/20 to-pink-400/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Animated file icon */}
              <motion.div
                animate={{ rotate: [0, -6, 6, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-fuchsia-500 shadow-lg shadow-sky-500/30"
              >
                <FileText size={26} className="text-white" />
              </motion.div>
              <div>
                <h2 className="text-xl font-bold">My Resume</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  View or download my latest resume
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-sm font-semibold shadow-sm transition dark:border-slate-700 dark:bg-slate-800/80"
              >
                <Eye size={15} /> Preview
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={portfolioData.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:shadow-sky-500/40"
              >
                <Download size={15} /> Download
              </motion.a>
            </div>
          </div>


        </motion.div>
      </motion.section>

      {/* Full-screen modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <FileText size={16} className="text-sky-400" /> Resume — {portfolioData.name}
                </div>
                <div className="flex items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={portfolioData.resume}
                    download
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <Download size={13} /> Download
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setOpen(false)}
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* PDF iframe */}
              <iframe
                src={portfolioData.resume}
                className="flex-1 w-full"
                title="Resume full view"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
