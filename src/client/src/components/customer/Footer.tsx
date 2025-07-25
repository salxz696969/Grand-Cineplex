import { Clapperboard } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 text-xs mt-10 border-t border-gray-800">
      <div className="w-full max-w-7xl mx-auto py-6 px-4  lg:px-8 flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full">

          {/* About Us */}
          <div>
            <h3 className="text-white text-base font-semibold mb-2 sm:mb-4">About Cinema</h3>
            <p className="leading-snug break-words text-xs sm:text-sm">
              Grand-Cineplex is your ultimate destination for blockbuster hits and hidden indie gems. Enjoy next-level sound, razor-sharp screens, and unbeatable comfort — because at Grand-Cineplex, every movie matters.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-base font-semibold mb-2 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#now-showing" className="hover:text-white transition break-words text-xs sm:text-sm">Now Showing</a></li>
              <li><a href="#upcoming" className="hover:text-white transition break-words text-xs sm:text-sm">Upcoming</a></li>
              <li><a href="#" className="hover:text-white transition break-words text-xs sm:text-sm">Membership</a></li>
              <li><a href="#" className="hover:text-white transition break-words text-xs sm:text-sm">Promotions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-base font-semibold mb-2 sm:mb-4">Contact Us</h3>
            <ul className="space-y-1 sm:space-y-2 break-words text-xs sm:text-sm">
              <li>Email: <a href="#" className="hover:text-white">GrandCineplex-Cadt@gmail.com</a></li>
              <li>Phone: <span className="text-white">+855 9875430</span></li>
              <li>Location: <span className="text-white">Phnom Penh, Cambodia</span></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white text-base font-semibold mb-2 sm:mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <a href="#" className="hover:text-white break-words text-xs sm:text-sm">Facebook</a>
              <a href="#" className="hover:text-white break-words text-xs sm:text-sm">Instagram</a>
              <a href="#" className="hover:text-white break-words text-xs sm:text-sm">YouTube</a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-6 sm:mt-10 text-[10px] sm:text-xs">
          &copy; {new Date().getFullYear()} Grand-Cineplex Cinema. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
