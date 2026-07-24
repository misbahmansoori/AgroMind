import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Languages,
  Sprout,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const infoRows = [
    { icon: Mail, label: "Email", value: user?.email || "—" },
    { icon: Phone, label: "Phone", value: user?.phone || "Not added" },
    {
      icon: Languages,
      label: "Language",
      value: user?.language || "Hindi",
    },
    {
      icon: MapPin,
      label: "Location",
      value: [user?.district, user?.state].filter(Boolean).join(", ") || "Not set",
    },
  ];

  const farmRows = [
    {
      icon: Sprout,
      label: "Farm Name",
      value: user?.farmName || "Not set",
    },
    {
      icon: Sprout,
      label: "Crops",
      value: user?.cropName || "Not set",
    },
    {
      icon: MapPin,
      label: "Farm Size",
      value: user?.farmArea ? `${user.farmArea} acres` : "Not set",
    },
  ];

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-16 top-28 h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />

      <Container className="relative">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid gap-6 lg:grid-cols-12"
        >
          <div className="rounded-[28px] border border-[#dce8dc] bg-white p-6 shadow-[0_12px_36px_rgba(15,40,20,0.05)] lg:col-span-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#eaf5ea] text-green-700">
                <User size={40} strokeWidth={1.6} />
              </div>
              <h1 className="mt-4 font-[Manrope] text-2xl font-extrabold text-gray-900">
                {user?.name || "Farmer"}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {user?.farmName || "Your farm account"}
              </p>
              <span className="mt-4 rounded-lg bg-[#eaf5ea] px-3 py-1 text-xs font-semibold text-green-700">
                Signed in
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <Button className="w-full" variant="ghost" onClick={handleLogout}>
                <LogOut size={16} />
                Sign Out
              </Button>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-8">
            <div className="rounded-[28px] border border-[#dce8dc] bg-white p-6 shadow-[0_12px_36px_rgba(15,40,20,0.05)]">
              <h2 className="font-[Manrope] text-lg font-bold text-gray-900">
                Personal Information
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="rounded-2xl border border-[#e8f0e8] bg-[#f7faf7] p-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Icon size={14} className="text-green-700" />
                        {row.label}
                      </div>
                      <p className="mt-2 font-semibold text-gray-900">
                        {row.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#dce8dc] bg-white p-6 shadow-[0_12px_36px_rgba(15,40,20,0.05)]">
              <h2 className="font-[Manrope] text-lg font-bold text-gray-900">
                Farm Details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {farmRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="rounded-2xl border border-[#e8f0e8] bg-[#f7faf7] p-4"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <Icon size={14} className="text-green-700" />
                        {row.label}
                      </div>
                      <p className="mt-2 font-semibold text-gray-900">
                        {row.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Profile;
