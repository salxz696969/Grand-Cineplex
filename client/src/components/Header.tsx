import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#171717] h-16 w-full mb-4 flex items-center overflow-hidden">
      <div className="flex items-center justify-between font-bold text-[#5aa0f2] w-full px-[30px] md:px-[40px] lg:px-[80px]">
        <Link className="text-2xl" to="/">Grand-Cineplex</Link>
        <Link className="text-xl hover:underline" to="/SignUp">Sign Up</Link>
      </div>
    </header>
  );
}
