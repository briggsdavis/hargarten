import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const About = () => {
  const { t } = useLocale()
  const valuesRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const valuesData = [
    { title: t("about_value1_title"), desc: t("about_value1_desc"), image: "/about.jpg" },
    { title: t("about_value2_title"), desc: t("about_value2_desc"), image: "/discretion.jpg" },
    {
      title: t("about_value3_title"),
      desc: t("about_value3_desc"),
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    { title: t("about_value4_title"), desc: t("about_value4_desc"), image: "/livingroom.jpg" },
    { title: t("about_value5_title"), desc: t("about_value5_desc"), image: "/aboutt.jpg" },
    {
      title: t("about_value6_title"),
      desc: t("about_value6_desc"),
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      title: t("about_value7_title"),
      desc: t("about_value7_desc"),
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      title: t("about_value8_title"),
      desc: t("about_value8_desc"),
      image:
        "https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=1200",
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

  const activeValueIndex = useTransform(scrollYProgress, [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1], [0, 0, 1, 2, 3, 4, 5, 6, 7])

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
      <section id="intro" className="py-32 px-8 md:px-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-12 tracking-tighter">
            {t("about_intro_heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <p className="text-xl text-primary/80 leading-relaxed">{t("about_intro_p1")}</p>
            <p className="text-xl text-primary/80 leading-relaxed">{t("about_intro_p2")}</p>
          </div>
        </motion.div>
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4">How We Work</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary tracking-tighter">Our Process</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-px bg-primary/15" />

            <div className="space-y-16 md:space-y-20">
              {[
                {
                  step: "01",
                  title: "Understanding Your Needs",
                  text: "Explore our expertise to see how our dual legal and real estate background can serve your specific goals, whether selling, renting, or investing.",
                },
                {
                  step: "02",
                  title: "Expert Consultation",
                  text: "Contact us for an initial, no-obligation discussion. This is a confidential space for you to share your expectations and project vision.",
                },
                {
                  step: "03",
                  title: "Tailored Strategy",
                  text: "Together, we design the ideal roadmap—whether it involves transaction support, contract drafting, or investment advisory. A plan 100% adapted to your situation.",
                },
                {
                  step: "04",
                  title: "Executing Your Vision",
                  text: "We work in close collaboration: with rigorous follow-up and informed decision-making, we ensure your project reaches a successful and secure conclusion.",
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
                  <div className="shrink-0 w-9 md:w-11 flex flex-col items-center">
                    <div className="relative z-10 w-9 h-9 md:w-11 md:h-11 rounded-full border border-primary/20 bg-parchment flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-widest text-primary/50">{item.step}</span>
                    </div>
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
              <p className="text-2xl md:text-3xl font-serif text-primary tracking-tighter">Ready to start your project?</p>
              <LocaleLink
                to="/contact"
                className="shrink-0 inline-block px-8 py-4 border border-primary text-xs uppercase tracking-widest font-bold text-primary hover:bg-primary hover:text-parchment transition-colors duration-300"
              >
                Contact Us
              </LocaleLink>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll-triggered Values Section */}
      <section id="values" ref={valuesRef} className="relative h-[800vh]">
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
