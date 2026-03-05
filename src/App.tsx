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

  // Scroll to top on every page change (including property detail)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [currentPage, selectedProperty]);

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

  const handleSelectProperty = (prop: any) => {
    setSelectedProperty(prop);
    setCurrentPage('property');
  };

  const handleCloseProperty = () => {
    setSelectedProperty(null);
    setCurrentPage('portfolio');
  };

  const handleContactFromProperty = () => {
    setSelectedProperty(null);
    setCurrentPage('contact');
  };

  const renderPage = () => {
    if (currentPage === 'property' && selectedProperty) {
      return (
        <PropertyDetail
          property={selectedProperty}
          onClose={handleCloseProperty}
          onContact={handleContactFromProperty}
        />
      );
    }
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'about': return <About onNavigate={setCurrentPage} />;
      case 'portfolio': return <Portfolio onSelectProperty={handleSelectProperty} />;
      case 'services': return <Services />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  // Key used for AnimatePresence — property pages use property id so each is distinct
  const pageKey = currentPage === 'property' ? `property-${selectedProperty?.id}` : currentPage;

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
                  key={pageKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderPage()}
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer onNavigate={setCurrentPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
