import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { fetchMovies, Movie } from "../services/api";

interface MovieContainerProps {
  movies?: Movie[];
}

// This component can load and display movies using the `movies` prop directly,
// It just a mock test with the fake data which not connect with backend yet


export const MovieContainer: React.FC<MovieContainerProps> = ({ movies }) => {
  const [movieList, setMovieList] = useState<Movie[]>(movies || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      setMovieList(movies);
      return;
    }

    const loadMovies = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const data = await fetchMovies();
        setMovieList(data);
      } catch (error: any) {
        setIsError(error.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [movies]);

  if (isLoading) return <p className="text-white">Loading movies...</p>;
  if (isError) return <p className="text-red-500">Error: {isError}</p>;

  return (
    <div className="grid gap-5 custom-cols">
      {movieList.length === 0 && <p className="text-white">No movies found.</p>}
      {movieList.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          duration={movie.duration}
          image={movie.image}
        />
      ))}
    </div>
  );
};

export default MovieContainer;
