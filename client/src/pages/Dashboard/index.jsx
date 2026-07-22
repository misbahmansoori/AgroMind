import { Link } from "react-router-dom";
import { ArrowRight, ScanSearch, Activity } from "lucide-react";
import { motion } from "framer-motion";

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

const Dashboard = () => {
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
                <span className="shimmer-text">Farmer</span>
              </h1>
              <p className="mt-2 max-w-lg text-gray-600">
                Your crop health, weather, and AI guidance in one clear view.
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">Health</span>{" "}
                  <span className="font-bold text-green-700">86</span>
                </div>
                <div className="rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <span className="text-gray-500">Risk</span>{" "}
                  <span className="font-bold text-green-700">Low</span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3.5 py-2 ring-1 ring-[#dce8dc]">
                  <Activity size={14} className="text-green-700" />
                  <span className="font-medium text-gray-700">3 scans today</span>
                </div>
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
            <HealthCard />
          </motion.div>
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <WeatherCard />
          </motion.div>
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4"
          >
            <PredictionCard />
          </motion.div>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <ReportCard />
          </motion.div>
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <TimelineCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
