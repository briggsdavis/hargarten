import { motion } from 'motion/react';
import { X, MapPin, Maximize, Bed, Bath } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  sqm: string;
  type: string;
  status: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  amenities: string[];
  description: string;
}

export const PropertyDetail = ({ property, onClose, onContact }: { property: Property, onClose: () => void, onContact: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-parchment overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[310] bg-primary text-parchment p-3 rounded-full interactive"
      >
        <X size={24} />
      </button>

      {/* Hero */}
      <section className="h-[70vh] relative">
        <motion.img
          initial={{ scale: 1.1, filter: 'blur(20px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          src={property.image}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="max-w-7xl mx-auto px-8 md:px-24 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-primary/50 uppercase tracking-widest text-xs mb-4">
                <MapPin size={14} />
                {property.location}
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-primary mb-8">{property.title}</h1>
              <p className="text-xl text-primary/70 leading-relaxed mb-12">
                {property.description}
              </p>

              {/* Bento Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-20">
                <div className="md:col-span-8 aspect-video overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1600607687940-4e7a6a353d39?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="md:col-span-4 aspect-square overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="md:col-span-4 aspect-square overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="md:col-span-8 aspect-video overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="sticky top-32 space-y-12"
            >
              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-2">Price</p>
                <p className="text-4xl font-serif">${property.price}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/5">
                  <Maximize size={20} className="mx-auto mb-2 text-primary/40" />
                  <p className="text-xs font-bold">{property.sqm}</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-40">SQM</p>
                </div>
                <div className="text-center p-4 bg-primary/5">
                  <Bed size={20} className="mx-auto mb-2 text-primary/40" />
                  <p className="text-xs font-bold">{property.bedrooms}</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-40">Bed</p>
                </div>
                <div className="text-center p-4 bg-primary/5">
                  <Bath size={20} className="mx-auto mb-2 text-primary/40" />
                  <p className="text-xs font-bold">{property.bathrooms}</p>
                  <p className="text-[8px] uppercase tracking-widest opacity-40">Bath</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-primary/40 mb-4">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(a => (
                    <span key={a} className="px-3 py-1 border border-primary/10 text-[10px] uppercase tracking-widest font-bold">
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-primary/10">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-primary/40">Status</span>
                  <span className="text-xs font-bold uppercase tracking-widest">{property.status}</span>
                </div>
                <button
                  onClick={onContact}
                  className="w-full bg-primary text-parchment py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors interactive"
                >
                  Inquire Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
