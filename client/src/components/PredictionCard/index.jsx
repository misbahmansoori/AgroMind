const PredictionCard = ({
  risk = 18,
  level = "Low",
  label = "Disease Risk",
}) => {
  const ring = Math.min(100, Math.max(0, risk));
  const tone =
    risk < 30
      ? { bar: "#2e7d32", soft: "#eaf5ea", text: "text-green-700" }
      : risk < 60
        ? { bar: "#c47b16", soft: "#fff6e8", text: "text-amber-700" }
        : { bar: "#c62828", soft: "#fdecec", text: "text-red-700" };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dce8dc] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${tone.text}`}
          style={{ backgroundColor: tone.soft }}
        >
          {level}
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center justify-center">
        <div
          className="relative grid h-28 w-28 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${tone.bar} ${ring * 3.6}deg, #e8efe8 0deg)`,
          }}
        >
          <div className="absolute inset-[10px] grid place-items-center rounded-full bg-white">
            <div className="text-center">
              <p className="font-[Manrope] text-3xl font-extrabold text-gray-900">
                {risk}%
              </p>
              <p className="text-[11px] text-gray-500">chance</p>
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-[200px] text-center text-sm leading-6 text-gray-600">
          Based on humidity, rainfall, and recent field history.
        </p>
      </div>
    </article>
  );
};

export default PredictionCard;
