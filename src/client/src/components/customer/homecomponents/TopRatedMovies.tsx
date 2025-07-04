import React, { useEffect, useState, useRef } from "react";
import { fetchTopRatedMovies } from "../../../api/customer";
import { Movie } from "../../../../../shared/types/type";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // useEffect(() => {
  //   fetchTopRatedMovies()
  //     .then(setMovies)
  //     .catch((err) => {
  //       console.error("Failed to fetch movies", err);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (movies.length === 0) return;

  //   const totalSlides = movies.length + 1;

  //   const slide = () => {
  //     setIndex((prevIndex) => {
  //       const nextIndex = prevIndex + 1;

  //       if (containerRef.current) {
  //         containerRef.current.style.transition = "transform 0.8s ease-in-out";
  //         containerRef.current.style.transform = `translateX(-${nextIndex * (100 / totalSlides)}%)`;
  //       }

  //       if (nextIndex === movies.length) {
  //         timeoutRef.current = setTimeout(() => {
  //           if (containerRef.current) {
  //             containerRef.current.style.transition = "none";
  //             containerRef.current.style.transform = "translateX(0)";
  //           }
  //           setIndex(0);
  //         }, 800);
  //       }

  //       return nextIndex === movies.length ? prevIndex : nextIndex;
  //     });
  //   };

  //   const interval = setInterval(slide, 3000);
  //   return () => {
  //     clearInterval(interval);
  //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
  //   };
  // }, [movies]);

  // if (movies.length === 0) {
  //   return (
  //     <div className="w-full h-[280px] flex items-center justify-center bg-gray-800 text-white rounded-2xl">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="w-full h-[320px] sm:h-[360px] md:h-[420px] lg:h-[480px] overflow-hidden mt-10 rounded-2xl relative bg-[#111518]">
      <h2 className="flex items-center justify-center h-full text-3xl font-bold">Top Rate Movie</h2>
      <div ref={containerRef} className="flex h-full items-center"
        style={{
          width: `${(movies.length + 1) * 100}%`,
        }}
      >
        {movies.map((_, i) => (
          <div
            key={i}
            className="flex justify-center items-center h-full w-full bg-[#111518]"
            style={{ width: `${100 / (movies.length + 1)}%` }}
          >
            <div className="w-full h-full bg-gray-900 rounded-lg"></div>
          </div>
        ))}

        <div
          className="flex justify-center items-center h-full w-full bg-[#111518]"
          style={{ width: `${100 / (movies.length + 1)}%` }}
        >
          <div className="w-full h-full bg-gray-900 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
