import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { PropertyDetail } from './components/PropertyDetail';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Stop/start Lenis when property detail overlay is open
  useEffect(() => {
    if (!lenisRef.current) return;
    if (selectedProperty) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [selectedProperty]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <About />;
      case 'portfolio': return <Portfolio onSelectProperty={setSelectedProperty} />;
      case 'services': return <Services />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
            
            <main className="relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            <AnimatePresence>
              {selectedProperty && (
                <PropertyDetail
                  property={selectedProperty}
                  onClose={() => setSelectedProperty(null)}
                  onContact={() => {
                    setSelectedProperty(null);
                    setCurrentPage('contact');
                  }}
                />
              )}
            </AnimatePresence>

            <Footer onNavigate={setCurrentPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
