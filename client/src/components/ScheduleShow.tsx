import React, { useState } from "react";

type CalendarDay = {
  number: number;
  day: string;
  month: string;
};

export default function ScheduleHeader() {
  const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getNext6Days = (): CalendarDay[] => {
    const result: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      result.push({
        number: date.getDate(),
        day: i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      });
    }

    return result;
  };

  const getUpcomingMonths = (): string[] => {
    const result: string[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() + i);
      result.push(date.toLocaleDateString("en-US", { month: "long" }));
    }

    return result;
  };

  const handleTabChange = (tab: "now" | "upcoming") => {
    setActiveTab(tab);
    setSelectedIndex(0);
  };

  return (
    <div className="mt-8 mb-5">
      <div className="flex gap-6 text-xl font-bold mb-4 flex-wrap">
        <button
          onClick={() => handleTabChange("now")}
          className={`transition-colors ${
            activeTab === "now" ? "text-white border-b-2 border-white" : "text-gray-400"
          }`}
        >
          Now Showing
        </button>
        <span className="text-gray-500">|</span>
        <button
          onClick={() => handleTabChange("upcoming")}
          className={`transition-colors ${
            activeTab === "upcoming" ? "text-white border-b-2 border-white" : "text-gray-400"
          }`}
        >
          Upcoming
        </button>
      </div>

      <div className="flex flex-wrap gap-3 justify-start">
        {activeTab === "now" ? (
          getNext6Days().map((c, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`cursor-pointer flex flex-col items-center rounded border-2
                ${
                  idx === selectedIndex ? "border-red-500" : "border-gray-700"
                }
                px-1 py-1
                w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28
                min-w-[60px]
                `}
            >
              <p className="font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">{c.day}</p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{c.number}</p>
              <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs">{c.month}</p>
            </div>
          ))
        ) : (
          getUpcomingMonths().map((month, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`cursor-pointer flex flex-col items-center rounded border-2
                ${
                  idx === selectedIndex ? "border-red-500" : "border-gray-700"
                }
                px-2 py-2
                w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32
                min-w-[64px]
                `}
            >
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-center leading-tight">
                {month}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
