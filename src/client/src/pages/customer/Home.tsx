import React, { useState, useEffect } from "react";
import Header from "../../components/customer/homecomponents/Header";
import ScheduleHeader from "../../components/customer/homecomponents/ScheduleShow";
import MovieContainer from "../../components/customer/movie/MovieContainer";
import Footer from "../../components/customer/Footer";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import Featured from "../../components/customer/homecomponents/Featured";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedNowShowingDay, setSelectedNowShowingDay] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    if (activeTab === "upcoming") {
      setSelectedMonth(now.getMonth() + 1);
      setSelectedYear(now.getFullYear());
    } else {
      setSelectedMonth(null);
      setSelectedYear(null);
      setSelectedNowShowingDay(now); // <-- important: reset the date when switching back
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
        <Featured/>
        <ScheduleHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onUpcomingMonthChange={(month, year) => {
            setSelectedMonth(month);
            setSelectedYear(year);
          }}
          onNowShowingDayChange={(date) => setSelectedNowShowingDay(date)}
        />
        <MovieContainer
          searchTerm={searchTerm}
          activeTab={activeTab}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          selectedNowShowingDay={selectedNowShowingDay}
        />
      </div>
      <Footer />
    </div>
  );
}
