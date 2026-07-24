import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight, ScanSearch, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import { getWeather } from "../../services/weatherService";
import {
  detectFarmerLocation,
  profileCity,
} from "../../utils/location";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
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

async function loadLiveWeather(user) {
  // 1) Prefer browser GPS so we never hardcode a city
  try {
    const { lat, lon } = await detectFarmerLocation();
    const data = await getWeather({ lat, lon });
    if (data?.success && data.weather) return data.weather;
  } catch (err) {
    console.warn("GPS weather unavailable:", err?.message || err);
  }

  // 2) Fallback to profile district/state/village
  const city = profileCity(user);
  if (city) {
    const data = await getWeather({ city });
    if (data?.success && data.weather) {
      return { ...data.weather, source: "profile" };
    }
  }

  return null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const displayName = user?.name?.split(" ")[0] || "Farmer";
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const latestScan = history[0];

  const todayScans = history.filter((item) => {
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
      const weatherPromise = loadLiveWeather(user)
        .then((live) => setWeather(live))
        .catch((err) => {
          console.error("Weather fetch failed:", err);
          setWeather(null);
        })
        .finally(() => setWeatherLoading(false));

      const [historyRes] = await Promise.all([historyPromise, weatherPromise]);
      setHistory(historyRes.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.district, user?.state, user?.village]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="mt-4 font-medium text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load dashboard
          </h2>
          <p className="mt-2 text-gray-600">Please try again.</p>
          <button
            onClick={fetchDashboard}
            className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-32">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-dashed border-green-300 bg-white/90 p-8 text-center shadow-sm lg:text-left">
              <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
                Your farm
              </p>
              <h2 className="mt-3 font-[Manrope] text-2xl font-extrabold text-gray-900">
                Welcome, {displayName}
              </h2>
              <p className="mt-3 text-gray-600">
                You have not analyzed any crops yet. Upload your first crop image
                to receive an AI-powered diagnosis — weather for your area is
                already live below.
              </p>
              <button
                onClick={() => navigate("/detect")}
                className="mt-6 rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
              >
                Scan Your First Crop
              </button>
            </div>
            <WeatherCard weather={weather} loading={weatherLoading} />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-32">
      <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-green-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[28px] border border-[#d5e6d5] bg-gradient-to-br from-white via-white to-[#eaf5ea] p-6 shadow-[0_16px_40px_rgba(15,40,20,0.06)] sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-100">
                <span className="live-dot h-2 w-2 rounded-full bg-green-600" />
                Live farm status
              </div>

              <h1 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Welcome back,{" "}
                <span className="shimmer-text">{displayName}</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-600">
                Your crop health, weather, and AI guidance in one clear view.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">Health</span>{" "}
                  <span className="font-bold text-green-700">{healthScore}</span>
                </div>
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">Risk</span>{" "}
                  <span className="font-bold text-green-700">
                    {latestScan ? latestScan.severity : "No Data"}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <Activity size={14} className="text-green-700" />
                  <span className="font-medium text-gray-700">
                    {todayScans} scans today
                  </span>
                </div>
                {weather && (
                  <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                    <span className="text-gray-500">Weather</span>{" "}
                    <span className="font-bold text-green-700">
                      {weather.temperature}°C · {weather.condition}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <Link to="/detect">
              <Button className="px-6 py-3.5">
                <ScanSearch size={18} />
                Upload Crop Photo
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
