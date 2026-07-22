import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

const HealthCard = ({
  score = 86,
  status = "Good",
  crop = "Tomato · Field A",
}) => {
  const ring = Math.min(100, Math.max(0, score));
  const [display, setDisplay] = useState(0);
  const circumference = 2 * Math.PI * 40;

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(ring * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ring]);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce8dc] bg-white p-5 shadow-[0_4px_20px_rgba(15,40,20,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(46,125,50,0.1)]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-green-100/60 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="relative flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Crop Health</p>
        <span className="inline-flex items-center gap-1 rounded-lg bg-[#eaf5ea] px-2.5 py-1 text-xs font-semibold text-green-700">
          <Leaf size={12} />
          {status}
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 items-center gap-5">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#e5eee5"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#2e7d32"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset: circumference - (ring / 100) * circumference,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <span className="absolute font-[Manrope] text-2xl font-extrabold text-gray-900">
            {display}
          </span>
        </div>

        <div>
          <p className="font-[Manrope] text-lg font-bold text-gray-900">
            Farm Health Score
          </p>
          <p className="mt-1 text-sm text-gray-500">{crop}</p>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Leaves look stable. Continue weekly scans to stay ahead of fungal
            risk.
          </p>
        </div>
      </div>
    </article>
  );
};

export default HealthCard;
