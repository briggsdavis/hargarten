import { motion } from 'motion/react';

export const Footer = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <footer className="bg-primary text-parchment py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif mb-8">Hargarten Properties</h2>
            <p className="text-parchment/60 max-w-sm leading-relaxed">
              A family-oriented real estate firm specializing in high-end properties and legal security in Luxembourg.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Portfolio', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-sm hover:text-parchment/60 transition-colors interactive"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-bold mb-8 opacity-40">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Legal Mentions', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <button className="text-sm hover:text-parchment/60 transition-colors interactive">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-parchment/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest opacity-40">
            © 2025 Hargarten Properties Sàrl-s. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity interactive">Instagram</a>
            <a href="#" className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity interactive">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
