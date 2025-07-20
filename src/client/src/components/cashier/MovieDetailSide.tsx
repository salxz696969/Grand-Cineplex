import React from "react";
import { Clock, Calendar, Star, Film, Tag, Info, Play } from "lucide-react";
import { currentShow } from "../../utils/FakeData";

type MovieDetail = {
	id: number;
	title: string;
	description: string;
	duration: number;
	genre: string;
	rating: number;
	posterUrl: string;
	releaseDate: string;
	createdAt: string;
	updatedAt: string;
	trailerUrl: string;
};

export default function SelectedMovieSidebar({
	movieDetail,
}: {
	movieDetail: MovieDetail;
}) {
	if (!movieDetail) {
		return <div className="text-white p-4">Loading...</div>;
	}
	const handlePlayClick = () => {
		window.open(movieDetail.trailerUrl, "_blank");
	};

	return (
		<div className="w-full h-full">
			<div className="bg-black flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-700 lg:border-b-0  lg:border-gray-700 lg:pr-4 pb-4 pt-4 lg:pb-0">
				<div className="relative">
					<img
						src={movieDetail.posterUrl}
						alt={movieDetail.title}
						className="lg:w-full w-[150px]   lg:h-auto object-cover rounded-md flex-shrink-0"
					/>
					<button
						onClick={handlePlayClick}
						className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full transition"
					>
						<Play size={18} />
					</button>
				</div>
				<div className="flex-1 lg:flex-none w-full bg-black/50 flex flex-col gap-4">
					<div className="hidden lg:flex flex-col gap-2 text-white">
						<h1 className="text-xl font-bold">
							{movieDetail.title}
						</h1>
						<div className="flex items-start gap-2">
							<Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
							<p className="text-sm text-gray-400 line-clamp-3">
								{movieDetail.description}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Star className="w-4 h-4 text-gray-400" />
							<p className="text-sm text-gray-400">
								{movieDetail.rating}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-gray-400" />
							<p className="text-sm text-gray-400">
								{movieDetail.duration}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Film className="w-4 h-4 text-gray-400" />
							<p className="text-sm text-gray-400">
								{movieDetail.genre}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4 text-gray-400" />
							<p className="text-sm text-gray-400">
								{movieDetail.releaseDate}
							</p>
						</div>
					</div>
					<div className="flex lg:hidden flex-col gap-4 text-white">
						<h1 className="text-xl font-bold">
							{movieDetail.title}
						</h1>
						<div className="flex items-start gap-2">
							<Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
							<p className="text-sm text-gray-400 line-clamp-3">
								{movieDetail.description}
							</p>
						</div>
						<div className="flex flex-wrap flex-row gap-2">
							<div className="flex items-center gap-2">
								<Star className="w-4 h-4 text-gray-400" />
								<p className="text-sm text-gray-400">
									{movieDetail.rating}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-4 h-4 text-gray-400" />
								<p className="text-sm text-gray-400">
									{movieDetail.duration}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Film className="w-4 h-4 text-gray-400" />
								<p className="text-sm text-gray-400">
									{movieDetail.genre}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4 text-gray-400" />
								<p className="text-sm text-gray-400">
									{movieDetail.releaseDate}
								</p>
							</div>
						</div>
					</div>
					{/* <button className="bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors">
                        Watch Trailer
                    </button> */}
				</div>
			</div>
		</div>
	);
}
