import React, { useState } from "react";
import { Pencil, Trash, Trash2 } from "lucide-react";
import EditMovie from "./EditMovie";

// export interface ManagerMovie {
// 	id: number;
// 	title: string;
// 	releaseDate: string;
// 	duration: string;
// 	posterUrl: string;
// 	genre: string;
// 	description: string;
// 	trailerUrl: string;
// 	rating: string;
// 	director: string;
// 	cast: string;
// 	language: string;
// }

type MovieData = {
	id: number;
	title: string;
	description: string;
	posterUrl: string;
	trailerUrl: string;
	duration: string;
	genre: string;
	rating: number;
	releaseDate: string;
	director: string;
	cast: string;
	language: string;
};

export default function MovieCard({ movie, onEdit }: { movie: MovieData, onEdit: () => void }) {



	return (
		<div className="overflow-hidden shadow-lg flex flex-col group bg-gray-950 border border-gray-800 rounded-xl hover:border-blue-500 hover:shadow-blue-500/30 transition-all duration-200">
			<div className="aspect-[9/14] w-full bg-center bg-cover overflow-hidden">
				<img
					src={movie.posterUrl}
					alt={`${movie.title} poster`}
					className="w-full h-full object-cover group-hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
				/>
			</div>
			<div className="pt-3 px-3 pb-2 flex flex-col gap-1 flex-1">
				<div className="text-base text-white font-semibold truncate group-hover:text-blue-400 transition-colors duration-200">
					{movie.title}
				</div>
				<div className="text-xs text-gray-400 mb-1 truncate">
					{movie.releaseDate} &bull; {movie.duration} min
				</div>
				<div className="text-xs text-blue-400 mb-2 font-medium truncate">{movie.genre}</div>
			</div>
			<div className="flex gap-2 mt-1 items-end px-3 pb-3">
				<button
					onClick={onEdit}
					className="flex w-[80%] items-center gap-1 px-2 py-2 text-xs rounded bg-blue-800 hover:bg-blue-700 text-white font-semibold transition  justify-center h-10 shadow-sm"
				>
					<Pencil className="w-4 h-4 text-blue-200" /> Edit
				</button>
				<button className="flex  flex-1 items-center gap-1 px-2 py-2 text-xs rounded bg-red-800 hover:bg-red-700 text-white font-semibold transition  justify-center h-10 shadow-sm">
					<Trash className="w-4 h-4 text-white" />
				</button>
			</div>
		</div>
	);
}
