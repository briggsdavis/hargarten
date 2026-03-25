import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { useRef, useState, useEffect } from "react"
import { PROPERTIES, SERVICES } from "../constants"
import { useAdmin } from "../context/AdminContext"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

const MotionLocaleLink = motion(LocaleLink)

const HERO_IMAGES = ["/modernhero1.jpg"]

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
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
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
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.6, filter: "blur(20px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 -top-[15%] h-[130%] w-full"
          >
            <AnimatePresence mode="sync">
              <motion.img
                key={heroIndex}
                src={HERO_IMAGES[heroIndex]}
                alt="Hero"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </AnimatePresence>
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 px-4 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-parchment mb-6 font-serif text-3xl tracking-tighter md:text-5xl"
          >
            {t("home_hero_title")}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-parchment/80 text-sm font-medium tracking-[0.3em] uppercase"
          >
            {t("home_hero_subtitle")}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 md:hidden"
          >
            <LocaleLink
              to="/contact"
              className="border-parchment/60 text-parchment hover:bg-parchment hover:text-primary interactive inline-block border px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors duration-300"
            >
              {t("contact_title")}
            </LocaleLink>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-parchment px-8 py-32 md:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-primary mb-12 font-serif text-3xl leading-tight md:text-5xl">
              {t("home_intro_heading")}
            </h2>
            <p className="text-primary/70 mb-8 text-lg leading-relaxed">
              {t("home_intro_text")}
            </p>
            <LocaleLink
              to="/services"
              className="group interactive flex items-start gap-4 text-xs font-bold tracking-widest uppercase"
            >
              <span className="border-primary/30 group-hover:border-primary border-b pb-1 transition-colors">
                {t("home_discover_values")}
              </span>
            </LocaleLink>
            <p className="text-primary/40 mt-8 text-sm italic">
              {t("about_process_slogan")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - shown/hidden based on admin portfolio toggle */}
      <section className="bg-white px-8 py-32 md:px-24">
        {portfolioLive ? (
          <>
            <div className="mb-16 flex items-end justify-between">
              <h2 className="text-primary font-serif text-4xl md:text-6xl">
                {t("home_select_residences")}
              </h2>
              <span className="mb-2 text-xs tracking-widest uppercase opacity-50">
                {t("home_explore_properties")}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {PROPERTIES.slice(0, 3).map((prop, idx) => (
                <MotionLocaleLink
                  key={prop.id}
                  initial={{ y: 60, opacity: 0, filter: "blur(10px)" }}
                  whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  to="/portfolio"
                  className={`${
                    idx === 0
                      ? "md:col-span-7"
                      : idx === 1
                        ? "md:col-span-5"
                        : "md:col-span-12"
                  } group interactive relative overflow-hidden`}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      src={prop.image}
                      alt={prop.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl">{prop.title}</h3>
                      <p className="text-primary/50 mt-1 text-xs tracking-widest uppercase">
                        {prop.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        From &euro;{prop.price}
                      </p>
                      <p className="text-primary/40 mt-1 text-xs tracking-widest uppercase">
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
                className="bg-primary text-parchment hover:bg-primary/90 interactive px-12 py-4 text-xs font-bold tracking-widest uppercase transition-colors"
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
            className="flex max-w-xl flex-col items-start justify-center py-16"
          >
            <p className="text-primary/40 mb-6 text-xs tracking-[0.3em] uppercase">
              {t("home_residences")}
            </p>
            <h2 className="text-primary mb-6 font-serif text-4xl leading-tight md:text-5xl">
              {t("home_coming_soon_title")}
            </h2>
            <p className="text-primary/50 text-sm leading-relaxed">
              {t("home_coming_soon_text")}
            </p>
            <LocaleLink
              to="/contact"
              className="border-primary/30 hover:border-primary interactive mt-10 border-b pb-1 text-xs font-bold tracking-widest uppercase transition-colors"
            >
              {t("home_early_access")}
            </LocaleLink>
          </motion.div>
        )}
      </section>

      {/* Full-width Parallax Divider */}
      <section
        ref={dividerRef}
        className="relative h-[70vh] w-full overflow-hidden"
      >
        <motion.div
          style={{ y: dividerParallaxY }}
          className="absolute inset-0 -top-[15%] h-[130%] w-full"
        >
          <img
            src="/esch.jpg"
            alt="Luxury interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </section>

      {/* Services Showcase */}
      <section className="bg-parchment px-8 py-24 md:px-16">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-primary/40 text-xs tracking-[0.3em] uppercase">
            {t("home_what_we_offer")}
          </p>
        </motion.div>

        {/* Two-column image grid - mirrors the reference */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((service, idx) => (
            <MotionLocaleLink
              key={service.title}
              to="/services"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
              className="group interactive cursor-pointer"
            >
              {/* Portrait image - 30% shorter than the original 3/4 */}
              <div className="mb-5 aspect-[3/2.8] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Caption row */}
              <div className="border-primary/10 flex items-center justify-between border-t pt-5">
                <span className="border-primary/30 group-hover:border-primary text-primary/60 group-hover:text-primary border-b pb-1 text-xs font-bold tracking-[0.25em] uppercase transition-colors duration-300">
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
          <h2 className="text-primary mb-8 font-serif text-3xl leading-tight tracking-tighter md:text-5xl">
            {t("home_services_heading")}
          </h2>
          <LocaleLink
            to="/services"
            className="group interactive flex items-center gap-5 text-xs font-bold tracking-widest uppercase"
          >
            <span className="border-primary/30 group-hover:border-primary border-b pb-1 transition-colors duration-300">
              {t("home_explore_services")}
            </span>
          </LocaleLink>
        </motion.div>
      </section>
    </div>
  )
}
