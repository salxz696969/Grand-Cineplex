import React, { useState, useEffect, useRef } from "react";
import MovieCard from "../components/MovieCard";
import { currentShow } from "./FakeData";

export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  duration: string;
  image: string;
  genre: string;
  overview: string;
  rating: number;
  director: string;
  cast: string;
  language: string;
}

interface MovieContainerProps {
  searchTerm: string;
}

const MovieContainer: React.FC<MovieContainerProps> = ({ searchTerm }) => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setAllMovies(currentShow);
        setMovieList(currentShow);
      } catch (error: any) {
        setIsError(error.message || "Failed to load movies");
        setAllMovies([]);
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    // Clear timers before running new search
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (noResultTimeout.current) clearTimeout(noResultTimeout.current);

    setShowNoResults(false);

    const trimmedTerm = searchTerm.trim().toLowerCase();

    if (trimmedTerm === "") {
      setIsSearching(false);
      setMovieList(allMovies);
      return;
    }

    // Check if matches exist immediately
    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(trimmedTerm)
    );

    if (filtered.length > 0) {
      setIsSearching(false);
      setMovieList(filtered);
    } else {
      // No matches found: show loading first
      setIsSearching(true);
      setMovieList([]);

      noResultTimeout.current = setTimeout(() => {
        setIsSearching(false);
        setShowNoResults(true);
      }, 3000);
    }
  }, [searchTerm, allMovies]);

  if (isLoading) return <p className="text-white">Loading movies...</p>;
  if (isError) return <p className="text-red-500">Error: {isError}</p>;
  if (isSearching) return <p className="text-white">Searching movies...</p>;

  return (
    <div className="grid gap-5 custom-cols">
      {showNoResults ? (
        <p className="text-white">No movies found.</p>
      ) : (
        movieList.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.releaseDate}
            duration={movie.duration}
            image={movie.image}
          />
        ))
      )}
    </div>
  );
};

export default MovieContainer;
