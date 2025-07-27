import { Clapperboard } from "lucide-react";
import React, { useContext } from "react";
import { StaffAuthContext } from "../context/StaffAuthContext";

export default function Header() {
    const { auth } = useContext(StaffAuthContext)!;

    // Function to get initials from name
    const getInitials = (name: string) => {
        const names = name.trim().split(" ");
        if (names.length === 1) {
            return names[0].slice(0, 2).toUpperCase();
        } else {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center bg-gray-950 border-b border-slate-800 z-10">
            <div className="wrapper flex w-full items-center gap-4 justify-between p-4">
                <div className="flex items-center gap-4">
                    {/* <img src="/logo.png" alt="logo" className="w-10 h-10" /> */}
                    <div className="bg-blue-800 p-2 rounded-md">
                        <Clapperboard className="w-6 h-6 text-white" />
                    </div>
                    <h1 className=" text-white text-xl font-bold">Grand Cineplex</h1>
                </div>
                <div className="flex items-center gap-4 border border-blue-800 p-2 rounded-md">
                    <div className="bg-blue-800 p-2 rounded-md flex items-center justify-center w-10 h-10">
                        <span className="text-white text-sm font-semibold">
                            {auth?.name ? getInitials(auth.name) : "M"}
                        </span>
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <p className="text-white text-xs">{auth?.name || "Manager Name"}</p>
                        <p className="text-white/50 text-xs">{auth?.email || "Manager Email"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}