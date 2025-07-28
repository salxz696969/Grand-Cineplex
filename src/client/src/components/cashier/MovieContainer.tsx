import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import { currentShow, upcomingShowJune } from "../../utils/FakeData";

export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  duration: string;
  posterUrl: string;
  genre: string;
  overview: string;
  rating: number;
  director: string;
  cast: string;
  language: string;
  trailerUrl?: string; // Optional field for trailer URL
  description?: string; // Optional field for movie description
}

interface MovieContainerProps {
  searchTerm: string;
  activeTab: "now" | "upcoming";
  movies: any;
  selectedDate?: string;
}

// Skeleton component for loading state
const SkeletonCard = () => (
  <div className="flex flex-col gap-3 p-4 bg-gray-950/50 rounded-lg animate-pulse shadow">
    <div className="h-48 w-full bg-gray-900/50 rounded mb-2" />
    <div className="h-6 w-3/4 bg-gray-900/50 rounded" />
    <div className="h-4 w-1/2 bg-gray-900/50 rounded" />
    <div className="h-4 w-1/3 bg-gray-900/50 rounded" />
  </div>
);

export default function MovieContainer({ searchTerm, activeTab, movies, selectedDate }: MovieContainerProps) {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const [isSearching, setIsSearching] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);

  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const noResultTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // useEffect(() => {
  //   const loadMovies = async () => {
  //     try {
  //       setIsLoading(true);
  //       setIsError(null);

  //       // Load movies based on activeTab
  //       if (activeTab === "now") {
  //         setAllMovies(
  //           currentShow.map((movie) => ({
  //             id: movie.id,
  //             title: movie.title,
  //             releaseDate: movie.release_date,
  //             duration: movie.duration,
  //             image: movie.poster_url,
  //             genre: movie.genre,
  //             overview: movie.description,
  //             rating: movie.rating,
  //             director: "", // Add director if available in data
  //             cast: "",     // Add cast if available in data
  //             language: movie.language,
  //           }))
  //         );
  //         setMovieList(
  //           currentShow.map((movie) => ({
  //             id: movie.id,
  //             title: movie.title,
  //             releaseDate: movie.release_date,
  //             duration: movie.duration,
  //             image: movie.poster_url,
  //             genre: movie.genre,
  //             overview: movie.description,
  //             rating: movie.rating,
  //             director: "",
  //             cast: "",
  //             language: movie.language,
  //           }))
  //         );
  //       } else {
  //         setAllMovies(
  //           upcomingShowJune.map((movie) => ({
  //             id: movie.id,
  //             title: movie.title,
  //             releaseDate: movie.release_date,
  //             duration: movie.duration,
  //             image: movie.poster_url,
  //             genre: movie.genre,
  //             overview: movie.description,
  //             rating: movie.rating,
  //             director: "",
  //             cast: "",
  //             language: movie.language,
  //           }))
  //         );
  //         setMovieList(
  //           upcomingShowJune.map((movie) => ({
  //             id: movie.id,
  //             title: movie.title,
  //             releaseDate: movie.release_date,
  //             duration: movie.duration,
  //             image: movie.poster_url,
  //             genre: movie.genre,
  //             overview: movie.description,
  //             rating: movie.rating,
  //             director: "",
  //             cast: "",
  //             language: movie.language,
  //           }))
  //         );
  //       }
  //     } catch (error: any) {
  //       setIsError(error.message || "Failed to load movies");
  //       setAllMovies([]);
  //       setMovieList([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadMovies();
  // }, [activeTab]);

  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (noResultTimeout.current) clearTimeout(noResultTimeout.current);

    setShowNoResults(false);

    const trimmedTerm = searchTerm.trim().toLowerCase();

    if (trimmedTerm === "") {
      setIsSearching(false);
      setMovieList(movies);
      return;
    }

    const filtered = movies.filter((movie: any) =>
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
      }, 1200);
    }
  }, [searchTerm, movies]);

  // Subtle skeleton while loading
  if (isLoading) {
    return (
      <div className="grid w-full gap-5 custom-cols mt-4 px-4">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Better error UI
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-3xl text-red-500 mb-2">⚠️</div>
        <p className="text-red-400 font-semibold text-lg mb-1">Something went wrong</p>
        <p className="text-slate-400">{isError}</p>
      </div>
    );
  }

  // Better searching UI
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-pulse">
        <div className="h-8 w-8 rounded-full bg-sky-700 mb-4 animate-bounce" />
        <p className="text-sky-400 font-semibold text-lg">Searching movies...</p>
      </div>
    );
  }

  return (
    <div className="grid w-full gap-5 custom-cols mt-4 px-4">
      {showNoResults ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-3xl text-slate-500 mb-2">😕</div>
          <p className="text-slate-400 font-semibold text-lg">No movies found.</p>
        </div>
      ) : (
        movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            duration={movie.duration}
            posterUrl={movie.posterUrl}
            screeningDate={selectedDate || ""}
          />
        ))
      )}
    </div>
  );
}
