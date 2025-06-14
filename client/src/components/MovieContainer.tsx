import React from "react";
import MovieCard from "../components/MovieCard";
import { Data } from "../components/FakeData";
import { useState, useEffect } from "react";


export const MovieContainer = () => {


    useEffect(()=>{

    }, []);

    const [movie, setMovie]= useState([]);
    const [isLodding, setIsLodding]= useState(false);
    const [isError, setIsError]= useState(null);

  return (
    <div className="grid gap-5 custom-cols">
        {isLodding && <p>The Movie is Lodding...</p>}
        {isError  && <p className="text-red-500">Error to fetch this article</p>}
      {Data.map((movie, i) => (
        <MovieCard
          key={i}
          title={movie.title}
          year={movie.year}
          duration={movie.duration}
          image={movie.image}
        />
      ))}
    </div>
  );
};
