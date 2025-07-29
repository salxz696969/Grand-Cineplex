import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import MovieSelectedCard from "../../components/customer/movie/MovieSelectedCard";
import TheatreContainer from "../../components/customer/theatres/TheatreContainer";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { Movie, Screening, Theater } from "../../../../shared/types/type";
import { fetchMovieById, fetchTheaters } from "../../api/customer";
import { ArrowLeft } from "lucide-react";

// Skeleton for MovieSelectedCard
const MovieCardSkeleton = () => (
  <div className="w-full h-full overflow-hidden">
    <div className="bg-gray-950 flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-800 lg:border-b-0 lg:border-gray-800 lg:pr-4 pb-4 pt-4 lg:pb-0 animate-pulse">
      <div className="relative">
        <div className="lg:w-72 w-[150px] h-[210px] lg:h-96 bg-gray-900 rounded-md" />
      </div>
      <div className="flex-1 lg:flex-none w-full bg-gray-950 flex flex-col gap-4">
        <div className="hidden lg:flex flex-col gap-2 text-white">
          <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-800 rounded mb-1" />
          <div className="h-4 w-24 bg-gray-800 rounded mb-1" />
          <div className="h-4 w-20 bg-gray-800 rounded mb-1" />
          <div className="h-4 w-16 bg-gray-800 rounded mb-1" />
          <div className="h-4 w-28 bg-gray-800 rounded mb-1" />
        </div>
        <div className="flex lg:hidden flex-col gap-4 text-white">
          <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
          <div className="h-4 w-48 bg-gray-800 rounded mb-1" />
          <div className="flex flex-wrap flex-row gap-2">
            <div className="h-4 w-16 bg-gray-800 rounded mb-1" />
            <div className="h-4 w-12 bg-gray-800 rounded mb-1" />
            <div className="h-4 w-14 bg-gray-800 rounded mb-1" />
            <div className="h-4 w-20 bg-gray-800 rounded mb-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for TheatreContainer
const TheatreSkeleton = () => (
  <div className="flex flex-col gap-4 w-full bg-gray-950 lg:border-l border-gray-800 pl-4 py-4 animate-pulse">
    <div className="flex flex-row justify-start items-center gap-2 mb-4">
      <div className="w-5 h-5 bg-blue-900 rounded-full" />
      <div className="h-6 w-32 bg-gray-800 rounded" />
    </div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex flex-col gap-2 p-4 bg-gray-900/50 rounded-lg border border-gray-800 w-full">
        <div className="h-5 w-1/2 bg-gray-800 rounded mb-2" />
        <div className="flex flex-row gap-2">
          {[...Array(3)].map((_, j) => (
            <div key={j} className="h-8 w-16 bg-gray-800 rounded" />
          ))}
        </div>
      </div>
    ))}
  </div>
);


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

function joinScreeningsWithTheaters(screenings: Screening[], theaters: Theater[]): (Screening & { theaterName: string })[] {
  const theaterMap = theaters.reduce<Record<number, string>>((acc, t) => {
    acc[t.id] = t.name;
    return acc;
  }, {});

  return screenings.map((s) => ({
    ...s,
    theaterName: theaterMap[s.theaterId] || "Unknown Theater",
  }));
}

export default function MovieSelectedContainer() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const dayParam = query.get("day");
  const dayOffset = dayParam ? parseInt(dayParam, 10) : 0;
  const isUpcomingParam = query.get("isUpcoming");
  const isUpcoming = isUpcomingParam === "true" ? true : false;

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

  if (loading) return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-start items-center flex-col">
      <Header />
      <div className="max-w-7xl w-full px-4 ">
        <div className="relative flex flex-row justify-center items-start gap-4">
          <div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col">
            <div className="w-full lg:w-80 lg:top-22 lg:left-0 lg:h-full flex-shrink-0 z-10">
              <MovieCardSkeleton />
            </div>
            <div className="flex-1">
              <TheatreSkeleton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  if (error) return <p className="text-white p-4">Error: {error}</p>;
  if (!movie) return <p className="text-white p-4">Movie not found</p>;

  const enrichedScreenings = joinScreeningsWithTheaters(movie.screenings, theaters);

  const hasCurrentScreenings = enrichedScreenings.some((screening) =>
    isScreeningWithin6Days(screening.screeningDate || screening.createdAt || "")
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white flex justify-start items-center flex-col">
      <Header />
      <div className="max-w-7xl w-full px-4">

        {hasCurrentScreenings ? (
          <div className="relative   flex flex-row justify-center items-start gap-4">
            <div className="wrapper min-h-[calc(100vh-300px)] relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col">
              <div className="w-full lg:w-80 lg:top-22 lg:left-0 lg:h-full flex-shrink-0 z-10">
                <MovieSelectedCard movie={movie} isUpcoming={isUpcoming} />
              </div>
              <div className="flex-1">
                <TheatreContainer movieId={movie.id} screenings={enrichedScreenings} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[400px]">
            <button className="flex gap-2 py-2 mb-12 text-white" onClick={() => navigate("/")}>
              <ArrowLeft size={20} />
              Back to movies
            </button>
            <div className=" w-full rounded-2xl shadow-lg">
              <MovieSelectedCard movie={movie} isUpcoming={isUpcoming} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
