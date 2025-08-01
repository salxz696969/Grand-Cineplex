import React, { use, useEffect, useState } from "react";
import Header from "../../components/cashier/Header";
import ScreeningDay from "../../components/cashier/ScreeningDay";
import SearchBar from "../../components/cashier/SearchBar";
import MovieContainer from "../../components/cashier/MovieContainer";
import axios from "axios";
import { getMoviesFor7Days } from "../../api/cashier";

type CalendarDay = {
	number: number;
	day: string;
	month: string;
};

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

type MovieWithScreenings = {
	movie: Movie;
	screenings: Screening[];
};

// Skeleton component for loading state
const SkeletonCard = () => (
	<div className="overflow-hidden shadow-lg flex flex-col group bg-gray-900/50 border border-gray-800 rounded-xl animate-pulse">
		<div className="aspect-[9/14] w-full bg-center bg-cover overflow-hidden">
			<div className="w-full h-full bg-gray-800" />
		</div>
		<div className="pt-3 px-3 pb-2 flex flex-col gap-1 flex-1">
			<div className="h-5 w-3/4 bg-gray-800 rounded mb-1" /> {/* Title line */}
			<div className="h-3 w-1/2 bg-gray-800 rounded" /> {/* Release date & duration */}
		</div>
	</div>
);

export default function Movies() {
	const [movies, setMovies] = useState<MovieWithScreenings[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showedMovies, setShowedMovies] = useState<MovieWithScreenings[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedDate, setSelectedDate] = useState<string>("");

	useEffect(() => {
		console.log("Movies component rendered");
		const fetchMovies = async () => {
			try {
				setLoading(true);
				const response = await getMoviesFor7Days();
				console.log("Movies fetched:", response);
				setMovies(response);
			} catch (error) {
				console.error("Error fetching movies:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchMovies();
	}, []);

	useEffect(() => {
		if (movies.length > 0) {
			const today = new Date();
			const date = new Date(today);
			date.setDate(today.getDate() + selectedIndex);
			const calculatedSelectedDate = date.toISOString().split("T")[0];
			setSelectedDate(calculatedSelectedDate);

			// Filter movies that have screenings on the selected date
			const filteredMovies = movies.filter((movieData: MovieWithScreenings) =>
				movieData.screenings.some(
					(screening: Screening) =>
						screening.screeningDate === calculatedSelectedDate
				)
			);
			setShowedMovies(filteredMovies);
		} else {
			setShowedMovies([]);
		}
	}, [movies, selectedIndex]);

	const sevenDaysArray = (start: Date): CalendarDay[] => {
		const daysArray: CalendarDay[] = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(start);
			date.setDate(start.getDate() + i);
			const options: Intl.DateTimeFormatOptions = {
				weekday: "short",
				month: "short",
				day: "numeric",
			};
			const formattedDate = date
				.toLocaleDateString("en-US", options)
				.split(", ");
			daysArray.push({
				number: date.getDate(),
				day: formattedDate[0],
				month: formattedDate[1],
			});
		}
		return daysArray;
	};

	return (
		<div>
			<div className="relative">
				<Header />
			</div>
			<div className="min-h-screen content flex flex-col justify-start items-center bg-gray-950 pt-24">
				<div className="flex flex-col max-w-7xl w-full justify-center items-center">
					{/* Horizontally scrollable parent on mobile, normal on desktop */}
					<div className="w-full lg:hidden p-4 ">
						<SearchBar searchTerm={""} setSearchTerm={() => { }} />
					</div>
					<div className="flex flex-nowrap overflow-x-auto gap-4 px-4 justify-between items-center scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent lg:flex-wrap lg:overflow-x-visible lg:whitespace-normal w-full">
						<div className="min-w-max ">
							<ScreeningDay
								days={sevenDaysArray(new Date())}
								selectedIndex={selectedIndex}
								onSelect={(index) => setSelectedIndex(index)}
							/>
						</div>
						<div className="hidden lg:flex p-4 min-w-[300px] pr-0">
							<SearchBar searchTerm={""} setSearchTerm={() => { }} />
						</div>
					</div>
					{
						loading ? (
							<div className="grid w-full gap-5 custom-cols mt-4 px-4">
								{[...Array(6)].map((_, i) => (
									<SkeletonCard key={i} />
								))}
							</div>
						) : (
							<MovieContainer
								searchTerm={""}
								activeTab={"now"}
								movies={showedMovies || []}
								selectedDate={selectedDate}
							/>
						)
					}

				</div>
			</div>
		</div>
	);
}
