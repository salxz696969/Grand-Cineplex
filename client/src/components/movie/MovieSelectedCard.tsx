import React from "react";
import { Clock, Calendar, Star, Film, Info, Globe, Play } from "lucide-react";

interface MovieSelectedProps {
  movie: {
    title: string;
    release_date: string;
    duration: string;
    poster_url: string;
    genre: string;
    description: string;
    rating: number;
    language: string;
    trailer_url: string;
  };
}

export default function MovieSelectedCard({ movie }: MovieSelectedProps) {
  const handlePlayClick = () => {
    window.open(movie.trailer_url, "_blank");
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-700 lg:border-b-0 lg:border-gray-700 lg:pr-4 pb-4 pt-4 lg:pb-0">
        {/* Poster + Play Button */}
        <div className="relative">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="lg:w-full w-[150px] lg:h-auto object-cover rounded-md flex-shrink-0"
          />
          <button
            onClick={handlePlayClick}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition"
          >
            <Play size={18} />
          </button>
        </div>

        {/* Info Section */}
        <div className="flex-1 lg:flex-none w-full flex flex-col gap-4 text-white">
          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-2">
            <h1 className="text-xl font-bold">{movie.title}</h1>

            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <p className="text-sm text-yellow-400">{movie.rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-red-600" />
              <p className="text-sm text-red-600">{movie.genre}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-blue-400">{movie.release_date}</p>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-green-400" />
              <p className="text-sm text-green-400">{movie.language}</p>
            </div>
             <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-400">{movie.duration}</p>
            </div>
          </div>


          {/* Mobile */}
          <div className="flex lg:hidden flex-col gap-4">
            <h1 className="text-xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-4 h-4" />
                <p>{movie.rating}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <p>{movie.duration}</p>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Film className="w-4 h-4" />
                <p>{movie.genre}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Calendar className="w-4 h-4" />
                <p>{movie.release_date}</p>
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <Globe className="w-4 h-4" />
                <p>{movie.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
