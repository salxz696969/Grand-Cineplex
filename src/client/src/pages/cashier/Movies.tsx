import React, { use, useEffect, useState } from "react";
import Header from "../../components/cashier/Header";
import ScreeningDay from "../../components/cashier/ScreeningDay";
import SearchBar from "../../components/cashier/SearchBar";
import MovieContainer from "../../components/cashier/MovieContainer";
import axios from 'axios';

export default function Movies() {
    const [movies, setMovies]=useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies= await axios.get('http://localhost:6000/cashier/movies');
                console.log("Movies fetched:", movies.data);
                setMovies(movies.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);
    return (
        <div>
            <div className="relative">
                <Header />
            </div>
            <div className="min-h-screen content flex flex-col justify-start items-center bg-black">
                <div className="flex flex-col max-w-7xl w-full justify-center items-center">
                    <div className="flex flex-wrap-reverse p-4 w-full justify-between items-center gap-4 px-4 lg:flex-row lg:gap-20 lg:flex-nowrap">
                        <ScreeningDay days={[]} selectedIndex={0} onSelect={() => { }} />
                        <SearchBar searchTerm={""} setSearchTerm={() => { }} />
                    </div>
                    {/* <MovieContainer searchTerm={""} activeTab={"now"} movies={movies} /> */}
                </div>
            </div>
        </div>
    );
}