import React from 'react';

export default function MovieCard({ title, year, duration, image }) {
  return (
    <div className="overflow-hidden shadow flex flex-col">
      <div className="h-90 w-full bg-center bg-cover 
      transition-transform duration-300 ease-in-out hover:scale-105
      cursor-pointer mb-3">
        <img src={image} alt="movie img" className='w-full h-full object-cover rounded-2xl' />
      </div>
      <div className="pl-2">
        <div  className="text-sm text-white font-semibold " >{title}</div>
        <div className="text-xs text-neutral-400">
          {year} &bull; {duration}
        </div>
      </div>
    </div>
  );
}
