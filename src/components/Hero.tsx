import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const heroSlides = [
  {
    id: 1,
    image: '/photo_4.jpg',
    alt: 'TinSerV volunteers in winter'
  },
  {
    id: 2,
    image: '/photo1.jpg',
    alt: 'Community service volunteers'
  },
  {
    id: 3,
    image: '/photo2.jpg',
    alt: 'Outdoor volunteer group'
  },
  {
    id: 4,
    image: '/photo3.jpg',
    alt: 'TinSerV volunteers'
  }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { t } = useLanguage();

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    // Set the date we're counting down to
    const countDownDate = new Date("Aug 14, 2026 09:00:00").getTime();

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
    updateTimer(); // Initial call

    return () => clearInterval(timerInterval);
  }, []);

  // Body Scroll Lock
  useEffect(() => {
    if (isCollaborationModalOpen || isVolunteerModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCollaborationModalOpen, isVolunteerModalOpen]);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url('${slide.image}')`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
          <span className="text-white/90 text-sm font-medium">{t.hero.badge}</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {t.hero.headline1}
          <br />
          {t.hero.headline2}{' '}
          <span className="inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400 font-extrabold hover:scale-105 transition-transform duration-300">
              {t.hero.headlineHighlight}
            </span>
          </span>{' '}
          {t.hero.headline3}
        </h1>

        {/* CTA Buttons  */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => setIsCollaborationModalOpen(true)}
            className="btn-primary px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={() => setIsVolunteerModalOpen(true)}
            className="px-10 py-4 rounded-full text-lg font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeSlide
                ? 'bg-white w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex items-center justify-center gap-5 mt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <a
            href="https://facebook.com/tinserv.chisinau"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com/tinserv.chisinau"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/company/tinserv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Collaboration Modal */}
      {isCollaborationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsCollaborationModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-accent-500/10 rounded-full blur-2xl" />

            <button
              onClick={() => setIsCollaborationModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <ChevronRight className="w-6 h-6 rotate-45" />
            </button>

            <h3 className="text-2xl font-heading font-bold text-white mb-4 pr-8">
              {t.collaboration.title}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              {t.collaboration.description}
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-sm font-bold text-brand-400 uppercase tracking-wider">
                {t.collaboration.contactTitle}
              </p>
              <div className="space-y-3">
                <a href="mailto:oponeatovskii@mail.ru" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-transparent hover:border-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                    <span className="text-lg">@</span>
                  </div>
                  <span className="font-medium">oponeatovskii@mail.ru</span>
                </a>
                <a href="tel:+37368753358" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-transparent hover:border-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                    <span className="text-lg">📞</span>
                  </div>
                  <span className="font-medium">+373 68 753 358</span>
                </a>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsCollaborationModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-all border border-gray-700 hover:border-gray-600"
              >
                {t.collaboration.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteer Event Modal */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setIsVolunteerModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Decor */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-accent-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <button
              onClick={() => setIsVolunteerModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 p-2 bg-gray-900/50 rounded-full"
              aria-label="Close modal"
            >
              <ChevronRight className="w-6 h-6 rotate-45" />
            </button>

            <div className="text-center mb-8 mt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-400 text-xs font-bold uppercase tracking-wider mb-4 border border-accent-500/20">
                {t.volunteerEvent.modalTitle}
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                {t.volunteerEvent.eventTitle}
              </h3>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="flex flex-col items-center p-2 md:p-4 rounded-2xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm">
                  <span className="text-xl md:text-3xl font-mono font-bold text-white mb-1">
                    {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] md:text-xs text-brand-300 uppercase tracking-wider">
                    {t.volunteerEvent.timer[unit as keyof typeof t.volunteerEvent.timer]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="text-brand-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold mb-1">Locație</p>
                    <p className="text-white font-medium">{t.volunteerEvent.location}</p>
                    <a
                      href="https://maps.google.com/?q=Stefan+Voda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent-400 hover:underline mt-1 inline-block"
                    >
                      Vezi pe hartă →
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-900/40 border border-brand-500/20">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {t.volunteerEvent.description}
                  </p>
                </div>
              </div>

              {/* Simulated Map / Geo-tag Visual */}
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden relative border border-gray-700 group cursor-pointer hover:border-brand-500/50 transition-colors hidden md:block">
                {/* Placeholder for map - using a stylized gradient/mockup if real map api not avail, checking if keeping it static image is better */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center bg-[url('/map-placeholder.png')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors" />
                  <MapPin className="w-8 h-8 text-accent-500 drop-shadow-lg animate-bounce-gentle" />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row gap-4 justify-center md:justify-end border-t border-gray-800 pt-6">
              <button
                onClick={() => setIsVolunteerModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white font-medium transition-all"
              >
                {t.volunteerEvent.close}
              </button>
              <Link
                to="/inscriere"
                className="px-8 py-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white font-bold shadow-lg hover:shadow-accent-500/20 transition-all transform hover:-translate-y-1 inline-block text-center"
              >
                {t.volunteerEvent.joinBtn}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-20 hidden sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 z-20 hidden sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div >
  );
}