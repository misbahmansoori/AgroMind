import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import DashboardPreview from "../../components/DashboardPreview/DashboardPreview";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import CTA from "../../components/CTA/CTA";

const Landing = () => {
  return (
    <>
      <Hero />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <CTA />
    </>
  );
};

export default Landing;