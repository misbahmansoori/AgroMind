import { motion } from "framer-motion";

import Container from "../common/Container";
import HealthCard from "../HealthCard";
import WeatherCard from "../WeatherCard";
import PredictionCard from "../PredictionCard";
import ReportCard from "../ReportCard";
import TimelineCard from "../TimelineCard";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const DashboardPreview = () => {
  return (
    <section id="dashboard-preview" className="relative bg-white py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            Smart Farm Dashboard
          </p>

          <h2 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            See your farm’s health in one clear view.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Live crop score, weather, disease risk, AI guidance, and scan
            history — built for fast decisions in the field.
          </p>
        </motion.div>

        {/* Product frame */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 max-w-6xl"
        >
          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-green-100/80 via-transparent to-emerald-50/60 blur-sm" />

          <div className="relative overflow-hidden rounded-[28px] border border-[#d5e4d5] bg-[#f7faf7] shadow-[0_24px_60px_rgba(15,40,20,0.08)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-[#dce8dc] bg-white/80 px-5 py-3.5 backdrop-blur-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8e2]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8e2]" />
              <p className="ml-3 font-[Manrope] text-sm font-semibold text-gray-700">
                AgroMind · Farm Overview
              </p>
            </div>

            <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-12 lg:gap-5 lg:p-6">
              <motion.div
                custom={0.05}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <HealthCard />
              </motion.div>

              <motion.div
                custom={0.12}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <WeatherCard />
              </motion.div>

              <motion.div
                custom={0.19}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <PredictionCard />
              </motion.div>

              <motion.div
                custom={0.26}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-7"
              >
                <ReportCard />
              </motion.div>

              <motion.div
                custom={0.33}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-5"
              >
                <TimelineCard />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default DashboardPreview;
