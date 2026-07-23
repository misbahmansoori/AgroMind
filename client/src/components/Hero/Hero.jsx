import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import heroImage from "../../assets/hero-image.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed visual */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Farmer reviewing crop insights in the field"
          className="h-full w-full object-cover object-[68%_center]"
        />
      </motion.div>

      {/* Atmospheric read layer — keeps type legible without boxing the photo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#08140a]/88 via-[#0d1f10]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08140a]/70 via-transparent to-[#08140a]/25" />

      <Container className="relative z-10 flex min-h-screen flex-col justify-center pb-16 pt-32">
        <div className="max-w-2xl">
          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.28em] text-[#9fd4a3]"
          >
            AgroMind
          </motion.p>

          <motion.h1
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 font-[Manrope] text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Protect every harvest with smarter farming.
          </motion.h1>

          <motion.p
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-lg text-lg leading-8 text-white/75"
          >
            Spot crop disease early, understand the cause, and act with
            AI-guided treatment - before the season slips away.
          </motion.p>

          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link to="/detect">
              <Button className="flex items-center gap-2 px-7 py-4">
                Start Diagnosis
                <ArrowRight size={18} />
              </Button>
            </Link>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-white/18"
            >
              Explore Features
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
