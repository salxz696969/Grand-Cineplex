import React from "react";
import { FaCalendarAlt, FaClock, FaFilm, FaStar, FaGlobe } from "react-icons/fa";

interface MovieHeaderProps {
  movie: {
    title: string;
    image: string;
    genre: string;
    releaseDate: string;
    duration: string;
    rating: number;
    language: string;
  };
}

export default function MovieHeader({ movie }: MovieHeaderProps) {
  return (
    <div className="bg-[#171717] rounded-2xl flex flex-col sm:flex-row gap-20 items-center sm:items-start px-6 py-8 sm:px-20 sm:py-14">
      {/* Left side: image */}
      <img
        src={movie.image}
        alt={movie.title}
        className="rounded-2xl w-64 h-80 sm:w-72 sm:h-96 object-cover"
      />

      {/* Right side: details */}
      <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
        <h1 className="font-bold text-4xl mb-2">{movie.title}</h1>

        <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
          <FaFilm className="text-red-500" />
          <p className="text-gray-400 font-semibold">Genre:</p>
          <p className="text-white">{movie.genre}</p>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
          <FaCalendarAlt className="text-red-500" />
          <p className="text-gray-400 font-semibold">Release :</p>
          <p className="text-white">{movie.releaseDate}</p>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
          <FaClock className="text-red-500" />
          <p className="text-gray-400">Duration:</p>
          <span className="text-white">{movie.duration}</span>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
          <FaStar className="text-yellow-400" />
          <p className="text-gray-400">Rating:</p>
          <span className="text-white">{movie.rating}</span>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
          <FaGlobe className="text-green-400" />
          <p className="text-gray-400">Language:</p>
          <span className="text-white">{movie.language}</span>
        </div>
      </div>
    </div>
  );
}
