import { ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { useRef, useState } from "react"
import { SERVICES } from "../constants"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Services = () => {
  const { t, locale } = useLocale()
  const heroRef = useRef<HTMLElement>(null)
  const [openServices, setOpenServices] = useState<boolean[]>(
    SERVICES.map(() => false),
  )
  const toggleService = (idx: number) =>
    setOpenServices((prev) => prev.map((v, i) => (i === idx ? !v : v)))
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className="relative bg-parchment">
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative h-[60vh] w-full overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 -top-[15%] h-[130%] w-full"
          >
            <img
              src="/modernaboutservice.jpg"
              alt="Services"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif text-6xl tracking-tighter text-parchment md:text-8xl"
          >
            {t("services_hero_title")}
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <div className="mx-auto max-w-5xl px-8 pt-24 pb-16 md:px-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl leading-relaxed text-primary/70"
        >
          {t("services_intro")}
        </motion.p>
      </div>

      {/* Process Timeline Section */}
      <section className="bg-white/50 px-8 py-32 md:px-24 md:py-40">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="mb-20"
          >
            <p className="mb-4 text-xs tracking-[0.3em] text-primary/40 uppercase">
              {t("about_process_label")}
            </p>
            <h2 className="font-serif text-4xl tracking-tighter text-primary md:text-5xl">
              {t("about_process_heading")}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="space-y-16 md:space-y-20">
              {[
                {
                  step: "01",
                  title: t("about_process_step1_title"),
                  text: t("about_process_step1_text"),
                },
                {
                  step: "02",
                  title: t("about_process_step2_title"),
                  text: t("about_process_step2_text"),
                },
                {
                  step: "03",
                  title: t("about_process_step3_title"),
                  text: t("about_process_step3_text"),
                },
                {
                  step: "04",
                  title: t("about_process_step4_title"),
                  text: t("about_process_step4_text"),
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  className="flex gap-10 md:gap-16"
                >
                  {/* Step dot */}
                  <div className="flex w-9 shrink-0 flex-col items-center self-stretch md:w-11">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-parchment md:h-11 md:w-11">
                      <span className="text-xs font-bold tracking-widest text-primary/50">
                        {item.step}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className="mt-2 w-px flex-1 bg-primary/15" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <h3 className="mb-4 font-serif text-2xl tracking-tighter text-primary md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-lg leading-relaxed text-primary/65">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-primary/10 pt-16 sm:flex-row sm:items-center"
            >
              <p className="font-serif text-2xl tracking-tighter text-primary md:text-3xl">
                {t("about_process_cta")}
              </p>
              <LocaleLink
                to="/contact"
                className="inline-block shrink-0 border border-primary px-8 py-4 text-xs font-bold tracking-widest text-primary uppercase transition-colors duration-300 hover:bg-primary hover:text-parchment"
              >
                {t("about_process_cta_button")}
              </LocaleLink>
            </motion.div>
            <p className="mt-6 text-sm text-primary/40 italic">
              {t("about_process_slogan")}
            </p>
          </div>
        </div>
      </section>

      {/* Services — Two Columns */}
      <div className="mx-auto max-w-7xl px-8 pb-32 md:px-16">
        {/* Faint horizontal line connecting the two columns */}
        <div className="mb-12 hidden h-px bg-primary/10 md:block" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-0">
          {SERVICES.map((service, idx) => {
            const isOpen = openServices[idx]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="md:px-12"
              >
                {/* Service image */}
                <div className="relative mt-8 mb-8 aspect-[80/69] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.localizedTitle?.[locale] ?? service.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>

                {/* Accordion header: service number + title + toggle */}
                <button
                  onClick={() => toggleService(idx)}
                  className="interactive mb-0 flex w-full items-center justify-between border-t border-primary/10 pt-6 pb-6 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs font-medium text-primary/30">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl tracking-tighter text-primary md:text-3xl">
                      {service.localizedTitle?.[locale] ?? service.title}
                    </h3>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 shrink-0 text-primary/40"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8">
                        {/* Overview */}
                        <p className="mb-8 text-base leading-relaxed text-primary/65">
                          {service.localizedOverview?.[locale] ??
                            service.overview}
                        </p>

                        {/* Optional subtitle */}
                        {(service.localizedSubtitle?.[locale] ??
                          service.subtitle) && (
                          <p className="mb-4 text-xs font-bold tracking-[0.3em] text-primary/40 uppercase">
                            {service.localizedSubtitle?.[locale] ??
                              service.subtitle}
                          </p>
                        )}

                        {/* Numbered sub-services */}
                        <div className="flex flex-col">
                          {(
                            service.localizedSubServices?.[locale] ??
                            service.subServices
                          ).map((sub, sIdx) => (
                            <div
                              key={sIdx}
                              className="grid grid-cols-[40px_1fr] border-t border-primary/10 py-5"
                            >
                              <span className="pt-0.5 font-mono text-xs text-primary/25">
                                {String(sIdx + 1).padStart(2, "0")}
                              </span>
                              <div>
                                <h4 className="mb-1.5 text-sm font-semibold tracking-wide text-primary">
                                  {sub.title}
                                </h4>
                                <ul className="flex flex-col gap-1">
                                  {sub.bullets.map((bullet, bIdx) => (
                                    <li
                                      key={bIdx}
                                      className="text-justify text-sm leading-relaxed text-primary/55"
                                    >
                                      {bullet}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Legal Authority Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center gap-12 bg-primary p-12 text-parchment md:flex-row"
        >
          <div className="md:w-1/3">
            <h4 className="mb-4 text-xs font-bold tracking-[0.3em] uppercase opacity-60">
              {t("services_legal_label")}
            </h4>
            <h3
              className={`font-serif leading-tight ${locale === "lb" ? "text-2xl" : "text-4xl"}`}
            >
              {t("services_legal_heading")}
            </h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg leading-relaxed opacity-80">
              {t("services_legal_text")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Portfolio CTA */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden md:aspect-auto"
          >
            <img
              src="/i1.jpg"
              alt="Portfolio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col justify-center px-12 py-24 md:px-20"
          >
            <p className="mb-8 text-xs tracking-[0.3em] text-primary/40 uppercase">
              {t("services_cta_label")}
            </p>
            <h2 className="mb-8 font-serif text-4xl leading-tight tracking-tighter text-primary md:text-5xl">
              {t("services_cta_heading")}
            </h2>
            <p className="mb-14 max-w-sm text-base leading-relaxed text-primary/60">
              {t("services_cta_text")}
            </p>
            <LocaleLink
              to="/portfolio"
              className="group interactive inline-flex items-center self-start text-xs font-bold tracking-widest uppercase"
            >
              <span className="border-b border-primary/30 pb-1 transition-colors duration-300 group-hover:border-primary">
                {t("services_cta_link")}
              </span>
            </LocaleLink>
          </motion.div>
        </div>
      </section>
      <div className="pb-32" />
    </div>
  )
}
