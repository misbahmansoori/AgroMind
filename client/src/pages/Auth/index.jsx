import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import heroImage from "../../assets/hero-image.png";

const inputClass =
  "w-full rounded-xl border border-[#dce8dc] bg-[#f7faf7] px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20";

const DEMO_EMAIL = "demo@agromind.app";
const DEMO_PASSWORD = "demo1234";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated } = useAuth();
  const demoStarted = useRef(false);

  const redirectTo = location.state?.from || "/dashboard";
  const startOnRegister = searchParams.get("mode") === "register";

  const [isLogin, setIsLogin] = useState(!startOnRegister);
  const [submitting, setSubmitting] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsLogin(!startOnRegister);
  }, [startOnRegister]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const finishAuth = (user, token) => {
    login(user, token);
    navigate(redirectTo, { replace: true });
  };

  const continueAsDemo = async () => {
    setDemoLoading(true);
    setError("");

    try {
      let res;
      try {
        res = await api.post("/auth/login", {
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        });
      } catch {
        res = await api.post("/auth/register", {
          name: "Demo Farmer",
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
          state: "Rajasthan",
        });
      }

      finishAuth(res.data.user, res.data.token);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Demo login failed. Is the backend running?",
      );
    } finally {
      setDemoLoading(false);
    }
  };

  // Hero "Try Demo" lands here with ?demo=1
  useEffect(() => {
    if (searchParams.get("demo") === "1" && !demoStarted.current && !isAuthenticated) {
      demoStarted.current = true;
      continueAsDemo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setSubmitting(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? { email: formData.email.trim(), password: formData.password }
        : {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone.trim(),
            state: formData.state.trim() || "Not set",
          };

      const res = await api.post(endpoint, payload);

      if (!res.data?.token || !res.data?.user) {
        throw new Error("Invalid response from server");
      }

      finishAuth(res.data.user, res.data.token);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-green-200/35 blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-[#dce8dc] bg-white/90 shadow-[0_24px_60px_rgba(15,40,20,0.1)] backdrop-blur-sm md:grid-cols-2"
        >
          <div className="relative hidden min-h-[520px] md:block">
            <img
              src={heroImage}
              alt="Crop field under soft evening light"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08140a]/90 via-[#0d1f10]/55 to-[#08140a]/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08140a]/40 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-10">
              <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.28em] text-[#9fd4a3]">
                AgroMind
              </p>
              <h1 className="mt-4 font-[Manrope] text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
                Protect every harvest with smarter farming.
              </h1>
              <p className="mt-4 max-w-sm text-base leading-7 text-white/70">
                Detect crop disease early, understand the cause, and act with
                AI-guided treatment.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <div className="mb-8 md:hidden">
              <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
                AgroMind
              </p>
            </div>

            <div className="mb-8 flex rounded-xl border border-[#dce8dc] bg-[#f3f8f3] p-1">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                className={`w-1/2 rounded-lg py-2.5 font-[Manrope] text-sm font-semibold transition ${
                  isLogin
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-gray-600 hover:text-green-800"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                className={`w-1/2 rounded-lg py-2.5 font-[Manrope] text-sm font-semibold transition ${
                  !isLogin
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-gray-600 hover:text-green-800"
                }`}
              >
                Register
              </button>
            </div>

            <h2 className="font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-2 text-base leading-7 text-gray-600">
              {isLogin
                ? "Sign in to open your farm dashboard."
                : "Register to start diagnosing crops with AgroMind."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                    autoComplete="name"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>

              {!isLogin && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Rajasthan"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className={inputClass}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={inputClass}
                    autoComplete="new-password"
                  />
                </div>
              )}

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={submitting || demoLoading}
                className="mt-2 w-full py-3.5"
              >
                {submitting
                  ? "Please wait..."
                  : isLogin
                    ? "Login"
                    : "Create account"}
                {!submitting ? <ArrowRight size={18} /> : null}
              </Button>
            </form>

            <button
              type="button"
              onClick={continueAsDemo}
              disabled={submitting || demoLoading}
              className="mt-4 w-full rounded-xl border border-[#dce8dc] bg-white py-3 text-sm font-medium text-gray-700 transition hover:border-green-600 hover:bg-[#f7faf7] hover:text-green-800 disabled:opacity-50"
            >
              {demoLoading ? "Starting demo..." : "Continue as demo"}
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="ml-2 font-semibold text-green-700 hover:text-green-800 hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>

            <p className="mt-4 text-center text-sm text-gray-500 md:hidden">
              <Link
                to="/"
                className="font-medium text-green-700 hover:underline"
              >
                Back to home
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
