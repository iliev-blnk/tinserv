import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const c = t.site.contact;

  const rows = [
    { label: t.footer.contacts.write, value: 'oponeatovskii@mail.ru', href: 'mailto:oponeatovskii@mail.ru' },
    { label: t.footer.contacts.call, value: '+373 68 753 358', href: 'tel:+37368753358' },
    { label: t.footer.contacts.location, value: t.footer.items.location },
    { label: 'Instagram', value: '@tinserv.chisinau', href: 'https://instagram.com/tinserv.chisinau' },
    { label: 'Telegram', value: 't.me/tinservchisinau', href: 'https://t.me/tinservchisinau' },
  ];

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-paper/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <h2 className="font-black-heading mb-6 text-5xl text-white sm:text-6xl">{c.title}</h2>
          <p className="mb-8 max-w-md leading-relaxed text-paper/70">{c.subtitle}</p>
          <p className="italic text-paper/60">{t.footer.slogan}</p>
        </div>

        <dl className="self-end border-t border-paper/10">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-6 border-b border-paper/10 py-4">
              <dt className="text-paper/50">{r.label}</dt>
              <dd className="min-w-0 break-all text-right">
                {r.href ? (
                  <a href={r.href} className="link text-white" {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {r.value}
                  </a>
                ) : (
                  <span className="text-white">{r.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-paper/50 sm:px-8">
          <img src="/logo.png" alt="TinSerV" className="h-6 w-auto" />
          <span>{t.site.copyright}</span>
          <Link to="/donate" className="link">{t.site.nav.donate}</Link>
        </div>
      </div>
    </footer>
  );
}
