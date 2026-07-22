const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <article className="group rounded-[22px] border border-[#dce8dc] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-[0_18px_40px_rgba(46,125,50,0.08)]">
      <div className="mb-5 inline-flex rounded-2xl bg-[#eaf5ea] p-3 text-green-700 transition-colors duration-300 group-hover:bg-green-700 group-hover:text-white">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <h3 className="font-[Manrope] text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-[15px] leading-7 text-gray-600">
        {description}
      </p>
    </article>
  );
};

export default FeatureCard;
