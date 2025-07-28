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
  screeningDate?: string;
}

export default function MovieInTheatreCard({
  theaterName,
  theaterLocation,
  movieTitle,
  movieRating,
  availableSeats,
  totalSeats,
  showtimes,
  selectedTime,
  onTimeSelect,
  screeningDate
}: MovieInTheatreCardProps) {
  const occupancyRate = Math.round(((totalSeats - availableSeats) / totalSeats) * 100);

  // Function to format time in 12-hour format with AM/PM
  const formatTime12Hour = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to check if showtime has passed
  const isShowtimePassed = (timeString: string): boolean => {
    const now = new Date();

    // If no screening date is provided, fall back to original behavior
    if (!screeningDate) {
      const [hours, minutes] = timeString.split(':').map(Number);
      const showtime = new Date();
      showtime.setHours(hours, minutes, 0);
      return showtime < now;
    }

    // Create a date object for the screening date and time
    const [hours, minutes] = timeString.split(':').map(Number);
    const screeningDateTime = new Date(screeningDate);
    screeningDateTime.setHours(hours, minutes, 0, 0);

    // Check if the screening date is today and the time has passed
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const screeningDateOnly = new Date(screeningDate);
    screeningDateOnly.setHours(0, 0, 0, 0);

    // Only mark as passed if it's today and the time has passed
    return screeningDateOnly.getTime() === today.getTime() && screeningDateTime < now;
  };

  return (
    <div className="flex flex-col gap-4 border border-gray-800 rounded-xl p-6 text-white w-full bg-gray-950 hover:bg-gray-900/50 transition-colors">
      {/* Theater Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <LaptopMinimal className="w-5 h-5 text-blue-800" />
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
          <Clock className="w-4 h-4 text-blue-800" />
          <h4 className="text-sm font-semibold text-gray-300">Screenings</h4>
        </div>

        <div className="flex flex-wrap gap-2">
          {showtimes.sort((a, b) => a.time.localeCompare(b.time)).map((time, index) => {
            const isPassed = isShowtimePassed(time.time);
            const formattedTime = formatTime12Hour(time.time);

            return (
              <Link
                to={isPassed ? "#" : `/cashier/seats/${time.screeningId}`}
                key={index}
                onClick={(e) => {
                  if (isPassed) {
                    e.preventDefault();
                  } else {
                    onTimeSelect?.(time.time, time.screeningId);
                  }
                }}
              >
                <button
                  disabled={isPassed}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200 ${isPassed
                    ? 'border-gray-600 bg-gray-800/30 text-gray-500 cursor-not-allowed opacity-50'
                    : 'border-slate-800 bg-gray-900/50 hover:bg-gray-900 hover:border-blue-800'
                    }`}
                  title={isPassed ? "This showtime has passed" : `Select ${formattedTime} showtime`}
                >
                  {formattedTime}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}