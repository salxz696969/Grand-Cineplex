import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clapperboard, User } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with real auth state

  const handleJoinNowClick = () => {
    if (!isLoggedIn) {
      navigate('/SignIn');
    }
  };

  return (
    <header
      className="w-full h-20 mb-4 flex items-center
                 bg-gray-900/60 backdrop-blur-md sticky top-0 z-50 px-5 sm:px-14 md:px-24 lg:px-44"
    >
      <div className="flex items-center justify-between font-bold text-white w-full">
        {/* Logo */}
        <Link className="sm:text-xl text-x flex gap-2" to="/">
          <Clapperboard /> Grand-Cineplex
        </Link>

        {/* User login box */}
        <div
          className="group flex items-center gap-4 border border-sky-800 p-2 rounded-md cursor-pointer"
          onClick={handleJoinNowClick}
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-sky-800 to-sky-600 p-2 rounded-md">
            <User className="w-4 h-4" />
          </div>

          {!isLoggedIn ? (
            <div className="hidden sm:flex group-hover:flex flex-col leading-tight transition-all duration-300 ease-in-out">
              <p className="text-white text-xs font-semibold">Log in account</p>
              <p className="text-white/50 text-[10px] mt-0.5">Right here</p>
            </div>
          ) : (
            <div className="hidden sm:flex group-hover:flex flex-col transition-all duration-300 ease-in-out">
              <p className="text-white text-xs">Cashier Name</p>
              <p className="text-white/50 text-xs">Cashier Email</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
