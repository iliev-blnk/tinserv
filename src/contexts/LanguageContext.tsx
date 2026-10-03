import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { translations } from '../translations';
import type { Language } from '../translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations.ro | typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Saved choice, else Romanian. Storage can throw in private windows.
        try {
            return localStorage.getItem('tinserv-language') === 'ru' ? 'ru' : 'ro';
        } catch {
            return 'ro';
        }
    });

    useEffect(() => {
        document.documentElement.lang = language;
        try {
            localStorage.setItem('tinserv-language', language);
        } catch { /* not persisted, still works for this visit */ }
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
