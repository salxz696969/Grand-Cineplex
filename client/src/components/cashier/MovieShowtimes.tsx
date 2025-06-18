import React from "react";
import MovieInTheatreCard from "./MovieInTheatreCard";
import { MapPin } from "lucide-react";

export default function MovieShowTimes() {
    return (
        <div className="flex flex-col gap-4 w-full lg:border-l border-gray-700 pl-4">
            <div className="flex flex-row justify-start items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-sky-500" />
                <h1 className="text-xl font-bold text-white">Showing in Grand Cineplex CADT</h1>
            </div>

            <div className="space-y-4">
                <MovieInTheatreCard theaterName="Theater #1" theaterLocation="Cinema Complex A" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #2" theaterLocation="Cinema Complex B" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #3" theaterLocation="Cinema Complex C" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #4" theaterLocation="Cinema Complex D" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #5" theaterLocation="Cinema Complex E" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #6" theaterLocation="Cinema Complex F" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #7" theaterLocation="Cinema Complex G" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #8" theaterLocation="Cinema Complex H" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #9" theaterLocation="Cinema Complex I" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #10" theaterLocation="Cinema Complex J" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #11" theaterLocation="Cinema Complex K" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #12" theaterLocation="Cinema Complex L" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #13" theaterLocation="Cinema Complex M" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #14" theaterLocation="Cinema Complex N" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
                <MovieInTheatreCard theaterName="Theater #15" theaterLocation="Cinema Complex O" movieTitle="The Great Adventure" movieRating="PG-13" availableSeats={45} totalSeats={120} showtimes={["8:00", "10:00", "12:00", "2:30", "5:00", "7:30"]} />
            </div>
        </div>
    );
}