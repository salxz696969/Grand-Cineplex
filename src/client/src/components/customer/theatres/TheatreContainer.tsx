import TheatreCard from './TheatreCard';
import { MapPin } from "lucide-react";
import { Screening } from '../../../../../shared/types/type';

interface Props {
  screenings: (Screening & { theaterName: string })[];
  movieId: number;
}

export default function TheatreContainer({ screenings, movieId }: Props) {

  const screeningsByTheater = screenings.reduce((acc, screening) => {
    if (!acc[screening.theaterId]) {
      acc[screening.theaterId] = [];
    }
    acc[screening.theaterId].push(screening);
    return acc;
  }, {} as Record<number, (Screening & { theaterName: string })[]>);

  return (
    <div className="flex flex-col h-full gap-4 w-full  border-gray-700 lg:pl-4 py-4">
      <div className="flex flex-row justify-start items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-sky-500" />
        <h1 className="text-xl font-bold text-white">Showing in Grand Cineplex CADT</h1>
      </div>

      <div className="space-y-4  lg:overflow-y-auto h-full lg:scrollbar-thin lg:scrollbar-thumb-sky-500 lg:scrollbar-track-gray-800">
        {Object.entries(screeningsByTheater).map(([theaterId, theaterScreenings]) => (
          <TheatreCard key={theaterId} name={theaterScreenings[0].theaterName} cinemaId={Number(theaterId)}
            movieId={movieId} screenings={theaterScreenings}
          />
        ))}
      </div>
    </div>
  );
}
