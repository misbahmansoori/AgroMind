import { Languages } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const LanguageToggle = ({ className = "" }) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-xl border border-[#d5e6d5] bg-white/90 p-1 shadow-sm ${className}`}
      role="group"
      aria-label={t("language")}
    >
      <span className="hidden items-center gap-1 px-2 text-xs font-medium text-gray-500 sm:inline-flex">
        <Languages size={14} />
        {t("language")}
      </span>

      <button
        type="button"
        onClick={() => setLang("en")}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
          lang === "en"
            ? "bg-green-700 text-white shadow-sm"
            : "text-gray-600 hover:bg-green-50"
        }`}
      >
        <span className="sm:hidden">EN</span>
        <span className="hidden sm:inline">English</span>
      </button>
      <button
        type="button"
        onClick={() => setLang("hi")}
        className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 ${
          lang === "hi"
            ? "bg-green-700 text-white shadow-sm"
            : "text-gray-600 hover:bg-green-50"
        }`}
      >
        <span className="sm:hidden">हिं</span>
        <span className="hidden sm:inline">हिंदी</span>
      </button>
    </div>
  );
};

export default LanguageToggle;
