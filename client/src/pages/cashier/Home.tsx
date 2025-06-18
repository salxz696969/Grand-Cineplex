import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const movies = [1,2,3,4,5,6]; // placeholder
// bg-[#242424]

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");

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
