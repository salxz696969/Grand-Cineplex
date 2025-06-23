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

const fakeDays = [
    { number: 15, day: "Today", month: "Dec" },
    { number: 16, day: "Mon", month: "Dec" },
    { number: 17, day: "Tue", month: "Dec" },
    { number: 18, day: "Wed", month: "Dec" },
    // { number: 19, day: "Thu", month: "Dec" },
    // { number: 20, day: "Fri", month: "Dec" },
    // { number: 21, day: "Sat", month: "Dec" },
    // { number: 22, day: "Sun", month: "Dec" },
    // { number: 23, day: "Mon", month: "Dec" },
    // { number: 24, day: "Tue", month: "Dec" },
    // { number: 25, day: "Wed", month: "Dec" },
    // { number: 26, day: "Thu", month: "Dec" }
];

export default function ScreeningDay({ days, selectedIndex, onSelect }: ScreeningDayProps) {
    days = fakeDays;
    return (
        <div className="flex flex-wrap gap-3 justify-center items-center mt-4 w-full">
            <div className="flex max-w-5xl w-full gap-3 justify-center items-center">
                {days.map((c, idx) => (
                    <div
                        key={idx}
                        onClick={() => onSelect(idx)}
                        className={`cursor-pointer flex flex-col items-center rounded border-2
                        ${idx === selectedIndex ? "border-sky-800" : "border-gray-700"}
                        px-2 py-2
                        w-full
                    `}
                    >
                        <p className="text-md font-semibold text-white">
                            {c.day}
                        </p>
                        <p className="text-md font-semibold text-gray-400">{c.number}</p>
                        <p className="text-gray-400 text-sm ">{c.month}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}