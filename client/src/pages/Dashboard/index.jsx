import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ScanSearch, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { getWeather } from "../../services/weatherService";
import { translateFields } from "../../services/translateService";
import {
  detectFarmerLocation,
  profileCity,
} from "../../utils/location";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import LanguageToggle from "../../components/common/LanguageToggle";
import HealthCard from "../../components/HealthCard";
import WeatherCard from "../../components/WeatherCard";
import PredictionCard from "../../components/PredictionCard";
import ReportCard from "../../components/ReportCard";
import TimelineCard from "../../components/TimelineCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

async function loadLiveWeather(user, lang = "en") {
  try {
    const { lat, lon } = await detectFarmerLocation();
    const data = await getWeather({ lat, lon, lang });
    if (data?.success && data.weather) return data.weather;
  } catch (err) {
    console.warn("GPS weather unavailable:", err?.message || err);
  }

  const city = profileCity(user);
  if (city) {
    const data = await getWeather({ city, lang });
    if (data?.success && data.weather) {
      return { ...data.weather, source: "profile" };
    }
  }

  return null;
}

/** Translate AI scan text fields (from image) into Hindi for display */
async function localizeHistory(items, lang) {
  if (lang !== "hi" || !items?.length) return items;

  const fields = {};
  items.forEach((item, i) => {
    if (item.cropName) fields[`crop_${i}`] = item.cropName;
    if (item.diseaseName) fields[`disease_${i}`] = item.diseaseName;
    if (item.explanation) fields[`explain_${i}`] = item.explanation;
    if (item.organicTreatment) fields[`organic_${i}`] = item.organicTreatment;
  });

  if (Object.keys(fields).length === 0) return items;

  try {
    const res = await translateFields(fields, "hi");
    const data = res?.data || {};

    return items.map((item, i) => ({
      ...item,
      cropName: data[`crop_${i}`] || item.cropName,
      diseaseName: data[`disease_${i}`] || item.diseaseName,
      explanation: data[`explain_${i}`] || item.explanation,
      organicTreatment: data[`organic_${i}`] || item.organicTreatment,
    }));
  } catch (err) {
    console.error("Diagnosis translate failed:", err);
    return items;
  }
}

const Dashboard = () => {
  const { user } = useAuth();
  const { t, severityLabel, lang } = useLanguage();
  const displayName =
    user?.name?.split(" ")[0] || (lang === "hi" ? "किसान" : "Farmer");
  const navigate = useNavigate();

  const [historyRaw, setHistoryRaw] = useState([]);
  const [history, setHistory] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [localizing, setLocalizing] = useState(false);
  const [error, setError] = useState("");

  const latestScan = history[0];

  const todayScans = historyRaw.filter((item) => {
    const today = new Date().toDateString();
    return new Date(item.detectedOn).toDateString() === today;
  }).length;

  const healthScore = latestScan
    ? latestScan.severity === "High"
      ? 40
      : latestScan.severity === "Medium"
        ? 70
        : 95
    : 100;

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const historyPromise = api.get("/history", { params: { limit: 10 } });

      setWeatherLoading(true);
      const weatherPromise = loadLiveWeather(user, lang)
        .then((live) => setWeather(live))
        .catch((err) => {
          console.error("Weather fetch failed:", err);
          setWeather(null);
        })
        .finally(() => setWeatherLoading(false));

      const [historyRes] = await Promise.all([historyPromise, weatherPromise]);
      const raw = historyRes.data.data || [];
      setHistoryRaw(raw);

      setLocalizing(lang === "hi" && raw.length > 0);
      const localized = await localizeHistory(raw, lang);
      setHistory(localized);
    } catch (err) {
      console.error(err);
      setError("fail");
    } finally {
      setLocalizing(false);
      setLoading(false);
    }
  };

  // Re-translate scan content + weather tips when language toggles
  useEffect(() => {
    let cancelled = false;

    const applyLanguage = async () => {
      if (!historyRaw.length && !weather) return;

      setLocalizing(lang === "hi" && historyRaw.length > 0);
      try {
        const [localized, liveWeather] = await Promise.all([
          localizeHistory(historyRaw, lang),
          loadLiveWeather(user, lang).catch(() => null),
        ]);
        if (cancelled) return;
        setHistory(localized);
        if (liveWeather) setWeather(liveWeather);
      } finally {
        if (!cancelled) setLocalizing(false);
      }
    };

    applyLanguage();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.district, user?.state, user?.village]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="mt-4 font-medium text-gray-600">{t("loadingDashboard")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            {t("unableTitle")}
          </h2>
          <p className="mt-2 text-gray-600">{t("pleaseRetry")}</p>
          <button
            onClick={fetchDashboard}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            {t("retry")}
          </button>
        </div>
      </div>
    );
  }

  if (historyRaw.length === 0) {
    return (
      <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32">
        <Container>
          <div className="mb-6 flex justify-end">
            <LanguageToggle />
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-dashed border-green-300 bg-white/90 p-6 text-center shadow-sm sm:p-8 lg:text-left">
              <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
                {t("yourFarm")}
              </p>
              <h2 className="mt-3 font-[Manrope] text-xl font-extrabold text-gray-900 sm:text-2xl">
                {t("welcome")}, {displayName}
              </h2>
              <p className="mt-3 text-sm text-gray-600 sm:text-base">{t("emptyBody")}</p>
              <button
                onClick={() => navigate("/detect")}
                className="mt-6 w-full rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 sm:w-auto"
              >
                {t("scanFirstCrop")}
              </button>
            </div>
            <WeatherCard weather={weather} loading={weatherLoading} />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-green-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />

      <Container className="relative">
        <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
          {localizing && (
            <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 ring-1 ring-amber-100">
              {lang === "hi"
                ? "AI निदान हिंदी में अनुवाद हो रहा है…"
                : "Updating language…"}
            </span>
          )}
          <LanguageToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[28px] border border-[#d5e6d5] bg-gradient-to-br from-white via-white to-[#eaf5ea] p-5 shadow-[0_16px_40px_rgba(15,40,20,0.06)] sm:p-6 md:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                <span className="live-dot h-2 w-2 rounded-full bg-green-600" />
                {t("liveFarmStatus")}
              </div>

              <h1 className="mt-4 font-[Manrope] text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
                {t("welcomeBack")},{" "}
                <span className="shimmer-text">{displayName}</span>
              </h1>
              <p className="mt-2 max-w-lg text-sm text-gray-600 sm:text-base">{t("subtitle")}</p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">{t("health")}</span>{" "}
                  <span className="font-bold text-green-700">{healthScore}</span>
                </div>
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">{t("risk")}</span>{" "}
                  <span className="font-bold text-green-700">
                    {latestScan
                      ? severityLabel(latestScan.severity)
                      : t("noData")}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <Activity size={14} className="text-green-700" />
                  <span className="font-medium text-gray-700">
                    {todayScans} {t("scansToday")}
                  </span>
                </div>
                {weather && (
                  <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                    <span className="text-gray-500">{t("weather")}</span>{" "}
                    <span className="font-bold text-green-700">
                      {weather.temperature}°C · {weather.condition}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Link to="/detect" className="w-full lg:w-auto">
              <Button className="w-full justify-center px-6 py-3.5 lg:w-auto">
                <ScanSearch size={18} />
                {t("uploadCropPhoto")}
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <HealthCard report={latestScan} />
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <WeatherCard weather={weather} loading={weatherLoading} />
          </motion.div>
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4"
          >
            <PredictionCard report={latestScan} weather={weather} />
          </motion.div>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <ReportCard report={latestScan} weather={weather} />
          </motion.div>
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <TimelineCard events={history} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
