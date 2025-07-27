import React, { useEffect, useState } from "react";
import { PlusCircle, Search, Calendar, Clock, MapPin, Users, Filter, Film } from "lucide-react";
import MovieScreeningCard from "./MovieScreeningCard";
import AddScreening from "./AddScreening";
import EditScreening from "./EditScreening";
import { getTodayShowTimes } from "../../api/manager";

export interface Screening {
	id: number;
	movieId: number; // <-- add this
	theaterId: number; // <-- add this
	movieTitle: string;
	movieImage: string;
	theater: string;
	date: string;
	time: string;
	duration: string;
	availableSeats: number;
	totalSeats: number;
	regularSeatPrice: number;
	premiumSeatPrice: number;
	vipSeatPrice: number;
	status: "upcoming" | "ongoing" | "completed";
}

export default function Screenings() {
	const [screenings, setScreenings] = useState<Screening[]>([]);
	const [activeTab, setActiveTab] = useState<string>("today");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTheater, setSelectedTheater] = useState<string>("all");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [addingScreening, setAddingScreening] = useState(false);
	const [loading, setLoading] = useState(true);
	const [editScreening, setEditScreening] = useState<Screening | null>(null);

	// Use today's date for filtering
	const today = new Date().toISOString().split("T")[0];
	useEffect(() => {
		const fetchScreenings = async () => {
			try {
				const response = await getTodayShowTimes();
				setScreenings(response);
			} catch (error) {
				console.error("Error fetching screenings:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchScreenings();
	}, []);
	const filteredScreenings = screenings.filter((screening) => {
		const matchesTab = activeTab === "today" ? screening.date === today : true;
		const matchesSearch =
			screening.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
			screening.theater.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesTheater = selectedTheater === "all" || screening.theater === selectedTheater;
		const matchesStatus = selectedStatus === "all" || screening.status === selectedStatus;

		return matchesTab && matchesSearch && matchesTheater && matchesStatus;
	});

	const theaters = Array.from(new Set(screenings.map((s) => s.theater)));

	// Group screenings by movie
	const screeningsByMovie = filteredScreenings.reduce((acc, screening) => {
		if (!acc[screening.movieTitle]) {
			acc[screening.movieTitle] = {
				movieTitle: screening.movieTitle,
				movieImage: screening.movieImage,
				screenings: [],
			};
		}
		acc[screening.movieTitle].screenings.push(screening);
		return acc;
	}, {} as Record<string, { movieTitle: string; movieImage: string; screenings: Screening[] }>);

	const handleBackToScreenings = () => {
		setAddingScreening(false);
	};

	const handleAddScreening = () => {
		setAddingScreening(true);
	};

	// If adding a screening, show the AddScreening component
	if (addingScreening) {
		return <AddScreening onBack={handleBackToScreenings} />;
	}

	// If editing, show EditScreening
	if (editScreening) {
		// You need to fetch all movies and theaters here, or pass them from parent
		// For demo, use empty arrays:
		return (
			<EditScreening
				onBack={() => setEditScreening(null)}
				screening={{
					...editScreening,
					movieId: (editScreening as any).movieId ?? 0,
					theaterId: (editScreening as any).theaterId ?? 0,
					screeningDate: editScreening.date,
					screeningTime: editScreening.time,
					regularSeatPrice: editScreening.regularSeatPrice,
					premiumSeatPrice: editScreening.premiumSeatPrice,
					vipSeatPrice: editScreening.vipSeatPrice,
				}}
			/>
		);
	}

	if (loading) {
		// Subtle skeleton loader
		return (
			<div className="flex flex-col gap-6 w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
				<div className="flex flex-row items-center justify-between">
					<div className="flex flex-col gap-2">
						<div className="h-8 w-64 bg-gray-900 rounded mb-1 animate-pulse" />
						<div className="h-4 w-80 bg-gray-900 rounded animate-pulse" />
					</div>
					<div className="h-10 w-40 bg-gray-900 rounded animate-pulse" />
				</div>
				<div className="flex flex-row items-center gap-4 mt-4">
					<div className="h-8 w-32 bg-gray-900 rounded animate-pulse" />
					<div className="h-8 w-32 bg-gray-900 rounded animate-pulse" />
				</div>
				<div className="flex w-full justify-between items-center mt-4">
					<div className="h-6 w-48 bg-gray-900 rounded animate-pulse" />
					<div className="h-10 w-80 bg-gray-900 rounded-full animate-pulse" />
				</div>
				<div className="grid gap-6 mt-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg animate-pulse"
						>
							<div className="h-6 w-32 bg-gray-800 rounded mb-2" />
							<div className="h-4 w-24 bg-gray-800 rounded mb-1" />
							<div className="h-4 w-40 bg-gray-800 rounded mb-1" />
							<div className="h-4 w-20 bg-gray-800 rounded" />
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
			{/* Header */}
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold tracking-tight text-white">Screenings</h2>
					<p className="text-gray-400">Manage movie screenings and showtimes.</p>
				</div>
				<button
					onClick={handleAddScreening}
					className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
				>
					<PlusCircle className="w-4 h-4 text-blue-200" />
					Add Screening
				</button>
			</div>

			{/* Tabs and Search/Filters Row */}
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
				{/* Tabs */}
				<div className="flex flex-row items-center gap-4">
					<button
						className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "today" ? "border-blue-600 font-bold" : "border-transparent"
							}`}
						onClick={() => setActiveTab("today")}
					>
						Today's Screenings
					</button>
					<button
						className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "all" ? "border-blue-600 font-bold" : "border-transparent"
							}`}
						onClick={() => setActiveTab("all")}
					>
						All Screenings
					</button>
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
					<div className="relative flex-1 sm:flex-none sm:w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Search screenings..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full rounded-full border border-gray-800 bg-gray-900 px-10 py-2 text-white"
						/>
					</div>
					{/*
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={selectedTheater}
                            onChange={(e) => setSelectedTheater(e.target.value)}
                            className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-white text-sm"
                        >
                            <option value="all">All Theaters</option>
                            {theaters.map((theater) => (
                                <option key={theater} value={theater}>
                                    {theater}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-white text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    */}
				</div>
			</div>

			{/* Results count */}
			<div className="text-sm text-gray-400">
				{Object.keys(screeningsByMovie).length} movie
				{Object.keys(screeningsByMovie).length !== 1 ? "s" : ""} with {filteredScreenings.length} screening
				{filteredScreenings.length !== 1 ? "s" : ""} found
			</div>

			{/* Movies with their Screenings */}
			<div className="space-y-6">
				{Object.keys(screeningsByMovie).length > 0 ? (
					Object.values(screeningsByMovie).map((movieData) => (
						<MovieScreeningCard
							key={movieData.movieTitle}
							movieTitle={movieData.movieTitle}
							movieImage={movieData.movieImage}
							screenings={movieData.screenings}
							onEditScreening={setEditScreening} // <-- pass handler
						/>
					))
				) : (
					<div className="text-center py-8">
						<p className="text-gray-400">No screenings found matching your criteria.</p>
					</div>
				)}
			</div>
		</div>
	);
}
