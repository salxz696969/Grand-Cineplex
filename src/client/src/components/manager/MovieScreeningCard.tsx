import React from "react";
import TheaterScreeningCard from "./TheatreScreeningCard";
import { Screening } from "./Screenings";

export default function MovieScreeningSection({
	movieTitle,
	movieImage,
	screenings,
	onEditScreening,
}: {
	movieTitle: string;
	movieImage: string;
	screenings: Screening[];
	onEditScreening: (screening: Screening) => void;
}) {
	return (
		<div className="bg-gray-950 border border-gray-800 rounded-xl p-6 space-y-6 shadow-lg hover:shadow-blue-500/30 transition-shadow duration-200">
			{/* Movie Header */}
			<div className="flex items-center gap-4">
				<img
					src={movieImage}
					alt={`${movieTitle} poster`}
					className="w-16 h-24 object-cover rounded-lg border border-gray-800"
				/>
				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						<h2 className="text-xl font-bold text-white">{movieTitle}</h2>
					</div>
					<p className="text-gray-400 text-sm">
						{screenings.length} screening{screenings.length !== 1 ? "s" : ""}
					</p>
				</div>
			</div>

			{/* Theater Screenings Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{screenings.map((screening) => (
					<TheaterScreeningCard
						key={screening.id}
						screening={screening}
						onEdit={() => onEditScreening(screening)}
					/>
				))}
			</div>
		</div>
	);
}
