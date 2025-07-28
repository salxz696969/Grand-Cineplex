import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Clapperboard, LogIn, History, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext)!;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = auth;
  const userName = auth?.name;
  const userEmail = auth?.email;

  //get initials from name
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

  const handleUserClick = () => {
    if (!isLoggedIn) {
      navigate("/auth");
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(null);
    setDropdownOpen(false);
    navigate("/auth");
  };

  const handleViewHistory = () => {
    setDropdownOpen(false);
    navigate("/history");
  };

  return (
    <header className="w-full h-20 mb-4 flex items-center bg-gray-950/50 backdrop-blur-md sticky top-0 z-50 justify-center">
      <div className="flex items-center justify-between font-bold text-white w-full max-w-7xl px-4">
        {/* Left side */}
        <Link className="sm:text-xl text-x flex gap-2" to="/">
          <Clapperboard /> Grand-Cineplex
        </Link>

        {/* Right side */}
        <div ref={dropdownRef} className="relative">
          <div
            className="flex items-center gap-4 border border-blue-800 p-2 rounded-xl cursor-pointer hover:bg-gray-800/50 transition-colors"
            onClick={handleUserClick}
          >
            <div className="flex items-center justify-center bg-blue-800 p-2 rounded-md w-8 h-8 text-xs font-semibold text-white select-none">
              {isLoggedIn ? getInitials(userName || "") : <LogIn className="w-4 h-4" />}
            </div>

            {!isLoggedIn ? (
              <div className="hidden sm:flex flex-col leading-tight">
                <p className="text-white text-xs font-semibold">Sign In</p>
              </div>
            ) : (
              <div className="hidden sm:flex flex-col">
                <p className="text-white text-xs">{userName}</p>
                <p className="text-white/50 text-xs">{userEmail}</p>
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && isLoggedIn && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-950 border border-gray-700 rounded-lg shadow-xl z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-700">
                <p className="text-white text-sm font-semibold">{userName}</p>
                <p className="text-gray-400 text-xs">{userEmail}</p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleViewHistory}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <History className="w-4 h-4" />
                  View History
                </button>
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
    </header>
  );
}
