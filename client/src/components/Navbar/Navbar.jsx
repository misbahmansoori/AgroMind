import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Leaf,
  ArrowRight,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "../common/Container";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLanding = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const isAuth = pathname === "/auth";
  const isApp = [
    "/dashboard",
    "/detect",
    "/result",
    "/profile",
    "/history",
    "/assistant",
  ].includes(pathname);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  const landingLinks = [
    { label: "Features", href: "#features", type: "hash" },
    { label: "How it Works", href: "#how-it-works", type: "hash" },
    { label: "Dashboard", to: "/dashboard", type: "route" },
  ];

  const appLinks = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Scan Crop", to: "/detect" },
    { label: "History", to: "/history" },
    { label: "Assistant", to: "/assistant" },
    { label: "Profile", to: "/profile" },
    { label: "Home", to: "/" },
  ];

  const linkClass = (active) =>
    `transition-colors hover:text-green-700 ${active ? "text-green-700" : ""}`;

  const renderRight = () => {
    if (isLanding) {
      if (isAuthenticated) {
        return (
          <div className="hidden items-center gap-2 sm:flex sm:gap-3">
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
        <div className="hidden items-center gap-2 sm:flex sm:gap-3">
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
        <Link to="/" className="hidden sm:block">
          <Button variant="secondary" className="px-5 py-2.5 text-sm">
            Back to Home
          </Button>
        </Link>
      );
    }

    if (isAuthenticated && isApp) {
      return (
        <div className="hidden items-center gap-2 md:flex sm:gap-3">
          {isDashboard ? (
            <Link to="/profile">
              <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
                <User size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/dashboard">
              <Button variant="secondary" className="px-4 py-2.5 text-sm sm:px-5">
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">My Farm</span>
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
      <div className="hidden items-center gap-2 sm:flex sm:gap-3">
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

  const showMobileToggle = true;

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 left-0 z-50"
    >
      <Container>
        <div className="mt-3 rounded-2xl border border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-xl sm:mt-5">
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-5 sm:py-3.5 md:px-6 md:py-4">
            <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
              <div className="rounded-xl bg-green-700 p-2">
                <Leaf size={18} className="text-white" />
              </div>
              <h2 className="truncate font-[Manrope] text-lg font-bold text-gray-900 sm:text-xl">
                AgroMind
              </h2>
            </Link>

            <div className="hidden items-center gap-6 text-sm font-medium text-gray-600 lg:flex lg:gap-8">
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
                appLinks
                  .filter((l) => l.to !== "/profile")
                  .map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={linkClass(pathname === link.to)}
                    >
                      {link.label}
                    </Link>
                  ))
              )}
            </div>

            <div className="flex items-center gap-2">
              {renderRight()}

              {showMobileToggle && (
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 transition hover:border-green-200 hover:bg-green-50 lg:hidden"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-gray-100 lg:hidden"
              >
                <div className="flex flex-col gap-1 px-3 py-3 sm:px-5">
                  {isLanding
                    ? landingLinks.map((link) =>
                        link.type === "hash" ? (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className="rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800"
                          >
                            {link.label}
                          </Link>
                        ),
                      )
                    : (isAuthenticated ? appLinks : [{ label: "Home", to: "/" }]).map(
                        (link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMenuOpen(false)}
                            className={`rounded-xl px-3 py-3 text-sm font-medium hover:bg-green-50 hover:text-green-800 ${
                              pathname === link.to
                                ? "bg-green-50 text-green-800"
                                : "text-gray-700"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ),
                      )}

                  <div className="mt-2 border-t border-gray-100 pt-3">
                    {isAuthenticated ? (
                      <div className="flex flex-col gap-2">
                        {!isLanding && (
                          <Link
                            to="/detect"
                            onClick={() => setMenuOpen(false)}
                            className="w-full"
                          >
                            <Button className="w-full justify-center py-3">
                              Scan Crop
                              <ArrowRight size={16} />
                            </Button>
                          </Link>
                        )}
                        {isLanding && (
                          <Link
                            to="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="w-full"
                          >
                            <Button className="w-full justify-center py-3">
                              My Farm
                              <ArrowRight size={16} />
                            </Button>
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/auth?demo=1"
                          onClick={() => setMenuOpen(false)}
                          className="w-full"
                        >
                          <Button
                            variant="secondary"
                            className="w-full justify-center py-3"
                          >
                            Try Demo
                          </Button>
                        </Link>
                        <Link
                          to="/auth?mode=register"
                          onClick={() => setMenuOpen(false)}
                          className="w-full"
                        >
                          <Button className="w-full justify-center py-3">
                            Register
                            <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </motion.nav>
  );
};

export default Navbar;
