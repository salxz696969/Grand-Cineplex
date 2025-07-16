import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Clapperboard } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {

  const navigate = useNavigate();

  // ! to make ts know  AuthContext is never null or undefined.
  const { auth, setAuth } = useContext(AuthContext)!;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!auth;
  const userName = auth?.name || "User";
  const userEmail = auth?.email || "";

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
    function handleClickOutside(event: MouseEvent){
      if( dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleUserClick = () => {
    if(!isLoggedIn){
      navigate("/signin");
    }else{
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth(null);
    setDropdownOpen(false);
    navigate("/signin");
  };

  return (
    <header className="w-full h-20 mb-4 flex items-center bg-gray-900/60 backdrop-blur-md sticky top-0 z-50 px-5 sm:px-14 md:px-24 lg:px-44">
      <div className="flex items-center justify-between font-bold text-white w-full">
        
        {/* Left side */}
        <Link className="sm:text-xl text-x flex gap-2" to="/">
          <Clapperboard /> Grand-Cineplex
        </Link>

        {/* Right side */}
        <div ref={dropdownRef} className="relative group flex items-center gap-4 border border-sky-800 p-2 rounded-md cursor-pointer"
          onClick={handleUserClick}>
          <div className="flex items-center justify-center bg-gradient-to-r from-sky-800 to-sky-600 p-2 rounded-md w-8 h-8 text-xs font-semibold text-white select-none">
            {isLoggedIn ? getInitials(userName) : <User className="w-4 h-4" />}
          </div>

          {!isLoggedIn ? (
            <div className="hidden sm:flex group-hover:flex flex-col leading-tight transition-all duration-300 ease-in-out">
              <p className="text-white text-xs font-semibold">Log in account</p>
              <p className="text-white/50 text-[10px] mt-0.5">Right here</p>
            </div>
          ) : (
            <div className="hidden sm:flex group-hover:flex flex-col transition-all duration-300 ease-in-out">
              <p className="text-white text-xs">{userName}</p>
              <p className="text-white/50 text-xs">{userEmail}</p>
            </div>
          )}

          {/* Logout */}
          {dropdownOpen && isLoggedIn && (
            <div className="absolute right-8 top-full mt-2 w-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded shadow-lg z-50">
              <button onClick={handleLogout} className="w-full flex justify-center text-left px-4 py-2 text-sm  hover:bg-gray-900 rounded">
                Logout
              </button>
            </div>
          )}

        </div>
        
      </div>
    </header>
  );
}
