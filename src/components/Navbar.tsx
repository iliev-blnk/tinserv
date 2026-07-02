import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ro' ? 'ru' : 'ro');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#impact', label: t.nav.impact },
    { href: '#how-it-works', label: t.nav.howItWorks },
    { href: '#media', label: 'Media' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[#171717] shadow-[0_4px_0_0_#ffe600]'
        : 'bg-[#171717] lg:bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between lg:grid lg:grid-cols-3 items-center h-20 lg:h-24">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="TinSerV Logo"
              className="h-20 w-auto lg:h-24 transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Menu — truly centered */}
          <div className="hidden lg:flex items-center justify-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-semibold text-sm uppercase tracking-wide whitespace-nowrap transition-all duration-200
                  after:absolute after:bottom-0 after:left-4 after:h-0.5 after:w-0 after:bg-brand-500 after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]
                  ${isScrolled ? 'text-gray-300 hover:text-brand-500' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center justify-end gap-4">
            <button
              onClick={toggleLanguage}
              className={`border-2 border-current font-bold text-xs uppercase tracking-widest px-3 py-1.5 transition-all duration-200 ${isScrolled
                ? 'text-gray-300 hover:border-brand-500 hover:text-brand-500'
                : 'text-white hover:border-brand-500 hover:text-brand-500'
                }`}
            >
              {language === 'ro' ? '🇷🇴 RO' : '🇷🇺 RU'}
            </button>

            <Link
              to="/registration"
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm font-black uppercase tracking-wide"
            >
              {t.nav.getStarted}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile: registration button + hamburger */}
          <div className="lg:hidden flex items-center gap-2 justify-self-end">
            <Link
              to="/registration"
              className="btn-primary flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wide"
            >
              {t.nav.getStarted}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${isScrolled ? 'text-gray-300 hover:text-brand-500' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#171717] border-t-4 border-brand-500 animate-slide-down">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-gray-200 font-bold text-lg border-b border-white/10 uppercase tracking-wide hover:text-brand-500 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="border-t border-white/10 pt-4 mt-4">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 border-2 border-white/20 text-gray-300 font-bold text-sm uppercase tracking-widest hover:border-brand-500 hover:text-brand-500 transition-colors flex items-center justify-center gap-2"
              >
                {language === 'ro' ? '🇷🇺 Switch to Russian' : '🇷🇴 Переключить на румынский'}
              </button>
            </div>

            <div className="pt-4">
              <Link
                to="/registration"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full flex items-center justify-center gap-2 font-black px-6 py-4 text-sm uppercase tracking-wide"
              >
                {t.nav.getStarted}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
