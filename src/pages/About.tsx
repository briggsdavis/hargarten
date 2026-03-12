import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { Link } from "react-router"
import { Scale, House } from "lucide-react"

const valuesData = [
  {
    title: "Discretion",
    desc: "We operate with the highest level of confidentiality, protecting our clients' privacy at every stage.",
    image: "/discretion.jpg",
  },
  {
    title: "Legal Security",
    desc: "Every contract is drafted with meticulous attention to detail, ensuring absolute legal protection.",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Family Focus",
    desc: "We understand the unique needs of families, providing homes that foster growth and security.",
    image: "/livingroom.jpg",
  },
]

export const About = () => {
  const valuesRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

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

  const activeValueIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2])

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
            Our Legacy
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
            Expertise & Family Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <p className="text-xl text-primary/80 leading-relaxed">
              Founded on the principles of trust and legal excellence, Hargarten Properties Sàrl-s
              has become a benchmark for luxury real estate in Luxembourg. We believe that a home is
              more than an asset; it is the foundation of a family's legacy.
            </p>
            <p className="text-xl text-primary/80 leading-relaxed">
              Our team combines deep market knowledge with legal expertise to navigate the
              complexities of property acquisition and management. We provide a bridge between your
              vision and the reality of a secure, high-end residence.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Parallax Image Section */}
      <section ref={parallaxRef} className="relative h-[60vh] overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img
            src="/paralax.jpg"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-28 md:py-36 px-8 md:px-24 bg-white/50">
        <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">

          {/* Block 1: 30 Years of Trust — image left, text right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col md:flex-row items-center gap-14 md:gap-20"
          >
            <div className="shrink-0 w-full max-w-[520px] mx-auto md:mx-0">
              <div className="aspect-[3/4] overflow-hidden border border-primary/10">
                <img
                  src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Laurent Hargarten"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex-1">
              <Scale className="w-5 h-5 text-primary/30 mb-5" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-5 tracking-tighter">
                30 Years of Trust
              </h2>
              <p className="text-base text-primary/60 leading-relaxed">
                With three decades of legal experience, Laurent Hargarten brings a precise
                understanding of contracts and a rare instinct for what clients truly need —
                making every transaction feel secure and simple.
              </p>
            </div>
          </motion.div>

          {/* Block 2: A New Perspective — text left, image right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="flex flex-col md:flex-row-reverse items-center gap-14 md:gap-20"
          >
            <div className="shrink-0 w-full max-w-[520px] mx-auto md:mx-0">
              <div className="aspect-[3/4] overflow-hidden border border-primary/10">
                <img
                  src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Samuel"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex-1">
              <House className="w-5 h-5 text-primary/30 mb-5" strokeWidth={1.5} />
              <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3 tracking-tighter">
                A New Perspective
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary/35 mb-5">
                Samuel — Real Estate Business Introducer
              </p>
              <p className="text-base text-primary/60 leading-relaxed">
                Samuel's passion for real estate is matched by a fresh vision and deep market
                knowledge — bringing an intuitive sense of what makes a property truly right
                for the people who will call it home.
              </p>
            </div>
          </motion.div>

          {/* Block 3: Together */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-16 tracking-tighter text-center">
              Together
            </h2>

            <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-0">
              {/* Laurent Card */}
              <div className="flex flex-col items-center text-center flex-1 max-w-[440px] mx-auto md:mx-0">
                <div className="w-full aspect-[3/4] overflow-hidden mb-5 border border-primary/10">
                  <img
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Laurent Hargarten"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-base font-serif text-primary tracking-tight mb-1">
                  Laurent Hargarten
                </h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary/35">
                  Lawyer / Legal Real Estate Expert
                </p>
              </div>

              {/* Connecting Line */}
              <div className="hidden md:block h-[1px] w-16 bg-primary/15 mb-10 shrink-0" />
              <div className="block md:hidden w-[1px] h-10 bg-primary/15 mx-auto" />

              {/* Samuel Card */}
              <div className="flex flex-col items-center text-center flex-1 max-w-[440px] mx-auto md:mx-0">
                <div className="w-full aspect-[3/4] overflow-hidden mb-5 border border-primary/10">
                  <img
                    src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Samuel"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-base font-serif text-primary tracking-tight mb-1">
                  Samuel
                </h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary/35">
                  Real Estate Business Introducer
                </p>
              </div>
            </div>

            <p className="text-center text-lg md:text-xl font-serif text-primary/60 mt-14 max-w-md mx-auto leading-relaxed tracking-tight">
              Legal precision meets market intuition, together we turn every transaction
              into lasting trust.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Scroll-triggered Values Section */}
      <section id="values" ref={valuesRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* Left Side: Images */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
              {valuesData.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0"
                  style={{
                    opacity: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5], [0, 1, 0]),
                    scale: useTransform(
                      activeValueIndex,
                      [idx - 0.5, idx, idx + 0.5],
                      [1.1, 1, 1.1],
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
                        [idx - 0.5, idx, idx + 0.5],
                        [0, 1, 0],
                      ),
                      y: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5], [20, 0, -20]),
                    }}
                  >
                    <span className="text-xs font-bold text-primary/30 uppercase tracking-[0.3em] mb-4">
                      Value 0{idx + 1}
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
            Explore Our Listings
          </p>
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 tracking-tighter leading-tight">
            Discover Properties Crafted for Discerning Clients
          </h2>
          <p className="text-lg text-primary/60 leading-relaxed mb-14 max-w-xl mx-auto">
            From urban penthouses to private estates across Luxembourg, each residence selected with
            the same standards of precision and care.
          </p>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-5 text-xs uppercase tracking-widest font-bold interactive"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
              View All Properties
            </span>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
