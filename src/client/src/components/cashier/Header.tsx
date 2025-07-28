import { Clapperboard, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { StaffAuthContext } from "../context/StaffAuthContext";

export default function Header() {
    const navigate = useNavigate();
    const { auth } = useContext(StaffAuthContext)!;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Function to get initials from name
    const getInitials = (name: string) => {
        const names = name.trim().split(" ");
        if (names.length === 1) {
            return names[0].slice(0, 2).toUpperCase();
        } else {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setDropdownOpen(false);
        navigate("/cashier/auth");
    };

    return (
        <div className="fixed top-0 left-0 w-full flex justify-center items-center bg-gray-950 border-b border-slate-800 z-50">
            <div className="wrapper flex w-full items-center gap-4 justify-between p-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/cashier")}>
                    <div className="bg-blue-800 p-2 rounded-md">
                        <Clapperboard className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-white text-xl font-bold">Grand Cineplex</h1>
                </div>

                <div ref={dropdownRef} className="relative">
                    <div
                        className="flex items-center gap-4 border border-blue-800 p-2 rounded-md cursor-pointer hover:bg-gray-800/50 transition-colors"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <div className="bg-blue-800 p-2 rounded-md flex items-center justify-center w-10 h-10">
                            <span className="text-white text-sm font-semibold">
                                {auth?.name ? getInitials(auth.name) : "C"}
                            </span>
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <p className="text-white text-xs">{auth?.name || "Cashier Name"}</p>
                            <p className="text-white/50 text-xs">{auth?.email || "Cashier Email"}</p>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-950 border border-gray-700 rounded-lg shadow-xl z-50">
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-gray-700">
                                <p className="text-white text-sm font-semibold">{auth?.name || "Cashier Name"}</p>
                                <p className="text-gray-400 text-xs">{auth?.email || "Cashier Email"}</p>
                            </div>

                            {/* Menu Items */}
                            <div className="py-1">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}