import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router"

const MENU_ITEMS = [
  {
    name: "Home",
    id: "home",
    image: "/lux.jpg",
  },
  {
    name: "About",
    id: "about",
    image:
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Portfolio",
    id: "portfolio",
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Services",
    id: "services",
    image: "/servicesnav.jpg",
  },
  {
    name: "Contact",
    id: "contact",
    image: "/contactnav.jpg",
  },
]

// Pages that open with a dark full-image hero — navbar text should be white at the top
const HERO_PATHS = ["/", "/about", "/services"]

export const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(MENU_ITEMS[0])
  const [isVisible, setIsVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setIsVisible(y < lastY || y < 80)
      setScrollY(y)
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Use white when overlapping a dark hero image, black/primary otherwise
  const isOnHero = HERO_PATHS.includes(location.pathname) && scrollY < 80
  const textClass = isOnHero ? "text-white" : "text-primary"
  const borderClass = isOnHero ? "border-white" : "border-primary"
  const contactHover = isOnHero
    ? "hover:bg-white hover:text-primary"
    : "hover:bg-primary hover:text-parchment"
  // Show white background when scrolled down (not on hero)
  const bgClass = isOnHero ? "bg-transparent" : "bg-white/95 backdrop-blur-sm"

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -150 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] px-8 py-8 flex items-center transition-colors duration-300 ${textClass} ${bgClass}`}
      >
        {/* Left: Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col gap-[6px] group interactive p-2"
        >
          <span className="block w-6 h-[1.5px] bg-current" />
          <span className="block w-4 h-[1.5px] bg-current" />
        </button>

        {/* Center: Title — absolutely centered regardless of button widths */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-serif tracking-tighter cursor-pointer interactive whitespace-nowrap"
        >
          Hargarten Properties
        </Link>

        {/* Right: Contact Button */}
        <Link
          to="/contact"
          className={`ml-auto text-[11.5px] uppercase tracking-widest font-bold border ${borderClass} px-[18px] py-[9px] transition-all duration-300 ${contactHover} interactive`}
        >
          Contact
        </Link>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex"
          >
            {/* Title — centred at the top, mirrors its position on the navbar */}
            <Link
              to="/"
              className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-2xl font-serif text-primary tracking-tighter cursor-pointer interactive whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Hargarten Properties
            </Link>

            {/* Contact button — top-right corner of the whole overlay */}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 z-10 text-[11.5px] uppercase tracking-widest font-bold border border-primary text-primary px-[18px] py-[9px] transition-all duration-300 hover:bg-primary hover:text-parchment interactive"
            >
              Contact
            </Link>

            {/* Left Side: Menu Links */}
            <div className="w-full md:w-3/5 bg-parchment h-full flex flex-col justify-center px-12 md:px-24 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 left-8 text-primary interactive"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col gap-6">
                {MENU_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <NavLink
                      to={item.id === "home" ? "/" : `/${item.id}`}
                      end={item.id === "home"}
                      onMouseEnter={() => setHoveredItem(item)}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }: { isActive: boolean }) =>
                        `text-[1.3rem] md:text-[2.1rem] font-serif text-left interactive ${
                          isActive ? "text-primary" : "text-primary/30 hover:text-primary"
                        } transition-colors`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side: Image inset so edges don't touch the screen border */}
            <div className="hidden md:flex w-2/5 h-full bg-parchment items-center justify-center p-10">
              <div className="relative w-full h-[75%] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredItem.id}
                    src={hoveredItem.image}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
