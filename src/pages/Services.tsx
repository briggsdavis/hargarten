import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';

export const Services = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-32 px-8 md:px-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-serif text-primary mb-8 tracking-tighter">Tailor-made Services</h1>
          <p className="text-xl text-primary/70 max-w-2xl leading-relaxed">
            We provide a suite of services designed to secure your assets and elevate your living experience. Our focus is on legal authority and personalized care.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="border-b border-primary/10">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-10 flex justify-between items-center text-left interactive group"
              >
                <div className="flex items-center gap-8">
                  <span className="text-xs font-medium text-primary/30 font-mono">0{idx + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-serif group-hover:translate-x-4 transition-transform duration-500">{service.title}</h3>
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
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 pl-16 md:pl-24 pr-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <p className="text-lg text-primary/80 leading-relaxed">
                        {service.description}
                      </p>
                      <p className="text-lg text-primary/60 leading-relaxed italic">
                        {service.details}
                      </p>
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
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-60">Legal Excellence</h4>
            <h3 className="text-4xl font-serif leading-tight">Authoritative Contract Drafting</h3>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg opacity-80 leading-relaxed">
              Our legal department is led by experts in Luxembourgish property law. We don't just facilitate sales; we architect legally sound agreements that protect your interests for generations. Every clause is scrutinized, every risk mitigated.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
