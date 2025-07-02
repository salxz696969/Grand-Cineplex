// This is the movie cards for all movies


import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  release_date: string;
  duration: string;
  image: string;
}

export default function MovieCard({ id, title, release_date, duration, image }: MovieCardProps) {
  return (
    <Link to={`/movie/${id}`}>
      <div className="overflow-hidden shadow flex flex-col">
        <div className="h-90 w-full bg-center bg-cover transition-transform 
          duration-300 ease-in-out hover:scale-105 cursor-pointer mb-3 ">
          <img src={image} alt={`${title} poster`} className="w-full h-full object-cover rounded-2xl"/>
        </div>
        <div className="pl-2">
          <div className="text-sm text-white font-semibold">{title}</div>
          <div className="text-xs text-neutral-400 mb-3">
            {release_date} &bull; {duration}
          </div>
        </div>
      </div>
    </Link>
  );
}
