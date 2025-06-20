import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { currentShow, upcomingShowJune } from "../components/FakeData";
import Header from "../components/homecomponents/Header";
import Footer from "../components/Footer";
import MovieSelectedCard from "../components/movie/MovieSelectedCard";
import TheatreContainer from "../components/theatres/TheatreContainer";


interface Movie {
  id: number;
  title: string;
  release_date: string;
  duration: string;
  poster_url: string;
  genre: string;
  description: string;
  rating: number;
  language: string;
  trailer_url: string;
}

export default function MovieChosen() {
  const { id } = useParams<{ id: string }>();

  const movie: Movie | undefined =
    currentShow.find((m) => m.id === Number(id)) ||
    upcomingShowJune.find((m) => m.id === Number(id));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171c20] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return <p className="text-white p-4">Movie not found</p>;
  }

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px] py-6">
        
        <div className="relative flex flex-row justify-center items-start gap-4 ">
  <div className="wrapper relative max-w-7xl w-full flex lg:flex-row gap-4 flex-col">
    
    <div className="w-full lg:w-80 lg:sticky lg:top-22 lg:left-0 lg:h-full flex-shrink-0 z-10">
      <MovieSelectedCard movie={movie} />
    </div>
    
    <div className="flex-1">
      <TheatreContainer />
    </div>
  
  </div>
</div>
   
      </div>
      <Footer />
    </div>
  );
}

