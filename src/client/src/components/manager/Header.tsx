import { Clapperboard, User } from "lucide-react";
import React from "react";

export default function Header() {
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
                    <div className="bg-blue-800 p-2 rounded-md flex items-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <p className="text-white text-xs">Manager Name</p>
                        <p className="text-white/50 text-xs">Manager Email</p>
                    </div>
                </div>
            </div>
        </div>
    );
}