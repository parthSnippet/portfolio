import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollEffects() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-sky-400 via-fuchsia-400 to-pink-400"
      />

      {/* Floating particles on scroll */}
      <motion.div
        style={{
          y: useSpring(scrollYProgress, { stiffness: 50, damping: 20 }),
          opacity: scrollYProgress,
        }}
        className="pointer-events-none fixed right-8 top-1/2 z-40 hidden lg:block"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="mb-4 h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400"
          />
        ))}
      </motion.div>
    </>
  )
}
