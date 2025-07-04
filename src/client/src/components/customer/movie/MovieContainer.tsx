import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { fetchNowShowingMovies, fetchUpcomingMovies } from "../../../api/customer";
import { Movie } from "../../../../../shared/types/type";

interface MovieContainerProps {
  searchTerm: string;
  activeTab: "now" | "upcoming";
  selectedMonth: number | null;
  selectedYear: number | null;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MovieContainer: React.FC<MovieContainerProps> = ({ searchTerm, activeTab, selectedMonth, selectedYear }) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noResultTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(null);

        let movies: Movie[] = [];

        if (activeTab === "now") {
          movies = await fetchNowShowingMovies();
        } else if (selectedMonth && selectedYear) {
          movies = await fetchUpcomingMovies(selectedMonth, selectedYear);
        }

        await new Promise((resolve) => setTimeout(resolve, 300));

        setAllMovies(movies);
        setMovieList(movies);
      } catch (error: any) {
        setIsError(error.message || "Failed to load movies");
        setAllMovies([]);
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [activeTab, selectedMonth, selectedYear]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (noResultTimeout.current) clearTimeout(noResultTimeout.current);

    setShowNoResults(false);

    const trimmedTerm = searchTerm.trim().toLowerCase();

    if (trimmedTerm === "") {
      setIsSearching(false);
      setMovieList(allMovies);
      return;
    }

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(trimmedTerm)
    );

    if (filtered.length > 0) {
      setIsSearching(false);
      setMovieList(filtered);
    } else {
      setIsSearching(true);
      setMovieList([]);

      noResultTimeout.current = setTimeout(() => {
        setIsSearching(false);
        setShowNoResults(true);
      }, 2000);
    }
  }, [searchTerm, allMovies]);

  if (isLoading || isSearching) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">
            {isSearching ? "Searching movies..." : "Loading movies..."}
          </p>
        </div>
      </div>
    );
  }

  if (isError) return <p className="text-red-500 flex items-center justify-center">Error: {isError}</p>;

  // Custom no upcoming movies message
  if (
    activeTab === "upcoming" &&
    movieList.length === 0 &&
    !isSearching &&
    !isLoading
  ) {
    const monthName = selectedMonth ? monthNames[selectedMonth - 1] : "";
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 text-center">
        <svg
          className="w-25 h-20  mb-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L15 12 9.75 7v10z"
          ></path>
        </svg>
        <h3 className="text-xl font-semibold mb-2">No Upcoming Movies Yet</h3>
        <p className="text-gray-400">
          There are currently no upcoming movies scheduled for{" "}
          <strong>{monthName} {selectedYear}</strong>. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 custom-cols">
      {showNoResults ? (
        <p className="text-white text-lg">No movies found.</p>
      ) : (
        movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date || ""}
            duration={movie.duration.toString()}
            image={movie.poster_url || ""}
          />
        ))
      )}
    </div>
  );
};

export default MovieContainer;

