import React, { useEffect, useState } from "react";
import { featuredHalls } from "../../../utils/Featured";

export default function Featured() {
  const totalSlides = featuredHalls.length;
  const [index, setIndex] = useState(0);


  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full h-[200px] lg:h-[300px] mt-10 rounded-2xl bg-gray-950 overflow-hidden flex justify-center items-center">
      {/* Background image for showing and pop up with breath style */}
      {featuredHalls.map((hall, i) => (
        <img key={i} src={hall} alt={`Hall ${i + 1}`} loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-[1500ms] ease-in-out
            ${i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ transitionProperty: "opacity" }}
        />
      ))}
      {/* Dots in the background to navigate */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {featuredHalls.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === index ? "bg-blue-800" : "bg-blue-400 hover:bg-blue-800"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
}
