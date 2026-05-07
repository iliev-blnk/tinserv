import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const heroSlides = [
  { id: 1, image: '/photo_4.jpg', alt: 'TinSerV volunteers in winter' },
  { id: 2, image: '/photo1.jpg', alt: 'Community service volunteers' },
  { id: 3, image: '/photo2.jpg', alt: 'Outdoor volunteer group' },
  { id: 4, image: '/photo3.jpg', alt: 'TinSerV volunteers' }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countDownDate = new Date("Jul 26, 2026 09:00:00").getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };
    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (isCollaborationModalOpen || isVolunteerModalOpen) ? 'hidden' : 'unset';
  }, [isCollaborationModalOpen, isVolunteerModalOpen]);

  const nextSlide = () => setActiveSlide((current) => (current + 1) % heroSlides.length);
  const prevSlide = () => setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Full-bleed photo background */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        </div>
      ))}

      {/* Mobile: semi-transparent overlay. Desktop: gradient left→transparent */}
      <div className="absolute inset-0 bg-[#171717]/75 lg:bg-none" />
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#171717] from-20% via-[#171717]/75 via-45% to-transparent" />

      {/* Content grid */}
      <div className="relative z-10 flex-1 grid lg:grid-cols-[48%_52%] min-h-screen">

        {/* Left — content */}
        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 pt-24 pb-12 lg:py-0">
          <div className="inline-flex items-center gap-2 bg-brand-500 text-black px-4 py-2 mb-8 self-start animate-fade-in-up">
            <span className="font-black text-xs uppercase tracking-widest">{t.hero.badge}</span>
          </div>

          <h1 className="font-black-heading text-7xl sm:text-8xl lg:text-9xl text-white mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            TinSerV
          </h1>

          <p className="font-black text-lg sm:text-2xl lg:text-3xl text-brand-500 uppercase tracking-wide lg:tracking-widest mb-3 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
            26 July – 1 August 2026
          </p>

          <p className="font-semibold text-xl text-white mb-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Ștefan Vodă, Moldova 🇲🇩
          </p>

          <p className="italic text-gray-300 text-lg mb-10 max-w-sm leading-relaxed animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            {t.footer.slogan}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => setIsCollaborationModalOpen(true)}
              className="btn-primary px-8 py-4 text-sm font-black uppercase tracking-widest"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={() => setIsVolunteerModalOpen(true)}
              className="btn-outline-white px-8 py-4 text-sm font-black uppercase tracking-widest"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div className="flex items-center gap-3 mt-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <a href="https://instagram.com/tinserv.chisinau" target="_blank" rel="noopener noreferrer"
              className="p-2.5 border border-white/20 text-white hover:bg-brand-500 hover:border-brand-500 hover:text-black transition-all duration-300"
              aria-label="Instagram">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://t.me/tinservchisinau" target="_blank" rel="noopener noreferrer"
              className="p-2.5 border border-white/20 text-white hover:bg-brand-500 hover:border-brand-500 hover:text-black transition-all duration-300"
              aria-label="Telegram">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right — big yellow headline over the photo */}
        <div className="relative flex flex-col justify-center p-8 lg:p-12 min-h-[50vh] lg:min-h-0">
          <p className="font-black-heading text-6xl sm:text-7xl lg:text-8xl xl:text-[7rem] text-brand-500 leading-[0.9] uppercase drop-shadow-2xl text-right">
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
            <br />
            <span className="italic">{t.hero.headlineHighlight}</span>
          </p>

          {/* Carousel controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
            <div className="flex gap-1.5">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1 transition-all duration-300 ${index === activeSlide ? 'bg-brand-500 w-8' : 'bg-white/30 w-4 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prevSlide}
                className="p-2 border border-white/30 text-white hover:bg-brand-500 hover:border-brand-500 hover:text-black transition-all"
                aria-label="Previous slide">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button onClick={nextSlide}
                className="p-2 border border-white/30 text-white hover:bg-brand-500 hover:border-brand-500 hover:text-black transition-all"
                aria-label="Next slide">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo strip */}
      <div className="relative z-20 border-t border-white/10 flex h-20 sm:h-24 overflow-hidden flex-shrink-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${index === activeSlide ? 'flex-[2]' : 'flex-1'}`}
            onClick={() => setActiveSlide(index)}
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className={`absolute inset-0 transition-colors duration-300 ${index === activeSlide ? 'bg-brand-500/30' : 'bg-black/60 hover:bg-black/40'}`} />
            {index < heroSlides.length - 1 && (
              <div className="absolute top-0 right-0 bottom-0 border-r border-white/10 z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Collaboration Modal */}
      {isCollaborationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsCollaborationModalOpen(false)} />
          <div className="relative bg-white border-l-8 border-brand-500 p-8 max-w-lg w-full shadow-2xl overflow-hidden">
            <button onClick={() => setIsCollaborationModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-500 transition-colors" aria-label="Close modal">
              <ChevronRight className="w-6 h-6 rotate-45" />
            </button>
            <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 pr-8">{t.collaboration.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">{t.collaboration.description}</p>
            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t.collaboration.contactTitle}</p>
              <div className="space-y-3">
                <a href="mailto:oponeatovskii@mail.ru" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors p-3 border-2 border-gray-200 hover:border-brand-500 bg-gray-50">
                  <div className="w-8 h-8 bg-brand-100 flex items-center justify-center text-gray-700">
                    <span className="text-lg">@</span>
                  </div>
                  <span className="font-medium">oponeatovskii@mail.ru</span>
                </a>
                <a href="tel:+37368753358" className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors p-3 border-2 border-gray-200 hover:border-brand-500 bg-gray-50">
                  <div className="w-8 h-8 bg-brand-100 flex items-center justify-center text-gray-700">
                    <span className="text-lg">📞</span>
                  </div>
                  <span className="font-medium">+373 68 753 358</span>
                </a>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIsCollaborationModalOpen(false)}
                className="px-6 py-2 border-2 border-gray-200 hover:border-gray-400 text-gray-600 font-semibold transition-all">
                {t.collaboration.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Event Modal */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          <div className="absolute inset-0 bg-black/90" onClick={() => setIsVolunteerModalOpen(false)} />
          <div className="relative bg-white border-t-8 border-brand-500 p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsVolunteerModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-brand-500 transition-colors z-10 p-2" aria-label="Close modal">
              <ChevronRight className="w-6 h-6 rotate-45" />
            </button>
            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500 text-black text-xs font-black uppercase tracking-widest mb-4">
                {t.volunteerEvent.modalTitle}
              </div>
              <h3 className="text-3xl md:text-4xl font-black-heading text-gray-900 mb-2">{t.volunteerEvent.eventTitle}</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="flex flex-col items-center p-2 md:p-4 bg-gray-900 border-4 border-gray-900">
                  <span className="text-xl md:text-3xl font-mono font-bold text-white mb-1">
                    {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs text-brand-400 uppercase tracking-wider">
                    {t.volunteerEvent.timer[unit as keyof typeof t.volunteerEvent.timer]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="text-brand-500 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">{t.volunteerEvent.locationLabel}</p>
                    <p className="text-gray-900 font-medium">{t.volunteerEvent.location}</p>
                    <a href="https://maps.google.com/?q=Ștefan+Vodă,Moldova" target="_blank" rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:underline mt-1 inline-block">
                      {t.volunteerEvent.viewOnMap}
                    </a>
                  </div>
                </div>
                <div className="border-l-4 border-brand-500 bg-gray-50 p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{t.volunteerEvent.description}</p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Ștefan+Vodă,Moldova" target="_blank" rel="noopener noreferrer" className="w-full md:w-1/3 aspect-square overflow-hidden relative border border-gray-200 group cursor-pointer hover:border-brand-500 transition-colors hidden md:block">
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center bg-[url('/map-placeholder.png')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gray-100/40 group-hover:bg-transparent transition-colors" />
                  <MapPin className="w-8 h-8 text-brand-500 drop-shadow-lg animate-bounce-gentle" />
                </div>
              </a>
            </div>
            <div className="flex flex-col-reverse md:flex-row gap-4 justify-center md:justify-end border-t border-gray-200 pt-6">
              <button onClick={() => setIsVolunteerModalOpen(false)}
                className="px-6 py-3 border-2 border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-700 font-medium transition-all">
                {t.volunteerEvent.close}
              </button>
              <Link to="/inscriere" className="btn-primary px-8 py-3 font-bold inline-block text-center uppercase tracking-wide">
                {t.volunteerEvent.joinBtn}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
