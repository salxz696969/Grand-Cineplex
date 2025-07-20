import React, { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import { PlusCircle, Search } from "lucide-react";
import AddMovie from "./AddMovie";
import { getAllMovies, getRecentlyAddedMovies } from "../../api/manager";

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

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await getRecentlyAddedMovies()
                setMovies(response);
                const allResponse = await getAllMovies(); // Assuming this fetches all movies
                setAllMovies(allResponse);
            } catch (error) {
                console.error("Error fetching movies:", error);
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

    return (
        <div className="flex flex-col gap-4 p-4 w-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Movies</h2>
                    <p className="text-slate-400">Manage your movie library.</p>
                </div>
                <button
                    onClick={handleAddMovie}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Movie
                </button>
            </div>
            <div className="flex flex-row items-center justify-between  mt-4 gap-4">
                <div className="flex flex-row items-center justify-start gap-4">
                    <button className={`text-white  py-2 px-1  flex items-center  border-b ${activeTab === "recent" ? "border-sky-600 font-bold" : "border-transparent"}`} onClick={() => setActiveTab("recent")}>
                        Recent Movies
                    </button>
                    <button className={`text-white  py-2 px-1  flex items-center  border-b ${activeTab === "all" ? "border-sky-600 font-bold" : "border-transparent"}`} onClick={() => setActiveTab("all")}>
                        All Movies
                    </button>
                </div>
                <input type="text" placeholder="Search movies" className="w-full max-w-md  rounded-full border border-slate-700 bg-slate-800 px-5 py-2 text-white " />
            </div>
            <div className="grid w-full gap-5 custom-cols mt-4 ">
                {activeTab === "recent" ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    allMovies.length > 0 ? (
                        allMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-slate-400">
                            No movies available.
                        </div>
                    )
                )}
            </div>
        </div>
    );
} 