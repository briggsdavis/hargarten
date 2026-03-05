import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Maximize, Bed, Bath } from 'lucide-react';

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
    <div className="min-h-screen bg-parchment">
      {/* Back button — in flow at the top, no fixed positioning needed */}
      <div className="pt-32 px-8 md:px-24 mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-primary/50 hover:text-primary transition-colors interactive group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1 duration-200" />
          Back to Portfolio
        </button>
      </div>

      {/* Hero */}
      <section className="h-[70vh] relative overflow-hidden mx-8 md:mx-24 mb-20">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={property.image}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <div className="max-w-7xl mx-auto px-8 md:px-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
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
                  <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-4 aspect-square overflow-hidden">
                  <img src="https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-4 aspect-square overflow-hidden">
                  <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="md:col-span-8 aspect-video overflow-hidden">
                  <img src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
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
    </div>
  );
};
