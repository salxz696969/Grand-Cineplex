import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { fetchNowShowingMovies, fetchUpcomingMovies } from "../../../api/customer";
import { Movie } from "../../../../../shared/types/type";
import { differenceInCalendarDays } from "date-fns";

interface MovieContainerProps {
  searchTerm: string;
  activeTab: "now" | "upcoming";
  selectedMonth: number | null;
  selectedYear: number | null;
  selectedNowShowingDay: Date;
}

const month = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function toLocalDateString(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

const MovieContainer: React.FC<MovieContainerProps> = ({
  searchTerm,
  activeTab,
  selectedMonth,
  selectedYear,
  selectedNowShowingDay,
}) => {

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

        if (activeTab === "now" && selectedNowShowingDay) {
          const dateStr = toLocalDateString(selectedNowShowingDay);
          movies = await fetchNowShowingMovies(dateStr);
        } else if (activeTab === "upcoming" && selectedMonth != null && selectedYear != null) {
          movies = await fetchUpcomingMovies(selectedMonth, selectedYear);

          movies = movies.filter((movie) => {
            if (!movie.releaseDate) return false;
            const release = new Date(movie.releaseDate);
            return (
              release.getMonth() + 1 === selectedMonth &&
              release.getFullYear() === selectedYear
            );
          });
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
  }, [activeTab, selectedMonth, selectedYear, selectedNowShowingDay]);

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

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-6 border border-gray-400 rounded-lg bg-gradient-to-br from-gray-900 via-black to-gray-900 text-red-500 text-center">
        <svg className="w-14 h-14 mb-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
        <p className="text-red-500">{isError}</p>
      </div>
    );
  }


  if (activeTab === "upcoming" && movieList.length === 0 && !isSearching && !isLoading) {

    const monthName = selectedMonth ? month[selectedMonth - 1] : "";
    return (
      <div className="flex flex-col items-center justify-center min-h-[230px] p-6 border border-gray-400 rounded-lg bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300 text-center">
        <svg className="w-25 h-20  mb-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L15 12 9.75 7v10z"></path>
        </svg>
        <h3 className="text-xl font-semibold mb-2">No Upcoming Movies Yet</h3>
        <p className="text-gray-400"> There are currently no upcoming movies scheduled for{" "}
          <strong>{monthName} {selectedYear}</strong>. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <>
      {showNoResults ? (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-6 border border-gray-400 rounded-lg bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-300 text-center">
          <svg className="w-16 h-16 mb-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L15 12 9.75 7v10z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">No Movies Found</h3>
          <p className="text-gray-400">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="grid gap-5 custom-cols">
          {movieList.map((movie) => {
            const today = new Date();
            const dayOffset = selectedNowShowingDay ? differenceInCalendarDays(selectedNowShowingDay, today) : 0;

            return (
              <MovieCard key={movie.id} id={movie.id} title={movie.title}
                release_date={movie.releaseDate || ""} duration={movie.duration.toString()}
                image={movie.posterUrl || ""} dayOffset={dayOffset}
                isUpcoming={activeTab === "upcoming"}
              />
            );
          })}
        </div>
      )}
    </>
  );

};

export default MovieContainer;
