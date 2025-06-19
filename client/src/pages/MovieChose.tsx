import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { currentShow, upcomingShowJune } from "../components/FakeData";
import Header from "../components/homecomponents/Header";
import Footer from "../components/Footer";

import MovieHeader from "../components/movie/MovieHeader";
import Tabs from "../components/movie/Tab";
import ShowtimeTab from "../components/homecomponents/ShowtimeTab";
import DetailTab from "../components/movie/DetailTab";

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

type CalendarDay = {
  number: number;
  day: string;
  month: string;
};

export default function MovieChosen() {
  const { id } = useParams<{ id: string }>();

  const movie: Movie | undefined =
    currentShow.find((m) => m.id === Number(id)) ||
    upcomingShowJune.find((m) => m.id === Number(id));

  const [activeTab, setActiveTab] = useState<"showtime" | "detail">("showtime");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 second delay

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

  const getNext6Days = (): CalendarDay[] => {
    const result: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      result.push({
        number: date.getDate(),
        day: i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" }),
        month: date.toLocaleDateString("en-US", { month: "short" }),
      });
    }

    return result;
  };

  const days = getNext6Days();

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />

      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px] py-6">
        <MovieHeader movie={movie} />

        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-4">
          {activeTab === "showtime" && (
            <ShowtimeTab days={days} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
          )}
          {activeTab === "detail" && <DetailTab overview={movie.description} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}


// Do The Theater component here with the time show
