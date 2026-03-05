import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PROPERTIES } from '../constants';

export const Portfolio = ({ onSelectProperty }: { onSelectProperty: (prop: any) => void }) => {
  const [filter, setFilter] = useState<'All' | 'Rent' | 'Sale'>('All');
  const [maxPrice, setMaxPrice] = useState(6); // In millions

  const filtered = PROPERTIES.filter(p => {
    const matchesType = filter === 'All' || p.type === filter;
    const priceNum = parseFloat(p.price.replace('M', ''));
    const matchesPrice = priceNum <= maxPrice;
    return matchesType && matchesPrice;
  });

  return (
    <div className="pt-32 pb-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <h1 className="text-6xl font-serif text-primary mb-4">Portfolio</h1>
            <p className="text-primary/50 uppercase tracking-widest text-xs">Curated Selection / 2024</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-12 items-end">
            <div className="flex gap-6">
              {['All', 'Rent', 'Sale'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`text-xs uppercase tracking-widest font-bold pb-1 border-b transition-all interactive ${
                    filter === t ? 'border-primary text-primary' : 'border-transparent text-primary/40 hover:text-primary'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="w-48">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-primary/50 mb-2">
                <span>Price Range</span>
                <span>Up to ${maxPrice}M</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="0.1"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full h-1 bg-primary/10 appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((prop) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="group interactive"
                onClick={() => onSelectProperty(prop)}
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 bg-parchment/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-primary">
                    {prop.status}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif">{prop.title}</h3>
                    <p className="text-xs text-primary/50 uppercase tracking-widest mt-1">{prop.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">${prop.price}</p>
                    <p className="text-[10px] uppercase tracking-widest text-primary/40 mt-1">{prop.sqm} SQM / {prop.bedrooms} Bed</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-primary/40 font-serif text-2xl italic">No properties match your current criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
