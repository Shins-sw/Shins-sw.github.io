import { createContext, useState, useContext, useMemo } from 'react';

interface iLanguageContextType {
  lang: Language;
  setLang: React.Dispatch<React.SetStateAction<Language>>;
}

export enum Language {
  polish = 'polish',
  english = 'english',
}

const LanguageContext = createContext<iLanguageContextType>({
  lang: Language.polish,
  setLang: () => {},
});
LanguageContext.displayName = 'LanguageContext';

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(Language.polish);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
