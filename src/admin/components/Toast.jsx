import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, X } from 'lucide-react'

export default function Toast({ message, type, onClose }) {
  const isSuccess = type === 'success'
  
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed right-6 top-6 z-50"
        >
          <motion.div
            className={`relative overflow-hidden rounded-xl border backdrop-blur-xl shadow-2xl ${
              isSuccess
                ? 'border-emerald-500/50 bg-emerald-500/10'
                : 'border-red-500/50 bg-red-500/10'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className={`absolute inset-0 opacity-30 ${
                isSuccess
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            />

            <div className="relative flex items-center gap-3 px-6 py-4">
              {/* Animated icon */}
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                {isSuccess ? (
                  <CheckCircle className="text-emerald-400" size={24} />
                ) : (
                  <XCircle className="text-red-400" size={24} />
                )}
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-medium text-white"
              >
                {message}
              </motion.p>

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="ml-4 rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Progress bar */}
            <motion.div
              className={`h-1 ${
                isSuccess
                  ? 'bg-gradient-to-r from-emerald-400 to-cyan-400'
                  : 'bg-gradient-to-r from-red-400 to-pink-400'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
