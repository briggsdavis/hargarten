import { useEffect, useRef, useState } from "react"
import { Routes, Route, useLocation } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import Lenis from "lenis"
import { LoadingScreen } from "./components/LoadingScreen"
import { Navbar } from "./components/Navbar"
import { CustomCursor } from "./components/CustomCursor"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Portfolio } from "./pages/Portfolio"
import { Services } from "./pages/Services"
import { Contact } from "./pages/Contact"
import { Footer } from "./components/Footer"
import { PropertyDetail } from "./components/PropertyDetail"
import type { Location } from "react-router"

// Freezes the location at mount so the old page stays visible during its exit animation
// (prevents Routes from switching to the new page inside the exiting div)
const FrozenRoutes = ({ location }: { location: Location }) => {
  const [frozenLocation] = useState(location)
  return (
    <Routes location={frozenLocation}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:id" element={<PropertyDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
  }, [location.pathname])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar />

            <main className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FrozenRoutes location={location} />
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
