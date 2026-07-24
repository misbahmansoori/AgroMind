import { motion } from "framer-motion";
import {
  CloudSun,
  CloudRain,
  Cloud,
  Sun,
  CloudLightning,
  Droplets,
  Wind,
  MapPin,
  Sparkles,
  Navigation,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const iconForCondition = (condition = "") => {
  const key = condition.toLowerCase();
  if (key.includes("rain") || key.includes("drizzle")) return CloudRain;
  if (key.includes("thunder")) return CloudLightning;
  if (key.includes("cloud")) return Cloud;
  if (key.includes("clear") || key.includes("sun")) return Sun;
  return CloudSun;
};

const themeForCondition = (condition = "", riskLevel = "Low") => {
  const key = condition.toLowerCase();

  if (key.includes("thunder")) {
    return {
      card: "from-[#1e293b] via-[#334155] to-[#0f766e]",
      glow: "bg-indigo-400/30",
      chip: "bg-white/15 text-white ring-white/20",
      muted: "text-slate-200/80",
      value: "text-white",
      panel: "bg-white/10 ring-white/15",
    };
  }

  if (key.includes("rain") || key.includes("drizzle")) {
    return {
      card: "from-[#0c4a6e] via-[#0369a1] to-[#0f766e]",
      glow: "bg-sky-300/35",
      chip: "bg-white/15 text-white ring-white/20",
      muted: "text-sky-100/85",
      value: "text-white",
      panel: "bg-white/10 ring-white/15",
    };
  }

  if (key.includes("clear") || key.includes("sun")) {
    return {
      card: "from-[#0369a1] via-[#0ea5e9] to-[#14b8a6]",
      glow: "bg-amber-200/40",
      chip: "bg-white/20 text-white ring-white/25",
      muted: "text-sky-50/90",
      value: "text-white",
      panel: "bg-white/15 ring-white/20",
    };
  }

  if (riskLevel === "High") {
    return {
      card: "from-[#7f1d1d] via-[#b45309] to-[#166534]",
      glow: "bg-amber-300/25",
      chip: "bg-white/15 text-white ring-white/20",
      muted: "text-orange-50/85",
      value: "text-white",
      panel: "bg-white/10 ring-white/15",
    };
  }

  return {
    card: "from-[#1d4ed8] via-[#0d9488] to-[#15803d]",
    glow: "bg-emerald-200/30",
    chip: "bg-white/15 text-white ring-white/20",
    muted: "text-emerald-50/85",
    value: "text-white",
    panel: "bg-white/10 ring-white/15",
  };
};

const tipTone = (riskLevel) => {
  if (riskLevel === "High") return "border-red-200/60 bg-red-50 text-red-900";
  if (riskLevel === "Medium")
    return "border-amber-200/70 bg-amber-50 text-amber-900";
  return "border-emerald-200/70 bg-emerald-50 text-emerald-900";
};

const WeatherCard = ({ weather, loading = false }) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <article className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[24px] border border-[#dce8dc] bg-gradient-to-br from-[#e8f4ff] via-white to-[#eaf7ef] p-5">
        <div className="absolute -right-8 -top-8 h-28 w-28 animate-pulse rounded-full bg-sky-200/50 blur-2xl" />
        <p className="text-sm font-medium text-gray-600">
          {t("detectingLocation")}
        </p>
        <p className="mt-2 text-xs text-gray-500">{t("fetchingWeather")}</p>
        <div className="mt-8 flex flex-1 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-100 border-t-sky-500" />
        </div>
      </article>
    );
  }

  if (!weather) {
    return (
      <article className="flex h-full min-h-[280px] flex-col justify-center rounded-[24px] border border-dashed border-green-300 bg-white p-5">
        <p className="text-sm font-medium text-gray-700">
          {t("weatherUnavailable")}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {t("weatherUnavailableHint")}
        </p>
      </article>
    );
  }

  const FallbackIcon = iconForCondition(weather.condition);
  const theme = themeForCondition(weather.condition, weather.riskLevel);
  const tips = weather.advice?.length ? weather.advice : [weather.insight];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[24px] bg-gradient-to-br ${theme.card} p-5 text-white shadow-[0_18px_40px_rgba(15,40,20,0.18)] transition-transform duration-300 hover:-translate-y-1`}
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${theme.glow} blur-3xl`}
      />
      <div className="pointer-events-none absolute -bottom-16 left-0 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.18em] ${theme.muted}`}
          >
            {t("weatherToday")}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium ring-1 ${theme.chip}`}
            >
              <MapPin size={12} />
              {weather.city}
              {weather.country ? `, ${weather.country}` : ""}
            </span>
            {weather.source === "gps" && (
              <span
                className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-medium ring-1 ${theme.chip}`}
              >
                <Navigation size={11} />
                {t("nearYou")}
              </span>
            )}
          </div>
        </div>

        <div className="relative grid h-16 w-16 place-items-center">
          {weather.iconUrl ? (
            <motion.img
              key={weather.iconUrl}
              src={weather.iconUrl}
              alt={weather.description || weather.condition}
              className="h-16 w-16 drop-shadow-lg"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            />
          ) : (
            <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
              <FallbackIcon size={28} strokeWidth={1.6} />
            </div>
          )}
        </div>
      </div>

      <div className="relative mt-4">
        <p
          className={`font-[Manrope] text-4xl font-extrabold tracking-tight sm:text-5xl ${theme.value}`}
        >
          {weather.temperature}°
          <span className="text-2xl font-bold opacity-80">C</span>
        </p>
        <p className={`mt-1 text-sm capitalize ${theme.muted}`}>
          {weather.description || weather.condition}
          {weather.feelsLike != null
            ? ` · ${t("feels")} ${weather.feelsLike}°C`
            : ""}
        </p>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-2">
        <div
          className={`rounded-2xl px-2.5 py-3 ring-1 backdrop-blur-sm ${theme.panel}`}
        >
          <div className={`flex items-center gap-1 text-[10px] ${theme.muted}`}>
            <Droplets size={12} />
            {t("humidity")}
          </div>
          <p className={`mt-1 font-[Manrope] text-base font-bold ${theme.value}`}>
            {weather.humidity}%
          </p>
        </div>
        <div
          className={`rounded-2xl px-2.5 py-3 ring-1 backdrop-blur-sm ${theme.panel}`}
        >
          <div className={`flex items-center gap-1 text-[10px] ${theme.muted}`}>
            <CloudRain size={12} />
            {t("rain")}
          </div>
          <p className={`mt-1 font-[Manrope] text-base font-bold ${theme.value}`}>
            {weather.rainfall > 0
              ? `${weather.rainfall}mm`
              : weather.rainExpected
                ? t("likely")
                : "0mm"}
          </p>
        </div>
        <div
          className={`rounded-2xl px-2.5 py-3 ring-1 backdrop-blur-sm ${theme.panel}`}
        >
          <div className={`flex items-center gap-1 text-[10px] ${theme.muted}`}>
            <Wind size={12} />
            {t("wind")}
          </div>
          <p className={`mt-1 font-[Manrope] text-base font-bold ${theme.value}`}>
            {weather.windSpeed}
            <span className="text-[10px] font-semibold opacity-80"> km/h</span>
          </p>
        </div>
      </div>

      <div className="relative mt-auto space-y-2 pt-4">
        {tips.map((tip, i) => (
          <div
            key={`${i}-${tip.slice(0, 24)}`}
            className={`flex gap-2 rounded-xl border px-3 py-2.5 text-xs leading-5 shadow-sm ${tipTone(
              weather.riskLevel,
            )}`}
          >
            <Sparkles
              size={14}
              className="mt-0.5 shrink-0 opacity-80"
              strokeWidth={1.8}
            />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
};

export default WeatherCard;
