import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  const navLinks: { href: string; label: string }[] = [];


  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="/logo.png"
              alt="TinSerV Logo"
              className="h-10 w-auto lg:h-12 transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 hover:bg-brand-50 ${isScrolled
                  ? 'text-gray-600 hover:text-brand-600'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${isScrolled
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {language === 'ro' ? '🇷🇴 RO' : '🇷🇺 RU'}
            </button>

            {/* CTA Button */}
            <button className="btn-primary text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300">
              {t.nav.getStarted}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-brand-50 hover:text-brand-600 transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Language Toggle */}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                {language === 'ro' ? '🇷🇺 Switch to Russian' : '🇷🇴 Переключить на румынский'}
              </button>
            </div>

            <div className="pt-4">
              <button className="w-full btn-primary text-white font-semibold px-6 py-3 rounded-full">
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}