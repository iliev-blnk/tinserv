import { useLanguage } from '../contexts/LanguageContext';

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.howItWorks;
  const values = [h.step1, h.step2, h.step3];
  const activities = [
    t.footer.items.practical,
    t.footer.items.community,
    t.footer.items.spiritual,
    t.footer.items.charity,
    t.footer.items.youth,
  ];

  return (
    <section id="ce-facem" className="scroll-mt-20 border-t border-paper/10">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <h2 className="font-black-heading mb-4 text-5xl text-white sm:text-6xl">{t.site.about.title}</h2>
        <p className="mb-14 max-w-xl text-paper/60">{t.footer.title}</p>

        <div className="mb-20 grid gap-10 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-t border-paper/20 pt-5">
              <h3 className="mb-3 font-sans text-lg font-bold text-white">{v.title}</h3>
              <p className="leading-relaxed text-paper/70">{v.description}</p>
            </div>
          ))}
        </div>

        <h3 className="mb-6 font-sans text-paper/50">{t.site.about.activities}</h3>
        <ul className="grid gap-x-10 border-t border-paper/10 md:grid-cols-2">
          {activities.map((a) => {
            const [name, ...rest] = a.split(':');
            return (
              <li key={a} className="border-b border-paper/10 py-4 leading-relaxed">
                <span className="text-white">{name}</span>
                {rest.length > 0 && <span className="text-paper/60"> {rest.join(':').trim()}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
