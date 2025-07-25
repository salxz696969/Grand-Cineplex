import { BarChart, Calendar, Film, HomeIcon, Theater, Ticket, User } from "lucide-react";
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
        id: "theaters",
        title: "Theaters",
        icon: <Theater className="w-5 h-5" />,
        subHeading: "Manage your theaters."
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
            <div className="hidden lg:block fixed  top-20 left-0 h-screen w-80 bg-gray-950 border-r border-slate-800">
                <div className="flex flex-col h-full py-6 px-4 gap-6">
                    {content.map((item) => {
                        const isActive = tab === item.id;
                        return (
                            <div
                                key={item.title}
                                className={`flex items-center gap-3 px-4 py-6 mb-2 rounded-lg transition-all duration-200 cursor-pointer border ${isActive ? 'border-blue-800' : 'border-slate-800'} text-white hover:bg-slate-800/50`}
                                onClick={() => setTab(item.id)}
                            >
                                <div className={`flex items-center gap-3 rounded-md p-4 ${isActive ? 'bg-blue-800 text-white' : 'bg-gray-900/50 text-white'}`}>
                                    {React.cloneElement(item.icon, { className: `w-5 h-5 ${isActive ? 'text-white' : 'text-white'}` })}
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
            <div className="block lg:hidden fixed z-50 bottom-0 left-0 w-full bg-gray-950 border-t border-slate-800">
                <div className="flex flex-row items-center justify-between w-full bg-gray-950 px-1 ">
                    {content.map((item) => {
                        const isActive = tab === item.id;
                        return (
                            <div key={item.title} className={`flex flex-col items-center gap-1 rounded-lg transition-all duration-200 cursor-pointer p-4 ${isActive ? '' : 'text-white'}`} onClick={() => setTab(item.id)}>
                                {React.cloneElement(item.icon, { className: `w-5 h-5 ${isActive ? 'text-blue-800' : 'text-white'}` })}
                                {/* <span className="text-xs font-medium text-slate-400">{item.title}</span> */}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}