import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import EditMovie from "./EditMovie";
import { deleteMovie } from "../../api/manager";

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

interface MovieCardProps {
	movie: MovieData;
	onEdit: () => void;
	onDelete?: () => void;
}

export default function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
	const [showConfirm, setShowConfirm] = useState(false);
	const [deleting, setDeleting] = useState(false);

	const deleteMovieHandler = () => {
		setShowConfirm(true);
	};

	const confirmDelete = async () => {
		setDeleting(true);
		await deleteMovie(movie.id);
		setDeleting(false);
		setShowConfirm(false);
		if (onDelete) {
			await onDelete();
		}
	};

	const cancelDelete = () => setShowConfirm(false);

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
				<button
					onClick={deleteMovieHandler}
					className="flex  flex-1 items-center gap-1 px-2 py-2 text-xs rounded bg-red-800 hover:bg-red-700 text-white font-semibold transition  justify-center h-10 shadow-sm"
				>
					<Trash className="w-4 h-4 text-white" />
				</button>
			</div>

			{/* Confirmation Modal */}
			{showConfirm && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
					<div className="bg-gray-900 border border-slate-700 rounded-lg p-6 shadow-lg w-[320px] flex flex-col items-center">
						<h3 className="text-lg font-semibold text-white mb-2">Confirm Deletion</h3>
						<p className="text-slate-400 mb-6 text-center">
							Are you sure you want to delete this movie?
							<br />
							This action cannot be undone.
						</p>
						<div className="flex gap-3 w-full justify-center">
							<button
								onClick={cancelDelete}
								className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-semibold transition"
								disabled={deleting}
							>
								No, Keep
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-semibold transition"
								disabled={deleting}
							>
								{deleting ? "Deleting..." : "Yes, Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
