import React from 'react';
import { Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import Container from '../common/Container';
import Button from '../common/Button';
 
const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: .6 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Container>

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm">

          <div className="flex items-center justify-between px-6 py-4">

            {/* Logo */}

            <div className="flex items-center gap-2">

              <div className="rounded-xl bg-green-700 p-2">

                <Leaf
                  size={18}
                  className="text-white"
                />

              </div>

              <h2 className="font-bold text-xl font-[Manrope]">
                AgroMind
              </h2>

            </div>

            {/* Navigation */}

            <div className="hidden md:flex gap-10 text-gray-600">

              <a href="#">Home</a>

              <a href="#features">Features</a>

              <a href="#how-it-works">How it Works</a>

              <a href="#">About</a>

            </div>

            {/* CTA */}

            <Button className="hidden md:flex items-center gap-2">

              Start Diagnosis

              <ArrowRight size={18} />

            </Button>

          </div>

        </div>

      </Container>

    </motion.nav>
  );
};

export default Navbar;