import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";

const CTA = () => {
  return (
    <section id="cta" className="relative overflow-hidden bg-white py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-[#1b5e20] px-8 py-16 text-center sm:px-12 sm:py-20"
        >
          {/* Soft field texture — keeps the band from feeling flat */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(129,199,132,0.28),_transparent_55%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-[#a5d6a7]">
              Get Started
            </p>

            <h2 className="mt-4 font-[Manrope] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to protect your crops with AI?
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-white/75">
              Upload a leaf photo, get a diagnosis, and act before disease costs
              you the season.
            </p>

            <Link
              to="/auth"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-green-800 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#eaf5ea] hover:shadow-xl"
            >
              Start Diagnosis
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
