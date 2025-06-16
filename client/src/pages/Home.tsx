import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import InfoInform from "../components/Info";
import ScheduleHeader from "../components/ScheduleShow";
import MovieContainer from "../components/MovieContainer";
import Footer from "../components/Footer";
import { Data } from "../components/FakeData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter movies by title including searchTerm (case-insensitive)
  const filteredMovies = Data.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px]">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <InfoInform />
        <ScheduleHeader />
        <MovieContainer movies={filteredMovies} />
      </div>
      <Footer />
    </div>
  );
}
