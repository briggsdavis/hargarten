import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { useState, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { SERVICES } from "../constants"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Services = () => {
  const { t, locale } = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className="relative bg-parchment">
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: parallaxY }}
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
          >
            <img src="/luxembourg.jpg" alt="Services" className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl font-serif text-parchment tracking-tighter"
          >
            {t("services_hero_title")}
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <div className="pt-24 pb-16 px-8 md:px-24 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl text-primary/70 leading-relaxed"
        >
          {t("services_intro")}
        </motion.p>
      </div>

      {/* Services Accordion */}
      <div className="pb-32 px-8 md:px-24 max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border-b border-primary/10">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-10 flex justify-between items-center text-left interactive group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-xs font-medium text-primary/30 font-mono">0{idx + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-serif">{service.title}</h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ChevronDown size={32} strokeWidth={1} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-16">
                      {/* Top row: overview text + image */}
                      <div className="pl-16 md:pl-24 pr-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-base text-primary/65 leading-relaxed"
                        >
                          {service.localizedOverview?.[locale] ?? service.overview}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.94, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                          className="relative overflow-hidden aspect-[80/69]"
                        >
                          <motion.img
                            src={service.image}
                            alt={service.title}
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-primary/10" />
                        </motion.div>
                      </div>

                      {/* Optional subtitle */}
                      {(service.localizedSubtitle?.[locale] ?? service.subtitle) && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-[10px] uppercase tracking-[0.3em] text-primary/40 font-bold mb-4 pl-16 md:pl-24 pr-8"
                        >
                          {service.localizedSubtitle?.[locale] ?? service.subtitle}
                        </motion.p>
                      )}

                      {/* Numbered sub-services — full width */}
                      <div className="flex flex-col">
                        {(service.localizedSubServices?.[locale] ?? service.subServices).map((sub, sIdx) => (
                          <motion.div
                            key={sIdx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + sIdx * 0.06 }}
                            className="grid grid-cols-[64px_1fr] md:grid-cols-[96px_1fr] border-t border-primary/10 py-5 pr-8"
                          >
                            <span className="text-xs font-mono text-primary/25 pt-0.5">
                              {String(sIdx + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h4 className="text-sm font-semibold text-primary tracking-wide mb-1.5">
                                {sub.title}
                              </h4>
                              <ul className="flex flex-col gap-1">
                                {sub.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="text-sm text-primary/55 leading-relaxed">
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Legal Authority Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 bg-primary text-parchment flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/3">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-60">
              {t("services_legal_label")}
            </h4>
            <h3 className="text-4xl font-serif leading-tight">{t("services_legal_heading")}</h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg opacity-80 leading-relaxed">{t("services_legal_text")}</p>
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
            className="relative aspect-[4/3] md:aspect-auto overflow-hidden"
          >
            <img src="/servicesbottom.jpg" alt="Portfolio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col justify-center px-12 md:px-20 py-24"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-8">
              {t("services_cta_label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tighter leading-tight mb-8">
              {t("services_cta_heading")}
            </h2>
            <p className="text-base text-primary/60 leading-relaxed mb-14 max-w-sm">
              {t("services_cta_text")}
            </p>
            <LocaleLink
              to="/portfolio"
              className="group inline-flex items-center text-[11px] uppercase tracking-widest font-bold interactive self-start"
            >
              <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
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
