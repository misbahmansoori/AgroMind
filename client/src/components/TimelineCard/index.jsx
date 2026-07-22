const defaultEvents = [
  {
    id: 1,
    crop: "Tomato",
    result: "Healthy",
    tone: "good",
    date: "Today · 9:40 AM",
  },
  {
    id: 2,
    crop: "Chili",
    result: "Leaf Curl · Mild",
    tone: "warn",
    date: "Yesterday · 6:15 PM",
  },
  {
    id: 3,
    crop: "Cotton",
    result: "Healthy",
    tone: "good",
    date: "20 Jul · 11:02 AM",
  },
];

const toneClass = {
  good: "bg-green-100 text-green-700",
  warn: "bg-amber-100 text-amber-700",
  bad: "bg-red-100 text-red-700",
};

const TimelineCard = ({ events = defaultEvents }) => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#dce8dc] bg-white p-5 shadow-[0_4px_20px_rgba(15,40,20,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(46,125,50,0.1)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Crop Health Timeline</p>
        <span className="text-xs font-medium text-green-700">
          3 recent scans
        </span>
      </div>

      <ul className="mt-5 flex flex-1 flex-col gap-0">
        {events.map((event, index) => (
          <li key={event.id} className="relative flex gap-4 pb-5 last:pb-0">
            {index < events.length - 1 && (
              <span className="absolute left-[7px] top-4 h-[calc(100%-8px)] w-px bg-[#dce8dc]" />
            )}
            <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white bg-green-600 shadow-[0_0_0_2px_#dce8dc]" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-[Manrope] text-sm font-bold text-gray-900">
                  {event.crop}
                </p>
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${toneClass[event.tone]}`}
                >
                  {event.result}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{event.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default TimelineCard;
