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

type Screening = {
	createdAt: string;
	id: number;
	movieId: number;
	price: number;
	screeningDate: string;
	screeningTime: string;
	theaterId: number;
	updatedAt: string;
};

type Movie = {
	createdAt: string;
	description: string;
	duration: number;
	genre: string;
	id: number;
	posterUrl: string;
	rating: string;
	releaseDate: string;
	screenings: Screening[];
	title: string;
	updatedAt: string;
};

export default function Movies() {
	const [movies, setMovies] = useState<any[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showedMovies, setShowedMovies] = useState<any[]>([]);
	useEffect(() => {
        console.log("Movies component rendered");
		const fetchMovies = async () => {
			try {
				const response = await getMoviesFor7Days();
				console.log("Movies fetched:", response);
				setMovies(response);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};
		fetchMovies();
	}, []);

	useEffect(() => {
		if (movies.length > 0) {
			const today = new Date();
			const date = new Date(today);
			date.setDate(today.getDate() + selectedIndex);
			const filteredMovies = movies.filter((movie: Movie) =>
				movie.screenings.some(
					(screening: Screening) =>
						screening.screeningDate ===
						date.toISOString().split("T")[0]
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
			<div className="min-h-screen content flex flex-col justify-start items-center bg-black">
				<div className="flex flex-col max-w-7xl w-full justify-center items-center">
					<div className="flex flex-wrap-reverse p-4 w-full justify-between items-center gap-4 px-4 lg:flex-row lg:gap-20 lg:flex-nowrap">
						<ScreeningDay
							days={sevenDaysArray(new Date())}
							selectedIndex={selectedIndex}
							onSelect={(index) => setSelectedIndex(index)}
						/>
						<SearchBar searchTerm={""} setSearchTerm={() => {}} />
					</div>
					<MovieContainer
						searchTerm={""}
						activeTab={"now"}
						movies={showedMovies || []}
					/>
				</div>
			</div>
		</div>
	);
}
