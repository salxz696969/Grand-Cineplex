import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
    id: number;
    title: string;
    releaseDate: string;
    duration: string;
    image: string;
}

export default function MovieCard({ id, title, releaseDate, duration, image }: MovieCardProps) {
    return (
        <Link to={`/movie/${id}`}>
            <div className="overflow-hidden shadow flex flex-col group hover:text-sky-800 transition-colors duration-300">
                <div className="aspect-[9/16] w-full bg-center bg-cover  ease-in-out overflow-hidden ">
                    <img src={image} alt={`${title} poster`} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out" />
                </div>
                <div className="pt-4">
                    <div className="text-sm text-white font-semibold group-hover:text-sky-800 transition-colors duration-300">{title}</div>
                    <div className="text-xs text-neutral-400 mb-3 group-hover:text-sky-800 transition-colors duration-300">
                        {releaseDate} &bull; {duration}
                    </div>
                </div>
            </div>
        </Link>
    );
}
