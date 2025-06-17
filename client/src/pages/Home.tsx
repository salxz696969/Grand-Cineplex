import React, { useState } from "react";
import Header from "../components/Header";
import InfoInform from "../components/Info";
import ScheduleHeader from "../components/ScheduleShow";
import MovieContainer from "../components/MovieContainer";
import Footer from "../components/Footer";
import { currentShow } from "../components/FakeData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px]">
        <InfoInform />
        <ScheduleHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <MovieContainer searchTerm={searchTerm} />
      </div>
      <Footer />
    </div>
  );
}
