import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'ro' ? 'ru' : 'ro');
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full font-semibold text-sm bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 border border-white/20"
        >
            {language === 'ro' ? '🇷🇴 RO' : '🇷🇺 RU'}
        </button>
    );
}
