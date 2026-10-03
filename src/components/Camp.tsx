import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const START = new Date('2027-01-04T09:00:00+02:00').getTime();

// "92 de zile" / "5 zile" in Romanian; "92 дня" / "5 дней" / "1 день" in Russian.
function daysLabel(n: number, lang: 'ro' | 'ru') {
  if (lang === 'ro') {
    if (n === 1) return '1 zi până la ediția de iarnă';
    const de = n % 100 >= 20 || n % 100 === 0 ? 'de ' : '';
    return `${n} ${de}zile până la ediția de iarnă`;
  }
  const m10 = n % 10, m100 = n % 100;
  const word = m10 === 1 && m100 !== 11 ? 'день' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'дня' : 'дней';
  return `${n} ${word} до зимней смены`;
}

export default function Camp() {
  const { t, language } = useLanguage();
  const c = t.site.camp;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);

  const days = Math.ceil((START - now) / 86_400_000);
  const facts = [
    [c.where, c.whereValue],
    [c.when, c.whenValue],
    [c.seats, c.seatsValue],
    [c.signup, c.signupValue],
  ];

  return (
    <section id="iarna" className="scroll-mt-20 border-t border-paper/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <h2 className="font-black-heading mb-6 text-5xl text-white sm:text-6xl">{c.title}</h2>
          <p className="mb-8 max-w-md leading-relaxed text-paper/70">{t.volunteerEvent.description}</p>
          <p className="mb-8 text-brand-500">{days > 0 ? daysLabel(days, language) : c.started}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/registration" className="btn-primary px-6 py-3">{t.site.hero.register}</Link>
            <a href="https://maps.google.com/?q=Cimișlia,Moldova" target="_blank" rel="noopener noreferrer" className="link text-paper">
              {c.map}
            </a>
          </div>
        </div>

        <dl className="self-end border-t border-paper/10">
          {facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-6 border-b border-paper/10 py-4">
              <dt className="text-paper/50">{k}</dt>
              <dd className="text-right text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
