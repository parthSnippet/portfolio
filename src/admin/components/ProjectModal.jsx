import { motion, AnimatePresence } from 'framer-motion'
import { X, Save } from 'lucide-react'

export default function ProjectModal({ isOpen, onClose, project, onSave, index }) {
  const isEdit = project !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const projectData = {
      title: formData.get('title'),
      description: formData.get('description'),
      stack: formData.get('stack').split(',').map(s => s.trim()).filter(s => s),
      link: formData.get('link'),
    }
    onSave(projectData, index)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-700 bg-slate-800/95 backdrop-blur-sm px-6 py-4">
                <h2 className="text-xl font-bold text-white">
                  {isEdit ? 'Edit Project' : 'Add New Project'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Project Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={project?.title || ''}
                    placeholder="Enter project title"
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    required
                    defaultValue={project?.description || ''}
                    placeholder="Describe your project"
                    rows={4}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                  />
                </div>

                {/* Tech Stack */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Tech Stack <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="stack"
                    required
                    defaultValue={project?.stack?.join(', ') || ''}
                    placeholder="React, Node.js, MongoDB (comma separated)"
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                  />
                  <p className="mt-1 text-xs text-slate-400">Separate technologies with commas</p>
                </div>

                {/* Project Link */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Project Link
                  </label>
                  <input
                    type="url"
                    name="link"
                    defaultValue={project?.link || ''}
                    placeholder="https://github.com/username/project (optional)"
                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                  />
                  <p className="mt-1 text-xs text-slate-400">Optional - Add GitHub, live demo, or project URL</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-fuchsia-500 px-4 py-2.5 font-semibold text-white shadow-lg transition hover:shadow-xl"
                  >
                    <Save size={18} />
                    {isEdit ? 'Update Project' : 'Add Project'}
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="rounded-lg border border-slate-600 bg-slate-700 px-6 py-2.5 font-semibold text-white transition hover:bg-slate-600"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
