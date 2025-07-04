import React, { useState, useEffect } from "react";
import Header from "../../components/customer/homecomponents/Header";
import ScheduleHeader from "../../components/customer/homecomponents/ScheduleShow";
import MovieContainer from "../../components/customer/movie/MovieContainer";
import Footer from "../../components/customer/Footer";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import TopRatedMovies from "../../components/customer/homecomponents/TopRatedMovies";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize selectedMonth and selectedYear to current month/year when switching to upcoming tab
  useEffect(() => {
    if (activeTab === "upcoming") {
      const now = new Date();
      setSelectedMonth(now.getMonth() + 1); // JS months are 0-based
      setSelectedYear(now.getFullYear());
    } else {
      // Clear month/year when switching to "now"
      setSelectedMonth(null);
      setSelectedYear(null);
    }
  }, [activeTab]);

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
        <TopRatedMovies />
        <ScheduleHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onUpcomingMonthChange={(month, year) => {
            setSelectedMonth(month);
            setSelectedYear(year);
          }}
        />
        <MovieContainer
          searchTerm={searchTerm}
          activeTab={activeTab}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
      <Footer />
    </div>
  );
}
