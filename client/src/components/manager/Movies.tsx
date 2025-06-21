import React, { useState } from "react";

import MovieCard from "./MovieCard";
import { Movie } from "../cashier/MovieContainer";
import { currentShow } from "../../utils/FakeData";
import { PlusCircle, Search } from "lucide-react";

export default function Movies() {
    const [movies, setMovies] = useState<Movie[]>(currentShow);
    const [activeTab, setActiveTab] = useState<string>("recent");
    return (
        <div className="flex flex-col gap-4 p-4 w-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Movies</h2>
                    <p className="text-slate-400">Manage your movie library.</p>
                </div>
                <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform hover:scale-105">
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
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
} 