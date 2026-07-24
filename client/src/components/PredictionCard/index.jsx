import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const PredictionCard = ({ report, weather }) => {
  const { t, severityLabel } = useLanguage();

  const weatherBump =
    weather?.riskLevel === "High" ? 15 : weather?.riskLevel === "Medium" ? 8 : 0;

  const baseRisk = report
    ? report.severity === "High"
      ? 90
      : report.severity === "Medium"
        ? 60
        : 20
    : weather?.riskLevel === "High"
      ? 55
      : weather?.riskLevel === "Medium"
        ? 35
        : 18;

  const risk = Math.min(100, baseRisk + (report ? weatherBump : 0));

  const levelKey =
    risk >= 70
      ? "High"
      : risk >= 40
        ? "Medium"
        : report?.severity || weather?.riskLevel || "Low";

  const description = report
    ? t("predictionWithReport", {
        severity: severityLabel(report.severity).toLowerCase(),
        crop: report.cropName,
        humidity: weather
          ? t("humidityPart", { value: weather.humidity })
          : "",
      })
    : weather?.advice?.[0] ||
      weather?.insight ||
      t("predictionFallback");

  const ring = Math.min(100, Math.max(0, risk));
  const [display, setDisplay] = useState(0);
  const circumference = 2 * Math.PI * 44;

  const tone =
    risk < 30
      ? { bar: "#2e7d32", soft: "#eaf5ea", text: "text-green-700" }
      : risk < 60
        ? { bar: "#c47b16", soft: "#fff6e8", text: "text-amber-700" }
        : { bar: "#c62828", soft: "#fdecec", text: "text-red-700" };

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ring * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ring]);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce8dc] bg-white p-5 shadow-[0_4px_20px_rgba(15,40,20,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(46,125,50,0.1)]">
      <div className="relative flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{t("diseaseRisk")}</p>
        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${tone.text}`}
          style={{ backgroundColor: tone.soft }}
        >
          {severityLabel(levelKey)}
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center justify-center">
        <div className="relative grid h-28 w-28 place-items-center">
          <svg
            className="-rotate-90"
            width="112"
            height="112"
            viewBox="0 0 112 112"
          >
            <circle
              cx="56"
              cy="56"
              r="44"
              fill="none"
              stroke="#e8efe8"
              strokeWidth="9"
            />
            <motion.circle
              cx="56"
              cy="56"
              r="44"
              fill="none"
              stroke={tone.bar}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset: circumference - (ring / 100) * circumference,
              }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute text-center">
            <p className="font-[Manrope] text-3xl font-extrabold text-gray-900">
              {display}%
            </p>
            <p className="text-[11px] text-gray-500">{t("chance")}</p>
          </div>
        </div>

        <p className="mt-5 max-w-[200px] text-center text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </article>
  );
};

export default PredictionCard;
