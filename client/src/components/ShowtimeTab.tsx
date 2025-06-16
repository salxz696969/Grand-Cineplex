import React from "react";

type CalendarDay = {
  number: number;
  day: string;
  month: string;
};

interface ShowtimeTabProps {
  days: CalendarDay[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ShowtimeTab({ days, selectedIndex, onSelect }: ShowtimeTabProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-start">
      {days.map((c, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(idx)}
          className={`cursor-pointer flex flex-col items-center rounded border-2
            ${idx === selectedIndex ? "border-red-500" : "border-gray-700"}
            px-2 py-2
            w-28 sm:w-32 md:w-36 lg:w-40 xl:w-40
            min-w-[64px]
          `}
        >
          <p className="font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
            {c.day}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{c.number}</p>
          <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs">{c.month}</p>
        </div>
      ))}
    </div>
  );
}
