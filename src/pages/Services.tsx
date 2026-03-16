import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { useState, useRef } from "react"
import { SERVICES } from "../constants"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const Services = () => {
  const { t, locale } = useLocale()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div className="bg-parchment relative">
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
              src="/hr.jpg"
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
            className="text-parchment font-serif text-6xl tracking-tighter md:text-8xl"
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
          className="text-primary/70 text-xl leading-relaxed"
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
            <p className="text-primary/40 mb-4 text-xs tracking-[0.3em] uppercase">
              {t("about_process_label")}
            </p>
            <h2 className="text-primary font-serif text-4xl tracking-tighter md:text-5xl">
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
                    <div className="border-primary/20 bg-parchment flex h-9 w-9 shrink-0 items-center justify-center rounded-full border md:h-11 md:w-11">
                      <span className="text-primary/50 text-xs font-bold tracking-widest">
                        {item.step}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className="bg-primary/15 mt-2 w-px flex-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <h3 className="text-primary mb-4 font-serif text-2xl tracking-tighter md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-primary/65 text-lg leading-relaxed">
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
              className="border-primary/10 mt-20 flex flex-col items-start justify-between gap-8 border-t pt-16 sm:flex-row sm:items-center"
            >
              <p className="text-primary font-serif text-2xl tracking-tighter md:text-3xl">
                {t("about_process_cta")}
              </p>
              <LocaleLink
                to="/contact"
                className="border-primary text-primary hover:bg-primary hover:text-parchment inline-block shrink-0 border px-8 py-4 text-xs font-bold tracking-widest uppercase transition-colors duration-300"
              >
                {t("about_process_cta_button")}
              </LocaleLink>
            </motion.div>
            <p className="text-primary/40 mt-6 text-sm italic">
              {t("about_process_slogan")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Accordion */}
      <div className="mx-auto max-w-5xl px-8 pb-32 md:px-24">
        <div className="flex flex-col gap-4">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border-primary/10 border-b">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="interactive group flex w-full items-center justify-between py-10 text-left"
              >
                <div className="flex items-center gap-8">
                  <span className="text-primary/30 font-mono text-xs font-medium">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl">
                    {service.localizedTitle?.[locale] ?? service.title}
                  </h3>
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
                      <div className="mb-12 grid grid-cols-1 items-center gap-12 pr-8 pl-16 md:grid-cols-2 md:pl-24">
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-primary/65 text-base leading-relaxed"
                        >
                          {service.localizedOverview?.[locale] ??
                            service.overview}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.94, y: 12 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.15,
                          }}
                          className="relative aspect-[80/69] overflow-hidden"
                        >
                          <motion.img
                            src={service.image}
                            alt={service.title}
                            initial={{ scale: 1.08 }}
                            animate={{ scale: 1 }}
                            transition={{
                              duration: 1.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-primary/10 absolute inset-0" />
                        </motion.div>
                      </div>

                      {/* Optional subtitle */}
                      {(service.localizedSubtitle?.[locale] ??
                        service.subtitle) && (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                          className="text-primary/40 mb-4 pr-8 pl-16 text-xs font-bold tracking-[0.3em] uppercase md:pl-24"
                        >
                          {service.localizedSubtitle?.[locale] ??
                            service.subtitle}
                        </motion.p>
                      )}

                      {/* Numbered sub-services — full width */}
                      <div className="flex flex-col">
                        {(
                          service.localizedSubServices?.[locale] ??
                          service.subServices
                        ).map((sub, sIdx) => (
                          <motion.div
                            key={sIdx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + sIdx * 0.06 }}
                            className="border-primary/10 grid grid-cols-[64px_1fr] border-t py-5 pr-8 md:grid-cols-[96px_1fr]"
                          >
                            <span className="text-primary/25 pt-0.5 font-mono text-xs">
                              {String(sIdx + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h4 className="text-primary mb-1.5 text-sm font-semibold tracking-wide">
                                {sub.title}
                              </h4>
                              <ul className="flex flex-col gap-1">
                                {sub.bullets.map((bullet, bIdx) => (
                                  <li
                                    key={bIdx}
                                    className="text-primary/55 text-sm leading-relaxed"
                                  >
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
          className="bg-primary text-parchment mt-32 flex flex-col items-center gap-12 p-12 md:flex-row"
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
              src="/servicesbottom.jpg"
              alt="Portfolio"
              className="h-full w-full object-cover"
            />
            <div className="bg-primary/10 absolute inset-0" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col justify-center px-12 py-24 md:px-20"
          >
            <p className="text-primary/40 mb-8 text-xs tracking-[0.3em] uppercase">
              {t("services_cta_label")}
            </p>
            <h2 className="text-primary mb-8 font-serif text-4xl leading-tight tracking-tighter md:text-5xl">
              {t("services_cta_heading")}
            </h2>
            <p className="text-primary/60 mb-14 max-w-sm text-base leading-relaxed">
              {t("services_cta_text")}
            </p>
            <LocaleLink
              to="/portfolio"
              className="group interactive inline-flex items-center self-start text-xs font-bold tracking-widest uppercase"
            >
              <span className="border-primary/30 group-hover:border-primary border-b pb-1 transition-colors duration-300">
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
