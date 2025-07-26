import React, { useState } from "react";
import SearchBar from "./SearchBar";

type CalendarDay = {
  number: number;
  day: string;
  month: string;
};

interface ScheduleHeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeTab: "now" | "upcoming";
  setActiveTab: React.Dispatch<React.SetStateAction<"now" | "upcoming">>;
  onUpcomingMonthChange: (month: number, year: number) => void;
  onNowShowingDayChange: (date: Date) => void;
}

export default function ScheduleHeader({
  searchTerm,
  setSearchTerm,
  activeTab,
  setActiveTab,
  onUpcomingMonthChange,
  onNowShowingDayChange,
}: ScheduleHeaderProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getNext6Days = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      days.push({
        day: i === 0 ? "Today" : weekDays[date.getDay()],
        number: date.getDate(),
        month: months[date.getMonth()],
      });
    }
    return days;
  };

  const getUpcomingMonths = (): string[] => {
    const monthsList: string[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() + i);
      monthsList.push(date.toLocaleDateString("en-US", { month: "long" }));
    }
    return monthsList;
  };

  const handleTabChange = (tab: "now" | "upcoming") => {
    setActiveTab(tab);
    setSelectedIndex(0);
    if (tab === "now") {
      const today = new Date();
      onNowShowingDayChange(today);
    }
  };


  return (
    <div className="mt-8 mb-5 w-full flex flex-col  justify-between">
      {/* Tabs */}
      <div className="w-full lg:hidden  flex-shrink-0 lg:justify-end flex justify-center lg:ml-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className="flex gap-6 text-xl font-bold mb-4 flex-wrap justify-start w-full mt-4">
        <button onClick={() => handleTabChange("now")} className={`transition-colors py-2 ${activeTab === "now" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}>
          Now Showing
        </button>
        <span className="text-gray-500 py-2">|</span>
        <button onClick={() => handleTabChange("upcoming")} className={`transition-colors py-2 ${activeTab === "upcoming" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}>
          Upcoming
        </button>
      </div>
      {/* Selector + SearchBar Row */}
      <div className="flex w-full  flex-row-reverse lg:flex-row items-center justify-between gap-4">
        {/* SearchBar: right on desktop, below on mobile */}
        {/* Date/Month Selector: horizontally scrollable on mobile, no wrap */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-3  items-center overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:overflow-x-visible lg:whitespace-normal w-full">
            {activeTab === "now"
              ? getNext6Days().map((c, idx) => (
                <div key={idx} onClick={() => {
                  setSelectedIndex(idx);
                  const today = new Date();
                  const selectedDate = new Date(today);
                  selectedDate.setDate(today.getDate() + idx);
                  onNowShowingDayChange(selectedDate);
                }}
                  className={`cursor-pointer flex flex-col items-center rounded-lg border-2 px-2 py-2 min-w-[100px] bg-gray-900/50 transition-all duration-150
                    ${idx === selectedIndex ? "border-blue-800 text-white" : "border-slate-800 text-gray-400"}
                    hover:border-blue-800 hover:text-white`}
                >
                  <p className="text-md font-semibold text-center">{c.day}</p>
                  <p className="text-md font-semibold text-center">{c.number}</p>
                  <p className="text-sm text-center">{c.month}</p>
                </div>
              ))
              : getUpcomingMonths().map((monthName, idx) => {
                const date = new Date();
                date.setMonth(date.getMonth() + idx);
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return (
                  <div key={idx} onClick={() => {
                    setSelectedIndex(idx);
                    onUpcomingMonthChange(month, year);
                  }}
                    className={`cursor-pointer flex flex-col items-center rounded-lg border-2 px-2 py-2 min-w-[100px] bg-gray-900/50 transition-all duration-150
                      ${idx === selectedIndex ? "border-blue-800 text-white" : "border-slate-800 text-gray-400"}
                      hover:border-blue-800 hover:text-white`}
                  >
                    <p className="text-md font-semibold text-center leading-tight">
                      {monthName}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full max-w-xs flex-shrink-0 lg:justify-end  justify-center lg:ml-4 hidden lg:block">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </div>
  );
}
