import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import cursorImg from '../assets/cursor.png'
import pointerImg from '../assets/cursor-2.png'

export default function CustomCursor({ dark }) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const [isPointer, setIsPointer] = useState(false)
  const [trails, setTrails] = useState([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      
      // Add trail particle (reduced to 4 for performance)
      setTrails((prev) => [
        ...prev.slice(-3),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])

      // Check if hovering over clickable element
      const target = e.target
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  // Remove old trails
  useEffect(() => {
    const timer = setInterval(() => {
      setTrails((prev) => prev.slice(-3))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const currentCursor = isPointer ? pointerImg : cursorImg

  return (
    <>
      {/* Trail particles - reduced count */}
      {trails.map((trail, i) => (
        <motion.img
          key={trail.id}
          src={currentCursor}
          initial={{ opacity: 0.3, scale: 0.5 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            left: trail.x,
            top: trail.y,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
          className="h-5 w-5"
        />
      ))}

      {/* Main cursor with spring physics */}
      <motion.img
        src={currentCursor}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          position: 'fixed',
          left: -16,
          top: -16,
          pointerEvents: 'none',
          zIndex: 10000,
        }}
        animate={{
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
        className="h-8 w-8 drop-shadow-lg"
      />
    </>
  )
}
