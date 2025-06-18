import React from "react";
import { useEffect, useState } from "react";
import { Info } from "./FakeData";

export default function InfoInform() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % Info.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden mt-10 rounded-2xl relative">
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {Info.map((item, idx) => (
          <img
            key={idx}
            src={item.image}
            alt={`info-${idx}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
