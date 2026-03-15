import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { PROPERTIES, SERVICES } from "../constants"
import { useAdmin } from "../context/AdminContext"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

const MotionLocaleLink = motion(LocaleLink)

const HERO_IMAGES = ["/hr.jpg", "/potential.jpg", "/potential1.jpg"]

export const Home = () => {
  const { portfolioLive } = useAdmin()
  const { t, locale } = useLocale()
  const heroRef = useRef<HTMLElement>(null)
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const dividerRef = useRef<HTMLElement>(null)
  const { scrollYProgress: dividerScroll } = useScroll({
    target: dividerRef,
    offset: ["start end", "end start"],
  })
  const dividerParallaxY = useTransform(dividerScroll, [0, 1], ["-12%", "12%"])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.6, filter: "blur(20px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={heroIndex}
                src={HERO_IMAGES[heroIndex]}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-3xl md:text-5xl text-parchment font-serif tracking-tighter mb-6"
          >
            {t("home_hero_title")}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-parchment/80 text-sm uppercase tracking-[0.3em] font-medium"
          >
            {t("home_hero_subtitle", { year: String(new Date().getFullYear()) })}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="md:hidden mt-10"
          >
            <LocaleLink
              to="/contact"
              className="inline-block border border-parchment/60 text-parchment px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-parchment hover:text-primary transition-colors duration-300 interactive"
            >
              {t("contact_title")}
            </LocaleLink>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-8 md:px-24 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-12 leading-tight">
              {t("home_intro_heading")}
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed mb-8">{t("home_intro_text")}</p>
            <LocaleLink
              to="/about"
              className="group flex items-start gap-4 text-xs uppercase tracking-widest font-bold interactive"
            >
              <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors">
                {t("home_discover_values")}
              </span>
            </LocaleLink>
            <p className="mt-8 text-sm italic text-primary/40">{t("about_process_slogan")}</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - shown/hidden based on admin portfolio toggle */}
      <section className="py-32 px-8 md:px-24 bg-white">
        {portfolioLive ? (
          <>
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-primary">
                {t("home_select_residences")}
              </h2>
              <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">
                {t("home_explore_properties")}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {PROPERTIES.slice(0, 3).map((prop, idx) => (
                <MotionLocaleLink
                  key={prop.id}
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  to="/portfolio"
                  className={`${
                    idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : "md:col-span-12"
                  } group relative overflow-hidden interactive`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-serif">{prop.title}</h3>
                      <p className="text-xs text-primary/50 uppercase tracking-widest mt-1">
                        {prop.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">From &euro;{prop.price}</p>
                      <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">
                        {prop.type}
                      </p>
                    </div>
                  </div>
                </MotionLocaleLink>
              ))}
            </div>

            <div className="mt-20 flex justify-center">
              <LocaleLink
                to="/portfolio"
                className="bg-primary text-parchment px-12 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors interactive"
              >
                {t("home_explore_portfolio")}
              </LocaleLink>
            </div>
          </>
        ) : (
          /* Coming Soon block - displayed when portfolio is toggled OFF in admin */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-start justify-center py-16 max-w-xl"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-6">
              {t("home_residences")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight mb-6">
              {t("home_coming_soon_title")}
            </h2>
            <p className="text-sm text-primary/50 leading-relaxed">{t("home_coming_soon_text")}</p>
            <LocaleLink
              to="/contact"
              className="mt-10 text-xs uppercase tracking-widest font-bold border-b border-primary/30 pb-1 hover:border-primary transition-colors interactive"
            >
              {t("home_early_access")}
            </LocaleLink>
          </motion.div>
        )}
      </section>

      {/* Full-width Parallax Divider */}
      <section ref={dividerRef} className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          style={{ y: dividerParallaxY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img src="/paralax.jpg" alt="Luxury interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </section>

      {/* Services Showcase */}
      <section className="bg-parchment py-24 px-8 md:px-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40">
            {t("home_what_we_offer")}
          </p>
        </motion.div>

        {/* Two-column image grid - mirrors the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((service, idx) => (
            <MotionLocaleLink
              key={service.title}
              to="/services"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
              className="group cursor-pointer interactive"
            >
              {/* Portrait image - 30% shorter than the original 3/4 */}
              <div className="aspect-[3/2.8] overflow-hidden mb-5">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption row */}
              <div className="flex items-center justify-between border-t border-primary/10 pt-5">
                <span className="border-b border-primary/30 pb-1 group-hover:border-primary text-[11px] uppercase tracking-[0.25em] font-bold text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {service.localizedTitle?.[locale] ?? service.title}
                </span>
              </div>
            </MotionLocaleLink>
          ))}
        </div>

        {/* Text block + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="w-full"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8 tracking-tighter leading-tight">
            {t("home_services_heading")}
          </h2>
          <LocaleLink
            to="/services"
            className="group flex items-center gap-5 text-xs uppercase tracking-widest font-bold interactive"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
              {t("home_explore_services")}
            </span>
          </LocaleLink>
        </motion.div>
      </section>
    </div>
  )
}
