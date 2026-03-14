import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const About = () => {
  const { t } = useLocale()
  const valuesRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const valuesData = [
    { title: t("about_value1_title"), desc: t("about_value1_desc"), quote: t("about_value1_quote"), image: "/about.jpg" },
    { title: t("about_value2_title"), desc: t("about_value2_desc"), quote: t("about_value2_quote"), image: "/discretion.jpg" },
    {
      title: t("about_value3_title"),
      desc: t("about_value3_desc"),
      quote: t("about_value3_quote"),
      image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    { title: t("about_value4_title"), desc: t("about_value4_desc"), quote: "", image: "/livingroom.jpg" },
    { title: t("about_value5_title"), desc: t("about_value5_desc"), quote: t("about_value5_quote"), image: "/aboutt.jpg" },
    {
      title: t("about_value6_title"),
      desc: t("about_value6_desc"),
      quote: "",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ]

  const { scrollYProgress } = useScroll({
    target: valuesRef,
    offset: ["start start", "end end"],
  })

  const { scrollYProgress: parallaxScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const parallaxY = useTransform(parallaxScroll, [0, 1], ["-10%", "10%"])
  const heroParallaxY = useTransform(heroScroll, [0, 1], ["0%", "30%"])

  const activeValueIndex = useTransform(scrollYProgress, [0, 0.167, 0.333, 0.5, 0.667, 0.833, 1], [0, 0, 1, 2, 3, 4, 5])

  return (
    <div className="relative bg-parchment">
      {/* Hero Banner (Partial Height) */}
      <section ref={heroRef} id="hero" className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: heroParallaxY }}
            className="absolute inset-0 w-full h-[130%] -top-[15%]"
          >
            <img
              src="/luxembourg.jpg"
              alt="About Hargarten"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl font-serif text-parchment tracking-tighter"
          >
            {t("about_hero_title")}
          </motion.h1>
        </div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="py-32 px-8 md:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 mb-20"
          >
            <p className="text-xl text-primary/80 leading-relaxed">{t("about_intro_p1")}</p>
            <p className="text-xl text-primary/80 leading-relaxed">{t("about_intro_p2")}</p>
            <p className="text-xl text-primary/80 leading-relaxed">{t("about_intro_p3")}</p>
          </motion.div>

          {/* Synergy heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="text-3xl md:text-4xl font-serif text-primary tracking-tighter mb-16"
          >
            {t("about_intro_synergy_heading")}
          </motion.h2>

          {/* Headshots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="grid grid-cols-2 gap-8 md:gap-14 mb-20"
          >
            {[
              {
                src: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: t("about_intro_samuel_name"),
                name: t("about_intro_samuel_name"),
                role: t("about_intro_samuel_role"),
              },
              {
                src: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
                alt: t("about_intro_laurent_name"),
                name: t("about_intro_laurent_name"),
                role: t("about_intro_laurent_role"),
              },
            ].map((person) => (
              <div key={person.name}>
                <div className="aspect-[3/4] overflow-hidden border border-primary/10 mb-4">
                  <img
                    src={person.src}
                    alt={person.alt}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif text-primary tracking-tight text-lg mb-1">{person.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary/40">{person.role}</p>
              </div>
            ))}
          </motion.div>

          {/* Body text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="space-y-12"
          >
            <p className="text-lg text-primary/75 leading-relaxed">{t("about_intro_body1")}</p>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-primary tracking-tighter mb-4">
                {t("about_intro_body2_heading")}
              </h3>
              <p className="text-lg text-primary/75 leading-relaxed">{t("about_intro_body2")}</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-primary tracking-tighter mb-4">
                {t("about_intro_body3_heading")}
              </h3>
              <p className="text-lg text-primary/75 leading-relaxed">{t("about_intro_body3")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section ref={parallaxRef} className="relative h-[60vh] overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img src="/paralax.jpg" alt="Luxury Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-32 md:py-40 px-8 md:px-24 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4">{t("about_process_label")}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tighter">{t("about_process_heading")}</h2>
          </motion.div>

          <div className="relative">
            <div className="space-y-16 md:space-y-20">
              {[
                { step: "01", title: t("about_process_step1_title"), text: t("about_process_step1_text") },
                { step: "02", title: t("about_process_step2_title"), text: t("about_process_step2_text") },
                { step: "03", title: t("about_process_step3_title"), text: t("about_process_step3_text") },
                { step: "04", title: t("about_process_step4_title"), text: t("about_process_step4_text") },
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
                  <div className="shrink-0 w-9 md:w-11 flex flex-col items-center self-stretch">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-primary/20 bg-parchment flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold tracking-widest text-primary/50">{item.step}</span>
                    </div>
                    {idx < 3 && <div className="flex-1 w-px bg-primary/15 mt-2" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <h3 className="text-2xl md:text-3xl font-serif text-primary mb-4 tracking-tighter">
                      {item.title}
                    </h3>
                    <p className="text-lg text-primary/65 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mt-20 pt-16 border-t border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
            >
              <p className="text-2xl md:text-3xl font-serif text-primary tracking-tighter">{t("about_process_cta")}</p>
              <LocaleLink
                to="/contact"
                className="shrink-0 inline-block px-8 py-4 border border-primary text-xs uppercase tracking-widest font-bold text-primary hover:bg-primary hover:text-parchment transition-colors duration-300"
              >
                {t("about_process_cta_button")}
              </LocaleLink>
            </motion.div>
            <p className="mt-6 text-sm italic text-primary/40">{t("about_process_slogan")}</p>
          </div>
        </div>
      </section>

      {/* Scroll-triggered Values Section */}
      <section id="values" ref={valuesRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left Side: Images */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
              {valuesData.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0"
                  style={{
                    opacity: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5, idx + 1], [0, 1, 1, 0]),
                    scale: useTransform(
                      activeValueIndex,
                      [idx - 0.5, idx, idx + 0.5, idx + 1],
                      [1.1, 1, 1, 1.1],
                    ),
                  }}
                >
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                </motion.div>
              ))}
            </div>

            {/* Right Side: Text */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center px-10 py-12 md:px-16 md:py-16 bg-white">
              <div className="w-full max-w-lg relative h-64">
                {valuesData.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute inset-0 flex flex-col justify-center"
                    style={{
                      opacity: useTransform(
                        activeValueIndex,
                        [idx - 0.5, idx, idx + 0.5, idx + 1],
                        [0, 1, 1, 0],
                      ),
                      y: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5, idx + 1], [20, 0, 0, -20]),
                    }}
                  >
                    <span className="text-xs font-bold text-primary/30 uppercase tracking-[0.3em] mb-4">
                      {t("about_value_label", { index: String(idx + 1) })}
                    </span>
                    <h3 className="text-4xl md:text-6xl font-serif text-primary mb-8 tracking-tighter">
                      {value.title}
                    </h3>
                    <p className="text-xl text-primary font-medium leading-relaxed">{value.desc}</p>
                    {value.quote && (
                      <p className="mt-5 text-base italic text-primary/50 leading-relaxed">{value.quote}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="py-32 px-8 md:px-24 bg-parchment">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-6">
            {t("about_cta_label")}
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 tracking-tighter leading-tight">
            {t("about_cta_heading")}
          </h2>
          <p className="text-lg text-primary/60 leading-relaxed mb-14 max-w-xl mx-auto">
            {t("about_cta_text")}
          </p>
          <LocaleLink
            to="/portfolio"
            className="group inline-flex items-center gap-5 text-xs uppercase tracking-widest font-bold interactive"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
              {t("about_cta_link")}
            </span>
          </LocaleLink>
        </motion.div>
      </section>
    </div>
  )
}
