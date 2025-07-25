import React from "react";
import MovieInTheatreCard from "./MovieInTheatreCard";
import { MapPin } from "lucide-react";
type Screening = {
	id: number;
	movieId: number;
	theaterId: number;
	screeningDate: string;
	screeningTime: string;
	price: number;
	createdAt: string;
	updatedAt: string;
	theater: {
		name: string
	}
};
export default function MovieShowTimes({
	screening, movie
}: {
	screening: Screening[]; movie: string
}) {
	const movieTheatersSet = new Set(screening.map((s) => s.theater.name));
	const groupedScreenings: { [key: string]: Screening[] } = {};
	for (const theater of movieTheatersSet) {
		groupedScreenings[theater] = screening.filter((s) => s.theater.name === theater);
	}
	return (
		<div className="flex flex-col gap-4 w-full bg-gray-950 lg:border-l border-gray-800 lg:pl-4 py-4">
			{/* <div className="flex flex-row justify-start items-center gap-2 mb-4">
				<MapPin className="w-5 h-5 text-blue-800" />
				<h1 className="text-xl font-bold text-white">
					Showing in ...
				</h1>
			</div> */}
			{/* {screening.map((showtime) => (
				<MovieInTheatreCard
					theaterName={showtime.theater.name}
					theaterLocation="Cinema Complex A"
					movieTitle={movie}
					movieRating="PG-13"
					availableSeats={45}
					totalSeats={120}
					showtimes={[
						showtime.screeningTime
					]}
				/>
			))} */}
			{Object.entries(groupedScreenings).map(([theaterName, screenings]) => (
				<MovieInTheatreCard
					key={theaterName}
					theaterName={theaterName}
					theaterLocation="Cinema Complex A"
					movieTitle={movie}
					movieRating="PG-13"
					availableSeats={45}
					totalSeats={120}
					showtimes={(screenings as Screening[]).map((s) => (
						{
							time: s.screeningTime,
							screeningId: String(s.id),
						}
					))}
				/>
			))}
		</div>
	);
}
