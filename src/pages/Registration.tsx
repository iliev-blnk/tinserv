import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Send, CheckCircle, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx88nINdcSPkueotz2Y_fDGjPoReXkEzAb2neW6kHFbTxwqczunyUwNKi8P5rMKliNmQ/exec';
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzsLMFea0FYkp6tj6ZR5meJhnEd1rL9v3RJDVPo2WCi6cQCMMkKVcxnhHJBbj1qTMsvbt4S5gEwkVl/pub?gid=0&single=true&output=csv';

function useCountUp(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (target === 0 || started.current) return;
    started.current = true;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setDisplay(Math.round((step / steps) * target));
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration]);

  return display;
}

export default function Registration() {
  const { t, language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [volunteerCount, setVolunteerCount] = useState(0);
  const displayCount = useCountUp(volunteerCount);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(r => r.text())
      .then(text => {
        const lines = text.trim().split('\n').filter(l => l.trim());
        setVolunteerCount(Math.max(0, lines.length - 1));
      })
      .catch(() => setVolunteerCount(30));
  }, []);

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
      setError('Ceva nu a mers. Încearcă din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="lg:w-5/12 bg-[#171717] lg:min-h-screen lg:sticky lg:top-0 flex flex-col">
        <div className="flex flex-col flex-1 px-8 py-10 lg:px-12 lg:py-12 max-w-lg mx-auto w-full">

          {/* Back + lang switcher */}
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-500 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t.registration.back}
            </Link>
            <button
              onClick={() => setLanguage(language === 'ro' ? 'ru' : 'ro')}
              className="border-2 border-white/20 text-gray-400 hover:border-brand-500 hover:text-brand-500 font-bold text-xs uppercase tracking-widest px-3 py-1.5 transition-all"
            >
              {language === 'ro' ? '🇷🇺 RU' : '🇷🇴 RO'}
            </button>
          </div>

          {/* Place name */}
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span className="text-brand-500 text-xs font-bold uppercase tracking-[0.2em]">
              TinSerV Chișinău
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-black-heading text-5xl lg:text-6xl text-white mb-8 leading-[0.9]">
            Devino<br />
            <span className="text-brand-500">voluntar</span>
          </h1>

          {/* Counter */}
          <div className="flex items-end gap-3 mb-10 pb-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-500" />
              <span className="text-5xl font-black text-white tabular-nums">
                {displayCount}
              </span>
            </div>
            <span className="text-gray-400 text-sm pb-1">voluntari înscriși</span>
          </div>

          {/* Motivational quote */}
          <blockquote className="border-l-4 border-brand-500 pl-5 mb-10">
            <p className="text-white text-xl font-heading font-bold leading-snug mb-2">
              „Fii lumina care<br />schimbă lumea."
            </p>
            <cite className="text-gray-500 text-sm not-italic">— misiunea TinSerV</cite>
          </blockquote>

          {/* Map */}
          <div className="flex-1 min-h-[220px] lg:min-h-0 overflow-hidden border-2 border-white/10">
            <iframe
              title="TinSerV Chișinău"
              src="https://maps.google.com/maps?q=Chisinau,Moldova&z=13&output=embed"
              className="w-full h-full min-h-[220px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="lg:w-7/12 bg-[#fafaf8] flex items-center justify-center px-6 py-14 lg:px-16">
        <div className="w-full max-w-lg">

          {!isSubmitted ? (
            <>
              <div className="mb-10">
                <h2 className="font-black-heading text-4xl text-gray-900 mb-3">
                  {t.registration.title}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed">
                  {t.registration.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.registration.fields.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ion Popescu"
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#ffe600] transition-colors text-base"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.registration.fields.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ion@example.com"
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#ffe600] transition-colors text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t.registration.fields.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+373 60 123 456"
                      className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#ffe600] transition-colors text-base"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.registration.fields.message}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Spune-ne ceva despre tine sau disponibilitatea ta…"
                    className="w-full px-4 py-4 bg-white border-2 border-gray-200 text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#ffe600] transition-colors resize-none text-base"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-5 text-base font-black uppercase tracking-wide flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  {isSubmitting ? 'Se trimite…' : t.registration.fields.submit}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>

                <p className="text-gray-400 text-xs text-center">
                  Datele tale sunt în siguranță și nu vor fi distribuite.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-brand-500 flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-black-heading text-4xl text-gray-900 mb-4">
                {t.registration.success}
              </h2>
              <p className="text-gray-500 mb-10 text-lg max-w-sm mx-auto leading-relaxed">
                Te vom contacta în curând cu mai multe detalii. Mulțumim că ești parte din echipă!
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
