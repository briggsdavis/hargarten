import { motion } from "motion/react"
import { useEffect } from "react"

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2600) // Text ~1.2s, underline finishes at 2.5s → tiny buffer then exit
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-parchment"
    >
      <div className="relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-3xl tracking-tighter text-primary md:text-5xl"
        >
          Hargarten Properties Sàrl-s
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="absolute -bottom-4 left-0 h-[1px] w-full origin-left bg-primary opacity-30"
        />
      </div>
    </motion.div>
  )
}
