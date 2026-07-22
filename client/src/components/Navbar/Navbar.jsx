import { Link, useLocation } from "react-router-dom";
import { Leaf, ArrowRight, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../common/Container";
import Button from "../common/Button";

const Navbar = () => {
  const { pathname } = useLocation();

  const isLanding = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const isAuth = pathname === "/auth";
  const isApp = ["/dashboard", "/detect", "/result", "/profile"].includes(
    pathname,
  );

  const renderCta = () => {
    // Landing → account entry (not diagnosis)
    if (isLanding) {
      return (
        <Link to="/auth" className="hidden md:block">
          <Button className="px-5 py-2.5 text-sm">
            Get Started
            <ArrowRight size={16} />
          </Button>
        </Link>
      );
    }

    // Auth → go home
    if (isAuth) {
      return (
        <Link to="/" className="hidden md:block">
          <Button variant="secondary" className="px-5 py-2.5 text-sm">
            Back to Home
          </Button>
        </Link>
      );
    }

    // Dashboard already has Upload Crop — avoid a second diagnosis CTA
    if (isDashboard) {
      return (
        <Link to="/profile" className="hidden md:block">
          <Button variant="secondary" className="px-5 py-2.5 text-sm">
            Profile
          </Button>
        </Link>
      );
    }

    // Detect / Result / other app pages → farm overview
    if (isApp) {
      return (
        <Link to="/dashboard" className="hidden md:block">
          <Button variant="secondary" className="px-5 py-2.5 text-sm">
            <LayoutDashboard size={16} />
            My Farm
          </Button>
        </Link>
      );
    }

    return null;
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 left-0 z-50"
    >
      <Container>
        <div className="mt-5 rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-xl">
          <div className="flex items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-xl bg-green-700 p-2">
                <Leaf size={18} className="text-white" />
              </div>
              <h2 className="font-[Manrope] text-xl font-bold text-gray-900">
                AgroMind
              </h2>
            </Link>

            <div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
              {isLanding ? (
                <>
                  <a
                    href="#features"
                    className="transition-colors hover:text-green-700"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="transition-colors hover:text-green-700"
                  >
                    How it Works
                  </a>
                  <Link
                    to="/dashboard"
                    className="transition-colors hover:text-green-700"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className={`transition-colors hover:text-green-700 ${
                      isDashboard ? "text-green-700" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/detect"
                    className={`transition-colors hover:text-green-700 ${
                      pathname === "/detect" ? "text-green-700" : ""
                    }`}
                  >
                    Scan Crop
                  </Link>
                  <Link
                    to="/"
                    className="transition-colors hover:text-green-700"
                  >
                    Home
                  </Link>
                </>
              )}
            </div>

            {renderCta()}
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
