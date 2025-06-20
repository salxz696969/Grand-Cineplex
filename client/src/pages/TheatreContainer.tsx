import React from 'react';
import { TheatersData } from '../components/FakeData';
import TheatreCards from '../components/theatres/TheatreCard';

export default function TheatreContainer() {
  // Dummy showtimes (same for all)
  const showtimes = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM", "8:00 PM"];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-white">Available Theaters</h2>
      <div className="flex flex-col gap-5">
        {TheatersData.map((theater) => (
          <TheatreCards
            key={theater.id}
            name={theater.name}
            showtimes={showtimes}
          />
        ))}
      </div>
    </div>
  );
}
