// This components used in the movie selected, like it give chioces to user to see the showTime or Detail of the movie that they selected

import React from "react";

interface TabsProps {
  activeTab: "showtime" | "detail";
  onTabChange: (tab: "showtime" | "detail") => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="mt-8 border-b border-gray-600 flex gap-6 text-xl font-bold cursor-pointer select-none">
      <div
        className={`pb-2 ${activeTab === "showtime" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
        onClick={() => onTabChange("showtime")}
      >
        Showtime
      </div>
      <div
        className={`pb-2 ${activeTab === "detail" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
        onClick={() => onTabChange("detail")}
      >
        Detail
      </div>
    </div>
  );
}
