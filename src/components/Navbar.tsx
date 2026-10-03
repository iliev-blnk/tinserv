import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const n = t.site.nav;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll behind the open phone menu, and always release it on the way out.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const links = [
    { href: '#iarna', label: n.camp },
    { href: '#ce-facem', label: n.about },
    { href: '#media', label: n.media },
    { href: '#contact', label: n.contact },
  ];

  const langButton = (
    <button
      onClick={() => setLanguage(language === 'ro' ? 'ru' : 'ro')}
      className="text-paper/60 hover:text-paper transition-colors"
      aria-label={language === 'ro' ? 'Русский' : 'Română'}
    >
      <span className={language === 'ro' ? 'text-paper' : ''}>ro</span>
      <span className="mx-1 text-paper/30">/</span>
      <span className={language === 'ru' ? 'text-paper' : ''}>ru</span>
    </button>
  );

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isScrolled || isOpen ? 'bg-night/90 backdrop-blur-sm' : ''}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 text-sm sm:px-8 lg:h-20">
        <a href="#" aria-label="TinSerV">
          <img src="/logo.png" alt="TinSerV" className="h-7 w-auto lg:h-8" />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-paper/70 transition-colors hover:text-paper">
              {l.label}
            </a>
          ))}
          <Link to="/donate" className="text-paper/70 transition-colors hover:text-paper">{n.donate}</Link>
          {langButton}
          <Link to="/registration" className="btn-primary px-5 py-2.5">{n.register}</Link>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Link to="/registration" onClick={() => setIsOpen(false)} className="btn-primary px-4 py-2 text-xs">{n.register}</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-paper" aria-label="Menu" aria-expanded={isOpen} aria-controls="mobile-menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] animate-slide-down border-t border-paper/10 bg-night px-5 py-8 lg:hidden">
          <div className="flex flex-col gap-6 text-2xl">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setIsOpen(false)} className="text-paper">
                {l.label}
              </a>
            ))}
            <Link to="/donate" onClick={() => setIsOpen(false)} className="text-paper">{n.donate}</Link>
            <div className="pt-4 text-base">{langButton}</div>
          </div>
        </div>
      )}
    </nav>
  );
}
