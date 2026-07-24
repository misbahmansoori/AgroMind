import { createContext, useContext, useMemo, useState } from "react";
import { DASHBOARD_COPY, fillTemplate } from "../i18n/dashboard";

const LanguageContext = createContext(null);

const STORAGE_KEY = "agromind_lang";

function readStoredLang() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "hi" || raw === "en") return raw;
  } catch {
    // ignore
  }
  return "en";
}

export function LanguageProvider({ children, defaultLang }) {
  const initial =
    defaultLang === "hi" || defaultLang === "en"
      ? defaultLang
      : readStoredLang();

  const [lang, setLangState] = useState(initial);

  const setLang = (next) => {
    const value = next === "hi" ? "hi" : "en";
    setLangState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => setLang(lang === "hi" ? "en" : "hi");

  const value = useMemo(() => {
    const t = (key, vars) => {
      const entry = DASHBOARD_COPY[key];
      if (!entry) return key;
      const text = entry[lang] || entry.en || key;
      return vars ? fillTemplate(text, vars) : text;
    };

    const severityLabel = (level) => {
      const key = String(level || "").toLowerCase();
      if (key === "high") return t("high");
      if (key === "medium") return t("medium");
      if (key === "low") return t("low");
      if (key === "good") return t("good");
      return level || t("noData");
    };

    return {
      lang,
      setLang,
      toggleLang,
      isHindi: lang === "hi",
      t,
      severityLabel,
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
