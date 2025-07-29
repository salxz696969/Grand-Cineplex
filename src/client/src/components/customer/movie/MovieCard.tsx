import React from "react";
import { formatDuration } from "../../../utils/Function";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  duration: string;
  image: string;
  dayOffset?: number;
  isUpcoming?: boolean;
}

export default function MovieCard({ id, title, release_date, duration, image, dayOffset = 0, isUpcoming = false }: MovieCardProps) {

  // Convert release_date string to format "DD MMM YYYY"
  const formattedDate = (() => {

    if (!release_date) return "";
    const dateObj = new Date(release_date);
    if (isNaN(dateObj.getTime())) return release_date;

    const day = dateObj.getDate().toString().padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;

  })();


  return (
    <Link to={`/movie/${id}?day=${dayOffset}${isUpcoming ? "&isUpcoming=true" : "&isUpcoming=false"}`}>
      <div className="overflow-hidden shadow-lg flex flex-col group bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-800 hover:shadow-blue-500/30 transition-all duration-200">
        <div className="aspect-[9/14] w-full bg-center bg-cover overflow-hidden">
          <img src={image} alt={`${title} poster`} className="w-full h-full object-cover group-hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out" />
        </div>
        <div className="pt-3 px-3 pb-2 flex flex-col gap-1 flex-1">
          <div className="text-base text-white font-semibold truncate group-hover:text-blue-600 transition-colors duration-200">{title}</div>
          <div className="text-xs text-gray-400 mb-1 truncate">
            {formattedDate} &bull; {formatDuration(duration)}
          </div>
        </div>
      </div>
    </Link>
  );
}
