import React from 'react';

interface TheatreCardProps {
  name: string;
  showtimes: string[];
}

export default function TheatreCard({ name, showtimes }: TheatreCardProps) {
  return (
    <div className="bg-gradient-to-tr from-[#1e293b] to-[#0f172a] border border-[#334155] rounded-2xl p-6 shadow-xl hover:shadow-black transition duration-300">
      <h3 className="text-white text-xl font-semibold mb-4">
        {name}
      </h3>

      <div className="flex flex-wrap gap-3">
        {showtimes.map((time, index) => (
          <button
            key={index}
            className="bg-[#26477b] text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-inner hover:bg-[#3b82f6] hover:text-white hover:shadow-blue-400/50 transition duration-300"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}
