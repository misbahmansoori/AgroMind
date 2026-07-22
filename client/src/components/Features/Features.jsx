import { motion } from "framer-motion";
import { ScanSearch, Stethoscope, CloudSun, Mic } from "lucide-react";

import Container from "../common/Container";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: ScanSearch,
    title: "AI Disease Detection",
    description:
      "Upload a crop photo and instantly identify disease with confidence score and severity — before damage spreads.",
  },
  {
    icon: Stethoscope,
    title: "AI Crop Doctor",
    description:
      "Get organic and chemical treatments, prevention tips, recovery time, and estimated cost in one clear report.",
  },
  {
    icon: CloudSun,
    title: "Disease Prediction",
    description:
      "Forecast risk using weather, humidity, rainfall, and past scans so farmers can act before outbreaks begin.",
  },
  {
    icon: Mic,
    title: "Voice Farmer Mode",
    description:
      "Ask questions by voice in Hindi or English — speech in, spoken guidance out — built for field use.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#f4faf4] py-24"
    >
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            Features
          </p>

          <h2 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything a farmer needs — in one assistant.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            From early detection to treatment and voice guidance, AgroMind
            turns crop problems into clear next steps.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: index * 0.1,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
