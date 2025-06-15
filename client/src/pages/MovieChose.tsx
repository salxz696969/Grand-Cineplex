import { useParams } from "react-router-dom";
import { Data } from "../components/FakeData";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCalendarAlt, FaClock, FaFilm, FaStar, FaGlobe } from "react-icons/fa";
import React, { useState } from "react";

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  duration: string;
  image: string;
  genre: string;
  overview: string;
  rating: string;
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
  const movie: Movie | undefined = Data.find((m) => m.id === Number(id));
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
        <div className="bg-[#171717] rounded-2xl flex flex-col sm:flex-row gap-20 items-center sm:items-start px-6 py-8 sm:px-20 sm:py-14">
          {/* Left side: image */}
          <img
            src={movie.image}
            alt={movie.title}
            className="rounded-2xl w-64 h-80 sm:w-72 sm:h-96 object-cover"
          />

          {/* Right side: details */}
          <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
            <h1 className="font-bold text-4xl mb-2">{movie.title}</h1>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
              <FaFilm className="text-red-500" />
              <p className="text-gray-400 font-semibold">Genre:</p>
              <p className="text-white">{movie.genre}</p>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
              <FaCalendarAlt className="text-red-500" />
              <p className="text-gray-400">{movie.releaseDate}</p>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
              <FaClock className="text-red-500" />
              <p className="text-gray-400">Duration:</p>
              <span className="text-white">{movie.duration}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
              <FaStar className="text-yellow-400" />
              <p className="text-gray-400">Rating:</p>
              <span className="text-white">{movie.rating}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3 text-lg">
              <FaGlobe className="text-green-400" />
              <p className="text-gray-400">Language:</p>
              <span className="text-white">{movie.language}</span>
            </div>
          </div>
        </div>

        {/* Tabs: Showtime | Detail */}
        <div className="mt-8 border-b border-gray-600 flex gap-6 text-xl font-bold cursor-pointer select-none">
          <div
            className={`pb-2 ${activeTab === "showtime" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
            onClick={() => setActiveTab("showtime")}
          >
            Showtime
          </div>
          <div
            className={`pb-2 ${activeTab === "detail" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
            onClick={() => setActiveTab("detail")}
          >
            Detail
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-4">
          {activeTab === "showtime" && (
            <div className="flex flex-wrap gap-3 justify-start">
              {days.map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`cursor-pointer flex flex-col items-center rounded border-2
                    ${idx === selectedIndex ? "border-red-500" : "border-gray-700"}
                    px-2 py-2
                    w-28 sm:w-32 md:w-36 lg:w-40 xl:w-40
                    min-w-[64px]
                  `}
                >
                  <p className="font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">
                    {c.day}
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{c.number}</p>
                  <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs">{c.month}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "detail" && (
            <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {movie.overview}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
