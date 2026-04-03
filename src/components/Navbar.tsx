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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        (isScrolled || !isHomePage) ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-emerald p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Pill className="text-white w-6 h-6" />
          </div>
          <span className={cn(
            "text-xl font-display font-bold transition-colors",
            (isScrolled || !isHomePage) ? "text-brand-dark" : "text-white"
          )}>
            Única Farma
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'font-medium transition-colors hover:text-brand-emerald',
                (isScrolled || !isHomePage) ? 'text-gray-700' : 'text-white/90'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="bg-brand-emerald text-white px-6 py-2.5 rounded-full font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-brand-emerald/20"
          >
            Falar Connosco
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg",
            (isScrolled || !isHomePage) ? "text-brand-dark" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <button
          className="absolute top-6 right-6 text-brand-dark p-2"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-2xl font-display font-bold text-brand-dark hover:text-brand-emerald transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/contacto"
          className="bg-brand-emerald text-white px-8 py-4 rounded-full font-bold text-xl"
        >
          Solicitar Cotação
        </Link>
      </div>
    </nav>
  );
}
