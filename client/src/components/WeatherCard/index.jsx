import { CloudSun, Droplets, CloudRain } from "lucide-react";

const WeatherCard = ({
  temp = 28,
  condition = "Partly Cloudy",
  humidity = 62,
  rainfall = 10,
}) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dce8dc] bg-white p-5">
      <p className="text-sm font-medium text-gray-500">Weather Today</p>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="font-[Manrope] text-4xl font-extrabold tracking-tight text-gray-900">
            {temp}°C
          </p>
          <p className="mt-1 text-sm text-gray-600">{condition}</p>
        </div>
        <div className="rounded-xl bg-[#eef6ff] p-3 text-sky-600">
          <CloudSun size={26} strokeWidth={1.7} />
        </div>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <div className="rounded-xl bg-[#f7faf7] px-3 py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Droplets size={13} />
            Humidity
          </div>
          <p className="mt-1 font-[Manrope] text-lg font-bold text-gray-900">
            {humidity}%
          </p>
        </div>
        <div className="rounded-xl bg-[#f7faf7] px-3 py-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CloudRain size={13} />
            Rainfall
          </div>
          <p className="mt-1 font-[Manrope] text-lg font-bold text-gray-900">
            {rainfall}%
          </p>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
