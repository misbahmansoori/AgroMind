import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ImagePlus, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

const Detect = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const handleAnalyze = () => {
    if (!preview || analyzing) return;
    setAnalyzing(true);
    setTimeout(() => navigate("/result"), 1600);
  };

  return (
    <section className="page-atmosphere relative min-h-screen overflow-hidden pb-16 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-28 h-72 w-72 -translate-x-1/2 rounded-full bg-green-200/40 blur-3xl" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-[Manrope] text-sm font-semibold uppercase tracking-[0.24em] text-green-700">
            AI Disease Detection
          </p>
          <h1 className="mt-2 font-[Manrope] text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Upload a crop photo
          </h1>
          <p className="mt-3 text-lg leading-8 text-gray-600">
            Take a clear leaf photo. AgroMind will detect disease and suggest
            treatment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mx-auto mt-10 max-w-xl rounded-[28px] border border-[#dce8dc] bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(15,40,20,0.08)] backdrop-blur-sm"
        >
          <label className="block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
              disabled={analyzing}
            />

            {preview ? (
              <div className="relative overflow-hidden rounded-2xl border border-[#dce8dc]">
                <motion.img
                  key={preview}
                  initial={{ scale: 1.06, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                  src={preview}
                  alt="Crop preview"
                  className="mx-auto max-h-72 w-full object-cover"
                />
                <AnimatePresence>
                  {analyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#0d1f10]/45 backdrop-blur-[2px]"
                    >
                      <div className="scan-line absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_18px_rgba(129,199,132,0.9)]" />
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-white">
                        <Loader2 className="animate-spin" size={28} />
                        <p className="font-[Manrope] text-sm font-semibold tracking-wide">
                          Analyzing leaf patterns…
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-green-300 bg-[#f4faf4] px-6 py-14 transition-colors hover:border-green-500 hover:bg-[#eaf5ea]"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm"
                >
                  <ImagePlus size={28} />
                </motion.div>
                <p className="font-[Manrope] text-base font-bold text-gray-900">
                  Drop or choose a leaf photo
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  JPG, PNG · clear natural light works best
                </p>
              </motion.div>
            )}
          </label>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <label className={`cursor-pointer ${analyzing ? "pointer-events-none opacity-50" : ""}`}>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
                disabled={analyzing}
              />
              <span className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition-all hover:border-green-700 hover:text-green-700">
                <Upload size={16} />
                {preview ? "Change Image" : "Choose Image"}
              </span>
            </label>

            <Button
              className="px-7 py-3"
              disabled={!preview || analyzing}
              onClick={handleAnalyze}
            >
              {analyzing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Analyze Crop
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Detect;
