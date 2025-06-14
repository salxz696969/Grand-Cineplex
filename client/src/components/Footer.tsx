import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#111518] text-gray-400 text-sm mt-10 border-t border-gray-800">
      <div className="w-full max-w-screen-xl mx-auto py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-0">
          
          {/* About Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About CineView</h3>
            <p className="leading-relaxed">
             Grand-Cineplex is your ultimate destination for blockbuster hits and hidden indie gems. Enjoy next-level sound, razor-sharp screens, and unbeatable comfort — because at Grand-Cineplex, every movie matters.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Now Showing</a></li>
              <li><a href="#" className="hover:text-white transition">Upcoming</a></li>
              <li><a href="#" className="hover:text-white transition">Membership</a></li>
              <li><a href="#" className="hover:text-white transition">Promotions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:support@cineview.com" className="hover:text-white">Jack@GrandCineplex.com</a></li>
              <li>Phone: <span className="text-white">+855 363138</span></li>
              <li>Location: <span className="text-white">Phnom Penh, Cambodia</span></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">YouTube</a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-10 text-xs">
          &copy; {new Date().getFullYear()} Grand-Cineplex Cinema. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
