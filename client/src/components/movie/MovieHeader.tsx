import React from "react";
import { FaCalendarAlt, FaClock, FaFilm, FaStar, FaGlobe, FaPlay } from "react-icons/fa";

interface MovieHeaderProps {
  movie: {
    title: string;
    poster_url: string;
    genre: string;
    release_date: string;
    duration: string;
    rating: number;
    language: string;
    trailer_url: string;
  };
}

export default function MovieHeader({ movie }: MovieHeaderProps) {
  const handlePlayClick = () => {
    window.open(movie.trailer_url, "_blank");
  };

  return (
    <div
      className="
        bg-[#171717] rounded-2xl flex flex-col
        [@media(min-width:901px)]:flex-row gap-20
        items-center [@media(min-width:901px)]:items-start
        px-6 py-8 sm:px-20 sm:py-14
      "
    >
      <div className="relative">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="rounded-2xl w-64 h-80 sm:w-72 sm:h-96 object-cover"
        />
        <button
          onClick={handlePlayClick}
          className="absolute bg-red-600 w-14 h-14 flex items-center justify-center rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <FaPlay />
        </button>
      </div>

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
          <p className="text-white">{movie.release_date}</p>
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
