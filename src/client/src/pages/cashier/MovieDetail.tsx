import React, { useEffect, useState } from "react";
import SelectedMovieSidebar from "../../components/cashier/MovieDetailSide";
import Header from "../../components/cashier/Header";
import MovieShowTimes from "../../components/cashier/MovieShowtimes";
import { getMovieAndScreeningBasedOnId } from "../../api/cashier";
import { useParams } from "react-router-dom";

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
		name: string;
	};
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
    trailerUrl:string;
};

type MovieDetail = {
	movie: Movie;
	screenings: Screening[];
};

export default function MovieDetail() {
	const id = useParams().id;
	const [movieDetail, setMovieDetail] = useState<MovieDetail>();
	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const movie = await getMovieAndScreeningBasedOnId(
					parseInt(id!)
				);
				setMovieDetail(movie);
			} catch (error) {
				console.error("Error fetching movie details:", error);
			}
		};
		fetchMovieDetails();
	}, [id]);
	return (
		<div className="min-h-screen bg-black">
			<Header />
			<div className="relative flex flex-row justify-center items-start gap-4 px-4">
				<div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col px-4 ">
					<div className="sticky top-22 left-0 w-full lg:w-80 flex-shrink-0 h-full z-10">
						{movieDetail ? (
							<SelectedMovieSidebar
								movieDetail={movieDetail.movie}
							/>
						) : (
							<p>Loading...</p>
						)}
					</div>

					{/* Main content - Takes remaining space */}
					<div className="flex-1">
						{movieDetail ? (
							<MovieShowTimes
								screening={movieDetail.screenings} movie={movieDetail.movie.title}
							/>
						) : (
							<p>Loading...</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
