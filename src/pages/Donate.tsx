import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Heart, Copy, Check, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

// ── NGO bank details (Victoriabank) ──────────────────────────────────
// A.O. TINSERV CHISINAU — MDL current account, confirmed from the bank's
// "Rechizite bancare" document (Victoriabank, suc. nr.28 Călărași).
const BANK_DETAILS = {
  beneficiary: 'A.O. TINSERV CHISINAU',
  idno: '1026023126643',
  iban: 'MD31VI022512800000224MDL',
  bic: 'VICBMD2X492',
  bank: 'B.C. „Victoriabank" S.A., suc. nr.28 Călărași',
};

const PRESETS = [100, 250, 500];

export default function Donate() {
  const { t, language, setLanguage } = useLanguage();
  const d = t.donate;

  const [amount, setAmount] = useState<number | 'custom'>(250);
  const [customValue, setCustomValue] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const numericAmount = amount === 'custom' ? Number(customValue) || 0 : amount;
  const suggestedLabel = numericAmount > 0 ? `${numericAmount} ${d.currency}` : '—';

  const copy = (key: string, value: string) => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(prev => (prev === key ? null : prev)), 1800);
    });
  };

  const langToggle = (
    <button
      onClick={() => setLanguage(language === 'ro' ? 'ru' : 'ro')}
      className="border-2 border-white/20 text-gray-400 hover:border-ice-500 hover:text-ice-500 font-bold text-xs uppercase tracking-widest px-3 py-1.5 transition-all flex-shrink-0"
    >
      {language === 'ro' ? '🇷🇺 RU' : '🇷🇴 RO'}
    </button>
  );

  // Rows shown in the bank-transfer block. `copyable` fields get a copy button.
  const rows: { key: string; label: string; value: string; copyable?: boolean }[] = [
    { key: 'beneficiary', label: d.transfer.beneficiary, value: BANK_DETAILS.beneficiary, copyable: true },
    { key: 'iban', label: d.transfer.iban, value: BANK_DETAILS.iban, copyable: true },
    { key: 'idno', label: d.transfer.idno, value: BANK_DETAILS.idno, copyable: true },
    { key: 'bank', label: d.transfer.bank, value: BANK_DETAILS.bank },
    { key: 'bic', label: d.transfer.bic, value: BANK_DETAILS.bic, copyable: true },
    { key: 'purpose', label: d.transfer.purpose, value: d.transfer.purposeValue, copyable: true },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col lg:flex-row">

      {/* ── MOBILE TOPBAR (hidden on desktop) ── */}
      <div className="lg:hidden bg-[#020617] border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-ice-500 transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {d.back}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-brand-500">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">TinSerV</span>
          </div>
          {langToggle}
        </div>
      </div>

      {/* ── LEFT PANEL (desktop only) ── */}
      <div className="hidden lg:flex lg:w-5/12 bg-[#020617] lg:min-h-screen lg:sticky lg:top-0 flex-col">
        <div className="flex flex-col flex-1 px-12 py-12 max-w-lg mx-auto w-full">

          {/* Back + lang switcher */}
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-ice-500 transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {d.back}
            </Link>
            {langToggle}
          </div>

          {/* Brand tag */}
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-4 h-4 text-brand-500 fill-current flex-shrink-0" />
            <span className="text-brand-500 text-xs font-bold uppercase tracking-[0.2em]">
              TinSerV Chișinău
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-black-heading text-5xl lg:text-6xl text-white mb-8 leading-[0.9]">
            {d.heading}<br />
            <span className="frost-text">{d.headingAccent}</span>
          </h1>

          {/* Motivational quote */}
          <blockquote className="border-l-4 border-brand-500 pl-5 mb-10">
            <p className="text-white text-xl font-heading font-bold leading-snug mb-2">
              {d.quote}
            </p>
            <cite className="text-gray-500 text-sm not-italic">{d.quoteCite}</cite>
          </blockquote>

          {/* Intro / why donate */}
          <p className="text-gray-400 text-base leading-relaxed">
            {d.intro}
          </p>
        </div>
      </div>

      {/* ── DONATION PANEL ── */}
      <div className="flex-1 lg:w-7/12 bg-[#0b1220] flex items-center justify-center px-6 py-10 lg:py-16 lg:px-16">
        <div className="w-full max-w-lg">

          <div className="mb-8">
            <h2 className="font-black-heading text-3xl lg:text-4xl text-white mb-3">
              {d.title}
            </h2>
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
              {d.subtitle}
            </p>
          </div>

          {/* Amount selector */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-300">
                {d.amountLabel}
              </label>
              <span className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold border border-white/10 px-2 py-1">
                {d.once}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              {PRESETS.map(preset => {
                const active = amount === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => { setAmount(preset); setCustomValue(''); }}
                    className={`py-4 font-black text-lg border-2 transition-all ${
                      active
                        ? 'bg-brand-500 text-black border-brand-500 shadow-glow'
                        : 'bg-[#2a2a2a] text-white border-[#333] hover:border-brand-500'
                    }`}
                  >
                    {preset}
                    <span className="block text-[10px] font-bold tracking-widest opacity-70">{d.currency}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div className={`flex items-center border-2 transition-colors ${
              amount === 'custom' ? 'border-brand-500' : 'border-[#333]'
            } bg-[#2a2a2a]`}>
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={customValue}
                onFocus={() => setAmount('custom')}
                onChange={(e) => { setCustomValue(e.target.value); setAmount('custom'); }}
                placeholder={d.customAmount}
                className="flex-1 px-4 py-3.5 bg-transparent text-white placeholder:text-gray-600 focus:outline-none text-base"
              />
              <span className="px-4 text-gray-500 font-bold text-sm">{d.currency}</span>
            </div>
          </div>

          {/* Payment methods */}
          <p className="text-sm font-semibold text-gray-300 mb-3">{d.methodsLabel}</p>

          {/* Method 1 — Bank transfer (live) */}
          <div className="border-2 border-brand-500/40 bg-brand-500/[0.04] p-5 mb-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{d.transfer.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-1">{d.transfer.desc}</p>
              </div>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-wider font-black text-black bg-brand-500 px-2 py-1">
                {d.transfer.badge}
              </span>
            </div>

            {/* Suggested amount echo */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 mb-1">
              <span className="text-xs uppercase tracking-[0.15em] text-gray-500 font-bold">{d.transfer.suggested}</span>
              <span className="text-brand-500 font-black text-lg">{suggestedLabel}</span>
            </div>

            {/* Bank detail rows */}
            <div className="divide-y divide-white/[0.06]">
              {rows.map(row => (
                <div key={row.key} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-0.5">{row.label}</p>
                    <p className="text-gray-200 text-sm font-medium break-all">{row.value}</p>
                  </div>
                  {row.copyable && (
                    <button
                      type="button"
                      onClick={() => copy(row.key, row.value)}
                      aria-label={d.transfer.copy}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-brand-500 border border-white/10 hover:border-brand-500 px-2.5 py-1.5 transition-all"
                    >
                      {copiedKey === row.key
                        ? <><Check className="w-3.5 h-3.5" />{d.transfer.copied}</>
                        : <><Copy className="w-3.5 h-3.5" />{d.transfer.copy}</>}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Method 2 — Card (coming soon, ready for Victoriabank gateway) */}
          <div className="border-2 border-[#333] bg-[#2a2a2a]/40 p-5 mb-6 opacity-70">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-gray-300 font-bold text-lg leading-tight">{d.card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mt-1">{d.card.desc}</p>
                </div>
              </div>
              <span className="flex-shrink-0 text-[10px] uppercase tracking-wider font-black text-gray-400 border border-white/15 px-2 py-1">
                {d.card.comingSoon}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-xs text-center leading-relaxed">
            {d.receiptNote}
          </p>
        </div>
      </div>
    </div>
  );
}
