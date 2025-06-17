import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { currentShow } from "../components/FakeData";
import Header from "../components/Header";
import Footer from "../components/Footer";

import MovieHeader from "../components/MovieHeader";
import Tabs from "../components/Tab";
import ShowtimeTab from "../components/ShowtimeTab";
import DetailTab from "../components/DetailTab";

interface Movie {
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

type CalendarDay = {
  number: number;
  day: string;
  month: string;
};

export default function MovieChosen() {
  const { id } = useParams<{ id: string }>();
  const movie: Movie | undefined = currentShow.find((m) => m.id === Number(id));
  const [activeTab, setActiveTab] = useState<"showtime" | "detail">("showtime");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  if (!movie) return <p className="text-white p-4">Movie not found</p>;

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
            <ShowtimeTab
              days={days}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
            />
          )}
          {activeTab === "detail" && <DetailTab overview={movie.overview} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
