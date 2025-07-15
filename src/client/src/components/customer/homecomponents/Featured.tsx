import React, { useEffect, useState } from "react";
import { featuredHalls } from "../../../utils/Featured";

export default function Featured() {
  const totalSlides = featuredHalls.length;
  const [index, setIndex] = useState(0);

  // Auto cycle every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[480px] mt-10 rounded-2xl bg-[#111518] overflow-hidden flex justify-center items-center">
      {featuredHalls.map((hall, i) => (
        <img
          key={i}
          src={hall}
          alt={`Hall ${i + 1}`}
          loading="lazy"
          className={`
            absolute inset-0 w-full h-full object-cover rounded-2xl
            transition-opacity duration-[1500ms] ease-in-out
            ${i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
          style={{ transitionProperty: "opacity" }}
        />
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {featuredHalls.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === index ? "bg-white" : "bg-gray-600"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
