import { createContext, useContext, useState, type ReactNode } from "react";
import { languages, type Language } from "../data/i18n";

interface LanguageContextValue {
  language: Language;
  setLanguageCode: (code: string) => void;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState(languages[0].code);
  const language = languages.find((l) => l.code === code) ?? languages[0];
  return (
    <LanguageContext.Provider value={{ language, setLanguageCode: setCode, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}
