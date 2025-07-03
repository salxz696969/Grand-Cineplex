import React from "react";
import { Clock, MapPin, Users, Star, House, LaptopMinimal } from "lucide-react";
import Home from "../../pages/customer/Home";
import { Link } from "react-router-dom";

interface Showtime {
  time: string;
  screeningId: string;
}

interface MovieInTheatreCardProps {
  theaterName: string;
  theaterLocation: string;
  movieTitle: string;
  movieRating: string;
  availableSeats: number;
  totalSeats: number;
  showtimes: Showtime[];
  selectedTime?: string;
  onTimeSelect?: (time: string, screeningId: string) => void;
}

export default function MovieInTheatreCard({
  theaterName,
  theaterLocation,
  movieTitle ,
  movieRating,
  availableSeats,
  totalSeats ,
  showtimes ,
  selectedTime,
  onTimeSelect
}: MovieInTheatreCardProps) {
  const occupancyRate = Math.round(((totalSeats - availableSeats) / totalSeats) * 100);

  return (
    <div className="flex flex-col gap-4 border border-gray-700 rounded-lg p-6 text-white w-full bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
      {/* Theater Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-5">
          <LaptopMinimal className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="text-lg font-bold text-white">{theaterName}</h2>
            {/* <p className="text-sm text-gray-400">{theaterLocation}</p> */}
          </div>
        </div>
        {/* <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">{movieRating}</span>
        </div> */}
      </div>

      {/* Movie Title */}
      {/* <div>
        <h3 className="text-md font-semibold text-gray-300 mb-1">Now Showing</h3>
        <p className="text-lg font-bold text-white">{movieTitle}</p>
      </div> */}

      {/* Seats Info */}
      {/* <div className="flex items-center justify-between bg-gray-800/50 rounded-md p-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-300">Available Seats</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-500">{availableSeats}</p>
          <p className="text-xs text-gray-400">of {totalSeats} total</p>
        </div>
      </div> */}

      {/* Occupancy Bar
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Occupancy</span>
          <span>{occupancyRate}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${occupancyRate}%` }}
          ></div>
        </div>
      </div> */}

      {/* Showtimes */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-sky-500" />
          <h4 className="text-sm font-semibold text-gray-300">Showtimes</h4>
        </div>
        
          <div className="flex flex-wrap gap-2">
            {showtimes.map((time, index) => (
              <Link to={`/cashier/seats/${time.screeningId}`} key={index}>
                <button
                  key={index}
                  onClick={() => onTimeSelect?.(time.time, time.screeningId)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedTime === time.time
                      ? "border-sky-500 bg-sky-500/20 text-sky-400"
                      : "border-gray-600 text-gray-300 hover:border-sky-500 hover:text-sky-400 hover:bg-sky-500/10"
                  }`}
                >
                  {time.time}
                </button>
              </Link>
            ))}
          </div>
      </div>
    </div>
  );
}