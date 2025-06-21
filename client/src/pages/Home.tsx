import React, { useState, useEffect } from "react";
import Header from "../components/homecomponents/Header";
import InfoInform from "../components/homecomponents/InformationPic";
import ScheduleHeader from "../components/homecomponents/ScheduleShow";
import MovieContainer from "../components/movie/MovieContainer";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px]">
        <InfoInform />
        <ScheduleHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <MovieContainer searchTerm={searchTerm} activeTab={activeTab} />
      </div>
      <Footer />
    </div>
  );
}
