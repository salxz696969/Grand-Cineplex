import React, { useState } from "react";
import { PlusCircle, Search, Calendar, Clock, MapPin, Users, Filter, Film } from "lucide-react";
import MovieScreeningCard from "./MovieScreeningCard";


export interface Screening {
    id: number;
    movieTitle: string;
    movieImage: string;
    theater: string;
    date: string;
    time: string;
    duration: string;
    availableSeats: number;
    totalSeats: number;
    price: number;
    status: "upcoming" | "ongoing" | "completed";
}

const dummyScreenings: Screening[] = [
    {
        id: 1,
        movieTitle: "The Great Adventure",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+1",
        theater: "Theater A",
        date: "2025-06-21",
        time: "14:30",
        duration: "145 min",
        availableSeats: 45,
        totalSeats: 120,
        price: 12.50,
        status: "upcoming"
    },
    {
        id: 2,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "16:00",
        duration: "120 min",
        availableSeats: 12,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 3,
        movieTitle: "Comedy Night",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+3",
        theater: "Theater C",
        date: "2025-06-21",
        time: "19:30",
        duration: "95 min",
        availableSeats: 0,
        totalSeats: 100,
        price: 8.50,
        status: "ongoing"
    },
    {
        id: 4,
        movieTitle: "The Great Adventure",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+1",
        theater: "Theater A",
        date: "2025-06-21",
        time: "20:00",
        duration: "145 min",
        availableSeats: 78,
        totalSeats: 120,
        price: 12.50,
        status: "upcoming"
    },
    {
        id: 5,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "15:00",
        duration: "120 min",
        availableSeats: 45,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 5,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "15:00",
        duration: "120 min",
        availableSeats: 45,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 5,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "15:00",
        duration: "120 min",
        availableSeats: 45,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 5,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "15:00",
        duration: "120 min",
        availableSeats: 45,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 5,
        movieTitle: "Mystery of the Abyss",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+2",
        theater: "Theater B",
        date: "2025-06-21",
        time: "15:00",
        duration: "120 min",
        availableSeats: 45,
        totalSeats: 80,
        price: 10.00,
        status: "upcoming"
    },
    {
        id: 6,
        movieTitle: "The Great Adventure",
        movieImage: "https://via.placeholder.com/300x450?text=Movie+1",
        theater: "Theater C",
        date: "2025-06-21",
        time: "22:00",
        duration: "145 min",
        availableSeats: 95,
        totalSeats: 120,
        price: 12.50,
        status: "upcoming"
    }
];



export default function Screenings() {
    const [screenings, setScreenings] = useState<Screening[]>(dummyScreenings);
    const [activeTab, setActiveTab] = useState<string>("today");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTheater, setSelectedTheater] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    // Use today's date for filtering
    const today = new Date().toISOString().split('T')[0];

    const filteredScreenings = screenings.filter(screening => {
        const matchesTab = activeTab === "today" ? screening.date === today : true;
        const matchesSearch = screening.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            screening.theater.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTheater = selectedTheater === "all" || screening.theater === selectedTheater;
        const matchesStatus = selectedStatus === "all" || screening.status === selectedStatus;

        return matchesTab && matchesSearch && matchesTheater && matchesStatus;
    });

    const theaters = Array.from(new Set(screenings.map(s => s.theater)));

    // Group screenings by movie
    const screeningsByMovie = filteredScreenings.reduce((acc, screening) => {
        if (!acc[screening.movieTitle]) {
            acc[screening.movieTitle] = {
                movieTitle: screening.movieTitle,
                movieImage: screening.movieImage,
                screenings: []
            };
        }
        acc[screening.movieTitle].screenings.push(screening);
        return acc;
    }, {} as Record<string, { movieTitle: string; movieImage: string; screenings: Screening[] }>);

    return (
        <div className="flex flex-col gap-6 p-4 w-full">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Screenings</h2>
                    <p className="text-slate-400">Manage movie screenings and showtimes.</p>
                </div>
                <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform hover:scale-105">
                    <PlusCircle className="w-4 h-4" />
                    Add Screening
                </button>
            </div>

            {/* Tabs and Search/Filters Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex flex-row items-center gap-4">
                    <button
                        className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "today" ? "border-sky-600 font-bold" : "border-transparent"}`}
                        onClick={() => setActiveTab("today")}
                    >
                        Today's Screenings
                    </button>
                    <button
                        className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "all" ? "border-sky-600 font-bold" : "border-transparent"}`}
                        onClick={() => setActiveTab("all")}
                    >
                        All Screenings
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 sm:flex-none sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search screenings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-full border border-slate-700 bg-slate-800 px-10 py-2 text-white"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                            value={selectedTheater}
                            onChange={(e) => setSelectedTheater(e.target.value)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
                        >
                            <option value="all">All Theaters</option>
                            {theaters.map(theater => (
                                <option key={theater} value={theater}>{theater}</option>
                            ))}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-400">
                {Object.keys(screeningsByMovie).length} movie{Object.keys(screeningsByMovie).length !== 1 ? 's' : ''} with {filteredScreenings.length} screening{filteredScreenings.length !== 1 ? 's' : ''} found
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
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <p className="text-slate-400">No screenings found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}