import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Pill } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Serviços', path: '/#servicos' },
  { name: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full border-b',
        (isScrolled || !isHomePage) 
          ? 'bg-white/95 backdrop-blur-lg border-gray-100 shadow-sm py-2.5' 
          : 'bg-white/10 backdrop-blur-xl border-white/10 py-3.5'
      )}
    >
      <div className="container mx-auto px-4">
        {/* Main Nav Bar */}
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link to="/" className="flex items-center shrink-0">
            <img 
              src="/logo.png" 
              alt="Única Farma" 
              className={cn(
                "h-10 md:h-12 w-auto object-contain [filter:hue-rotate(145deg)_brightness(1.1)_contrast(1.1)] transition-all duration-500",
                (isScrolled || !isHomePage) ? "" : "brightness-0 invert"
              )}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-brand-emerald/10',
                  (isScrolled || !isHomePage) 
                    ? 'text-brand-dark hover:text-brand-emerald' 
                    : 'text-white hover:bg-white/10'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacto"
              className={cn(
                "ml-4 px-6 py-2.5 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-md hover:-translate-y-0.5 active:scale-95",
                (isScrolled || !isHomePage) 
                  ? "bg-brand-emerald text-white hover:bg-brand-dark" 
                  : "bg-white text-brand-dark hover:bg-brand-emerald hover:text-white"
              )}
            >
              Contacto
            </Link>
          </div>

          {/* Mobile CTA Button */}
          <Link
            to="/contacto"
            className="md:hidden bg-brand-emerald text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-brand-emerald/20"
          >
            Ligar
          </Link>
        </div>

        {/* Mobile Navigation Row - Professional Pills */}
        <div className="md:hidden flex items-center gap-2 mt-2 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all border shadow-sm',
                (isScrolled || !isHomePage) 
                  ? 'text-brand-dark border-gray-200 bg-white active:bg-gray-50' 
                  : 'text-white border-white/20 bg-white/5 active:bg-white/10'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
