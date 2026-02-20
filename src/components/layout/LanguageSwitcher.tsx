import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 transition-all duration-300 group rounded-none"
            title={i18n.language === 'fr' ? 'Changer en Arabe' : 'Changer en Français'}
        >
            <Languages size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">
                {i18n.language === 'fr' ? 'AR' : 'FR'}
            </span>
        </button>
    );
}
