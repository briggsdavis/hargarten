import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const timelineData = [
  { year: '2012', title: 'THE BLUEPRINT', desc: 'Elena Voss and Alber Holding collaborate to define a new era of silence-based architecture.' },
  { year: '2015', title: 'SITE SELECTION', desc: 'Securing the topological pocket of Mara, the quietest zone in the metropolis.' },
  { year: '2018', title: 'FOUNDATION', desc: 'Hargarten Properties Sàrl-s established as a family-oriented firm.' },
  { year: '2022', title: 'EXPANSION', desc: 'Integrating advanced legal security protocols into every transaction.' },
];

const valuesData = [
  {
    title: 'Discretion',
    desc: 'We operate with the highest level of confidentiality, protecting our clients\' privacy at every stage.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    title: 'Legal Security',
    desc: 'Every contract is drafted with meticulous attention to detail, ensuring absolute legal protection.',
    image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    title: 'Family Focus',
    desc: 'We understand the unique needs of families, providing homes that foster growth and security.',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
];

export const About = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const valuesRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: valuesRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: parallaxScroll } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(parallaxScroll, [0, 1], ["-10%", "10%"]);
  const heroParallaxY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);

  const activeValueIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 0, 1, 2]);

  const sidebarItems = [
    { label: 'Philosophy', id: 'intro' },
    { label: 'History', id: 'timeline' },
    { label: 'Values', id: 'values' },
  ];

  useEffect(() => {
    const updateActive = () => {
      const triggerY = window.scrollY + window.innerHeight * 0.4;
      let current = sidebarItems[0].id;
      for (const item of sidebarItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= triggerY) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-parchment">
      {/* Sidebar Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="group flex items-center justify-end gap-4 interactive"
          >
            <span className={`text-[10px] uppercase tracking-widest transition-all duration-300 ${
              activeSection === item.id ? 'opacity-100 translate-x-0 font-bold' : 'opacity-30 translate-x-2'
            }`}>
              {item.label}
            </span>
            <div className={`h-[1px] transition-all duration-300 ${
              activeSection === item.id ? 'w-12 bg-primary' : 'w-6 bg-primary/20 group-hover:w-12 group-hover:bg-primary/50'
            }`} />
          </button>
        ))}
      </div>

      {/* Hero Banner (Partial Height) */}
      <section ref={heroRef} id="hero" className="relative h-[60vh] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div style={{ y: heroParallaxY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
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
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-12 tracking-tighter">Expertise & Family Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <p className="text-xl text-primary/80 leading-relaxed">
              Founded on the principles of trust and legal excellence, Hargarten Properties Sàrl-s has become a benchmark for luxury real estate in Luxembourg. We believe that a home is more than an asset; it is the foundation of a family's legacy.
            </p>
            <p className="text-xl text-primary/80 leading-relaxed">
              Our team combines deep market knowledge with legal expertise to navigate the complexities of property acquisition and management. We provide a bridge between your vision and the reality of a secure, high-end residence.
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
            src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-32 px-8 md:px-24 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-primary mb-4">A Journey of Precision</h2>
            <p className="text-primary/40 text-[10px] uppercase tracking-[0.3em]">Chronicle / 2012 - 2025</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-primary/10 -translate-x-1/2" />

            <div className="space-y-24">
              {timelineData.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} text-left md:text-right ${idx % 2 === 0 ? 'md:text-left' : ''}`}>
                    <span className="text-3xl font-serif text-primary/20 mb-2 block">{item.year}</span>
                    <h3 className="text-xl font-bold text-primary mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-primary/60 leading-relaxed max-w-sm ml-auto mr-0 md:ml-0 md:mr-auto">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
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
                    scale: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5], [1.1, 1, 1.1]),
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
                      opacity: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5], [0, 1, 0]),
                      y: useTransform(activeValueIndex, [idx - 0.5, idx, idx + 0.5], [20, 0, -20]),
                    }}
                  >
                    <span className="text-xs font-bold text-primary/30 uppercase tracking-[0.3em] mb-4">Value 0{idx + 1}</span>
                    <h3 className="text-4xl md:text-6xl font-serif text-primary mb-8 tracking-tighter">{value.title}</h3>
                    <p className="text-xl text-primary font-medium leading-relaxed">
                      {value.desc}
                    </p>
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
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-6">Explore Our Listings</p>
          <h2 className="text-4xl md:text-6xl font-serif text-primary mb-8 tracking-tighter leading-tight">
            Discover Properties Crafted for Discerning Clients
          </h2>
          <p className="text-lg text-primary/60 leading-relaxed mb-14 max-w-xl mx-auto">
            From urban penthouses to private estates across Luxembourg — each residence selected with the same standards of precision and discretion.
          </p>
          <button
            onClick={() => onNavigate('portfolio')}
            className="group inline-flex items-center gap-5 text-xs uppercase tracking-widest font-bold interactive"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">View All Properties</span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >→</motion.span>
          </button>
        </motion.div>
      </section>
    </div>
  );
};
