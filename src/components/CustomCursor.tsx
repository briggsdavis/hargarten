import { motion, useMotionValue } from "motion/react"
import { useEffect, useState } from "react"

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches

  // const springConfig = { damping: 30, stiffness: 500, mass: 0.3 }
  // const cursorXSpring = useSpring(cursorX, springConfig)
  // const cursorYSpring = useSpring(cursorY, springConfig)

  const [isHovering, setIsHovering] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, .interactive, input, select, textarea")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Main Dot */}
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-white"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          scale: isMouseDown ? 0.8 : 1,
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="absolute h-8 w-8 rounded-full border border-white"
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      />
    </motion.div>
  )
}
