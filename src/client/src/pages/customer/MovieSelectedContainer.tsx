import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../../components/customer/homecomponents/Header";
import Footer from "../../components/customer/Footer";
import MovieSelectedCard from "../../components/customer/movie/MovieSelectedCard";
import TheatreContainer from "../../components/customer/theatres/TheatreContainer";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { Movie, Screening, Theater } from "../../../../shared/types/type";
import { fetchMovieById, fetchTheaters } from "../../api/customer";

type MovieWithScreenings = Movie & {
  screenings: Screening[];
};

function isScreeningWithin6Days(screeningDateStr: string): boolean {
  const screeningDate = new Date(screeningDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = screeningDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 5;
}

function joinScreeningsWithTheaters(
  screenings: Screening[],
  theaters: Theater[]
): (Screening & { theaterName: string })[] {
  const theaterMap = theaters.reduce<Record<number, string>>((acc, t) => {
    acc[t.id] = t.name;
    return acc;
  }, {});

  return screenings.map((s) => ({
    ...s,
    theaterName: theaterMap[s.theater_id] || "Unknown Theater",
  }));
}

export default function MovieSelectedContainer() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const dayParam = query.get("day");
  const dayOffset = dayParam ? parseInt(dayParam, 10) : 0;

  const [movie, setMovie] = useState<MovieWithScreenings | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieData, theatersData] = await Promise.all([
          fetchMovieById(Number(id), dayOffset),
          fetchTheaters(),
        ]);

        setMovie(movieData);
        setTheaters(theatersData);
        setTimeout(() => setLoading(false), 500);
      } catch (err: any) {
        setError(err.message || "Failed to load movie or theaters");
        setLoading(false);
      }
    };

    loadData();
  }, [id, dayOffset]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-white p-4">Error: {error}</p>;
  if (!movie) return <p className="text-white p-4">Movie not found</p>;

  const enrichedScreenings = joinScreeningsWithTheaters(movie.screenings, theaters);

  const hasCurrentScreenings = enrichedScreenings.some((screening) =>
    isScreeningWithin6Days(screening.screening_date || screening.created_at || "")
  );

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px] py-6">
        {hasCurrentScreenings ? (
          <div className="relative flex flex-row justify-center items-start gap-4">
            <div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col">
              <div className="w-full lg:w-80 lg:top-22 lg:left-0 lg:h-full flex-shrink-0 z-10">
                <MovieSelectedCard movie={movie} />
              </div>
              <div className="flex-1">
                <TheatreContainer movieId={movie.id} screenings={enrichedScreenings} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-220 rounded-2xl shadow-lg">
              <MovieSelectedCard movie={movie} isUpcoming={!hasCurrentScreenings} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
