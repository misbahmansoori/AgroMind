import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, LayoutDashboard, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";

import Container from "../common/Container";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const isLanding = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const isAuth = pathname === "/auth";
  const isApp = [
    "/dashboard",
    "/detect",
    "/result",
    "/profile",
    "/history",
  ].includes(pathname);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderRight = () => {
    // Landing: Demo + Register (or My Farm if signed in)
    if (isLanding) {
      if (isAuthenticated) {
        return (
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/dashboard">
              <Button className="px-4 py-2.5 text-sm sm:px-5">
                My Farm
                <ArrowRight size={16} />
              </Button>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/auth?demo=1">
            <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
              Try Demo
            </Button>
          </Link>
          <Link to="/auth?mode=register">
            <Button className="px-4 py-2.5 text-sm sm:px-5">
              Register
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      );
    }

    if (isAuth) {
      return (
        <Link to="/">
          <Button variant="secondary" className="px-5 py-2.5 text-sm">
            Back to Home
          </Button>
        </Link>
      );
    }

    // Logged-in app pages — no name in navbar
    if (isAuthenticated && isApp) {
      return (
        <div className="flex items-center gap-2 sm:gap-3">
          {isDashboard ? (
            <Link to="/profile">
              <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
                <User size={16} />
                Profile
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
                <LayoutDashboard size={16} />
                My Farm
              </Button>
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/auth?demo=1">
          <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
            Try Demo
          </Button>
        </Link>
        <Link to="/auth?mode=register">
          <Button className="px-4 py-2.5 text-sm sm:px-5">
            Register
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
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
          <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-6 sm:py-4">
            <Link to="/" className="flex shrink-0 items-center gap-2">
              <div className="rounded-xl bg-green-700 p-2">
                <Leaf size={18} className="text-white" />
              </div>
              <h2 className="font-[Manrope] text-xl font-bold text-gray-900">
                AgroMind
              </h2>
            </Link>

            {/* App links only when logged in (not on landing/auth) */}
            {isAuthenticated && isApp && (
              <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
                <Link
                  to="/"
                  className="transition-colors hover:text-green-700"
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`transition-colors hover:text-green-700 ${
                    isDashboard ? "text-green-700" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/history"
                  className={`transition-colors hover:text-green-700 ${
                    pathname === "/history" ? "text-green-700" : ""
                  }`}
                >
                  History
                </Link>
                <Link
                  to="/detect"
                  className={`transition-colors hover:text-green-700 ${
                    pathname === "/detect" ? "text-green-700" : ""
                  }`}
                >
                  Scan Crop
                </Link>
              </div>
            )}

            {renderRight()}
          </div>
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
