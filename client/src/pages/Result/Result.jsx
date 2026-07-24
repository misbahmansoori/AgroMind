import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Leaf,
  AlertTriangle,
  Clock3,
  IndianRupee,
  Check,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const sparks = [
  { x: -70, y: -40, delay: 0.15 },
  { x: 75, y: -35, delay: 0.22 },
  { x: -55, y: 50, delay: 0.28 },
  { x: 60, y: 55, delay: 0.34 },
  { x: 0, y: -75, delay: 0.18 },
  { x: 90, y: 10, delay: 0.3 },
];

const Result = () => {
  const location = useLocation();
  const data = location.state;
  const fromHistory = Boolean(data?._id);

  const [showReveal, setShowReveal] = useState(!fromHistory);

  useEffect(() => {
    if (fromHistory) return undefined;
    const timer = setTimeout(() => setShowReveal(false), 1400);
    return () => clearTimeout(timer);
  }, [fromHistory]);

  const result = {
    disease: data?.diseaseName,
    crop: data?.cropName,
    confidence: data?.confidence,
    severity: data?.severity,
    explanation: data?.explanation,
    organic: data?.organicTreatment,
    chemical: data?.chemicalTreatment,
    prevention: data?.prevention,
    recovery: data?.recoveryTime,
    cost: data?.estimatedCost,
  };

  if (!data) {
    return (
      <section className="page-atmosphere flex min-h-screen flex-col items-center justify-center gap-4 pt-32">
        <p className="text-gray-600">
          No diagnosis found. Please scan a crop first.
        </p>
        <Link
          to="/detect"
          className="font-medium text-green-700 hover:underline"
        >
          Go to Detect
        </Link>
      </section>
    );
  }

  const treatments = [
    { label: "Organic Treatment", value: result.organic },
    { label: "Chemical Treatment", value: result.chemical },
    { label: "Prevention", value: result.prevention },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(34,139,34);
    doc.rect(0,0,210,32,"F");

    doc.setFont("helvetica","bold");
    doc.setFontSize(22);
    doc.setTextColor(255,255,255);
    doc.text("AgroMind",105,15,{align:"center"});

    doc.setFontSize(11);
    doc.text("AI Crop Disease Detection Report",105,24,{align:"center"});

    doc.setTextColor(120);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`,20,40);

    let y = 50;

    const addField = (label, value) => {
  
      doc.setFillColor(235,248,236);
      doc.roundedRect(15,y,180,35,4,4,"F");

      doc.setFont("helvetica","bold");
      doc.setFontSize(18);
      doc.setTextColor(34,139,34);
      doc.text(result.disease || "Unknown Disease",20,y+12);

      doc.setFontSize(12);
      doc.setTextColor(0);

      doc.text(`Crop : ${result.crop}`,20,y+22);
      doc.text(`Confidence : ${result.confidence}%`,120,y+12);
      doc.text(`Severity : ${result.severity}`,120,y+22);

      y += 45;
    };

    doc.setFillColor(248,249,250);
    doc.roundedRect(15,y,180,28,4,4,"F");

    doc.setFont("helvetica","bold");
    doc.setFontSize(12);

    doc.text("Recovery Time",25,y+10);
    doc.text("Estimated Cost",110,y+10);

    doc.setFont("helvetica","normal");

    doc.text(result.recovery || "N/A",25,y+20);
    doc.text(result.cost || "N/A",110,y+20);

    y += 40;

    const addSection = (title, content, color) => {

      if (y > 250) {
      doc.addPage();
      y = 20;
      }

    doc.setFillColor(...color);
    doc.roundedRect(15, y, 180, 12, 3, 3, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255);

    doc.text(title, 20, y + 8);

    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0);

    const lines = doc.splitTextToSize(content || "N/A", 170);

    doc.text(lines, 20, y);

    y += lines.length * 6 + 10;

   };

    
   addSection("Explanation", result.explanation, [41,128,185]);

   addSection("Organic Treatment", result.organic, [46,204,113]);

   addSection("Chemical Treatment", result.chemical, [230,126,34]);

   addSection("Prevention", result.prevention, [52,152,219]);

    doc.line(15,280,195,280);

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
    "Disclaimer: This report is AI-generated and should be used for guidance only.",
    20,
    287
    );

    doc.text(
    "Please consult an agricultural expert before applying treatments.",
    20,
    293
    );

    doc.text("AgroMind © 2026",165,293);

    const safeName = String(result.crop || "Crop").replace(/\s+/g, "_");
    doc.save(`${safeName}_Report.pdf`);
  };

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -right-16 top-32 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-green-200/35 blur-3xl" />

      <AnimatePresence>
        {showReveal && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#08140a]/55 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative flex flex-col items-center">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full border border-emerald-300/50"
                  initial={{ width: 72, height: 72, opacity: 0.7 }}
                  animate={{
                    width: 72 + (i + 1) * 70,
                    height: 72 + (i + 1) * 70,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.1,
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                />
              ))}

              {sparks.map((spark, i) => (
                <motion.span
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-emerald-300"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: spark.x,
                    y: spark.y,
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0.4],
                  }}
                  transition={{
                    duration: 0.9,
                    delay: spark.delay,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-white shadow-[0_0_40px_rgba(46,125,50,0.55)]"
              >
                <Check size={36} strokeWidth={2.5} />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-6 font-[Manrope] text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                Diagnosis complete
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-sm text-emerald-100/80"
              >
                AI Crop Doctor is ready
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: showReveal ? 0 : 1, x: showReveal ? -8 : 0 }}
          transition={{ delay: showReveal ? 0 : 0.05 }}
        >
          <Link
            to={fromHistory ? "/history" : "/detect"}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-green-700"
          >
            <ArrowLeft size={16} />
            {fromHistory ? "Back to History" : "Back to Detect"}
          </Link>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: showReveal ? 0 : 1,
              y: showReveal ? 28 : 0,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-[#dce8dc] bg-white p-5 shadow-[0_16px_40px_rgba(15,40,20,0.06)] sm:p-6 lg:col-span-5"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-green-100/70 blur-2xl" />

            <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
              Diagnosis Result
            </p>
            <h1 className="mt-3 font-[Manrope] text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {result.disease}
            </h1>
            <p className="mt-2 text-gray-600">{result.crop}</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#eaf5ea] p-4">
                <p className="text-xs text-gray-500">Confidence</p>
                <p className="mt-1 font-[Manrope] text-2xl font-bold text-green-700">
                  {result.confidence}%
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-green-100">
                  <motion.div
                    className="h-full rounded-full bg-green-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: showReveal ? 0 : `${result.confidence}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-xs text-gray-500">Severity</p>
                <p className="mt-1 font-[Manrope] text-2xl font-bold text-amber-700">
                  {result.severity}
                </p>
                <p className="mt-3 text-xs text-amber-700/80">Act this week</p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4">
              <AlertTriangle
                className="mt-0.5 shrink-0 text-amber-600"
                size={18}
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700/80">
                  Why this diagnosis
                </p>
                <p className="mt-1 text-sm leading-6 text-gray-700">
                  {result.explanation}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: showReveal ? 0 : 1,
              y: showReveal ? 28 : 0,
            }}
            transition={{
              delay: showReveal ? 0 : 0.1,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-[28px] border border-[#dce8dc] bg-white p-5 shadow-[0_16px_40px_rgba(15,40,20,0.06)] sm:p-6 lg:col-span-7"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-green-700 p-2 text-white shadow-[0_8px_20px_rgba(46,125,50,0.35)]">
                <ShieldCheck size={18} />
              </div>
              <h2 className="font-[Manrope] text-xl font-bold text-gray-900">
                AI Crop Doctor
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {treatments.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{
                    opacity: showReveal ? 0 : 1,
                    x: showReveal ? 16 : 0,
                  }}
                  transition={{
                    delay: showReveal ? 0 : 0.25 + i * 0.1,
                    duration: 0.45,
                  }}
                  className="rounded-2xl border border-[#e8f0e8] bg-[#f7faf7] p-4 transition-colors hover:border-green-300 hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[15px] leading-7 text-gray-700">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e8f0e8] bg-white p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock3 size={14} />
                  Recovery Time
                </div>
                <p className="mt-1.5 font-semibold text-gray-900">
                  {result.recovery}
                </p>
              </div>
              <div className="rounded-2xl border border-[#e8f0e8] bg-white p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <IndianRupee size={14} />
                  Est. Cost
                </div>
                <p className="mt-1.5 font-semibold text-gray-900">
                  {result.cost}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Button
                type="button"
                onClick={generatePDF}
                className="w-full px-4 py-3.5"
              >
                <Download size={16} />
                Download Report
              </Button>

              <Link to="/dashboard" className="block w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full px-4 py-3.5"
                >
                  <Leaf size={16} />
                  Go to Dashboard
                </Button>
              </Link>

              <Link to="/detect" className="block w-full">
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full px-4 py-3.5"
                >
                  Scan Another Crop
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Result;
