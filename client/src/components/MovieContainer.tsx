import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Data } from "../components/FakeData";

export const MovieContainer: React.FC = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    // future data fetching logic
  }, []);

  return (
    <div className="grid gap-5 custom-cols">
      {isLoading && <p>The Movie is Loading...</p>}
      {isError && <p className="text-red-500">Error to fetch this article</p>}
      {Data.map((movie, i) => (
        <MovieCard
          key={i}
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
