import { createContext, useContext, useState, useEffect, useCallback } from "react";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

const LanguageContext = createContext();

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", language);
  }, [language, direction]);

  const t = useCallback(
    (key) => {
      return getNestedValue(translations[language], key) || key;
    },
    [language]
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

