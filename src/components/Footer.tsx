import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-12 items-center mb-20">
                    {/* Logo Column */}
                    <div className="flex items-center justify-center md:justify-start w-full">
                        <a href="#" className="block w-full max-w-[400px] md:max-w-none">
                            <img
                                src="/logo-1.png"
                                alt="TinSerV Logo"
                                className="w-full h-auto object-cover max-h-[300px] md:max-h-[500px] mx-auto md:mx-0"
                            />
                        </a>
                    </div>

                    {/* Content Column */}
                    <div className="text-center md:text-left">
                        <div className="mb-8">
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-3">{t.footer.title}</h3>
                            <p className="text-gray-400 leading-relaxed italic border-l-0 md:border-l-4 border-brand-500 pl-0 md:pl-4 mb-6">
                                {t.footer.slogan}
                            </p>
                        </div>

                        <ul className="space-y-4 inline-block text-left">
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t.footer.items.practical}
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t.footer.items.community}
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t.footer.items.spiritual}
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t.footer.items.charity}
                                </p>
                            </li>
                            <li className="flex gap-4">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center mt-0.5">
                                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t.footer.items.youth}
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Centered Contact Section */}
                <div className="max-w-4xl mx-auto border-t border-gray-800 pt-16">
                    <div className="text-center mb-12 px-4">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                            <span className="text-accent-400 font-bold text-sm tracking-wide uppercase">{t.footer.cta.badge}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{t.footer.cta.title}</h2>
                        <p className="text-gray-400 max-w-xl mx-auto">{t.footer.cta.subtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <a href="mailto:oponeatovskii@mail.ru" className="group p-6 rounded-2xl bg-gray-800/20 border border-gray-700/30 hover:border-brand-500/40 hover:bg-gray-800/40 transition-all duration-300 text-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all duration-300 mx-auto mb-4">
                                <Mail className="h-6 w-6" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">{t.footer.contacts.write}</p>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium break-all">{"oponeatovskii@mail.ru"}</p>
                        </a>

                        <div className="group p-6 rounded-2xl bg-gray-800/20 border border-gray-700/30 hover:border-brand-500/40 hover:bg-gray-800/40 transition-all duration-300 text-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all duration-300 mx-auto mb-4">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-bold mb-1">{t.footer.contacts.location}</p>
                            <p className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">{t.footer.items.location}</p>
                        </div>

                        <a href="tel:+37368753358" className="group p-6 rounded-2xl bg-gray-800/20 border border-gray-700/30 hover:border-brand-500/40 hover:bg-gray-800/40 transition-all duration-300 text-center">
                            <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-400 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-all duration-300 mx-auto mb-4">
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
