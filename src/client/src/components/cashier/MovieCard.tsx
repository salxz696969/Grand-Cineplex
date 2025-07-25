import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    releaseDate: string;
    duration: string;
    posterUrl: string;
}

export default function MovieCard({ id, title, releaseDate, duration, posterUrl }: MovieCardProps) {
    return (
        <Link to={`/cashier/detail/movie/${id}`}>
            <div className="overflow-hidden shadow-lg flex flex-col group bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-800 hover:shadow-blue-500/30 transition-all duration-200">
                <div className="aspect-[9/14] w-full bg-center bg-cover overflow-hidden">
                    <img src={posterUrl} alt={`${title} poster`} className="w-full h-full object-cover group-hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out" />
                </div>
                <div className="pt-3 px-3 pb-2 flex flex-col gap-1 flex-1">
                    <div className="text-base text-white font-semibold truncate group-hover:text-blue-600 transition-colors duration-200">{title}</div>
                    <div className="text-xs text-gray-400 mb-1 truncate">
                        {releaseDate} &bull; {duration} min
                    </div>
                </div>
            </div>
        </Link>
    );
}
