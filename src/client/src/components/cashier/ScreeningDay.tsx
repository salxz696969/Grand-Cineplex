import React from "react";

type CalendarDay = {
    number: number;
    day: string;
    month: string;
};

interface ScreeningDayProps {
    days: CalendarDay[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}

// const fakeDays = [
//     { number: 15, day: "Today", month: "Dec" },
//     { number: 16, day: "Mon", month: "Dec" },
//     { number: 17, day: "Tue", month: "Dec" },
//     { number: 18, day: "Wed", month: "Dec" },
//     // { number: 19, day: "Thu", month: "Dec" },
//     // { number: 20, day: "Fri", month: "Dec" },
//     // { number: 21, day: "Sat", month: "Dec" },
//     // { number: 22, day: "Sun", month: "Dec" },
//     // { number: 23, day: "Mon", month: "Dec" },
//     // { number: 24, day: "Tue", month: "Dec" },
//     // { number: 25, day: "Wed", month: "Dec" },
//     // { number: 26, day: "Thu", month: "Dec" }
// ];

export default function ScreeningDay({ days, selectedIndex, onSelect }: ScreeningDayProps) {
    return (
        <div className="flex flex-wrap min-w-[70%] gap-3 justify-center items-center mt-4 w-full">
            <div
                className="flex max-w-5xl w-full gap-3 justify-center items-center overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:overflow-x-visible lg:whitespace-normal"
            >
                {days.map((c, idx) => (
                    <div
                        key={idx}
                        onClick={() => onSelect(idx)}
                        className={`cursor-pointer flex flex-col items-center rounded-lg border-2 px-2 py-2 w-full min-w-[100px] bg-gray-900/50 transition-all duration-150
                        ${idx === selectedIndex ? "border-blue-800 text-white" : "border-slate-800 text-gray-400"}
                        hover:border-blue-800 hover:text-white`}
                    >
                        <p className="text-md font-semibold">
                            {c.day}
                        </p>
                        <p className="text-md font-semibold">{c.number}</p>
                        <p className="text-sm ">{c.month.slice(0, 3)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}