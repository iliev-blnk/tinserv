import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#171717] border-t border-white/[0.06] text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center mb-20">
                    {/* Logo Column */}
                    <div className="flex items-center justify-center md:justify-start w-full">
                        <a href="#" className="block max-w-[180px] md:max-w-[220px]">
                            <img
                                src="/logo-1.png"
                                alt="TinSerV Logo"
                                className="w-full h-auto mx-auto md:mx-0"
                            />
                        </a>
                    </div>

                    {/* Content Column */}
                    <div className="text-center md:text-left">
                        <div className="mb-8">
                            <h3 className="font-black-heading text-2xl md:text-3xl text-white mb-3">{t.footer.title}</h3>
                            <blockquote className="border-l-4 border-brand-500 pl-4 italic text-brand-300 mb-6">
                                {t.footer.slogan}
                            </blockquote>
                        </div>

                        <ul className="space-y-4 w-full">
                            {[
                                t.footer.items.practical,
                                t.footer.items.community,
                                t.footer.items.spiritual,
                                t.footer.items.charity,
                                t.footer.items.youth,
                            ].map((item) => (
                                <li key={item} className="flex gap-4">
                                    <div className="flex-shrink-0 w-2 h-2 bg-brand-500 mt-2" />
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {item}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Centered Contact Section */}
                <div className="max-w-4xl mx-auto border-t border-gray-800 pt-16">
                    <div className="text-center mb-12 px-4">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-500 mb-6">
                            <span className="text-black font-black text-sm tracking-widest uppercase">{t.footer.cta.badge}</span>
                        </div>
                        <h2 className="font-black-heading text-3xl sm:text-4xl md:text-6xl text-white mb-4">{t.footer.cta.title}</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">{t.footer.cta.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="mailto:oponeatovskii@mail.ru" className="group p-4 sm:p-6 border border-gray-700 hover:border-brand-500 hover:bg-brand-500/5 transition-all duration-300 text-center">
                            <div className="w-12 h-12 bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-all duration-300 mx-auto mb-4">
                                <Mail className="h-6 w-6" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">{t.footer.contacts.write}</p>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium break-all">{"oponeatovskii@mail.ru"}</p>
                        </a>

                        <div className="group p-4 sm:p-6 border border-gray-700 hover:border-brand-500 hover:bg-brand-500/5 transition-all duration-300 text-center">
                            <div className="w-12 h-12 bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-all duration-300 mx-auto mb-4">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">{t.footer.contacts.location}</p>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">{t.footer.items.location}</p>
                        </div>

                        <a href="tel:+37368753358" className="group p-4 sm:p-6 border border-gray-700 hover:border-brand-500 hover:bg-brand-500/5 transition-all duration-300 text-center">
                            <div className="w-12 h-12 bg-brand-500/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 transition-all duration-300 mx-auto mb-4">
                                <Phone className="h-6 w-6" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">{t.footer.contacts.call}</p>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">+373 68 753 358</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-center">
                        <p className="text-gray-500 text-sm text-center">
                            {t.footer.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
