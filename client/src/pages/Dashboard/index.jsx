import { Link } from "react-router-dom";
import { ArrowRight, ScanSearch } from "lucide-react";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import HealthCard from "../../components/HealthCard";
import WeatherCard from "../../components/WeatherCard";
import PredictionCard from "../../components/PredictionCard";
import ReportCard from "../../components/ReportCard";
import TimelineCard from "../../components/TimelineCard";

const Dashboard = () => {
  return (
    <section className="min-h-screen bg-[#f7faf7] pb-16 pt-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
              Farm Overview
            </p>
            <h1 className="mt-2 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Welcome back, Farmer
            </h1>
            <p className="mt-2 text-gray-600">
              Your crop health, weather, and AI guidance in one place.
            </p>
          </div>

          <Link to="/auth">
            <Button className="inline-flex items-center gap-2 px-6 py-3.5">
              <ScanSearch size={18} />
              Start Diagnosis
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <HealthCard />
          </div>
          <div className="lg:col-span-3">
            <WeatherCard />
          </div>
          <div className="lg:col-span-4">
            <PredictionCard />
          </div>
          <div className="lg:col-span-7">
            <ReportCard />
          </div>
          <div className="lg:col-span-5">
            <TimelineCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Dashboard;
