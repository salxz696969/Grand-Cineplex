import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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

export default function MovieCard({ movie }: { movie: MovieData }) {
	const [editMovie, setEditMovie] = useState(false);

    const handleBackToMovies = () => {
            setEditMovie(false);
        };
    
        const handleEditMovie = () => {
            setEditMovie(true);
        };
    
        // If adding a movie, show the AddMovie component
        if (editMovie) {
            return (
                <EditMovie onBack={handleBackToMovies} movie={movie} />
            );
        }

	return (
		<div className="overflow-hidden shadow flex flex-col group bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-colors duration-300">
			<div className="aspect-[9/16] w-full bg-center bg-cover overflow-hidden">
				<img
					src={movie.posterUrl}
					alt={`${movie.title} poster`}
					className="w-full h-full object-cover rounded-2xl group-hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out"
				/>
			</div>
			<div className="pt-4 px-3 pb-3 flex flex-col gap-1">
				<div className="text-base text-white font-semibold group-hover:text-blue-400 transition-colors duration-300">
					{movie.title}
				</div>
				<div className="text-xs text-neutral-400 mb-1">
					{movie.releaseDate} &bull; {movie.duration}
				</div>
				<div className="text-xs text-blue-300 mb-2">{movie.genre}</div>
			</div>
			<div className="flex gap-2 mt-2 flex-1 items-end px-3 pb-3">
				<button
					onClick={() => handleEditMovie()}
					className="flex items-center gap-1 px-2 py-3 text-xs rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition w-full justify-center h-12"
				>
					<Pencil className="w-4 h-4" /> Edit
				</button>
				{/* <button className="flex items-center gap-1 px-2 py-3 text-xs rounded bg-red-600 hover:bg-red-700 text-white font-semibold transition w-full justify-center h-12">
                        <Trash2 className="w-4 h-4" /> Delete
                    </button> */}
			</div>
		</div>
	);
}
