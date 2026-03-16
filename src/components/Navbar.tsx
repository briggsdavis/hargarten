import { motion, AnimatePresence } from "motion/react"
import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router"
import { useAdmin } from "../context/AdminContext"
import { useLocale } from "../i18n/LocaleContext"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { isLocale } from "../i18n/locales"

const ALL_MENU_ITEMS = [
  { nameKey: "nav_home", id: "home", image: "/lux.jpg" },
  { nameKey: "nav_about", id: "about", image: "/aboutt.jpg" },
  { nameKey: "nav_portfolio", id: "portfolio", image: "/servicesnav.jpg" },
  { nameKey: "nav_services", id: "services", image: "/city.jpg" },
  { nameKey: "nav_contact", id: "contact", image: "/finalcontact.jpg" },
]

// Pages that open with a dark full-image hero - navbar text should be white at the top
const HERO_BARE_PATHS = ["/", "/about", "/services"]

/** Get the path without locale prefix */
function barePath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments[0] && isLocale(segments[0])) return "/" + segments.slice(1).join("/")
  return pathname === "" ? "/" : pathname
}

export const Navbar = () => {
  const location = useLocation()
  const { portfolioLive } = useAdmin()
  const { t, localePath } = useLocale()
  const MENU_ITEMS = portfolioLive
    ? ALL_MENU_ITEMS
    : ALL_MENU_ITEMS.filter((item) => item.id !== "portfolio")
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
  const bare = barePath(location.pathname)
  const isOnHero = HERO_BARE_PATHS.includes(bare) && scrollY < 80
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
        className={`fixed top-0 left-0 w-full z-[100] px-4 py-5 md:px-8 md:py-8 flex items-center transition-colors duration-300 ${textClass} ${bgClass}`}
      >
        {/* Left: Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col gap-[6px] group interactive p-2"
        >
          <span className="block w-6 h-[1.5px] bg-current" />
          <span className="block w-4 h-[1.5px] bg-current" />
        </button>

        {/* Center: Logo - absolutely centered regardless of button widths */}
        <Link
          to={localePath("/")}
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer interactive"
        >
          <img
            src={isOnHero ? "/logo.png" : "/inverted.png"}
            alt="Hargarten Properties"
            className={`h-9 md:h-11 w-auto object-contain transition-all duration-300 ${isOnHero ? "brightness-0 invert" : ""}`}
          />
        </Link>

        {/* Right: Language Switcher + Contact Button */}
        <div className="ml-auto flex items-center gap-4 md:gap-6">
          <LanguageSwitcher />
          <Link
            to={localePath("/contact")}
            className={`hidden md:inline-block text-[11.5px] uppercase tracking-widest font-bold border ${borderClass} px-[18px] py-[9px] transition-all duration-300 ${contactHover} interactive`}
          >
            {t("nav_contact")}
          </Link>
        </div>
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
            {/* Logo - centred at the top, mirrors its position on the navbar */}
            <Link
              to={localePath("/")}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer interactive"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/logo.png"
                alt="Hargarten Properties"
                className="h-9 md:h-11 w-auto object-contain"
              />
            </Link>

            {/* Contact button - top-right corner of the whole overlay (desktop only) */}
            <Link
              to={localePath("/contact")}
              onClick={() => setIsOpen(false)}
              className="hidden md:block absolute top-8 right-8 z-10 text-[11.5px] uppercase tracking-widest font-bold border border-primary text-primary px-[18px] py-[9px] transition-all duration-300 hover:bg-primary hover:text-parchment interactive"
            >
              {t("nav_contact")}
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
                      to={localePath(item.id === "home" ? "/" : `/${item.id}`)}
                      end={item.id === "home"}
                      onMouseEnter={() => setHoveredItem(item)}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }: { isActive: boolean }) =>
                        `text-[1.3rem] md:text-[2.1rem] font-serif text-left interactive ${
                          isActive ? "text-primary" : "text-primary/30 hover:text-primary"
                        } transition-colors`
                      }
                    >
                      {t(item.nameKey)}
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
