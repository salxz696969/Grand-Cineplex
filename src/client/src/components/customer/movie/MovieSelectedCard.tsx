import React from "react";
import { Clock, Calendar, Star, Film, Play, ArrowLeft } from "lucide-react";
import { FiFileText } from "react-icons/fi";
import { MdTheaters } from "react-icons/md";
import { formatDuration } from "../../../utils/Function";
import { Movie } from "../../../../../shared/types/type";


interface MovieSelectedProps {
  movie: Movie;
  isUpcoming?: boolean;
}

// Reduce description to show only limited words
function truncateDescription(text: string | undefined, maxWords = 100): string {
  if (!text) return "";

  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  return words.slice(0, maxWords).join(" ") + "...";
}


export default function MovieSelectedCard({ movie, isUpcoming = false }: MovieSelectedProps) {

  const handlePlayClick = () => {
    window.open(movie.trailerUrl, "_blank");
  };

  return (
    <div className={`${isUpcoming ? "w-full flex justify-center" : "h-full"} w-full`}>

      {/* Upcoming movies */}
      {isUpcoming ? (
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start border border-gray-700 rounded-lg p-6 text-white">

         

          <div className="relative w-full lg:w-[300px] flex-shrink-0">
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-90 object-cover rounded-md shadow" />
            <button onClick={handlePlayClick} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
             bg-blue-800 hover:bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition">
              <Play size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-3 flex-1 lg:mt-7">
            <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>

            <div className="flex items-center gap-2 text-yellow-400 mt-3">
              <Clock size={20} />
              <span className="text-sm text-white">
                <span className="text-gray-300">Duration : </span>
                {formatDuration(movie.duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-red-500">
              <Film size={20} />
              <span className="text-sm text-white">
                <span className="text-gray-300">Genre : </span>
                {movie.genre}
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-400">
              <Calendar size={20} />
              <span className="text-sm text-white">
                <span className="text-gray-300">Duration : </span>
                {movie.releaseDate}
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-400">
              <MdTheaters className="w-5 h-5 text-red-500" />
              <span className="text-sm text-white">
                <span className="text-gray-300">Status : </span>
                Upcomings
              </span>
            </div>

            <div className="flex gap-2 text-blue-400">
              <FiFileText size={21} />
              <div className={`text-sm text-white flex gap-2 max-h-40 overflow-y-auto pr-2 ${movie.description ? "flex-col" : ""}`}>
                <span className="text-gray-300">Synopsis : </span>
                <span className="whitespace-pre-line">
                  {movie.description ? truncateDescription(movie.description, 13) : "NA"}
                </span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        // Current show movies
        <div className="flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-700 lg:border-b-0 lg:border-gray-700 lg:pr-4 pb-4 pt-4 lg:pb-0">

          <div className="relative">
            <img src={movie.posterUrl} alt={movie.title} className="lg:w-full w-[150px] lg:h-auto object-cover rounded-md flex-shrink-0" />
            <button onClick={handlePlayClick} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
             bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition">
              <Play size={18} />
            </button>
          </div>

          <div className="flex-1 lg:flex-none w-full flex flex-col gap-4 text-white">

            <h1 className="text-xl font-bold">{movie.title}</h1>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-4 h-4" />
                <p className="text-sm">{movie.rating}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <p className="text-sm">{formatDuration(movie.duration)}</p>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Film className="w-4 h-4" />
                <p className="text-sm">{movie.genre}</p>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Calendar className="w-4 h-4" />
                <p className="text-sm">{movie.releaseDate}</p>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
