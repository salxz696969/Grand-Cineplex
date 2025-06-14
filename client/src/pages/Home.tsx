import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import InfoInform from "../components/Info";
import ScheduleHeader from "../components/ScheduleShow";
import { MovieContainer } from "../components/MovieContainer";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px]">
        <SearchBar />
        <InfoInform />
        <ScheduleHeader />
        <MovieContainer />
      </div>
      <Footer/>
    </div>
  );
}
