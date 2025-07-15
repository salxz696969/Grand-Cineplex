import React, { useEffect, useState } from 'react';
import { Clock, Users, LaptopMinimal } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Screening, ApiSeat } from '../../../../../shared/types/type';
import { fetchSeatsByScreening } from '../../../api/customer';

interface Props {
  name: string;
  cinema_id: number;
  movieId: number;
  screenings: Screening[];
}

export default function TheatreCard({
  name,
  cinema_id,
  movieId,
  screenings
}: Props) {
  const navigate = useNavigate();

  const [availableSeats, setAvailableSeats] = useState<number>(0);
  const [totalSeats, setTotalSeats] = useState<number>(0);

  // Fetch seat data for the first screening (or any logic you prefer)
  useEffect(() => {
    const fetchSeatInfo = async () => {
      if (screenings.length === 0) return;

      try {
        const screeningId = screenings[0].id;
        const data = await fetchSeatsByScreening(screeningId);
        const total = data.seats.length;
        const booked = data.seats.filter((s: ApiSeat) => s.isBooked).length;
        setTotalSeats(total);
        setAvailableSeats(total - booked);
      } catch (err) {
        console.error("Error fetching seats", err);
      }
    };

    fetchSeatInfo();
  }, [screenings]);

  function formatTime12h(time24: string): string {
    const [hourStr, minuteStr] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  function isPastShowtime(screeningDate: string, screeningTime: string): boolean {
    const now = new Date();
    const [hours, minutes] = screeningTime.split(":").map(Number);
    const date = new Date(screeningDate);
    date.setHours(hours, minutes, 0, 0);
    return date < now;
  }

  return (
    <div className="flex flex-col gap-4 border border-gray-700 rounded-lg p-6 text-white w-full bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LaptopMinimal className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="text-lg font-bold text-white">{name}</h2>
            <p className="text-sm text-gray-400">Cinema ID: {cinema_id}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-800/50 rounded-md p-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-300">Available Seats</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-500">{availableSeats}</p>
          <p className="text-xs text-gray-400">of {totalSeats} total</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-sky-500" />
          <h4 className="text-sm font-semibold text-gray-300">Showtimes</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {screenings.length === 0 && (
            <p className="text-gray-500">No showtimes available</p>
          )}
          {screenings
            .sort((a, b) => a.screening_time.localeCompare(b.screening_time))
            .map((screening) => {
              const isPast = isPastShowtime(screening.screening_date, screening.screening_time);
              return (
                <button
                  key={screening.id}
                  onClick={() => {
                    if (!isPast) navigate(`/seats/${screening.id}`);
                  }}
                  disabled={isPast}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-all duration-200
                    ${isPast
                      ? "border-gray-700 text-gray-500 bg-gray-800/30 cursor-not-allowed blur-[1px]"
                      : "border-gray-600 text-gray-300 hover:border-sky-500 hover:text-sky-400 hover:bg-sky-500/10"
                    }`}
                >
                  {formatTime12h(screening.screening_time)}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
