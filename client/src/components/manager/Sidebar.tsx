import { BarChart, Calendar, Film, HomeIcon, Ticket, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const content = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: <BarChart className="w-5 h-5" />,
        subHeading: "Overview of your cinema"
    },
    {
        id: "movies",
        title: "Movies",
        icon: <Film className="w-5 h-5" />,
        subHeading: "Manage your movie library."
    },
    {
        id: "screenings",
        title: "Screenings",
        icon: <Calendar className="w-5 h-5" />,
        subHeading: "Manage your screenings."
    },
    {
        id: "bookings",
        title: "Bookings",
        icon: <Ticket className="w-5 h-5" />,
        subHeading: "Manage your bookings."
    },
    {
        id: "staff",
        title: "Staff",
        icon: <User className="w-5 h-5" />,
        subHeading: "Manage your staff."
    }
];

export default function Sidebar({ tab, setTab }: { tab: string, setTab: (tab: string) => void }) {

    return (
        <div>
            <div className="hidden lg:block fixed  top-20 left-0 h-screen w-80 bg-slate-900 border-r border-slate-800">
                <div className="flex flex-col h-full py-6 px-4 gap-6">
                    {content.map((item) => {
                        return (
                            <div
                                key={item.title}
                                className={`flex items-center gap-3 px-4 py-6 mb-2 rounded-lg transition-all duration-200 text-white hover:bg-slate-800/50 hover:text-white cursor-pointer border border-slate-800 ${tab === item.id ? 'bg-slate-800' : ''}`}
                                onClick={() => setTab(item.id)}
                            >
                                <div className="flex items-center gap-3 rounded-md p-4 bg-slate-800">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.title}</span>
                                    <span className="text-xs text-slate-400">{item.subHeading}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="block lg:hidden fixed z-50 bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800">
                <div className="flex flex-row items-center justify-between w-full bg-slate-900 p-4 ">
                    {content.map((item) => {
                        return (
                            <div key={item.title} className={`min-w-20 flex flex-col items-center gap-2  rounded-lg transition-all duration-200 text-white cursor-pointer p-2 ${tab === item.id ? 'bg-slate-800 ' : ''}`} onClick={() => setTab(item.id)}>
                                {item.icon}
                                <span className="text-xs font-medium text-slate-400">{item.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}