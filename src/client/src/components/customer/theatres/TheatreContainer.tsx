// import React from 'react';
// import TheatreCard from './TheatreCard';
// import { MapPin } from "lucide-react";
// import { Screening } from '../../../../../shared/types/type';

// interface Props {
//   screenings: Screening[];
//   movieId: number;
// }

// export default function TheatreContainer({ screenings, movieId }: Props) {
//   // Group screenings by theater_id
//   const screeningsByTheater = screenings.reduce((acc, screening) => {
//     if (!acc[screening.theater_id]) {
//       acc[screening.theater_id] = [];
//     }
//     acc[screening.theater_id].push(screening);
//     return acc;
//   }, {} as Record<number, Screening[]>);

//   return (
//     <div className="flex flex-col gap-4 w-full lg:border-l border-gray-700 lg:pl-4 py-4">
//       <div className="flex flex-row justify-start items-center gap-2 mb-4">
//         <MapPin className="w-5 h-5 text-sky-500" />
//         <h1 className="text-xl font-bold text-white">Showing in Grand Cineplex CADT</h1>
//       </div>

//       <div className="space-y-4 lg:max-h-[600px] lg:overflow-y-auto pr-2 lg:scrollbar-thin lg:scrollbar-thumb-sky-500 lg:scrollbar-track-gray-800">
//         {Object.entries(screeningsByTheater).map(([theaterId, theaterScreenings]) => (
//           <TheatreCard
//             key={theaterId}
//             name={`Theater ID ${theaterId}`}
//             cinema_id={Number(theaterId)}
//             created_at={theaterScreenings[0].created_at}
//             updated_at={theaterScreenings[0].updated_at}
//             movieId={movieId}
//             screenings={theaterScreenings}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


import React from 'react';
import TheatreCard from './TheatreCard';
import { MapPin } from "lucide-react";
import { Screening } from '../../../../../shared/types/type';

interface Props {
  screenings: (Screening & { theaterName: string })[];
  movieId: number;
}

export default function TheatreContainer({ screenings, movieId }: Props) {
  // Group screenings by theater_id
  const screeningsByTheater = screenings.reduce((acc, screening) => {
    if (!acc[screening.theater_id]) {
      acc[screening.theater_id] = [];
    }
    acc[screening.theater_id].push(screening);
    return acc;
  }, {} as Record<number, (Screening & { theaterName: string })[]>);

  return (
    <div className="flex flex-col gap-4 w-full lg:border-l border-gray-700 lg:pl-4 py-4">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-sky-500" />
        <h1 className="text-xl font-bold text-white">Showing in Grand Cineplex CADT</h1>
      </div>

      <div className="space-y-4 lg:max-h-[600px] lg:overflow-y-auto pr-2 lg:scrollbar-thin lg:scrollbar-thumb-sky-500 lg:scrollbar-track-gray-800">
        {Object.entries(screeningsByTheater).map(([theaterId, theaterScreenings]) => (
          <TheatreCard
            key={theaterId}
            name={theaterScreenings[0].theaterName}
            cinema_id={Number(theaterId)}
            movieId={movieId}
            screenings={theaterScreenings}
          />
        ))}
      </div>
    </div>
  );
}
