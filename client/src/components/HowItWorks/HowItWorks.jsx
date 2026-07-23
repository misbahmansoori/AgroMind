import { motion } from "framer-motion";
import {
  Upload,
  BrainCircuit,
  Stethoscope,
  FileDown,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

import Container from "../common/Container";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Crop",
    description:
      "Snap or upload a clear leaf photo from the field — no special equipment needed.",
  },
  {
    step: "02",
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "AgroMind detects the disease, confidence score, and severity in seconds.",
  },
  {
    step: "03",
    icon: Stethoscope,
    title: "Treatment Recommendation",
    description:
      "Get organic and chemical options, prevention tips, and recovery guidance.",
  },
  {
    step: "04",
    icon: FileDown,
    title: "Save Report",
    description:
      "Download a Crop Doctor PDF and keep the scan in your farm timeline.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#f4faf4] py-24"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            How It Works
          </p>

          <h2 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            From photo to treatment in four steps.
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A simple flow farmers can trust - fast enough for the field, clear
            enough for action.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={item.title} className="contents">
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-full flex-col rounded-[22px] border border-[#dce8dc] bg-white p-6 text-center lg:text-left"
                >
                  <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
                    <div className="inline-flex rounded-2xl bg-[#eaf5ea] p-3 text-green-700">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="font-[Manrope] text-sm font-bold tracking-wide text-green-700/70">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-[Manrope] text-xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[15px] leading-7 text-gray-600">
                    {item.description}
                  </p>
                </motion.article>

                {!isLast && (
                  <div className="flex items-center justify-center py-1 lg:px-2">
                    <ArrowDown
                      className="text-green-600/50 lg:hidden"
                      size={22}
                      strokeWidth={1.8}
                    />
                    <ArrowRight
                      className="hidden text-green-600/50 lg:block"
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
