import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/customer/homecomponents/Header";
import Footer from "../../components/customer/Footer";
import MovieSelectedCard from "../../components/customer/movie/MovieSelectedCard";
import TheatreContainer from "../../components/customer/theatres/TheatreContainer";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { Movie } from "../../../../shared/types/type";
import { fetchMovieById } from "../../api/customer";

export default function MovieSelectedContainer() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const loadMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieById(Number(id));
        setMovie(data);
        // Keep loading spinner on screen for 3 seconds even after data loads
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err: any) {
        setError(err.message || "Failed to load movie");
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) return <p className="text-white p-4">Error: {error}</p>;

  if (!movie) return <p className="text-white p-4">Movie not found</p>;

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px] py-6">
        <div className="relative flex flex-row justify-center items-start gap-4 ">
          <div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col">
            <div className="w-full lg:w-80 lg:top-22 lg:left-0 lg:h-full flex-shrink-0 z-10">
              <MovieSelectedCard movie={movie} />
            </div>
            <div className="flex-1">
              <TheatreContainer movieId={movie.id} />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
