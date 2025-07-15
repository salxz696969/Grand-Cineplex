import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  duration: string;
  image: string;
  dayOffset?: number;  // added this prop to know which day is selected
}

export default function MovieCard({ id, title, release_date, duration, image, dayOffset = 0 }: MovieCardProps) {
  // Convert release_date string to desired format "DD MMM YYYY"
  const formattedDate = (() => {
    if (!release_date) return "";
    const dateObj = new Date(release_date);
    if (isNaN(dateObj.getTime())) return release_date; // fallback if invalid date

    const day = dateObj.getDate().toString().padStart(2, "0");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  })();

  return (
    <Link to={`/movie/${id}?day=${dayOffset}`}>
      <div className="overflow-hidden shadow flex flex-col">
        <div className="h-90 w-full bg-center bg-cover transition-transform 
          duration-300 ease-in-out hover:scale-105 cursor-pointer mb-3 ">
          <img src={image} alt={`${title} poster`} className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="pl-2">
          <div className="text-sm text-white font-semibold">{title}</div>
          <div className="text-xs text-neutral-400 mb-3">
            {formattedDate}
          </div>
        </div>
      </div>
    </Link>
  );
}
