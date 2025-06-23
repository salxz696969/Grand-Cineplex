import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';

const movies = [1, 2, 3, 4, 5, 6]; // placeholder
// bg-[#242424]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="p-4">
        <SearchBar searchTerm={""} setSearchTerm={() => { }} />
        <h2 className="text-lg font-semibold mt-6 mb-4">Showing Today</h2>
        <div className="grid grid-cols-2 gap-4">
          {movies.map((m, i) => <MovieCard key={i} id={m} title={""} releaseDate={""} duration={""} image={""} genre={""} overview={""} rating={0} director={""} cast={""} language={""} />)}
        </div>
      </div>
    </div>
  );
} 