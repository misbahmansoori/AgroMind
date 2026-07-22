import { Leaf } from "lucide-react";

const HealthCard = ({
  score = 86,
  status = "Good",
  crop = "Tomato · Field A",
}) => {
  const ring = Math.min(100, Math.max(0, score));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dce8dc] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Crop Health</p>
        <span className="inline-flex items-center gap-1 rounded-lg bg-[#eaf5ea] px-2.5 py-1 text-xs font-semibold text-green-700">
          <Leaf size={12} />
          {status}
        </span>
      </div>

      <div className="mt-6 flex flex-1 items-center gap-5">
        <div
          className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#2e7d32 ${ring * 3.6}deg, #e5eee5 0deg)`,
          }}
        >
          <div className="absolute inset-[8px] grid place-items-center rounded-full bg-white">
            <span className="font-[Manrope] text-2xl font-extrabold text-gray-900">
              {score}
            </span>
          </div>
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
