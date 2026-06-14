import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Send, CheckCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx88nINdcSPkueotz2Y_fDGjPoReXkEzAb2neW6kHFbTxwqczunyUwNKi8P5rMKliNmQ/exec';

export default function Registration() {
  const { t, language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('message', formData.message);
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: data, mode: 'no-cors' });
      setIsSubmitted(true);
    } catch {
      setError(t.registration.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const langToggle = (
    <button
      onClick={() => setLanguage(language === 'ro' ? 'ru' : 'ro')}
      className="border-2 border-white/20 text-gray-400 hover:border-brand-500 hover:text-brand-500 font-bold text-xs uppercase tracking-widest px-3 py-1.5 transition-all flex-shrink-0"
    >
      {language === 'ro' ? '🇷🇺 RU' : '🇷🇴 RO'}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#171717] flex flex-col lg:flex-row">

      {/* ── MOBILE TOPBAR (hidden on desktop) ── */}
      <div className="lg:hidden bg-[#171717] border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.registration.back}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-brand-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">Ștefan Vodă</span>
          </div>
          {langToggle}
        </div>
      </div>

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#171717] lg:min-h-screen lg:sticky lg:top-0 flex-col">
        <div className="flex flex-col flex-1 px-12 py-12 max-w-lg mx-auto w-full">

          {/* Back + lang switcher */}
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.registration.back}
            </Link>
            {langToggle}
          </div>

          {/* Place name */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="text-brand-500 text-xs font-bold uppercase tracking-[0.2em]">
              TinSerV Ștefan Vodă
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-black-heading text-5xl lg:text-6xl text-white mb-8 leading-[0.9]">
            {t.registration.heading}<br />
            <span className="text-brand-500">{t.registration.headingAccent}</span>
          </h1>

          {/* Motivational quote */}
          <blockquote className="border-l-4 border-brand-500 pl-5 mb-10">
            <p className="text-white text-xl font-heading font-bold leading-snug mb-2">
              {t.registration.quote}
            </p>
            <cite className="text-gray-500 text-sm not-italic">{t.registration.quoteCite}</cite>
          </blockquote>

          {/* Map */}
          <div className="flex-1 min-h-0 overflow-hidden border-2 border-white/10">
            <iframe
              title="TinSerV Ștefan Vodă"
              src="https://maps.google.com/maps?q=Stefan+Voda,Moldova&z=13&output=embed"
              className="w-full h-full"
              style={{ minHeight: '200px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── FORM PANEL ── */}
      <div className="flex-1 lg:w-7/12 bg-[#1e1e1e] flex items-center justify-center px-6 py-10 lg:py-16 lg:px-16">
        <div className="w-full max-w-lg">

          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="font-black-heading text-3xl lg:text-4xl text-white mb-3">
                  {t.registration.title}
                </h2>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                  {t.registration.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t.registration.fields.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ion Popescu"
                    className="w-full px-4 py-3.5 bg-[#2a2a2a] border-2 border-[#333] text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 transition-colors text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {t.registration.fields.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ion@example.com"
                      className="w-full px-4 py-3.5 bg-[#2a2a2a] border-2 border-[#333] text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      {t.registration.fields.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+373 60 123 456"
                      className="w-full px-4 py-3.5 bg-[#2a2a2a] border-2 border-[#333] text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 transition-colors text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {t.registration.fields.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.registration.fields.messagePlaceholder}
                    className="w-full px-4 py-3.5 bg-[#2a2a2a] border-2 border-[#333] text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-500 transition-colors resize-none text-base"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-base font-black uppercase tracking-wide flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? t.registration.fields.sending : t.registration.fields.submit}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                <p className="text-gray-600 text-xs text-center">
                  {t.registration.privacy}
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-brand-500 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-black-heading text-3xl lg:text-4xl text-white mb-4">
                {t.registration.success}
              </h2>
              <p className="text-gray-400 mb-10 text-base lg:text-lg max-w-sm mx-auto leading-relaxed">
                {t.registration.successSub}
              </p>
              <Link
                to="/"
                className="btn-dark inline-flex items-center gap-2 px-8 py-4 font-bold uppercase tracking-wide text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.registration.back}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
