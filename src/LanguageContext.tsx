import React, { createContext, useContext } from 'react';

const LanguageContext = createContext({ t: (key: string) => key });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: string) => key; // Simple placeholder
  return <LanguageContext.Provider value={{ t }}>{children}</LanguageContext.Provider>;
};

export const useTranslation = () => useContext(LanguageContext);
