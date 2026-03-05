import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const MENU_ITEMS = [
  { name: 'Home', id: 'home', image: 'https://images.unsplash.com/photo-1600607687940-4e7a6a353d39?auto=format&fit=crop&q=80&w=800' },
  { name: 'About', id: 'about', image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=800' },
  { name: 'Portfolio', id: 'portfolio', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Services', id: 'services', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800' },
  { name: 'Contact', id: 'contact', image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800' },
];

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar = ({ onNavigate, currentPage }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(MENU_ITEMS[0]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  useState(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-8 py-8 flex justify-between items-center text-primary"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 group interactive"
        >
          <Menu size={24} />
        </button>

        <div 
          className="text-2xl font-serif tracking-tighter cursor-pointer interactive"
          onClick={() => onNavigate('home')}
        >
          Hargarten Properties
        </div>

        <button
          onClick={() => onNavigate('contact')}
          className="text-[10px] uppercase tracking-widest font-bold hover:opacity-70 transition-opacity interactive underline underline-offset-4"
        >
          Contact
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] flex"
          >
            {/* Left Side: Menu Links */}
            <div className="w-full md:w-1/2 bg-primary h-full flex flex-col justify-center px-12 md:px-24 relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 left-8 text-parchment interactive"
              >
                <X size={32} />
              </button>

              <div className="flex flex-col gap-6">
                {MENU_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onMouseEnter={() => setHoveredItem(item)}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`text-3xl md:text-5xl font-serif text-left interactive ${
                      currentPage === item.id ? 'text-parchment' : 'text-parchment/40 hover:text-parchment'
                    } transition-colors`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Side: Dynamic Image */}
            <div className="hidden md:block w-1/2 h-full bg-parchment overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hoveredItem.id}
                  src={hoveredItem.image}
                  initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ scale: 1.05, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
