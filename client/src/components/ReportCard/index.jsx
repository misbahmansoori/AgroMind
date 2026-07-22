import { ShieldCheck } from "lucide-react";

const ReportCard = ({
  title = "AI Recommendation",
  message = "No major disease detected. Keep monitoring regularly and avoid overwatering during humid evenings.",
  action = "Continue weekly leaf scans",
}) => {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#dce8dc] bg-gradient-to-br from-white to-[#f3faf3] p-5 shadow-[0_4px_20px_rgba(15,40,20,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(46,125,50,0.1)]">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-200/40 blur-2xl" />
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-green-700 p-2.5 text-white">
          <ShieldCheck size={18} strokeWidth={1.8} />
        </div>
        <p className="font-[Manrope] text-base font-bold text-gray-900">
          {title}
        </p>
      </div>

      <p className="mt-5 text-[15px] leading-7 text-gray-600">{message}</p>

      <div className="mt-auto border-t border-[#dce8dc] pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Next step
        </p>
        <p className="mt-1 text-sm font-semibold text-green-800">{action}</p>
      </div>
    </article>
  );
};

export default ReportCard;
