import React, { useEffect, useState } from "react";
import SelectedMovieSidebar from "../../components/cashier/MovieDetailSide";
import Header from "../../components/cashier/Header";
import MovieShowTimes from "../../components/cashier/MovieShowtimes";
import { getMovieAndScreeningBasedOnId } from "../../api/cashier";
import { useParams } from "react-router-dom";

type Theater = {
	name: string;
};

type Screening = {
	id: number;
	movieId: number;
	theaterId: number;
	screeningDate: string;
	screeningTime: string;
	regularSeatPrice: string;
	premiumSeatPrice: string;
	vipSeatPrice: string;
	createdAt: string;
	updatedAt: string;
	theater_id: number;
	movie_id: number;
	theater: Theater;
};

type Movie = {
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

type MovieDetail = {
	movie: Movie;
	screenings: Screening[];
};

// Skeleton for sidebar (MovieDetailSide)
const SidebarSkeleton = () => (
	<div className="w-full h-full overflow-hidden">
		<div className="bg-gray-950 flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-800 lg:border-b-0  lg:border-gray-800 lg:pr-4 pb-4 pt-4 lg:pb-0 animate-pulse">
			<div className="relative">
				<div className="lg:w-72 w-[150px] h-[210px] lg:h-96 bg-gray-900 rounded-md" />
			</div>
			<div className="flex-1 lg:flex-none w-full bg-gray-950 flex flex-col gap-4">
				<div className="hidden lg:flex flex-col gap-2 text-white">
					<div className="h-6 w-32 bg-gray-800 rounded mb-2" />
					<div className="h-4 w-48 bg-gray-800 rounded mb-1" />
					<div className="h-4 w-24 bg-gray-800 rounded mb-1" />
					<div className="h-4 w-20 bg-gray-800 rounded mb-1" />
					<div className="h-4 w-16 bg-gray-800 rounded mb-1" />
					<div className="h-4 w-28 bg-gray-800 rounded mb-1" />
				</div>
				<div className="flex lg:hidden flex-col gap-4 text-white">
					<div className="h-6 w-32 bg-gray-800 rounded mb-2" />
					<div className="h-4 w-48 bg-gray-800 rounded mb-1" />
					<div className="flex flex-wrap flex-row gap-2">
						<div className="h-4 w-16 bg-gray-800 rounded mb-1" />
						<div className="h-4 w-12 bg-gray-800 rounded mb-1" />
						<div className="h-4 w-14 bg-gray-800 rounded mb-1" />
						<div className="h-4 w-20 bg-gray-800 rounded mb-1" />
					</div>
				</div>
			</div>
		</div>
	</div>
);

// Skeleton for showtimes (MovieShowtimes)
const ShowtimesSkeleton = () => (
	<div className="flex flex-col gap-4 w-full bg-gray-950 lg:border-l border-gray-800 pl-4 py-4 animate-pulse">
		<div className="flex flex-row justify-start items-center gap-2 mb-4">
			<div className="w-5 h-5 bg-blue-900 rounded-full" />
			<div className="h-6 w-32 bg-gray-800 rounded" />
		</div>
		{[...Array(6)].map((_, i) => (
			<div key={i} className="flex flex-col gap-2 p-4 bg-gray-900/50 rounded-lg border border-gray-800 w-full ">
				<div className="h-5 w-1/2 bg-gray-800 rounded mb-2" />
				<div className="flex flex-row gap-2">
					{[...Array(3)].map((_, j) => (
						<div key={j} className="h-8 w-16 bg-gray-800 rounded" />
					))}
				</div>
			</div>
		))}
	</div>
);

export default function MovieDetail() {
	const id = useParams().id;
	const screeningDate = useParams().screeningDate;
	const [movieDetail, setMovieDetail] = useState<MovieDetail>();

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const movieData = await getMovieAndScreeningBasedOnId(
					parseInt(id!),
					screeningDate!
				);
				setMovieDetail(movieData);
			} catch (error) {
				console.error("Error fetching movie details:", error);
			}
		};
		fetchMovieDetails();
	}, [id, screeningDate]);

	return (
		<div className="min-h-screen bg-black">
			<Header />
			<div className="relative flex flex-row justify-center items-start gap-4 px-4 pt-24">
				<div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col lg:px-4 px-0 ">
					<div className="sticky lg:top-24 top-20 left-0 w-full lg:w-80 flex-shrink-0 h-full z-10 overflow-hidden">
						{movieDetail ? (
							<SelectedMovieSidebar
								movieDetail={movieDetail.movie}
							/>
						) : (
							<SidebarSkeleton />
						)}
					</div>

					{/* Main content - Takes remaining space */}
					<div className="flex-1 w-full">
						{movieDetail ? (
							<MovieShowTimes
								screening={movieDetail.screenings}
								movie={movieDetail.movie.title}
							/>
						) : (
							<ShowtimesSkeleton />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
