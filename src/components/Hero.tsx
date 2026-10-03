import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Raze from './Raze';

export default function Hero() {
  const { t } = useLanguage();
  const h = t.site.hero;

  return (
    <header className="relative h-[100svh] max-h-[1200px] min-h-[560px] overflow-hidden bg-black">
      <Raze className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between px-5 pb-8 pt-24 sm:px-8 lg:pb-12 lg:pt-32">
        <h1 className="font-black-heading animate-fade-in-up text-[clamp(3.5rem,11vw,10rem)] text-white">
          {h.title}
          {/* revealed when the light turns cold; opacity follows --cold set by Raze */}
          <span
            className="mt-[0.15em] block text-[0.5em] text-ice"
            style={{ opacity: 'var(--cold, 0)', transform: 'translateY(calc((1 - var(--cold, 0)) * 0.12em))', filter: 'blur(calc((1 - var(--cold, 0)) * 6px))' }}
          >
            {h.winter}
          </span>
        </h1>

        <div className="animate-fade-in-up max-w-md" style={{ animationDelay: '200ms' }}>
          <p className="text-base text-white sm:text-lg">{h.camp}</p>
          <p className="text-paper/70 sm:text-lg">{h.when}</p>
          <p className="mb-6 text-paper/70 sm:text-lg">{h.seats}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/registration" className="btn-primary px-6 py-3">{h.register}</Link>
            <a href="#contact" className="link text-paper">{h.collaborate}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
