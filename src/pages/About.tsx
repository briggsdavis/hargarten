import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useLocale, LocaleLink } from "../i18n/LocaleContext"

export const About = () => {
  const { t } = useLocale()
  const valuesRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const valuesData = [
    {
      title: t("about_value1_title"),
      desc: t("about_value1_desc"),
      quote: t("about_value1_quote"),
      image: "/trust.jpg",
    },
    {
      title: t("about_value2_title"),
      desc: t("about_value2_desc"),
      quote: t("about_value2_quote"),
      image: "/i2.jpg",
    },
    {
      title: t("about_value3_title"),
      desc: t("about_value3_desc"),
      quote: t("about_value3_quote"),
      image:
        "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      title: t("about_value4_title"),
      desc: t("about_value4_desc"),
      quote: "",
      image: "/i3.jpg",
    },
    {
      title: t("about_value5_title"),
      desc: t("about_value5_desc"),
      quote: t("about_value5_quote"),
      image: "/prevision.jpg",
    },
    {
      title: t("about_value6_title"),
      desc: t("about_value6_desc"),
      quote: "",
      image: "/r.jpg",
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

  const activeValueIndex = useTransform(
    scrollYProgress,
    [0, 0.167, 0.333, 0.5, 0.667, 0.833, 1],
    [0, 0, 1, 2, 3, 4, 5],
  )

  return (
    <div className="bg-parchment relative">
      {/* Hero Banner (Partial Height) */}
      <section
        ref={heroRef}
        id="hero"
        className="relative h-[60vh] w-full overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.1, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ y: heroParallaxY }}
            className="absolute inset-0 -top-[15%] h-[130%] w-full"
          >
            <img
              src="/potential.jpg"
              alt="About Hargarten"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-parchment font-serif text-6xl tracking-tighter md:text-8xl"
          >
            {t("about_hero_title")}
          </motion.h1>
        </div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="px-8 py-32 md:px-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 1 }}
            className="mb-20 space-y-8"
          >
            {[t("about_intro_p1"), t("about_intro_p2"), t("about_intro_p3")]
              .filter(Boolean)
              .map((text, i) => (
                <p key={i} className="text-primary/80 text-xl leading-relaxed">
                  {text}
                </p>
              ))}
          </motion.div>

          {/* Synergy heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="text-primary mb-16 font-serif text-3xl tracking-tighter md:text-4xl"
          >
            {t("about_intro_synergy_heading")}
          </motion.h2>

          {/* Headshots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="mb-20 grid grid-cols-2 gap-8 md:gap-14"
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
                <div className="border-primary/10 mb-4 aspect-[3/4] overflow-hidden border">
                  <img
                    src={person.src}
                    alt={person.alt}
                    className="h-full w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-primary mb-1 font-serif text-lg tracking-tight">
                  {person.name}
                </h3>
                <p className="text-primary/40 text-xs tracking-[0.2em] uppercase">
                  {person.role}
                </p>
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
            <p className="text-primary/75 text-lg leading-relaxed">
              {t("about_intro_body1")}
            </p>
            <div>
              <h3 className="text-primary mb-4 font-serif text-2xl tracking-tighter md:text-3xl">
                {t("about_intro_body2_heading")}
              </h3>
              <p className="text-primary/75 text-lg leading-relaxed">
                {t("about_intro_body2")}
              </p>
            </div>
            <div>
              <h3 className="text-primary mb-4 font-serif text-2xl tracking-tighter md:text-3xl">
                {t("about_intro_body3_heading")}
              </h3>
              <p className="text-primary/75 text-lg leading-relaxed">
                {t("about_intro_body3")}
              </p>
            </div>
            <p className="text-primary/40 text-sm italic">
              {t("about_process_slogan")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Parallax Image Section */}
      <section ref={parallaxRef} className="relative h-[60vh] overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 -top-[10%] h-[120%] w-full"
        >
          <img
            src="/esch.jpg"
            alt="Esch-sur-Alzette"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>
      <div className="pb-16" />

      {/* Scroll-triggered Values Section */}
      <section id="values" ref={valuesRef} className="relative h-[600vh]">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Left Side: Images */}
            <div className="relative h-1/2 w-full overflow-hidden md:h-full md:w-1/2">
              {valuesData.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0"
                  style={{
                    opacity: useTransform(
                      activeValueIndex,
                      [idx - 0.5, idx, idx + 0.5, idx + 1],
                      [0, 1, 1, 0],
                    ),
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
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="bg-primary/20 absolute inset-0" />
                </motion.div>
              ))}
            </div>

            {/* Right Side: Text */}
            <div className="flex h-1/2 w-full items-center justify-center bg-white px-10 py-12 md:h-full md:w-1/2 md:px-16 md:py-16">
              <div className="relative h-64 w-full max-w-lg">
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
                      y: useTransform(
                        activeValueIndex,
                        [idx - 0.5, idx, idx + 0.5, idx + 1],
                        [20, 0, 0, -20],
                      ),
                    }}
                  >
                    <span className="text-primary/30 mb-4 text-xs font-bold tracking-[0.3em] uppercase">
                      {t("about_value_label", { index: String(idx + 1) })}
                    </span>
                    <h3 className="text-primary mb-8 font-serif text-4xl tracking-tighter md:text-6xl">
                      {value.title}
                    </h3>
                    <p className="text-primary text-xl leading-relaxed font-medium">
                      {value.desc}
                    </p>
                    {value.quote && (
                      <p className="text-primary/50 mt-5 text-base leading-relaxed italic">
                        {value.quote}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio CTA */}
      <section className="bg-parchment px-8 py-32 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-primary/40 mb-6 text-xs tracking-[0.3em] uppercase">
            {t("about_cta_label")}
          </p>
          <h2 className="text-primary mb-8 font-serif text-4xl leading-tight tracking-tighter md:text-6xl">
            {t("about_cta_heading")}
          </h2>
          <p className="text-primary/60 mx-auto mb-14 max-w-xl text-lg leading-relaxed">
            {t("about_cta_text")}
          </p>
          <LocaleLink
            to="/portfolio"
            className="group interactive inline-flex items-center gap-5 text-xs font-bold tracking-widest uppercase"
          >
            <span className="border-primary/30 group-hover:border-primary border-b pb-1 transition-colors duration-300">
              {t("about_cta_link")}
            </span>
          </LocaleLink>
        </motion.div>
      </section>
    </div>
  )
}
