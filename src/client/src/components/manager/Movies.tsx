import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import { PlusCircle, Search } from "lucide-react";
import AddMovie from "./AddMovie";
import { getAllMovies, getRecentlyAddedMovies } from "../../api/manager";
import EditMovie from "./EditMovie";

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

export default function Movies() {
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [allMovies, setAllMovies] = useState<MovieData[]>([]);
    const [activeTab, setActiveTab] = useState<string>("recent");
    const [addingMovie, setAddingMovie] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editMovie, setEditMovie] = useState<MovieData | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getRecentlyAddedMovies()
                setMovies(response);
                const allResponse = await getAllMovies(); // Assuming this fetches all movies
                setAllMovies(allResponse);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, [])

    const handleBackToMovies = () => {
        setAddingMovie(false);
    };

    const handleAddMovie = () => {
        setAddingMovie(true);
    };

    // If adding a movie, show the AddMovie component
    if (addingMovie) {
        return (
            <AddMovie onBack={handleBackToMovies} />
        );
    }

    if (loading) {
        // Subtle skeleton loader (like Dashboard)
        return (
            <div className="flex flex-col gap-4 w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="h-8 w-48 bg-gray-900 rounded mb-1 animate-pulse" />
                        <div className="h-4 w-64 bg-gray-900 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-32 bg-gray-900 rounded animate-pulse" />
                </div>
                <div className="flex flex-row items-center justify-between mt-4 gap-4">
                    <div className="flex flex-row items-center gap-4">
                        <div className="h-8 w-28 bg-gray-900 rounded animate-pulse" />
                        <div className="h-8 w-28 bg-gray-900 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-80 bg-gray-900 rounded-full animate-pulse" />
                </div>
                <div className="grid w-full gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="overflow-hidden shadow-lg flex flex-col bg-gray-950 border border-gray-800 rounded-xl">
                            <div className="aspect-[9/14] w-full bg-gray-900 animate-pulse rounded-t-xl" />
                            <div className="pt-3 px-3 pb-2 flex flex-col gap-2 flex-1">
                                <div className="h-5 w-32 bg-gray-900 rounded mb-1 animate-pulse" />
                                <div className="h-3 w-20 bg-gray-900 rounded mb-1 animate-pulse" />
                                <div className="h-3 w-16 bg-gray-900 rounded animate-pulse" />
                            </div>
                            <div className="flex gap-2 mt-1 items-end px-3 pb-3">
                                <div className="h-10 w-[80%] bg-gray-900 rounded animate-pulse" />
                                <div className="h-10 w-8 bg-gray-900 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (editMovie) {
        return (
            <EditMovie onBack={() => setEditMovie(null)} movie={editMovie} />
        )
    }

    return (
        <div className="flex flex-col gap-4  w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Movies</h2>
                    <p className="text-slate-400">Manage your movie library.</p>
                </div>
                <button
                    onClick={handleAddMovie}
                    className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 "
                >
                    <PlusCircle className="w-4 h-4 text-blue-200" />
                    Add Movie
                </button>
            </div>
            <div className="flex flex-row items-center justify-between  mt-4 gap-4">
                <div className="flex flex-row items-center justify-start gap-4">
                    <button className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "recent" ? "border-blue-600 font-bold" : "border-transparent"}`} onClick={() => setActiveTab("recent")}>
                        Recent Movies
                    </button>
                    <button className={`text-white py-2 px-1 flex items-center border-b ${activeTab === "all" ? "border-blue-600 font-bold" : "border-transparent"}`} onClick={() => setActiveTab("all")}>
                        All Movies
                    </button>
                </div>
                <input type="text" placeholder="Search movies" className="w-full max-w-md rounded-full border border-gray-800 bg-gray-900 px-5 py-2 text-white " />
            </div>
            <div className="grid w-full gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                {activeTab === "recent"
                    ? movies.map((movie) => <MovieCard key={movie.id} movie={movie} onEdit={() => setEditMovie(movie)} />)
                    : allMovies.length > 0
                        ? allMovies.map((movie) => <MovieCard key={movie.id} movie={movie} onEdit={() => setEditMovie(movie)} />)
                        : <div className="col-span-full text-center text-slate-400">No movies available.</div>
                }
            </div>

        </div>
    );
} 