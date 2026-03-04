import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { translations } from './data/translations.ts';

export type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

export const languages: { [key: string]: string } = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  zh: '中文 (简体)',
  ru: 'Русский',
  nl: 'Nederlands',
  pt: 'Português',
  ja: '日本語',
  ko: '한국어',
  it: 'Italiano',
  ar: 'العربية',
  hi: 'हिन्दी',
  tr: 'Türkçe',
  pl: 'Polski',
  sv: 'Svenska',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
  vi: 'Tiếng Việt',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && languages[langFromUrl]) {
        return langFromUrl;
    }
    const langFromStorage = localStorage.getItem('language');
    if (langFromStorage && languages[langFromStorage]) {
        return langFromStorage;
    }
    const browserLang = navigator.language.split('-')[0];
    if (languages[browserLang]) {
        return browserLang;
    }
    return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(getInitialLanguage);

  const setLanguage = (lang: string) => {
    if (languages[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('lang', lang);
      window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = useMemo(() => (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};