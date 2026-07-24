import React from "react";

const History = () => {
  return (
    <div className="min-h-screen bg-[#f7faf7]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-[Manrope] text-4xl font-bold text-gray-900">
            Crop History
          </h1>

          <p className="mt-2 text-gray-500">
            View all previous crop diagnoses and AI reports.
          </p>
        </div>

        <div className="rounded-2xl border border-dashed border-green-300 bg-white p-16 text-center">
          <div className="text-6xl">🌱</div>

          <h2 className="mt-4 text-2xl font-bold">
            History coming soon
          </h2>

          <p className="mt-2 text-gray-500">
            Your previous crop scans will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;