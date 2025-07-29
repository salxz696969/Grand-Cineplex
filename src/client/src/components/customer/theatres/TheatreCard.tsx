import React, { useEffect, useState } from 'react';
import { Clock, Users, LaptopMinimal } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Screening, ApiSeat } from '../../../../../shared/types/type';
import { fetchSeatsByScreening } from '../../../api/customer';
import { formatTime12h } from '../../../utils/Function';

interface Props {
  name: string;
  cinemaId: number;
  movieId: number;
  screenings: Screening[];
}

export default function TheatreCard({ name, cinemaId, movieId, screenings }: Props) {
  const navigate = useNavigate();

  const [availableSeats, setAvailableSeats] = useState<number>(0);
  const [totalSeats, setTotalSeats] = useState<number>(0);


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


  function isPastShowtime(screeningDate: string, screeningTime: string): boolean {
    const now = new Date();
    const [hours, minutes] = screeningTime.split(":").map(Number);
    const date = new Date(screeningDate);
    date.setHours(hours, minutes, 0, 0);
    return date < now;
  }

  return (
    <div className="flex flex-col gap-4 border border-gray-800 rounded-xl p-6 text-white w-full bg-gray-950 hover:bg-gray-900/50 transition-colors">
      {/* Theater Header */}
      <div className="flex items-center gap-2 ">
        <LaptopMinimal className="w-5 h-5 text-blue-800" />
        <h2 className="text-lg font-bold text-white">{name}</h2>
      </div>
      {/* Showtimes */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-blue-800" />
          <h4 className="text-sm font-semibold text-gray-300">Showtimes</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {screenings.length === 0 && (
            <p className="text-gray-500">No showtimes available</p>
          )}
          {screenings
            .sort((a, b) => a.screeningTime.localeCompare(b.screeningTime))
            .map((screening) => {
              const isPast = isPastShowtime(screening.screeningDate, screening.screeningTime);
              return (
                <button key={screening.id} onClick={() => {
                  if (!isPast) navigate(`/seats/${screening.id}`);
                }}
                  disabled={isPast}
                  className={`rounded-md border border-slate-800 px-3 py-2 text-sm font-medium transition-all duration-200 bg-gray-900/50 hover:bg-gray-900 hover:border-blue-800 ${isPast ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {formatTime12h(screening.screeningTime)}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
