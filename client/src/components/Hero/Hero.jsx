import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
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
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Farmer reviewing crop insights in the field"
          className="h-full w-full object-cover object-[72%_center] sm:object-[68%_center]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#08140a]/90 via-[#0d1f10]/65 to-[#08140a]/35 sm:via-[#0d1f10]/55 sm:to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08140a]/75 via-transparent to-[#08140a]/30" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div className="max-w-2xl">
          <motion.p
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-[Manrope] text-xs font-semibold uppercase tracking-[0.28em] text-[#9fd4a3] sm:text-sm"
          >
            AgroMind
          </motion.p>

          <motion.h1
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 font-[Manrope] text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Protect every harvest with smarter farming.
          </motion.h1>

          <motion.p
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-lg text-base leading-7 text-white/80 sm:mt-6 sm:text-lg sm:leading-8 sm:text-white/75"
          >
            Spot crop disease early, understand the cause, and act with
            AI-guided treatment - before the season slips away.
          </motion.p>

          <motion.div
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              to={isAuthenticated ? "/detect" : "/auth?demo=1"}
              className="w-full sm:w-auto"
            >
              <Button className="flex w-full items-center justify-center gap-2 px-7 py-4 sm:w-auto">
                {isAuthenticated ? "Scan Crop" : "Try Demo"}
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
              className="w-full rounded-xl border border-white/25 bg-white/10 px-7 py-4 font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-white/18 sm:w-auto"
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
