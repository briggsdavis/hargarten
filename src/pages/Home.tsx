import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { PROPERTIES, SERVICES } from '../constants';

export const Home = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const dividerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: dividerScroll } = useScroll({ target: dividerRef, offset: ['start end', 'end start'] });
  const dividerParallaxY = useTransform(dividerScroll, [0, 1], ['-12%', '12%']);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 0.6, filter: 'blur(20px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <img
              src="/luxembourg.jpg"
              alt="Luxembourg"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-5xl md:text-8xl text-parchment font-serif tracking-tighter mb-6"
          >
            A Journey of Precision
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-parchment/80 text-sm uppercase tracking-[0.3em] font-medium"
          >
            Chronicle / 2012 - 2025
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 px-8 md:px-24 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-12 leading-tight">
              We define a new era of silence-based architecture and discreet property management.
            </h2>
            <p className="text-lg text-primary/70 leading-relaxed mb-8">
              Hargarten Properties Sàrl-s is a family-oriented firm dedicated to providing tailor-made services with absolute legal security. Our approach is minimalist, focusing on the essential qualities of luxury: privacy, precision, and permanence.
            </p>
            <button 
              onClick={() => onNavigate('about')}
              className="group flex items-center gap-4 text-xs uppercase tracking-widest font-bold interactive"
            >
              <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors">Discover our values</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >→</motion.span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties - Bento Grid */}
      <section className="py-32 px-8 md:px-24 bg-white">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-serif text-primary">Select Residences</h2>
          <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Swipe to explore / 2024</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {PROPERTIES.slice(0, 3).map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ y: 60, opacity: 0, filter: 'blur(10px)' }}
              whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`${
                idx === 0 ? 'md:col-span-7' : idx === 1 ? 'md:col-span-5' : 'md:col-span-12'
              } group relative overflow-hidden interactive`}
              onClick={() => onNavigate('portfolio')}
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
                  <p className="text-xs text-primary/50 uppercase tracking-widest mt-1">{prop.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">From ${prop.price}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">{prop.type}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => onNavigate('portfolio')}
            className="bg-primary text-parchment px-12 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors interactive"
          >
            Explore Buildings Portfolio
          </button>
        </div>
      </section>

      {/* Full-width Parallax Divider */}
      <section ref={dividerRef} className="relative h-[70vh] w-full overflow-hidden">
        <motion.div
          style={{ y: dividerParallaxY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <img
            src="https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury interior"
            className="w-full h-full object-cover"
          />
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
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary/40">What We Offer</p>
        </motion.div>

        {/* Two-column image grid — mirrors the reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: idx * 0.15 }}
              className="group cursor-pointer interactive"
              onClick={() => onNavigate('services')}
            >
              {/* Portrait image — 30% shorter than the original 3/4 */}
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
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-primary/60 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: idx * 0.4 }}
                  className="text-primary/40 group-hover:text-primary transition-colors duration-300 text-sm"
                >
                  →
                </motion.span>
              </div>
            </motion.div>
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
            Full-spectrum expertise, from acquisition to legal certainty.
          </h2>
          <button
            onClick={() => onNavigate('services')}
            className="group flex items-center gap-5 text-xs uppercase tracking-widest font-bold interactive"
          >
            <span className="border-b border-primary/30 pb-1 group-hover:border-primary transition-colors duration-300">
              Explore All Services
            </span>
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
