import { motion } from 'motion/react';
import { PROPERTIES } from '../constants';

export const Home = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 0.75, filter: 'blur(20px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/luxembourg.jpg"
            alt="Luxembourg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-5xl md:text-8xl text-parchment font-serif tracking-tighter mb-6"
          >
            A Journey of Precision
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
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
    </div>
  );
};
